// ====================================== //
// Imports
// ====================================== //
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginServices from './services/login'
import blogServices from './services/blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglabel from './components/Togglabel'
import LoginForm from './components/LoginForm'

// ====================================== //
// App
// ====================================== //
const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  // ====================================== //
  // Getting allBlogs from server
  // ====================================== //
  useEffect(() => {
    blogServices
      .getAll()
      .then(allBlogs => setBlogs(allBlogs))
  }, [])

  // ====================================== //
  // Getting user from localStorage
  // ====================================== //
  useEffect(() => {
    const loggedUserInLocalStorage = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserInLocalStorage) {
      const user = JSON.parse(loggedUserInLocalStorage)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])


  // ====================================== //
  // Lon-in Logic
  // ====================================== //
  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = await loginServices.login({ username, password })
      console.log('Logged in with', username)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      blogServices.setToken(user.token)
      setNotification({ message: `${username} Logged in successfully`, type: 'success' })
      setTimeout(() => { setNotification(null) }, 3000)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' })
      setTimeout(() => { setNotification(null) }, 3000)
    }
  }

  // ====================================== //
  // Log-out - Logic
  // ====================================== //
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setNotification({ message: `${user.username} Logged out successfully`, type: 'success' })
    setTimeout(() => { setNotification(null) }, 3000)
  }

  // ====================================== //
  // Adding/sending valid newBlog to server via axios Post Method
  // ====================================== //
  const addNewBlog = async (newBlogObject) => {
    try {
      const savedBlog = await blogServices.create(newBlogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs([...blogs, { ...savedBlog, user }])
      setNotification({ message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`, type: 'success' })
      setTimeout(() => { setNotification(null) }, 3000)

    } catch (error) {
      setNotification({ message: `${error.response.data.error}`, type: 'error' })
      setTimeout(() => { setNotification(null) }, 3000)
    }
  }

  // ====================================== //
  // Http Put method to chnage likes
  // ====================================== //
  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const updatedBlog = await blogServices.update(id, changedBlog)
      setBlogs(blogs.map(blog => blog.id === id ? { ...updatedBlog, user: blog.user } : blog))
    } catch (error) {
      console.log(`${error.response.data.error}`)
    }
  }

  // ====================================== //
  // BlogsByMostLike
  // ====================================== //
  const sortedBlog = [...blogs].sort((a, b) => b.likes - a.likes)

  // ====================================== //
  // Http Delete Method
  // ====================================== //
  const deleteBlogOf = async (id, title, author) => {
    try {
      const confirmation = window.confirm(`Remove Blog ${title} by ${author}`)
      if (confirmation) {
        await blogServices.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      }
    } catch (error) {
      console.log(`${error.response.data.error}`)

    }
  }

  return (
    <div>
      <Notification notification={notification} />

      {!user && (
        <LoginForm
          loginHandle={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}

      {user && (
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in <button type='button' onClick={handleLogOut}>log out</button></p>

          <Togglabel buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createNewBlog={addNewBlog} />
          </Togglabel>

          {sortedBlog.map(blog => (
            <Blog key={blog.id} blog={blog} increaseLikes={handleLike} activeUser={user} deleteBlog={deleteBlogOf} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App