import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


// Blog information and the number of likes are displayed to unauthenticated users, buttons are not displayed
test('renders blog information to unauthenticated users and not buttons', () => {

  const testBlog = {
    title: 'guest user able to see only blog info not buttons',
    author: 'vinayak',
    url: 'example.com',
    likes: 15,
    user: {
      name: 'vinayak kamble',
      username: 'vinayakkamble'
    }
  }

  render(<Blog blog={testBlog} />)

  const title = screen.getByText('vinayak:guest user able to see only blog info not buttons', { exact: false })
  const url = screen.getByRole('link', { name: 'example.com' })
  const likes = screen.getByText('Likes 15', { exact: false })

  // queryByRole does not throw an error; if the element is missing, it returns null!
  const likeBtn = screen.queryByRole('button', { name: 'like' })
  const deleteBtn = screen.queryByRole('button', { name: 'remove' })

  expect(title).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()

  expect(likeBtn).toBeNull()
  expect(deleteBtn).toBeNull()
})


// Authenticated users who are not the blog’s creator are shown only the like button
test('User B can able to see only User A blog post info and like button not remove button', () => {

  const testBlog = {
    title: 'userB able to see only blog info and like button',
    author: 'mattie lukkain',
    url: 'fullstackopne.com',
    likes: 15,
    user: {
      name: 'vinayak kamble',
      username: 'vinayakkamble'
    }
  }

  const userB = {
    name: 'vincent',
    username: 'vincent griffit',
    token: 'hgjbknlmkjlhgfdfszxcvbnklljhuuytrsdxcvbnlkjhgfgdx'
  }

  render(<Blog blog={testBlog} activeUser={userB} />)

  const title = screen.getByText('mattie lukkain:userB able to see only blog info and like button', { exact: false })
  const url = screen.getByRole('link', { name: 'fullstackopne.com' })
  const likes = screen.getByText('Likes 15', { exact: false })

  // queryByRole does not throw an error; if the element is missing, it returns null!
  const likeBtn = screen.queryByRole('button', { name: 'like' })
  const deleteBtn = screen.queryByRole('button', { name: 'remove' })

  expect(title).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()

  expect(likeBtn).not.toBeNull()
  expect(deleteBtn).toBeNull()
})


// The blog’s creator is also shown the delete button
test('Blog user can able to see remove button', () => {
  const testBlog = {
    title: 'blog user can able see remove button',
    author: 'mattie lukkain',
    url: 'fullstackopne.com',
    likes: 15,
    user: {
      name: 'vinayak kamble',
      username: 'vinayakkamble'
    }
  }

  const activeUser = {
    name: 'vinayak kamble',
    username: 'vinayakkamble',
    token: 'hgjbknlmkjlhgfdfszxcsmh,jqvbnklljhuuytrsdxcvbnlkjhgfgdx'
  }

  render(<Blog blog={testBlog} activeUser={activeUser} />)

  const title = screen.getByText('mattie lukkain:blog user can able see remove button', { exact: false })
  const url = screen.getByRole('link', { name: 'fullstackopne.com' })
  const likes = screen.getByText('Likes 15', { exact: false })

  // queryByRole does not throw an error; if the element is missing, it returns null!
  const likeBtn = screen.queryByRole('button', { name: 'like' })
  const deleteBtn = screen.queryByRole('button', { name: 'remove' })

  expect(title).toBeDefined()
  expect(url).toBeDefined()
  expect(likes).toBeDefined()

  expect(likeBtn).toBeInTheDocument()
  expect(deleteBtn).toBeInTheDocument()

})
