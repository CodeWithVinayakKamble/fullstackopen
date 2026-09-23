const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

  if (!request.body) {
    return response.status(400).json({ error: 'Content Missing' })
  }

  const { title, author, url, likes } = request.body

  const newBlog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })

  const savedBlog = await newBlog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogRouter