import { useState } from "react"

const LoginForm = ({ loginHandle }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const sendCredentialsToLoginHandle = (event) => {

    event.preventDefault()

    loginHandle({ username, password })

    setUsername('')
    setPassword('')

  }

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={sendCredentialsToLoginHandle}>

        <div>
          <label>
            username
            <input type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)} />
          </label>
        </div>

        <div>
          <label>
            password
            <input type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)} />
          </label>
        </div>

        <button type='submit'>log in</button>
      </form>
    </>
  )
}

export default LoginForm