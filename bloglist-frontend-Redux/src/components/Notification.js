import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  // const dispatch = useDispatch()
  // dispatch(removeNotification())

  return notification === '' ? null : (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification
