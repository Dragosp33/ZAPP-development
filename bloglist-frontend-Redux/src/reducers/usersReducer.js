import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    changeUser(state, action) {
      const id = action.payload.id

      return state.map((user) => (user.id !== id ? user : action.payload))
    },
  },
})

export const { setUsers, changeUser } = usersSlice.actions

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll()
      dispatch(setUsers(users.sort((a, b) => b.blogs.length - a.blogs.length)))
    } catch (error) {
      dispatch(setUsers([]))
    }
  }
}

export const updateUser = (id, body) => {
  return async (dispatch) => {
    try {
      const editedUser = await usersService.updateOne(id, body)
      console.log(editedUser)
      dispatch(changeUser(editedUser))
      return editedUser
    } catch {
      dispatch(
        setNotification('Oops, seems like you are not allowed to do that'),
      )
    }
  }
}

export default usersSlice.reducer
