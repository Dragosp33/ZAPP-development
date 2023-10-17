import React, { useState, useEffect } from 'react'
import { Button, Modal, Nav } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'

function TwoPageModal() {
  const [showFirstModal, setShowFirstModal] = useState(false)
  const [showSecondModal, setShowSecondModal] = useState(false)
  const [transition, setTransition] = useState(false)

  const openSecondModal = () => {
    const modalDialog = document.querySelector('.modal')
    //modalDialog.classList.add('transitionModal-enter')
    // console.log(moda)
    // setShowFirstModal(false)
    setShowSecondModal(true)
    //setTimeout(() => setShowFirstModal(false), 100) // Delay showing the second modal
    //  modalDialog.classList.remove('transitionModal-enter')
    // modalDialog.classList.add('transitionModal-exit')
  }

  const closeSecondModal = () => {
    setShowFirstModal(true)
    setShowSecondModal(false)
    // setTransition(false)
  }

  const handleShow = () => {
    setShowFirstModal(true)
  }

  useEffect(() => {
    const handleBackButton = (e) => {
      if (showSecondModal && e.key === 'Backspace') {
        closeSecondModal()
      } else if (showFirstModal && e.key === 'Backspace') {
        setShowFirstModal(false)
      }
    }

    window.addEventListener('keydown', handleBackButton)

    return () => {
      window.removeEventListener('keydown', handleBackButton)
    }
  }, [showFirstModal, showSecondModal])

  //const closeFirstButton

  return (
    <>
      <Button className="me-2 mb-2" onClick={() => handleShow()}>
        Fullscreen
      </Button>

      <Modal
        show={showFirstModal}
        // className="transitionModal"
        onHide={() => setShowFirstModal(false)}
        className={
          showSecondModal ? 'transitionModal-exit' : 'transitionModal-enter'
        }
        fullscreen={'lg-down'}
        centered
      >
        <div className="modal-content">
          <Modal.Header closeButton>
            <Modal.Title>First Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Content of the first modal */}
            <Button onClick={openSecondModal}>Open Second Modal</Button>
          </Modal.Body>
        </div>
      </Modal>

      <Modal
        show={showSecondModal}
        onHide={closeSecondModal}
        centered
        //animation={false}
        // className={showSecondModal ? 'modal-enter' : 'modal-exit'}
        className={
          showSecondModal ? 'transitionModal-enter' : 'transitionModal-exit'
        }
        //className="transitionModal"

        backdrop={false}
        fullscreen={'lg-down'}
        //   aria-labelledby="example-custom-modal-styling-title"
      >
        <div className="modal-content">
          <Modal.Header closeButton>
            <Modal.Title>Second modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {' '}
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
              unde commodi aspernatur enim, consectetur. Cumque deleniti
              temporibus ipsam atque a dolores quisquam quisquam adipisci
              possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
              quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
              Mollitia reiciendis porro quo magni incidunt dolore amet atque
              facilis ipsum deleniti rem!
            </p>
          </Modal.Body>
        </div>
      </Modal>
    </>
  )
}

const TestTwo = () => {
  const [showFirstModal, setShowFirstModal] = useState(false)
  const handleShow = () => {
    setShowFirstModal(true)
  }

  const handleFirstRotation = () => {
    const rotatingDiv = document.querySelector('.modaldiv1')
    const rotatingDiv2 = document.querySelector('.modaldiv2')
    const modalDialog = document.querySelector('.modal-dialog')
    if (!rotatingDiv) return
    //rotatingDiv.classList.add('faded-content')
    rotatingDiv.style.transform = 'translateX(-100%) translateZ(1px)'
    rotatingDiv.style.opacity = '0'
    modalDialog.classList.add('modal-lg')
    rotatingDiv2.style.transform = 'translateX(0%) translateZ(1px)'
    rotatingDiv2.style.opacity = '1'
  }

  const handleSecondRotation = () => {
    const rotatingDiv = document.querySelector('.modaldiv2')
    const rotatingDiv2 = document.querySelector('.modaldiv1')
    const modalDialog = document.querySelector('.modal-dialog')
    if (!rotatingDiv) return
    //rotatingDiv.classList.add('faded-content')
    rotatingDiv.style.transform = 'translateX(100%) translateZ(1px)'
    rotatingDiv.style.opacity = '0'
    modalDialog.classList.remove('modal-lg')
    rotatingDiv2.style.transform = 'translateX(0%) translateZ(1px)'
    rotatingDiv2.style.opacity = '1'
  }

  return (
    <>
      <Button className="me-2 mb-2" onClick={() => handleShow()}>
        Fullscreen
      </Button>
      <Modal
        show={showFirstModal}
        // className="transitionModal"
        onHide={() => setShowFirstModal(false)}
        fullscreen={'lg-down'}
        centered
        size="lg"
      >
        <div className="rotate-content">
          <div className="modaldiv1">
            <Modal.Header closeButton>
              <Modal.Title>First Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Content of the first modal */}
              salut frate
              <Button onClick={handleFirstRotation}> Go to second </Button>
            </Modal.Body>
          </div>
        </div>
        <div className="rotate-content">
          <div
            className="modaldiv2"
            style={{ transform: 'translateX(100%) translateZ(1px)' }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <Button onClick={handleSecondRotation}>
                  {' '}
                  Back to first modal{' '}
                </Button>
                Second Modal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body> ciao bella</Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  )
}

const TestAside = () => {
  return (
    <>
      <aside className="bd-sidebar">
        <div
          className="offcanvas-lg offcanvas-start"
          tabIndex="-1"
          id="bdSidebar"
          aria-labelledby="bdSidebarOffcanvasLabel"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title" id="bdSidebarOffcanvasLabel">
              What are you looking for?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              data-bs-target="#bdSidebar"
            ></button>
          </div>

          <div className="offcanvas-body">
            {' '}
            <Nav
              className="justify-content-center flex-grow-1 pe-3"
              variant="underline"
              defaultActiveKey="/"
            >
              <Nav.Item>
                <Nav.Link eventKey="/" as={Link} to="/">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/users" as={Link} to="/users">
                  users
                </Nav.Link>
              </Nav.Item>
            </Nav>{' '}
          </div>
        </div>
      </aside>
    </>
  )
}

export default TestAside
