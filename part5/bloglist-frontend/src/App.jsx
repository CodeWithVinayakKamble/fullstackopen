// ====================================== //
// Imports
// ====================================== //

// ==== Dependencies/Lib ==== //
import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from 'react-router-dom'

// ==== Components ==== //
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

// ==== Services ==== //
import loginServices from './services/login'
import blogServices from './services/blog'

// ====================================== //
// App
// ====================================== //
const App = () => {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()

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
  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginServices.login({ username, password })
      console.log('Logged in with', username)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      blogServices.setToken(user.token)
      setNotification({ message: `${username} log in successfully`, type: 'success' })
      setTimeout(() => { setNotification(null) }, 3000)
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
    navigate('/')
    setNotification({ message: `${user.username} logged out successfully`, type: 'success' })
    setTimeout(() => { setNotification(null) }, 3000)
  }

  // ====================================== //
  // Adding/sending valid newBlog to server via axios Post Method
  // ====================================== //
  const addNewBlog = async (newBlogObject) => {
    try {
      const savedBlog = await blogServices.create(newBlogObject)
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
      <header className='header'>

        <nav className='navbar' >

          <Link to='/'>blogs</Link>

          {user ?
            <span><strong>{user.name} logged in </strong><button type='button' onClick={handleLogOut}>logout</button></span>
            :
            <Link to='/login'>login</Link>
          }

        </nav>

      </header>

      <Notification notification={notification} />

      <Routes>

        <Route path='/' element={<BlogList blogs={blogs} user={user} handleLike={handleLike} deleteBlogOf={deleteBlogOf} />} />

        <Route path='/login' element={user ? <Navigate replace to={'/'} /> : <LoginForm loginHandle={handleLogin} />} />

      </Routes>
    </div>
  )
}

export default App