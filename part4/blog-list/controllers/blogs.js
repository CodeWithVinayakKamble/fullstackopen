const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { error } = require('../utils/logger')


// ==== HTTP GET Router ==== //
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// ==== HTTP POST Router ==== //
blogRouter.post('/', async (request, response) => {

  if (!request.body) {
    return response.status(400).json({ error: 'Content Missing' })
  }

  const { title, author, url, likes } = request.body

  if (!title) {
    return response.status(400).send({ error: "Title Missing" })
  }

  if (!url) {
    return response.status(400).send({ error: "Url Missing" })
  }

  const newBlog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes || 0
  })

  const savedBlog = await newBlog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogRouter