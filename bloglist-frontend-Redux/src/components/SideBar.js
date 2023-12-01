import React, { useState, useEffect } from 'react'
import { Button, Modal, Nav } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
import { Link } from 'react-router-dom'
import './SideBar.css'

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
                <button
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#bdSidebar"
                  className="sidebar-btn"
                >
                  <Nav.Link eventKey="/" as={Link} to="/">
                    Home
                  </Nav.Link>
                </button>
              </Nav.Item>
              <Nav.Item>
                <button
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#bdSidebar"
                  className="sidebar-btn"
                >
                  <Nav.Link eventKey="/users" as={Link} to="/users">
                    users
                  </Nav.Link>
                </button>
              </Nav.Item>
            </Nav>{' '}
          </div>
        </div>
      </aside>
    </>
  )
}

export default TestAside
