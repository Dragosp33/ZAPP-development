import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

import './ShowBlogsItem.css'

const ShowBlogsItem = ({ blog }) => {
  let stateUser = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const likefunction = async (blog) => {
    console.log('blog at first in like function: ', blog)
    try {
      dispatch(likeBlog(blog.id))
      // setBlog(response)

      //dispatch(setNotification(`voted for ${blog.title}`))
    } catch {
      dispatch(
        setNotification('Oops, it seems like the author removed the post'),
      )
    }
  }
  return (
    <>
      <Link to={`/blogs/${blog.id}`}> go to this blog </Link>
      <Card>
        <Card.Header>
          <div className="blog-card-header-content">
            <a href={`/users/${blog.user.id}`}>
              <img
                style={{ width: '50px', borderRadius: '50%' }}
                src={blog.user.profilePicUrl}
                alt="..."
              />
            </a>
            <a href={`/users/${blog.user.id}`}>
              <p className="blog-card-header-content-p">
                {' '}
                {blog.user.username}
              </p>
            </a>
          </div>
        </Card.Header>
        <Card.Body>
          <div>
            <div> {blog.description} </div>

            {blog.images.length > 0 ? (
              blog.images.length > 1 ? (
                <div
                  id="carouselExampleAutoplaying"
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner">
                    {blog.images.map((image, index) => (
                      <div
                        class={`carousel-item ${index === 0 ? 'active' : ''}`}
                      >
                        <div className="carousel-item-image-container">
                          <img
                            src={image}
                            style={{ height: '200px', objectFit: 'contain' }}
                            alt="..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              ) : (
                <div className="blog-item-onepic-container">
                  <img
                    style={{ height: '200px', objectFit: 'contain' }}
                    src={blog.images[0]}
                    alt=".."
                  />
                </div>
              )
            ) : null}
          </div>
          <Button type="button" onClick={() => likefunction(blog)}>
            {' '}
            {blog.likedBy.includes(stateUser.id) ? 'Dislike' : 'Like'}
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default ShowBlogsItem
