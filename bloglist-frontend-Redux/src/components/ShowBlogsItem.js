import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import Carousel from 'react-bootstrap/Carousel'
import { useInView } from 'react-intersection-observer'

import './ShowBlogsItem.css'

const ShowBlogsItem = ({ blog }) => {
  const [activeSlide, setActiveSlide] = useState(0)

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
    <div className="mt-5">
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
            <Link to={`/users/${blog.user.id}`}>
              <p className="blog-card-header-content-p">
                {' '}
                {blog.user.username}
              </p>
            </Link>
          </div>
        </Card.Header>
        <Card.Body>
          <div>
            <div> {blog.description} </div>

            {blog.images.length > 0 ? (
              blog.images.length > 1 ? (
                <div
                  id={`blogsItemCarousel-${blog.id}`}
                  className="carousel slide"
                  // data-bs-ride="carousel"
                  pause="hover"
                >
                  <div className="carousel-indicators">
                    {blog.images.map((image, index) => (
                      <button
                        type="button"
                        data-bs-target={`#blogsItemCarousel-${blog.id}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? true : false}
                        aria-label={`Slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                  <div className="carousel-inner">
                    {blog.images.map((image, index) => (
                      <div
                        className={`carousel-item ${
                          index === 0 ? 'active' : ''
                        }`}
                        key={`${blog.id}-${index}`}
                        // style={{ height: '100%' }}
                      >
                        <div className="carousel-item-image-container">
                          <img
                            src={image}
                            style={{
                              height: '400px',
                              objectFit: 'cover',
                              width: '100%',
                            }}
                            alt="..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#blogsItemCarousel-${blog.id}`}
                    data-bs-slide="prev"
                    //  onClick={handleArrowClickPrev}
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#blogsItemCarousel-${blog.id}`}
                    data-bs-slide="next"
                    //onClick={handleArrowClickNext}
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              ) : (
                <div className="blog-item-onepic-container">
                  <img
                    style={{
                      //height: '400px',
                      objectFit: 'contain',
                    }}
                    src={blog.images[0]}
                    alt=".."
                  />
                </div>
              )
            ) : null}
          </div>
        </Card.Body>
        <Card.Footer>
          {!blog.likedBy.includes(stateUser.id) ? (
            <Button
              type="button"
              style={{ background: 'transparent', border: 'none' }}
              onClick={() => likefunction(blog)}
            >
              <i class="bi bi-heart"></i>
            </Button>
          ) : (
            <Button
              type="button"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'red',
              }}
              onClick={() => likefunction(blog)}
            >
              <i class="bi bi-heart-fill"></i>
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  )
}

//export default ShowBlogsItem

function CustomCarousel({ blog }) {
  const numVisibleIndicators = 4
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSelect = (selectedIndex) => {
    if (selectedIndex >= 0 && selectedIndex < blog.images.length) {
      setActiveIndex(selectedIndex)
    }
  }

  const canGoPrev = activeIndex > 0
  const canGoNext = activeIndex < blog.images.length - 1

  let firstVisible = activeIndex - Math.floor(numVisibleIndicators / 2)
  let lastVisible = activeIndex + Math.ceil(numVisibleIndicators / 2)

  // Ensure that the first and last visible indicators are within bounds
  const numImages = blog.images.length
  let firstVisibleIndicator = Math.max(
    0,
    activeIndex - Math.floor(numVisibleIndicators / 2),
  )
  let lastVisibleIndicator = Math.min(
    numImages - 1,
    firstVisibleIndicator + numVisibleIndicators - 1,
  )

  // Ensure the range stays fixed for small galleries
  //let firstVisibleIndicator, lastVisibleIndicator
  if (activeIndex <= numVisibleIndicators - 2) {
    // First few indicators, include 1 to numVisibleIndicators
    firstVisibleIndicator = 0
    lastVisibleIndicator = numVisibleIndicators - 1
  } else if (activeIndex >= numImages - numVisibleIndicators - 1) {
    console.log('changed here')
    // Last few indicators, include (numImages - numVisibleIndicators + 1) to numImages
    firstVisibleIndicator = numImages - numVisibleIndicators
    lastVisibleIndicator = numImages
  } else {
    // Middle indicators
    firstVisibleIndicator =
      activeIndex - Math.floor(numVisibleIndicators / 2) + 1
    lastVisibleIndicator = activeIndex + Math.ceil(numVisibleIndicators / 2)
  }

  console.log(activeIndex, canGoNext, activeIndex < blog.images.length - 1)
  console.log('min si max: ', firstVisibleIndicator, lastVisibleIndicator)
  console.log('imagini: ', blog.images.length)

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
          <Carousel
            activeIndex={activeIndex}
            onSelect={handleSelect}
            indicators={false}
            wrap={false}
            data-bs-ride="true"
            // controls={false}
            id={`customCarousel-${blog.id}`}
          >
            {blog.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img src={image} alt=".." style={{ height: '200px' }} />
              </Carousel.Item>
            ))}
            {
              <div
                className="carousel-indicators"
                style={{ backgroundColor: 'black' }}
              >
                {blog.images
                  .slice(firstVisibleIndicator, lastVisibleIndicator + 1)
                  .map((img, index) => (
                    <button
                      type="button"
                      data-bs-target={`#blogsItemCarousel-${blog.id}`}
                      data-bs-slide-to={firstVisibleIndicator + index}
                      className={
                        firstVisibleIndicator + index === activeIndex
                          ? 'active'
                          : ''
                      }
                      aria-current={
                        firstVisibleIndicator + index === activeIndex
                          ? true
                          : false
                      }
                      aria-label={`Slide ${firstVisibleIndicator + index + 1}`}
                    ></button>
                  ))}
              </div>
            }
            {/*<a
              className="carousel-control-prev"
              href="#"
              role="button"
              onClick={() => canGoPrev && handleSelect(activeIndex - 1)}
              style={!canGoPrev ? { pointerEvents: 'none' } : {}}
            ></a>
            <a
              className="carousel-control-next"
              href="#"
              role="button"
              onClick={() => canGoNext && handleSelect(activeIndex + 1)}
              style={!canGoNext ? { pointerEvents: 'none' } : {}}
            >
              {/* Next arrow 
            </a>*/}
          </Carousel>
        </Card.Body>
      </Card>
    </>
  )
}

//export default CustomCarousel

const RBCustomCarousel = ({ blog }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once
  })

  // Pause the carousel when it's not in the view
  const shouldPauseCarousel = !inView
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
  const [activeIndex, setActiveIndex] = useState(0)
  const handleSelect = (selectedIndex) => {
    if (selectedIndex >= 0 && selectedIndex < blog.images.length) {
      setActiveIndex(selectedIndex)
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
          <div> {blog.description} </div>
        </Card.Header>

        {blog.images.length > 0 ? (
          <Card.Body ref={ref}>
            {blog.images.length > 1 ? (
              <Carousel
                data-bs-ride={true}
                activeIndex={activeIndex}
                onSelect={handleSelect}
                indicators={true}
                wrap={false}
                //pause={shouldPauseCarousel ? 'hover' : null}
                pause={'hover'}
                // controls={false}
                id={`customCarousel-${blog.id}`}
              >
                {blog.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <div
                      className="carousel-item-image-container"
                      key={`${blog.id}-${index}`}
                    >
                      <img
                        src={image}
                        style={{
                          height: '300px',
                          objectFit: 'contain',
                          width: '100%',
                        }}
                        alt="..."
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div className="blog-item-onepic-container">
                <img
                  style={{
                    height: '200px',
                    objectFit: 'contain',
                  }}
                  src={blog.images[0]}
                  alt=".."
                />
              </div>
            )}
          </Card.Body>
        ) : null}

        <Card.Footer>
          <Button type="button" onClick={() => likefunction(blog)}>
            {' '}
            {blog.likedBy.includes(stateUser.id) ? 'Dislike' : 'Like'}
          </Button>
        </Card.Footer>
      </Card>
    </>
  )
}

export default ShowBlogsItem
