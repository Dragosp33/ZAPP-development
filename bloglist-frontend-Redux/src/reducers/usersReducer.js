import usersService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

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

export default usersSlice.reducer
