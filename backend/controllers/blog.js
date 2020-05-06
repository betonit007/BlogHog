const Blog = require('../models/blog')
const formidable = require('formidable')
const slugify = require('slugify')
const stripHTML = require('string-strip-html')
const _ = require('lodash')
const Category = require('../models/category')
const Tag = require('../models/tag')
const {errorHandler} = require('../helpers/dbErrorHandlers') 
const fs = require('fs')
const {smartTrim} = require('../helpers/blog')

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true //keep original extensions of sent files
    form.parse(req, async (err, fields, files) => {  // 2nd arg is passed data out of req
      if(err) {
          return res.status(400).json({
              error: 'Image could not upload'
          })
      }
      const {title, body, categories, tags} = fields

      if (!title || !title.length) {
          return res.status(400).json({
              error: "Title is required"
          })
      }

      if(!body || body.length < 200) {
          return res.status(400).json({
              error: 'Content is too short'
          })
      }

      if(!categories || categories.length === 0) {
        return res.status(400).json({
            error: 'At least one category is required'
        })
    }

      let blog = new Blog()
      blog.title = title
      blog.body = body
      blog.excerpt = smartTrim(body, 320, ' ', '...')
      blog.slug = slugify(title).toLowerCase()
      blog.mtitle = `${title}-${process.env.APP_NAME}`
      blog.mdesc = stripHTML(body.substring(0, 160))
      blog.postedBy = req.user._id

      let arrayOfCategories = categories && categories.split(',')
      let arrayOfTags = tags && tags.split(',')

      if(files.photo) {
          files.photo
          if(files.photo.size > 1000000) {
              return res.status(400).json({
                  error: "Image should be less than 1 megabyte"
              })
          }
          blog.photo.data = fs.readFileSync(files.photo.path)
          blog.photo.contentType = files.photo.type
      }
      try {
          let result = await blog.save()
           
          let addCategories = await Blog.findByIdAndUpdate(result._id, {$push: { categories: arrayOfCategories, tags: arrayOfTags }}, {new: true})
          res.json(addCategories)

      } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err })
      }
    })  
}