import { Card, CardContent, Typography, Button, Box } from '@mui/material'

const Blog = ({ blog, increaseLikes, activeUser, deleteBlog }) => {


  if (!blog) {
    return (
      <div>blog not found</div>
    )
  }

  const { title, author, likes, url, user } = blog

  const handleDelete = () => {
    const confirmation = window.confirm(`Remove Blog ${title} by ${author}`)
    if (confirmation) {
      deleteBlog(blog.id)
    }
  }

  return (
    <Box sx={{ mt: 3, maxWidth: 600 }}>
      <Card elevation={2} sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h4" component="h2" sx={{ fontWeight: '500', mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
            by {author}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Added by {user?.name || user?.username || 'anonymous'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {likes} likes
            </Typography>
            {activeUser && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => increaseLikes(blog.id)}
              >
                LIKE
              </Button>
            )}
            {activeUser && blog?.user?.username === activeUser?.username && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleDelete}
              >
                REMOVE
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Blog