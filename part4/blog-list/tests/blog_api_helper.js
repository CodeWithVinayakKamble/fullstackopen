const Blog = require('../models/blog')


let initialBlogs = [
  {
    title: 'first blog for testing test db ',
    author: 'codeWithVinayakKamble',
    url: 'http://github.com/CodeWithVinayakKamble',
    likes: 5
  },
  {
    title: 'second blog for testing test db ',
    author: 'codeWithVinayakKamble',
    url: 'http://github.com/CodeWithVinayakKamble',
    likes: 10
  },
  {
    title: 'third blog for testing test db ',
    author: 'codeWithVinayakKamble',
    url: 'http://github.com/CodeWithVinayakKamble',
    likes: 15
  },
]

const blogsAtEnd = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = { initialBlogs , blogsAtEnd }