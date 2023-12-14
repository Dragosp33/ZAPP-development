import ShowBlogs from './ShowBlogs'
import { Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import usersService from '../services/users'
import { useDispatch } from 'react-redux'
import { changeUser, updateUser } from '../reducers/usersReducer'
import { CropperRef, Cropper } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import ProfilePic from './ProfilePic'

const SingleUser = ({ userPage }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1599140849279-1014532882fe?fit=crop&w=1300&q=80',
  )
  const [user, setUser] = useState(null)
  const [editable, setEditable] = useState(false)
  const userMatch = useMatch('/users/:id')
  const id = userMatch.params.id
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function getUser() {
      try {
        const user1 = await usersService.getOne(id)
        setUser(user1.user)
        setEditable(user1.editable)
      } catch {
        setUser('Nonexistent')
      }
    }

    getUser()
  }, [id])

  /*
  const handleEdit = async () => {
    const url =
      'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'
    // 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
    const data = await usersService.updateOne(id, { url: url })
    console.log(data)
    setUser(data.savedUser)
    //dispatch(updateUser(id, url))
  }*/
  if (!userPage) {
    return null
  }
  if (!user) {
    return null
  }
  console.log(editable)

  const onChange = (cropper) => {
    console.log(cropper.getCoordinates(), cropper.getCanvas())
  }

  const OK = (image) => {
    // console.log(image)
    const updatedUser = { ...user, profilePicUrl: image }
    console.log('updateduser: ', updatedUser)
    setUser(updatedUser)
  }
  console.log(user)
  return (
    <>
      <div className="d-flex flex-column w-100">
        <div
          className="edit-profile-pic-flex"
          style={{ flexDirection: 'column', alignItems: 'center' }}
        >
          <div style={{ marginRight: '1rem', marginLeft: '1rem' }}>
            <img
              src={user.profilePicUrl}
              style={{ height: '100px', borderRadius: '50%' }}
              alt="profile pic"
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <h5> {user.username} </h5>
          </div>
          {editable ? (
            <div className="edit-btn-container">
              <button
                className=" btn btn-primary profile-edit-btn"
                onClick={() => setShowModal(true)}
              >
                <i class="bi bi-arrow-repeat"></i>
              </button>
            </div>
          ) : null}
        </div>
        <div style={{ width: '100%' }}>
          <ShowBlogs user={user} />
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        fullscreen="sm-down"
        className="modal modal-height-transition" // Add the smooth transition class here
        backdrop={'static'}
      >
        <Modal.Body>
          <div style={{ height: '100%' }}>
            <ProfilePic
              userImage={{
                blob: user.profilePicUrl,
                src: user.profilePicUrl,
                OK: OK,
                userID: user.id,
                username: user.username,
                closeModal: setShowModal,
              }}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SingleUser
