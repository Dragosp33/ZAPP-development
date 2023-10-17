import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const Users = () => {
  /*
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
*/
  const users = useSelector((state) => state.userlist)
  if (users === []) {
    return null
  }
  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {' '}
                <Link to={`/users/${user.id}`}>{user.username}</Link>{' '}
              </td>
              <td> {user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Users
