import { Link } from 'react-router-dom'
import { Routes, Route, useMatch } from 'react-router-dom'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import zappSVG from './ZAPP.svg'
import SignUp from './SignUp'
import './signup.css'

const LoginForm = ({
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <>
      <div className="container-fluid login-page">
        <div className="login-page-content">
          <div className="row">
            <div className="login-header">
              <img
                src={zappSVG}
                alt=".."
                style={{ height: '200px', width: '200px' }}
              />
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div>
                <Card>
                  <Card.Header> ZAPP</Card.Header>
                  <Card.Body> What's new? </Card.Body>
                </Card>
              </div>
            </div>
            <div className="col">
              <div className="login-form-container">
                <Card>
                  <Card.Body>
                    <form className="login-form" onSubmit={handleLogin}>
                      <Form.Group as={Col} controlId="username">
                        <Form.Control
                          type="text"
                          name="username"
                          placeholder="username or email"
                          value={username}
                          onChange={handleUsernameChange}
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
                      <div class="text-between-lines">
                        <div class="line"></div>
                        <div class="text"> First time here? </div>
                        <div class="line"></div>
                      </div>
                      <div className="signupBtn-container">
                        <Button id="signupBtn" type="button">
                          {' '}
                          <Link to={'/signup'}>Sign up</Link>{' '}
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
