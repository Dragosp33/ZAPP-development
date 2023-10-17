import { useState, useEffect, useRef } from 'react'
import { Button, CloseButton, Form } from 'react-bootstrap'
import ImageUploading from 'react-images-uploading'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import refresh from './refresh.png'
import axios from 'axios'

const BlogForm = ({ handleSubmit }) => {
  const [modalHeight, setModalHeight] = useState('100%')
  const layoutViewportRef = useRef(null)
  const [show, setShow] = useState(false)
  const [description, setDescription] = useState('')
  const [placeholder, setPlaceHolder] = useState(
    'What do you want to share with us?',
  )
  const [images, setImages] = useState([])
  const [descriptionFont, setDescriptionFont] = useState('1.5rem')
  const [textareaHeight, setTextareaHeight] = useState('auto')
  const [showSecond, setShowSecond] = useState(false)

  useEffect(() => {
    // Recalculate textarea height based on font size when descriptionFont changes
    const textarea = document.querySelector('.description-input')
    if (!textarea) return
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10)
    const minVisibleLines = 2
    const content = textarea.value
    const lines = content.split('\n')
    const numberOfLines = lines.length
    const fixedHeight = Math.max(
      lineHeight * minVisibleLines,
      lineHeight * numberOfLines,
    )
    setTextareaHeight(fixedHeight + 'px')
  }, [descriptionFont])

  const onImagesChange = (imageList) => {
    if (imageList.length === 0) {
      setPlaceHolder('What do you want to share with us?')
      setDescriptionFont('1.5rem')
    } else {
      setPlaceHolder('What would best describe these photos?')
      setDescriptionFont('1rem')
    }

    setImages(imageList)
  }

  console.log(images)
  const addBlog = async (event) => {
    event.preventDefault()
    /*handleSubmit({
      description: description,
   //   author: author,
   //   url: url
    })*/
    console.log(description)
    const data = new FormData()
    data.append('description', description)
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i].file, images[i].file.name)
    }

    const k = await axios.post('api/blogs/test', data)
    console.log(k.data)
    setDescription('')
  }

  function handleShow() {
    setShow(true)
  }

  const handleTextAreaChange = (event) => {
    const textarea = event.target
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10)
    const minVisibleLines = 2 // Adjust as needed

    const content = textarea.value
    const lines = content.split('\n')

    // Calculate the number of lines (including empty lines)
    const numberOfLines = lines.length

    // Calculate and set the fixed height based on the number of visible lines
    const fixedHeight = Math.max(
      lineHeight * minVisibleLines,
      lineHeight * numberOfLines,
    )
    //textarea.style.height = fixedHeight + 'px'   //changed this to useState management of the height
    setTextareaHeight(fixedHeight + 'px')
    setDescription(event.target.value)
  }

  const getGridStyles = (imageList) => {
    const numImages = imageList.length
    let gridStyles = {
      gridTemplateAreas: "'A'",
    }

    if (numImages === 2) {
      gridStyles.gridTemplateAreas = "'A B'"
    } else if (numImages === 3) {
      gridStyles.gridTemplateAreas = "'A A' 'B C'"
    } else if (numImages === 4) {
      gridStyles.gridTemplateAreas = "'A B' 'C D'"
    } else if (numImages >= 5) {
      gridStyles.gridTemplateAreas = "'A B' 'C D' 'E E'"
    }

    return gridStyles
  }

  function updateBottomBarPosition() {
    const visualViewport = window.visualViewport
    const layoutViewport = layoutViewportRef.current

    if (!layoutViewport) return

    const modalDialog = document.querySelector('.modal')
    if (!modalDialog) return

    /* const offsetLeft = visualViewport.offsetLeft
    const offsetTop =
      visualViewport.height -
      layoutViewport.getBoundingClientRect().height +
      visualViewport.offsetTop
*/
    setModalHeight(`${visualViewport.height}px`)
    modalDialog.style.height = `${visualViewport.height}px`
    modalDialog.classList.add('modal-height-transition')
  }

  useEffect(() => {
    const visualViewport = window.visualViewport
    if (/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
      visualViewport.addEventListener('scroll', updateBottomBarPosition)

      // Attach the update function to the resize event of the window
      window.visualViewport.addEventListener('resize', updateBottomBarPosition)

      // Initial positioning
      updateBottomBarPosition()

      // Clean up event listeners when the component unmounts
      return () => {
        window.visualViewport.removeEventListener(
          'scroll',
          updateBottomBarPosition,
        )
        window.visualViewport.removeEventListener(
          'resize',
          updateBottomBarPosition,
        )
      }
    }
  }, [])

  const style = {
    height: '100%',
    width: '100%',
    position: 'fixed',
    visibility: 'hidden',
  }

  const uploadButtonRef = useRef()

  const handleImageUpload = () => {
    // Access the onImageUpload function using the ref
    if (uploadButtonRef.current) {
      console.log(uploadButtonRef)
      uploadButtonRef.current.click()
    }
  }

  function handleShowSecond() {
    const modalDialog = document.querySelector('.modal')
    if (!modalDialog) return
    setShowSecond(true)
    //modalDialog.classList.add('second-transition')
    modalDialog.classList.add('second-transition')
    /*setTimeout(() => {
      // modalDialog.classList.remove('second-transition-exit')
      modalDialog.classList.add('second-transition')
    }, 150)*/
  }

  function handleCloseSecond() {
    const modalDialog = document.querySelector('.second-transition')
    if (!modalDialog) return
    console.log(modalDialog)

    modalDialog.classList.remove('second-transition')
    // modalDialog.classList.add('second-transition-exit')
    setTimeout(() => {
      setShowSecond(false)
    }, 50)
    // setShowSecond(false)
  }

  function handleDeleteFromGallery(index) {
    /* if (images.length === 1) {
      setPlaceHolder('What do you want to share with us?')
      handleCloseSecond()
    }
    setImages(images.filter((image, pos) => pos !== index))*/

    if (images.length === 1) {
      handleCloseSecond()
    }
    onImagesChange(images.filter((image, pos) => pos !== index))
  }

  const [updateGalleryIndex, setUpdateGalleryIndex] = useState(0)

  const updateInputGallery = useRef()

  const handleUpdateImage = (index) => {
    // Set the updateIndex in the component's state to the index you want to update
    setUpdateGalleryIndex(index)
    // Trigger the file input element
    console.log(updateInputGallery)
    updateInputGallery.current.click()
  }

  const handleUpdateFromGallery = (e) => {
    const file = e.target.files[0] // Get the selected file
    if (file) {
      // Process the selected file as needed
      // For example, you can upload it to a server or update the state with the new image data.
      const newImage = {
        data_url: URL.createObjectURL(file), // Create a data URL for displaying the image
      }

      const updateIndex = updateGalleryIndex

      const updatedImages = [...images]
      updatedImages[updateIndex] = newImage

      setImages(updatedImages)
    }
  }

  return (
    <>
      <Button className="me-2 mb-2" onClick={() => handleShow()}>
        What zapped your head?
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        fullscreen="sm-down"
        className="modal modal-height-transition" // Add the smooth transition class here
        style={{ height: `${modalHeight}` }}
      >
        <Modal.Header closeButton className="create-post-header">
          <Modal.Title className="create-post-title">
            {' '}
            Create a post{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="blog-form ">
            <Form onSubmit={addBlog}>
              <Row className="mb-1 body-container">
                <Row>
                  <Form.Group
                    as={Col}
                    className="mb-3"
                    controlId="blog-description"
                  >
                    <Form.Control
                      className="description-input"
                      // style={descriptionFont}
                      style={{
                        height: textareaHeight,
                        fontSize: descriptionFont,
                      }}
                      value={description}
                      as="textarea"
                      // Adjust the number of rows as needed
                      placeholder={placeholder}
                      onChange={(event) => handleTextAreaChange(event)}
                      //onKeyDown={(event) => delayedResize(event)}
                      autoFocus
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Col>
                    <ImageUploading
                      multiple
                      value={images}
                      onChange={onImagesChange}
                      //   maxNumber={maxNumber}
                      dataURLKey="data_url"
                      acceptType={['jpg']}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <div
                          className={`upload__image-wrapper ${
                            images.length === 0 ? 'none' : ''
                          }`}
                        >
                          <div className="img-gallery-btn-wrapper">
                            <button
                              type="button"
                              style={isDragging ? { color: 'red' } : null}
                              onClick={onImageUpload}
                              {...dragProps}
                              ref={uploadButtonRef}
                            >
                              Click or Drop here
                            </button>
                            &nbsp;
                            <button type="button" onClick={onImageRemoveAll}>
                              Remove all images
                            </button>
                          </div>
                          <div
                            // className="image-gallery"
                            className={`image-gallery ${
                              imageList.length > 0 ? 'img-gallery-border' : ''
                            }`}
                            style={getGridStyles(imageList)}
                          >
                            <div className="img-gallery-actions-wrapper">
                              <div className="action-btn-wrapper">
                                <Button
                                  className="me-2 mb-2 edit-action-btn"
                                  onClick={() => handleShowSecond()}
                                >
                                  <i class="bi bi-brush-fill"></i>
                                  Edit
                                </Button>
                              </div>
                              <div className="action-btn-wrapper remove-action-btn-wrapper">
                                <button
                                  className="btn remove-action-btn"
                                  type="button"
                                  onClick={onImageRemoveAll}
                                >
                                  <i class="bi bi-x"></i>
                                </button>
                              </div>
                            </div>

                            {images.slice(0, 5).map((image, index) => (
                              <div
                                key={index}
                                style={{
                                  gridArea: String.fromCharCode(index + 65),
                                  backgroundImage: `url(${image.data_url})`,
                                }}
                                className={`image-item ${
                                  imageList.length > 5 && index === 4
                                    ? 'more-photos'
                                    : ''
                                }`}
                              >
                                {/*}
                                <div className="image-item__btn-wrapper">
                                  <button
                                    type="button"
                                    className="updateBtn"
                                    onClick={() => onImageUpdate(index)}
                                  >
                                    <img src={refresh} alt="U" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onImageRemove(index)}
                                  >
                                    <i className="bi bi-x-circle"></i>
                                  </button>
                              </div> */}
                              </div>
                            ))}
                            {imageList.length > 5 && (
                              <div className="more-photos">
                                +{imageList.length - 5} more photos
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </Col>
                </Row>
              </Row>

              {/*}
                <Row className="footer-container">
                  <Col>hello</Col>
                  <Col>
                    <Button type="submit">Add blog</Button>
                  </Col>
                              </Row>*/}
            </Form>

            <Modal
              show={showSecond}
              size="lg"
              centered
              fullscreen={'sm-down'}
              onHide={handleCloseSecond}
              className="modal-second gallery-modal"
              backdrop={false}
            >
              <Modal.Header>
                <div className="close-btn-wrapper">
                  <div
                    className="btn btn-close"
                    type="button"
                    onClick={handleCloseSecond}
                  ></div>
                </div>
                <div className="gallery-title">
                  <Modal.Title> Gallery </Modal.Title>
                </div>
              </Modal.Header>
              <Modal.Body>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  style={{ display: 'none' }}
                  ref={updateInputGallery}
                  onChange={(event) => handleUpdateFromGallery(event)}
                />
                <div
                  className={`row ${
                    images.length < 2
                      ? 'row-cols-1'
                      : 'row-cols-1 row-cols-lg-2'
                  } g-4 gallery`}
                >
                  {' '}
                  {images.map((image, index) => (
                    <div className="col" key={index}>
                      <div className="card fixed-height">
                        <div className="card-img-container">
                          <div
                            className="background-image"
                            style={{
                              backgroundImage: `url(${image.data_url})`,
                            }}
                          ></div>
                          <img
                            src={image.data_url}
                            className="card-img-top"
                            alt="..."
                          />
                        </div>

                        <div className="card-img-overlay">
                          <div className="second-modal-img-actions-wrapper">
                            <Button
                              type="button"
                              onClick={() => handleUpdateImage(index)}
                            >
                              <i class="bi bi-arrow-repeat"></i>
                            </Button>

                            <Button
                              type="button"
                              onClick={() => handleDeleteFromGallery(index)}
                            >
                              <i class="bi bi-trash3"></i>
                            </Button>
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">
                            {' '}
                            Description to be added!{' '}
                          </h5>
                          <p className="card-text">Stay tuned!</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="img-upload-footer">
            <Button
              type="button"
              className="upload_photo-post-btn"
              onClick={handleImageUpload}
            >
              <i class="bi bi-images"></i>
            </Button>
            <Button type="submit" className="submit-post-btn" onClick={addBlog}>
              <svg
                className="beat"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path
                  d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.444.6z"
                  fill="#e7e023"
                />
              </svg>
              Post
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <div id="layoutViewport" style={style} ref={layoutViewportRef}></div>
    </>
  )
}
export default BlogForm
