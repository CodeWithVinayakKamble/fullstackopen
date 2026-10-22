import { screen, render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('tesing newBlog form with approprite content', async () => {
  const createNewBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createNewBlog={createNewBlog} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const createBtn = screen.getByText('Create')

  await user.type(title, 'testing blog for 5.16 new blogForm Creation')
  await user.type(author, 'vin')
  await user.type(url, 'fso.com')

  await user.click(createBtn)

  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0].title).toBe('testing blog for 5.16 new blogForm Creation')
  expect(createNewBlog.mock.calls[0][0].author).toBe('vin')
  expect(createNewBlog.mock.calls[0][0].url).toBe('fso.com')

})