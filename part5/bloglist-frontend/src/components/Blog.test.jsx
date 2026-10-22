import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders only blogTitle and blogAuthor', () => {

  const blog = {
    title: 'testing blog that checks that whether its rendering or not',
    author: 'vin',
    url: 'https://testurl.com',
    likes: 10,
    user: {
      name: 'Vinayak'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const element = screen.getByText('testing blog that checks that whether its rendering or not', { exact: false })

  const div = container.querySelector('.blogDetails')


  expect(element).toBeDefined()
  expect(div).toHaveStyle('display:none')
})

test('blogDetails shown on click button view (likes,url)', async () => {

  const blog = {
    title: 'testing blog that checks that whether its rendering or not',
    author: 'vin',
    url: 'https://testurl.com',
    likes: 10,
    user: {
      name: 'Vinayak'
    }
  }
  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()


  const button = screen.getByText('view')

  await user.click(button)

  const div = container.querySelector('.blogDetails')
  expect(div).not.toHaveStyle('display:none')
})

test('like button got clicked twice or more than one 1+', async () => {

  const blog = {
    title: 'testing blog that checks that whether its rendering or not',
    author: 'vin',
    url: 'https://testurl.com',
    likes: 10,
    user: {
      name: 'Vinayak'
    }
  }
  const likes = vi.fn()
  const user = userEvent.setup()


  render(<Blog blog={blog} increaseLikes={likes} />)



  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(likes.mock.calls).toHaveLength(2)

})