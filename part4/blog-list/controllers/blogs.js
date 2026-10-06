const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')



// ==== HTTP GET Router ==== //
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


// ================================== //
// HTTP POST Route
// ================================== //
blogRouter.post('/', async (request, response) => {

  if (!request.body) {
    return response.status(400).json({ error: 'Content Missing' })
  }

  const token = request.token

  if (!token) {
    return response.status(401).json({ error: "Token Missing" })
  }

  const decodedToken = jwt.verify(token, SECRET)
  // The object decoded from the token contains the ""username and id fields"", which tell the server who made the request

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid Token' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: "UserId missing or not valid" })
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
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})


// ================================== //
// HTTP DELETE Route
// ================================== //
blogRouter.delete('/:id', async (request, response) => {

  const blogId = request.params.id

  const token = request.token

  if (!token) {
    return response.status(401).json({ error: 'Token Missing' })
  }

  const decodedToken = jwt.verify(token, SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "Invalid Token" })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(blogId)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (!blog.user || user._id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'only the creator can delete a blog' })
  }

  await Blog.findByIdAndDelete(blogId)
  response.status(204).end()

})

// ================================== //
// HTTP PUT Route
// ================================== //
blogRouter.put('/:id', async (request, response) => {

  const id = request.params.id
  const { title, author, url, likes } = request.body
  const blog = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { returnDocument: 'after', runValidators: true, context: 'query' })

  response.json(updatedBlog)

})

module.exports = blogRouter