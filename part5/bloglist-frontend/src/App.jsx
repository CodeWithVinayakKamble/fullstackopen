import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginServices from './services/login'
import blogsServices from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogsServices
      .getAll()
      .then(allBlogs => setBlogs(allBlogs))
  }, [])

  useEffect(() => {
    const loggedUserInLocalStorage = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserInLocalStorage) {
      const user = JSON.parse(loggedUserInLocalStorage)
      setUser(user)
      blogsServices.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('Logged in with', username)

      const user = await loginServices.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      blogsServices.setToken(user.token)
      setNotification({ message: `${username} Logged in successfully`, type: 'success' })
      setTimeout(() => { setNotification(null) }, 3000);
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotification({ message: 'Wrong Username or Password', type: 'error' })
      setTimeout(() => { setNotification(null) }, 3000);
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
    setNotification({ message: `${user.username} Logged out successfully`, type: 'success' })
    setTimeout(() => { setNotification(null) }, 3000);
  }

  const addNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const savedBlog = await blogsServices.create(newBlog)
      setBlogs([...blogs, savedBlog])
      setNotification({ message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`, type: 'success' })
      setTimeout(() => { setNotification(null) }, 3000);
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (error) {
      setNotification({ message: `${error.response.data.error}`, type: 'error' })
      setTimeout(() => { setNotification(null) }, 3000)
    }
  }

  const loginForm = () => (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>

        <div>
          <label>
            username :
            <input type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)} />
          </label>
        </div>

        <div>
          <label>
            password :
            <input type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)} />
          </label>
        </div>

        <button type='submit'>Log in</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <form onSubmit={addNewBlog}>
      <div>
        <label>
          title:
          <input type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </label>
      </div>

      <div>
        <label>
          author:
          <input type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </label>
      </div>

      <div>
        <label>
          url:
          <input type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>

      <button type='submit'>Create</button>
    </form>
  )

  return (
    <div>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && (
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in <button type='button' onClick={handleLogOut}>Log out</button></p>
          {blogForm()}
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App