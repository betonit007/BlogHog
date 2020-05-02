const Category = require('../models/category')
const slugify = require('slugify')
const { errorHandler } = require('../helpers/dbErrorHandlers')

exports.create = async (req, res) => {
  const { name } = req.body
  let slug = slugify(name).toLowerCase()

  try {

    let category = new Category({ name, slug })
    await category.save()
    res.json(category)

  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) })
  }
}

exports.list = async (req, res) => {

  try {
    let data = await Category.find({})
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

    const response = await Category.findOne({ slug })
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

    await Category.findOneAndRemove({ slug })
    res.json({ msg: 'Category deleted successfully'})

  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err)
    })
  }
}