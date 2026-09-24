// ============================== //
// dummy
// ============================== //
const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

// ============================== //
// totalLikes
// ============================== //
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// ============================== //
// favorite Blogs
// ============================== //
const favoriteBlog = (blogs) => {

  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((initialBlog, currentBlog) => {
    return currentBlog.likes >= initialBlog.likes ? currentBlog : initialBlog
  }, blogs[0])
}

// ============================== //
// mostBlogs
// ============================== //
const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return null
  }

  const blogCount = {}

  blogs.forEach(blog => {
    blogCount[blog.author] ? blogCount[blog.author] += 1 : blogCount[blog.author] = 1
  })

  const topBlogger = Object.keys(blogCount).reduce((topAuthor, currentAuthor) => {
    return blogCount[currentAuthor] >= blogCount[topAuthor] ? currentAuthor : topAuthor
  })

  return {
    author: topBlogger,
    blogs: blogCount[topBlogger]
  }
}

// ============================== //
// mostLikes
// ============================== //
const mostLikes = (blogs) => {

  if (blogs.length === 0) {
    return 'Give me Real data !'
  }

  const likesCount = {}

  blogs.forEach(blog => {
    likesCount[blog.author] ? likesCount[blog.author] += blog.likes : likesCount[blog.author] = blog.likes
  })

  const mostLiked = Object.keys(likesCount).reduce((topBlogger, currentBlogger) => {
    return likesCount[currentBlogger] >= likesCount[topBlogger] ? currentBlogger : topBlogger
  })

  return {
    author: mostLiked,
    likes: likesCount[mostLiked]
  }

}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }