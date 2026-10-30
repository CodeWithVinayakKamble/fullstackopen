import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

const BlogForm = ({ createNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = (event) => {

    event.preventDefault()


    createNewBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Box sx={{ mt: 3, maxWidth: 500 }}>
      <h2>create new</h2>
      <form onSubmit={newBlog}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='url'
            required
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          CREATE
        </Button>
      </form>
    </Box>
  )
}

export default BlogForm