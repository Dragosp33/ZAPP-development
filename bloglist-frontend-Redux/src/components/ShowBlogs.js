import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeBlogs } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import ShowBlogsItem from './ShowBlogsItem'

const ShowBlogs = ({ user = null }) => {
  const [loading, setLoading] = useState(true)
  let stateUser = useSelector((state) => state.user)
  // console.log('FIRST STATE USER: ', stateUser)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    //setTimeout(() => setLoading(false))
    setLoading(false)
  }, [dispatch])

  let stateBlogs = useSelector((state) => state.blogs)
  if (user !== null) {
    stateBlogs = stateBlogs.filter((n) => n.user.id === user.id)
  }
  if (loading) {
    return <div>loading data..</div>
  }
  /*
  const likedBlogs = stateBlogs.filter((blog) =>
    blog.likedBy.includes(stateUser.id),
  )*/
  /*
  console.log('logged user: ', stateUser)
 // console.log('likedBlogs: ', likedBlogs)
  console.log('user to show blogs from: ', user)
  console.log(`blogs: `, stateBlogs)
*/

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
  return (
    <>
      <div className="container" style={{ maxWidth: '540px' }}>
        {user ? <p> blogs by user {user.username}</p> : null}
        {stateBlogs.map((blog) => (
          <div key={blog.id} style={{ width: '100%' }}>
            <ShowBlogsItem blog={blog} />
          </div>
        ))}
      </div>
    </>
  )
}

export default ShowBlogs
