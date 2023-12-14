import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Routes, Route, useMatch } from 'react-router-dom'
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap'
import { useState, useRef, useEffect } from 'react'
import zappSVG from './ZAPP.svg'
// import SignUp from './SignUp'
import './signup.css'
import LoginParticles from './LoginFormParticles'
import ThreeDBolt from './Login3DBolt'
import LoginPreview from './LoginPreview'

const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  const navigate = useNavigate()

  const loginPageRef = useRef(null)
  const [gradientPosition, setGradientPosition] = useState({ x: 0, y: 0 })
  const [show, setShow] = useState(false)

  useEffect(() => {
    const container = loginPageRef.current

    const updateGradientPosition = (e) => {
      const x = e.clientX - container.getBoundingClientRect().left
      const y = e.clientY - container.getBoundingClientRect().top
      setGradientPosition({ x, y })
    }

    const updateGradientPositionTouch = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0]
        const x = touch.clientX - container.getBoundingClientRect().left
        const y = touch.clientY - container.getBoundingClientRect().top
        setGradientPosition({ x, y })
      }
    }

    container.addEventListener('mousemove', updateGradientPosition)
    container.addEventListener('touchstart', updateGradientPositionTouch)
    container.addEventListener('touchmove', updateGradientPositionTouch)

    return () => {
      container.removeEventListener('mousemove', updateGradientPosition)
      container.removeEventListener('touchstart', updateGradientPositionTouch)
      container.removeEventListener('touchmove', updateGradientPositionTouch)
    }
  }, [])

  const pseudoElementStyle = {
    transform: `translate(${gradientPosition.x}px, ${gradientPosition.y}px)`,
  }

  return (
    <>
      <div
        className="container-fluid login-page"
        style={{
          background: `radial-gradient(at ${gradientPosition.x}px ${gradientPosition.y}px, black, transparent)`,
        }}
        ref={loginPageRef}
      >
        <div className="particles-background"></div>
        <LoginParticles />
        {/*<div className="gradient-follow" style={pseudoElementStyle}></div>*/}
        <div className="container-xl login-page-content">
          <div className="row">
            <div className="login-header">
              {/* <img
                src={zappSVG}
                alt=".."
                style={{ height: '200px', width: '200px' }}
              />
*/}
              <ThreeDBolt />
            </div>
          </div>
          <div className="row row-cols-1 row-cols-lg-2 g-4 p-lg-0 p-sm-5 mb-5 m-sm-2 align-items-center">
            <div className="col">
              {/*} <div
                className="info-container"
                style={{
                  position: 'absolute',
                  zIndex: '1000',
                  color: 'yellow',
                }}
              >
                <h3> Connect and share with other people </h3>
                <h5> Discover the features in this 3D live preview!</h5>
                <h3> Connect and share with other people </h3>
                <h5> Discover the features in this 3D live preview!</h5>
              </div> */}
              {/* maybe check for implementing spline with three.js / react-fibber 
              <Spline
                scene="https://prod.spline.design/cDJOCmnyj-Lxe9dX/scene.splinecode"
                className="spline"
              />? */}
              <div className="card-container">
                <Card
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: `blur(8px)`,
                    color: 'white',
                  }}
                >
                  <Card.Header> ZAPP</Card.Header>
                  <Card.Body>
                    {' '}
                    <h6>What's new? See yourself!</h6>
                    <div>
                      <Button
                        variant="primary"
                        onClick={() => setShow(true)}
                        style={{
                          backgroundColor: 'rgba(25, 25, 112, 0.2)',
                          backdropFilter: 'blur(2px)',
                          border: 'none',
                          color: 'black',
                        }}
                      >
                        Explore our new 3d interactive preview
                      </Button>
                      <small>
                        {' '}
                        **recommended for pc, this is still under optimization
                      </small>
                    </div>
                    <div className="flex flex-column">
                      <div>
                        <h5> For testing purposes, use this account:</h5>
                        <ul>
                          <li> username: user</li>
                          <li> password: pass</li>
                        </ul>
                      </div>
                      <div>
                        <h5> Or sign up for a new account</h5>
                        <p> You will shortly receive a verification email</p>
                      </div>
                    </div>
                    <Modal
                      show={show}
                      onHide={() => setShow(false)}
                      centered
                      fullscreen={true}
                      className="preview-modal"
                      //className="modal-height-transition" // Add the smooth transition class here
                      // style={{ height: `${modalHeight}` }}
                      //style={{ height: `${modalHeight}` }}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>3D Live Preview</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <LoginPreview />
                      </Modal.Body>
                    </Modal>
                  </Card.Body>
                </Card>
              </div>

              {/*}
              <div
                className="test-backdrop"
                style={{
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {' '}
                <div
                  className="sall"
                  style={{
                    backgroundColor: 'rgb(255 255 255 / 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <p> blur effect test </p>
                </div>
                </div>*/}
            </div>
            <div className="col">
              <div className="login-form-container">
                <Card
                  style={{
                    backgroundColor: 'rgb(255 255 255 / 0.15)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Card.Body>
                    <form className="login-form" onSubmit={handleLogin}>
                      <Form.Group as={Col} controlId="username">
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="username or email"
                          value={username}
                          onChange={handleUsernameChange}
                          autoComplete="username"
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        className="my-2"
                        controlId="password"
                      >
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </Form.Group>

                      <div className="loginBtn-container">
                        <Button id="loginBtn" type="submit">
                          {' '}
                          Log in{' '}
                        </Button>
                      </div>
                    </form>
                    <div className="signup-div">
                      <div className="text-between-lines">
                        <div className="line"></div>
                        <div className="text"> First time here? </div>
                        <div className="line"></div>
                      </div>
                      <div className="signupBtn-container">
                        <Button
                          id="signupBtn"
                          type="button"
                          onClick={() => navigate('/signup')}
                        >
                          Sign up
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
              <div> </div>
            </div>
          </div>
        </div>
      </div>
      {/*}
      <div className="container-fluid login-page">
        <div className="login-page-content">
          <Row>
            <div className="login-header">
              <img src={zappSVG} alt=".." style={{ height: '200px' }} />
            </div>
          </Row>
          <Row>
            <Col md="6">
              <div className="login-form">
                <form onSubmit={handleLogin}>
                  <div>
                    username:{' '}
                    <input
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div>
                    password:{' '}
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div>
                    <button id="loginBtn" type="submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div> </div>
              <h3>
                {' '}
                First time here? <Link to={'/signup'}>Sign up</Link>
              </h3>
            </Col>
            <Col md="6">
              <Card>
                <Card.Header> ZAPP</Card.Header>
                <Card.Body> What's new? </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
  </div>*/}
    </>
  )
}
export default LoginForm
