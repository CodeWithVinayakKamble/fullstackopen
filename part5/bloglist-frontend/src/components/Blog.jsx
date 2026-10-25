import { useState } from 'react'

const Blog = ({ blog, increaseLikes, activeUser, deleteBlog }) => {

  const { title, author, likes, url, user } = blog
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    border: '2px solid black',
    marginBlockEnd: '0.5rem',
    padding: '0.5rem',
  }

  const toggleInfo = { display: visible ? '' : 'none' }

  const toggleVisibility = () => (setVisible(!visible))


  return (
    <div className='blog' style={blogStyle}>
      {title} {author} <button type="button" onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div className='blogDetails' style={toggleInfo}>
        <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        <p>Likes {likes} <button type="button" onClick={() => increaseLikes(blog.id)} >like</button></p>
        <p>{user?.name}</p>
        {blog?.user?.username === activeUser?.username && (
          <button type="button" onClick={() => deleteBlog(blog.id, title, author)} >remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog