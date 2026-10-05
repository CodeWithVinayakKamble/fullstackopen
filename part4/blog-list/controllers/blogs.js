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

// ==== HTTP POST Router ==== //

// Helper Function
const getTokenFrom = request => {

  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// ================================== //

blogRouter.post('/', async (request, response) => {

  if (!request.body) {
    return response.status(400).json({ error: 'Content Missing' })
  }

  const token = getTokenFrom(request)

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