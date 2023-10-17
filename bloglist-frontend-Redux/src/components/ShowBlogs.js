import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeBlogs } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

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
  return (
    <>
      <div className="container">
        {user ? <p> blogs by user {user.username}</p> : null}
        {stateBlogs.map((blog) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}> go to this blog </Link>
            <div> {blog.description} </div>
            <img style={{ height: '200px' }} src={blog.images[0]} alt=".." />
            <Button type="button">
              {' '}
              {blog.likedBy.includes(stateUser.id) ? 'Dislike' : 'Like'}
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}

export default ShowBlogs
