import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { removeUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Comments = ({ id }) => {
  const [comments, setComments] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await blogService.getComments(id)
        setComments(response)
      } catch (exception) {
        dispatch(removeUser())
        dispatch(setNotification('Log in again, your session expired'))
        navigate('/')
      }
    }

    fetchComments()
  }, [id, dispatch])

  const [content, setContent] = useState('')
  const handlePost = async (event) => {
    console.log('?????????')
    event.preventDefault()
    const body = {
      content: content,
    }
    const response = await blogService.postComment(id, body)
    console.log('response: ', response)
    setComments(comments.concat(response))
    setContent('')
  }

  return (
    <>
      <h2> Comments </h2>
      <div>
        add a coment:
        <form onSubmit={handlePost}>
          <input
            id="comment"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <button type="Sumbit"> post </button>
        </form>
      </div>
      {comments.length === 0 ? (
        <p>no comments yet</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}> {comment.content}</li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Comments
