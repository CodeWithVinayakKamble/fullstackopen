import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

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
    <Box sx={{ mt: 3, maxWidth: 400 }}>
      <h2>Log in to application</h2>
      <form onSubmit={sendCredentialsToLoginHandle}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="standard"
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="standard"
            type="password"
            label="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          LOGIN
        </Button>
      </form>
    </Box>
  )

}

export default LoginForm