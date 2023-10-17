import React, { useState, useEffect, useRef } from 'react'
import './modal.css'
import { Button, Form } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

function ModalTest() {
  // const [bottompos, setBottomPos] = useState(0)
  const [show, setShow] = useState(false)
  const [modalHeight, setModalHeight] = useState('100%')
  const layoutViewportRef = useRef(null)
  //const bottomBarRef = useRef(null)

  // Function to update the bottom bar position
  function updateBottomBarPosition() {
    const visualViewport = window.visualViewport
    const layoutViewport = layoutViewportRef.current

    if (!layoutViewport) return

    const modalDialog = document.querySelector('.modal')
    if (!modalDialog) return
    console.log(modalDialog)

    const offsetLeft = visualViewport.offsetLeft
    const offsetTop =
      visualViewport.height -
      layoutViewport.getBoundingClientRect().height +
      visualViewport.offsetTop

    setModalHeight(`${visualViewport.height}px`)
    modalDialog.style.height = `${visualViewport.height}px`
    modalDialog.classList.add('modal-height-transition')

    /*
    console.log('visualViewport.height: ', visualViewport.height)
    console.log(
      'layoutViewport: ',
      layoutViewport.getBoundingClientRect().height,
    )*/
  }

  useEffect(() => {
    const visualViewport = window.visualViewport
    //const bottomBar = bottomBarRef.current

    // Attach the update function to both scroll and resize events
    // if (/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
    visualViewport.addEventListener('scroll', updateBottomBarPosition)

    // Attach the update function to the resize event of the window
    window.visualViewport.addEventListener('resize', updateBottomBarPosition)

    // Initial positioning
    updateBottomBarPosition()

    // bottomBar.classList.add('smooth-transition')

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
    //}
  }, [])

  const style = {
    backgroundColor: 'blue',
    height: '100%',
    width: '100%',
    position: 'fixed',
    visibility: 'hidden',
    // transform: `translate(0px, ${bottompos}px) scale(1)`,
  }

  const style2 = {
    position: 'fixed',
    height: '40px',
    bottom: '0',
    left: '0',
    right: '0',
    transformOrigin: 'left bottom',
    backgroundColor: 'red',
  }

  console.log(modalHeight)

  return (
    <div>
      <>
        <Button variant="primary" onClick={() => setShow(true)}>
          Open Modal with viewport height
        </Button>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          centered
          fullscreen="lg-down"
          className="modal-height-transition" // Add the smooth transition class here
          style={{ height: `${modalHeight}` }}
          //style={{ height: `${modalHeight}` }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Modal content */}
            <input type="textarea" />
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            {/* Modal footer content */}
            <Button> salut </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div id="layoutViewport" style={style} ref={layoutViewportRef}></div>
    </div>
  )
}

export default ModalTest
