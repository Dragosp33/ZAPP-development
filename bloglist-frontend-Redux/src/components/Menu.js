import {
  Nav,
  Navbar,
  Button,
  Offcanvas,
  Container,
  //NavDropdown,
  // Form,
  Card,
  //InputGroup,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
// import { BrowserRouter, Link } from 'react-router-dom'
import { setMode } from '../reducers/darkmodeReducer'
import { useEffect, useState, useRef } from 'react'
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import './Menu.css'
import MenuSearch from './MenuSearch'
import { Link, useNavigate } from 'react-router-dom'

const Menu = ({ handleLogout }) => {
  const padding = {
    paddingRight: 5,
  }
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const mode = useSelector((state) => state.mode)

  useEffect(() => {
    //changing color of body with darkmode in useEffect

    const element = document.body
    element.dataset.bsTheme = mode
    console.log('useffect -> ', mode)
    setNavClass(`bg-${mode} navbar-${mode}`)
  }, [mode])

  const [navClass, setNavClass] = useState(`bg-${mode} navbar-${mode}`)
  const [showOffcanvas, setShowOffcanvas] = useState(false)

  const handleOffcanvasClose = () => setShowOffcanvas(false)
  const handleOffcanvasShow = () => setShowOffcanvas(true)

  const switchDark = () => {
    dispatch(setMode())
    console.log('called switchddark')
  }

  const goToProfile = () => {
    navigate(`users/${user.id}`)
    setShowOffcanvas(false)
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className={navClass} fixed="top">
        <Container fluid className="navigation-grid">
          <Navbar.Brand href="/"> Zapp </Navbar.Brand>
          <div className="bd-navbar-toggle">
            <button
              className="navbar-toggler p-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#bdSidebar"
              aria-controls="bdSidebar"
              aria-label="Toggle docs navigation"
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
          {/*}
          <Form className="d-flex Search">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            {/*} <Button variant="outline-success">Search</Button>
          </Form>*/}

          <MenuSearch />
          <div className="nav-notifications">
            <Button variant="warning">
              <i className="bi bi-bell"></i>
            </Button>
          </div>
          {/*<Navbar.Toggle aria-controls="responsive-navbar-nav" />*/}
          <div className="order-lg-3 profile-offcanvas">
            <Button variant="dark" onClick={handleOffcanvasShow}>
              <i className="bi bi-person-gear"></i>
            </Button>
          </div>
          {/* <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className="justify-content-end flex-grow-1 pe-3"
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
            </Nav>
  </Navbar.Collapse>*/}
        </Container>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={handleOffcanvasClose}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Item>
              <div className="container-fluid">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="checkbox"
                  // onChange prop to fire our internal function for changing the dark mode value
                  onChange={switchDark}
                  // checking checked prop with dark mode state
                  checked={mode === 'dark'}
                  label="Dark mode"
                />
                <label htmlFor="checkbox" className="label">
                  <BsMoonStarsFill color="white" />
                  <BsFillSunFill color="yellow" />
                  <div className="ball"></div>
                </label>
              </div>
            </Nav.Item>
            <Nav.Item>
              <Card className="px-1 mt-5" border={mode}>
                <Card.Header>
                  <button
                    onClick={goToProfile}
                    className={`bg-${mode} btn-${mode} rounded w-100`}
                  >
                    <div className="d-flex flex-rows align-items-center">
                      <div style={{ marginRight: '1rem' }}>
                        <img
                          src={user.profilePicUrl}
                          style={{ height: '3rem', borderRadius: '50%' }}
                          alt="profile pic"
                        />
                      </div>{' '}
                      <div> {user.username} </div>{' '}
                    </div>
                  </button>
                </Card.Header>
                <Card.Title className="px-2 mt-2">Details</Card.Title>
                <Card.Body>
                  <div>User logged in {user.username} </div>
                  Email: {user.email}
                </Card.Body>

                <Card.Footer>
                  <Button
                    className={`bg-${mode} btn-${mode}`}
                    onClick={() => {
                      dispatch(logoutUser())
                    }}
                  >
                    {' '}
                    Log out{' '}
                  </Button>
                </Card.Footer>
              </Card>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Menu
