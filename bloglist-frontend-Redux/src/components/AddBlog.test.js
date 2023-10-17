import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './AddBlog'
import * as userEvent from '@testing-library/user-event'



test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()

  const user = userEvent.default
  console.log(userEvent)
  const { container } = render(<BlogForm handleSubmit={createBlog} />)

  const titleInput = container.querySelector('#blog-title')
  const authorInput = container.querySelector('#blog-author')
  const urlInput = container.querySelector('#blog-url')
  // render(<BlogForm handleSubmit={createBlog} />)


  const sendButton = screen.getByText('Add blog')

  await user.type(titleInput, 'testing a form...')
  await user.type(authorInput, 'author test')
  await user.type(urlInput, 'url test')
  await user.click(sendButton)
  const expectations = {
    title: 'testing a form...',
    author: 'author test',
    url: 'url test'
  }
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(expectations)
  // expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  console.log(createBlog.mock.calls[0][0])
})