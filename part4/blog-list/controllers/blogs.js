const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', (request, response, next) => {
  if (!request.body) {
    return response.status(400).json({ error: 'Content Missing' })
  }
  const { title, author, url, likes } = request.body

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })

  blog.save()
    .then(savedBlog => response.status(201).json(savedBlog))
    .catch(error => next(error))
})

module.exports = blogRouter