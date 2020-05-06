const Tag = require('../models/tag')
const slugify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandlers')

exports.create = async (req, res) => {
  const { name } = req.body
  let slug = slugify(name).toLowerCase()

  try {

    let tag = new Tag({ name, slug })
    await tag.save()
    res.json(tag)

  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) })
  }
}

exports.list = async (req, res) => {

  try {
    let data = await Tag.find({})
    res.json(data)

  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err)
    })
  }
}

exports.read = async (req, res) => {
  const slug = req.params.slug.toLowerCase()

  try {

    const response = await Tag.findOne({ slug })
    res.json(response)

  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err)
    })
  }

}

exports.remove = async (req, res) => {
  const slug = req.params.slug.toLowerCase()

  try {

    await Tag.findOneAndRemove({ slug })
    res.json({ msg: 'Tag deleted successfully'})

  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err)
    })
  }
}