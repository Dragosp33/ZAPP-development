import { Button, Row, Col, Modal } from 'react-bootstrap'
import { useState } from 'react'

const Gallery = () => {
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(true)
  }

  return (
    <>
      <Button onClick={handleShow}>show gallery</Button>

      <Modal
        show={show}
        size="lg"
        centered
        fullscreen={'sm-down'}
        onHide={() => {
          setShow(false)
        }}
        className="gallery-modal"
      >
        <Modal.Header>
          <div className="close-btn-wrapper">
            <div
              className="btn btn-close"
              type="button"
              onClick={() => {
                setShow(false)
              }}
            ></div>
          </div>
          <div className="gallery-title">
            <Modal.Title> test gallery </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="row row-cols-1 row-cols-lg-2 g-4 gallery">
            <div className="col ">
              <div className="card fixed-height">
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title"> Description to be added! </h5>
                  <p className="card-text">Stay tuned!</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card fixed-height">
                <div className="card-img-container">
                  <div
                    className="background-image"
                    style={{
                      backgroundImage: 'url(https://i.imgur.com/pLVwiAM.png)',
                    }}
                  ></div>
                  <img
                    src="https://i.imgur.com/pLVwiAM.png"
                    className="card-img-top"
                    alt="..."
                  />
                </div>

                <div className="card-img-overlay">
                  <Button>close </Button>
                </div>
                <div className="card-body">
                  <h5 className="card-title"> Description to be added! </h5>
                  <p className="card-text">Stay tuned!</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card fixed-height">
                <div className="card-img-container">
                  <div
                    className="background-image"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1894&q=80)',
                    }}
                  ></div>
                  <img
                    src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1894&q=80"
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className="card-img-overlay">
                  <Button>close </Button>
                </div>
                <div className="card-body">
                  <h5 className="card-title"> Description to be added! </h5>
                  <p className="card-text">Stay tuned!</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card fixed-height">
                <div className="card-img-container">
                  <div
                    className="background-image"
                    style={{
                      backgroundImage:
                        'url(https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60)',
                    }}
                  ></div>
                  <img
                    src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                    className="card-img-top"
                    alt="..."
                  />
                </div>

                <div className="card-img-overlay">
                  <Button>close </Button>
                </div>
                <div className="card-body">
                  <h5 className="card-title"> Description to be added! </h5>
                  <p className="card-text">Stay tuned!</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Gallery
