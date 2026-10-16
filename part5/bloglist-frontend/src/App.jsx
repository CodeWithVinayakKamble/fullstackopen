// ====================================== //
// Imports
// ====================================== //
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginServices from './services/login'
import blogsServices from './services/blogs'
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
    blogsServices
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
      blogsServices.setToken(user.token)
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
      blogsServices.setToken(user.token)
      setNotification({ message: `${username} Logged in successfully`, type: 'success' })
      setTimeout(() => { setNotification(null) }, 3000);
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ message: error.response.data.error, type: 'error' })
      setTimeout(() => { setNotification(null) }, 3000);
    }
  }

  // ====================================== //
  // Log-out - Logic
  // ====================================== //
  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
    setNotification({ message: `${user.username} Logged out successfully`, type: 'success' })
    setTimeout(() => { setNotification(null) }, 3000);
  }

  // ====================================== //
  // Adding/sending valid newBlog to server via axios Post Method
  // ====================================== //
  const addNewBlog = async (newBlogObject) => {
    try {
      const savedBlog = await blogsServices.create(newBlogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs([...blogs, savedBlog])
      setNotification({ message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`, type: 'success' })
      setTimeout(() => { setNotification(null) }, 3000);

    } catch (error) {
      setNotification({ message: `${error.response.data.error}`, type: 'error' })
      setTimeout(() => { setNotification(null) }, 3000)
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
          <p>{user.name} logged in <button type='button' onClick={handleLogOut}>Log out</button></p>

          <Togglabel buttonLabel='Create New Blog' ref={blogFormRef}>
            <BlogForm createNewBlog={addNewBlog} />
          </Togglabel>

          <h2>Blogs</h2>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default App