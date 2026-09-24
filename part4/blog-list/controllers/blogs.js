const blogRouter = require('express').Router()
const Blog = require('../models/blog')



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
    return response.status(400).send({ error: 'Title Missing' })
  }

  if (!url) {
    return response.status(400).send({ error: 'Url Missing' })
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

// ==== HTTP Delete router ==== //
blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})


// ==== HTTP PUT Router ==== //
blogRouter.put('/:id', async (request, response) => {

  const id = request.params.id
  const { title, author, url, likes } = request.body
  const blog = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { returnDocument: 'after', runValidators: true, context: 'query' })

  response.json(updatedBlog)

})

module.exports = blogRouter