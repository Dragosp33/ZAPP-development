import Comments from './Comments'
import blogsService from '../services/blogs'

import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { useMatch } from 'react-router-dom'

const Blog = ({ shownBlog = 'loading' }) => {
  const blogMatch = useMatch('/blogs/:id')
  const id = blogMatch.params.id
  console.log(shownBlog, id)
  const user = useSelector((state) => state.user)
  const [blog, setBlog] = useState(shownBlog)
  const [liked, setLiked] = useState(false)
  const [buttonClass, setButtonClass] = useState('')

  //const [liked, setLiked] = useState(shownBlog.likedBy.includes(user.id))

  console.log('  RENDER    IN    BLOG.JS')
  useEffect(() => {
    async function getBlog() {
      try {
        const blog1 = await blogsService.getSingleBlog(id)
        setBlog(blog1)

        if (blog1.likedBy.includes(user.id)) {
          setLiked(true)
        } else {
          setLiked(false)
        }
      } catch {
        setBlog('Nonexistent')
      }
    }

    getBlog()
  }, [id, user.id])

  useEffect(() => {
    if (liked) {
      setButtonClass('liked')
    } else {
      setButtonClass('')
    }
  }, [liked])
  console.log(liked)

  //console.log('id blog ', blogId)
  /*
  const [shownBlog, setShownBlog] = useState(null)
  useEffect(() => {
    async function getBlog(id) {
      console.log('???????? blog undefined')
      const response = await blogsService.getSingleBlog(id)
      console.log(response)
      setShownBlog(response)
    }
    console.log('???????? blog useeffect')
    getBlog(blogId)
  }, [blogId])*/

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likefunction = async (blog) => {
    console.log('blog at first in like function: ', blog)
    try {
      dispatch(likeBlog(blog.id))
      // setBlog(response)

      dispatch(setNotification(`voted for ${blog.title}`))
    } catch {
      dispatch(
        setNotification('Oops, it seems like the author removed the post'),
      )
    }
  }

  const deleteFunction = async (shownBlog) => {
    try {
      if (
        window.confirm(
          `Do you really want to delete the blog ${shownBlog.title} ?`,
        )
      ) {
        await dispatch(deleteBlog(shownBlog.id))
        dispatch(setNotification(`deleted blog ${shownBlog.title}`))
      }
    } catch (exception) {
      dispatch(setNotification('something went wrong.'))
      console.log(exception)
    }
  }

  const [show, setShow] = useState(false)

  console.log(shownBlog)

  const showHide = () => {
    setShow(!show)
  }
  if (blog === 'Nonexistent') {
    return <p>Deleted</p>
  } else if (shownBlog === 'loading') {
    return <p> Loading </p>
  }
  /*
  if (!shownBlog) {
    return <p> Sorry, looks like the post has been deleted</p>
  }*/
  if (show) {
    return (
      <div style={blogStyle}>
        <div className="visibleContent">
          <div className="blog-gallery">
            {shownBlog.images.map((image) => (
              <img src={image} alt="..." style={{ height: '200px' }} />
            ))}
          </div>

          <button onClick={showHide} className="visibleBtn">
            {' '}
            hide{' '}
          </button>

          <p className="title">{shownBlog.title}</p>
          <p className="author">{shownBlog.author}</p>
        </div>
        <div className="togglableContent">
          <p className="url">{shownBlog.url}</p>
          <p className="likes"> likes {shownBlog.likes}</p>{' '}
          <button className="likeBtn" onClick={() => likefunction(shownBlog)}>
            {liked ? 'dislike' : 'like'}
          </button>
          {user.username === shownBlog.user.username ? (
            <button
              className="deleteBtn"
              onClick={() => deleteFunction(shownBlog)}
            >
              {' '}
              delete{' '}
            </button>
          ) : null}
        </div>
        <Comments id={shownBlog.id} />
      </div>
    )
  }
  return (
    <div className="visibleContent" style={blogStyle}>
      <button className="likeBtn" onClick={() => likefunction(shownBlog)}>
        {shownBlog.likedBy.includes(user.id) ? 'dislike' : 'like'}{' '}
        {shownBlog.likes}
      </button>
      <p className="title">
        {shownBlog.title}{' '}
        <button onClick={showHide} className="visibleBtn">
          {' '}
          show{' '}
        </button>
      </p>
      <div className="blog-gallery">
        {shownBlog.images.map((image) => (
          <img src={image} alt="..." style={{ height: '200px' }} />
        ))}
      </div>
      <p className="author">{shownBlog.author}</p>
    </div>
  )
}

export default Blog
