import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('blog title and author should be displayed by default', () => {
  const blog = {
    title: 'blog title should be seen by default',
    author: 'author should be seen by default'
  }

  const { container } = render(<Blog blog={blog}/>)

  screen.debug(container)

  const title = container.querySelector('.title')
  screen.debug(title)
  expect(title).toHaveTextContent('blog title should be seen by default')
  const togglable = container.querySelector('.togglableContent')
  expect(togglable).toBe(null)
// expect(element).toBeDefined()
})

test('blog url, likes should be displayed when button is pressed', async () => {
  const blog = {
    title: 'blog title should be seen by default',
    author: 'author should be seen by default',
    url: 'url',
    likes: 100,
    user: {
      username: 'user'
    }
  }
  const { container } = render(<Blog blog={blog}/>)

  screen.debug(container)

  const title = container.querySelector('.title')
  screen.debug(title)
  expect(title).toHaveTextContent('blog title should be seen by default')
  const togglable = container.querySelector('.togglableContent')
  expect(togglable).toBe(null)
  fireEvent.click(screen.getByText('show'))
  const k = container.querySelector('.likes')
  expect(k).toHaveTextContent(100)
  screen.debug()
  // expect(element).toBeDefined()
})

test('if like button is pressed twice, the event handler is called twice', async () => {
  const blog = {
    title: 'blog title should be seen by default',
    author: 'author should be seen by default',
    url: 'url',
    likes: 100,
    user: {
      username: 'user'
    }
  }
  const likeBlog = jest.fn()

  const { container } = render(<Blog blog={blog} functionLike={likeBlog}/>)

  screen.debug(container)

  fireEvent.click(screen.getByText('show'))
  fireEvent.click(screen.getByText('like'))
  expect(likeBlog.mock.calls).toHaveLength(1)
  fireEvent.click(screen.getByText('like'))

  expect(likeBlog.mock.calls).toHaveLength(2)

  // expect(element).toBeDefined()
})