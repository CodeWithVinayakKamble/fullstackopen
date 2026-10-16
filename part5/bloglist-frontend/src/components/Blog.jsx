import { useState } from "react"

const Blog = ({ blog }) => {

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
    <div style={blogStyle}>
      {title} ~ {author} <button type="button" onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={toggleInfo}>
        <p>{url}</p>
        <p>{likes} <button type="button" >like</button></p>
        <p>{user?.name}</p>
      </div>
    </div>
  )
}

export default Blog