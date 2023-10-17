import { useState } from 'react'
import blogsService from '../services/blogs'

const CommentForm = ({ id }) => {
  const [content, setContent] = ''
  const handlePost = async (event) => {
    event.preventDefault()
    const body = {
      content: content,
    }
    const response = await blogsService.postComment(id, body)
  }
}
