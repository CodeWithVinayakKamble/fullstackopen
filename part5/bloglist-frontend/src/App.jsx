import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginServices from './services/login'
import blogsServices from './services/blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogsServices
      .getAll()
      .then(allBlogs => setBlogs(allBlogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('Logged in with ', username)

    const validUser = await loginServices.login({ username, password })
    setUser(validUser)
    setUsername('')
    setPassword('')

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
  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>Blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App