import { Link } from 'react-router-dom'
import Blog from './Blog'

const BlogList = ({ blogs }) => {


  // ====================================== //
  // BlogsByMostLike
  // ====================================== //
  const sortedBlog = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <ul className="bloglist">
        {sortedBlog.map(blog => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}


export default BlogList