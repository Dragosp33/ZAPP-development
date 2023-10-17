import React, { useState, useEffect, useRef } from 'react'
import './modal.css'
import { Modal, Button } from 'react-bootstrap'

function CustomModal() {
  const [bottompos, setBottomPos] = useState(0)

  const layoutViewportRef = useRef(null)
  const bottomBarRef = useRef(null)

  // Function to update the bottom bar position
  function updateBottomBarPosition() {
    const visualViewport = window.visualViewport
    const layoutViewport = layoutViewportRef.current

    if (!layoutViewport) return

    const offsetLeft = visualViewport.offsetLeft
    const offsetTop =
      visualViewport.height -
      layoutViewport.getBoundingClientRect().height +
      visualViewport.offsetTop

    setBottomPos(offsetTop)
    console.log('visualViewport.height: ', visualViewport.height)
    console.log(
      'layoutViewport: ',
      layoutViewport.getBoundingClientRect().height,
    )
  }

  useEffect(() => {
    const visualViewport = window.visualViewport
    const bottomBar = bottomBarRef.current

    // Attach the update function to both scroll and resize events
    if (/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
      visualViewport.addEventListener('scroll', updateBottomBarPosition)

      // Attach the update function to the resize event of the window
      window.visualViewport.addEventListener('resize', updateBottomBarPosition)

      // Initial positioning
      updateBottomBarPosition()

      bottomBar.classList.add('smooth-transition')

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

  console.log(bottompos)

  return (
    <div>
      <div
        id="bottombar"
        // style={style2}
        ref={bottomBarRef}
        style={{ transform: `translate(0px, ${bottompos}px) scale(1)` }}
      >
        <div> some bottom content here </div>
      </div>

      <div>
        {' '}
        <input type="textarea"></input>
        <input id="password" type="password" />
      </div>
      <div id="layoutViewport" style={style} ref={layoutViewportRef}></div>
    </div>
  )
}

const Salut = () => {
  const [show, setShow] = useState(false)
  const [description, setDescription] = useState('')
  const handleTextAreaChange = (event) => {
    const textarea = event.target
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10)
    const minVisibleLines = 4 // Adjust as needed

    const content = textarea.value
    const lines = content.split('\n')

    // Calculate the number of lines (including empty lines)
    const numberOfLines = lines.length

    // Calculate and set the fixed height based on the number of visible lines
    const fixedHeight = Math.max(
      lineHeight * minVisibleLines,
      lineHeight * numberOfLines,
    )
    textarea.style.height = fixedHeight + 'px'
    setDescription(event.target.value)
  }

  const style = {
    backgroundColor: 'blue',
    height: '100%',
    width: '100%',
    position: 'fixed',
    visibility: 'hidden',
    // transform: `translate(0px, ${bottompos}px) scale(1)`,
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Open Modal for textarea test
      </Button>
      <div className="textarea-container">
        <textarea
          onChange={(event) => handleTextAreaChange(event)}
          value={description}
        ></textarea>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        fullscreen="lg-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="textarea-container">
            <textarea onChange={(event) => handleTextAreaChange(event)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button">Submit</Button>
        </Modal.Footer>
        <div id="layoutViewport" style={style}></div>
      </Modal>
    </>
  )
}

const TestMenu = () => {
  return (
    <>
      <header className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <nav
          className="container-xxl bd-gutter flex-wrap flex-lg-nowrap"
          aria-label="Main navigation"
        >
          <div className="bd-navbar-toggle">
            <button
              className="navbar-toggler p-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#bdSidebar"
              aria-controls="bdSidebar"
              aria-label="Toggle docs navigation"
            >
              salut sugi pl
            </button>
            <a
              class="navbar-brand p-0 me-0 me-lg-2"
              href="/"
              aria-label="Bootstrap"
            >
              {' '}
              Muie diicot{' '}
            </a>
          </div>
        </nav>
      </header>
    </>
  )
}

export default TestMenu
