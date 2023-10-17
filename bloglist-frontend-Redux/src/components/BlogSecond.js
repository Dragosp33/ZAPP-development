import Comments from './Comments'
import blogsService from '../services/blogs'

import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { useMatch } from 'react-router-dom'
import Blog from './Blog'

const BlogSecond = () => {
  const blogMatch = useMatch('/test/blogs/:id')
  const id = blogMatch ? blogMatch.params.id : null

  const user = useSelector((state) => state.user)
  const [blog, setBlog] = useState(null)

  //const [liked, setLiked] = useState(blog.likedBy.includes(user.id))

  console.log('  RENDER    IN    BLOG.JS: ', blog)
  useEffect(() => {
    async function getBlog() {
      try {
        const blog1 = await blogsService.getSingleBlog(id)
        setBlog(blog1)
        /* if (blog1.likedBy.includes(user.id)) {
          setLiked(true)
        } else {
          setLiked(false)
        }*/
      } catch {
        setBlog('inexistent')
      }
    }

    getBlog()
  }, [])

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!blog) {
    return <p> loading </p>
  }
  if (blog === 'inexistent') {
    return <>sorry this blog has been deleted</>
  }
  return (
    <>
      <Blog shownBlog={blog} />
    </>
  )
}

export default BlogSecond
