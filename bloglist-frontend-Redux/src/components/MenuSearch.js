import { useState, useRef, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import './Menu.css'
import MenuSearchItem from './MenuSearchItem'

const MenuSearch = () => {
  const users = useSelector((state) => state.userlist)
  const [searchTerm, setSearchTerm] = useState('') // State to store the search term
  console.log(searchTerm)

  // Function to handle input change
  const handleSearchChange = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (showDropdown) {
      inputRef.current.focus()
    }
  }, [showDropdown])

  useEffect(() => {
    // Function to disable body scrolling
    const disableBodyScroll = () => {
      document.body.style.overflow = 'hidden'
    }

    // Function to enable body scrolling
    const enableBodyScroll = () => {
      document.body.style.overflow = 'auto'
    }

    if (showDropdown) {
      // When the dropdown is shown, disable body scroll
      disableBodyScroll()
    } else {
      // When the dropdown is hidden, enable body scroll
      enableBodyScroll()
    }

    // Clean up the event listeners when the component unmounts
    return () => {
      enableBodyScroll()
    }
  }, [showDropdown])

  useEffect(() => {
    const closeDropdownOnOutsideClick = (e) => {
      // Check if the clicked element is not within the dropdown
      if (showDropdown && !e.target.closest('.dropdown.dropdown-search')) {
        setShowDropdown(false)
      }
    }

    // Add a global click event listener
    window.addEventListener('click', closeDropdownOnOutsideClick)

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('click', closeDropdownOnOutsideClick)
    }
  }, [showDropdown])

  console.log('SHOWDROPDOWN: ', showDropdown)
  return (
    <div className="dropdown dropdown-search">
      <button
        className="btn btn-secondary dropdown-toggle dropdown-toggle-search"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded={showDropdown}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="search-dropdown-btn-content">
          <div>
            <i className="bi bi-search"></i>
          </div>
          <div style={{ paddingLeft: '0.5rem' }}> Search </div>
        </div>
      </button>
      <ul className="dropdown-menu search-menu">
        <li style={{ display: 'flex', width: '100%' }} className="mb-2">
          <button
            type="button"
            className={`btn btn-secondary close-dropdown-btn ${
              showDropdown ? 'transition' : ''
            } `}
            style={{ marginRight: '0.3rem' }}
            onClick={() => {
              //setShowDropdown(false)
              // console.log('CLICKED!!!')
              document.querySelector('.dropdown-toggle-search').click() // Programmatically close the dropdown
            }}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <Form className="d-flex search-form" style={{ width: '100%' }}>
            <div
              style={{
                position: 'absolute',
                paddingLeft: '0.3rem',
              }}
            >
              @
            </div>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 dropdown-item"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              ref={inputRef}
              // autoFocus={true}
            />
          </Form>
        </li>
        {searchTerm ? (
          filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li key={user.id}>
                {' '}
                {/* <a href={`/users/${user.id}`}>{user.username}</a> */}
                <MenuSearchItem user={user} />
              </li>
            ))
          ) : (
            <li>Nothing found</li>
          )
        ) : (
          <li>Try searching for users</li>
        )}
      </ul>
    </div>
  )
}

export default MenuSearch
