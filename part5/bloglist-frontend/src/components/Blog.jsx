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
    <div className='blog'>

      <h2>{author}:{title}</h2>

      <div className='blogDetails'>

        <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>

        <p>Likes {likes} {activeUser && (<button type="button" onClick={() => increaseLikes(blog.id)} >like</button>)}</p>

        <p>Added by {user?.name}</p>

        {activeUser && blog?.user?.username === activeUser?.username && (
          <button type="button" onClick={handleDelete} >remove</button>
        )}

      </div>

    </div>
  )
}

export default Blog