import { Card } from 'react-bootstrap'

const MenuSearchItem = ({ user }) => {
  return (
    <div className="search-menu-item mb-2">
      <a href={`/users/${user.id}`}>
        <Card>
          <Card.Body className="search-menu-item-link">
            <img
              style={{ width: '50px', borderRadius: '50%' }}
              src={user.profilePicUrl}
              alt="..."
            />
            <p className="search-menu-item-link-p"> {user.username}</p>
          </Card.Body>
        </Card>
      </a>
    </div>
  )
}

export default MenuSearchItem
