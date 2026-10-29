import Blog from "./Blog"

const BlogList = ({ blogs, user, handleLike, deleteBlogOf }) => {


    // ====================================== //
    // BlogsByMostLike
    // ====================================== //
    const sortedBlog = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <div>
            {sortedBlog.map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    increaseLikes={handleLike}
                    activeUser={user}
                    deleteBlog={deleteBlogOf}
                />
            ))}
        </div>
    )
}


export default BlogList