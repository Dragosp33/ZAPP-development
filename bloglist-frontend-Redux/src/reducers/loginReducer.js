import loginService from '../services/login'
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = loginSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const loginData = await loginService.login(credentials)
      /*window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loginData),
      )*/
      blogService.setToken(loginData.token)
      dispatch(setUser(loginData.data))
    } catch (exception) {
      removeUser()
      dispatch(setNotification('Wrong credentials'))
      console.log('error ', exception)
    }
  }
}

export const verifyTokenUser = () => {
  return async (dispatch) => {
    try {
      const response = await loginService.verifyToken()
      if (response) {
        console.log('verify token response: ', response)
        dispatch(setUser(response.data))
      } else {
        dispatch(removeUser())
      }
    } catch (error) {
      console.log('ooops, error: ', error)
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const response = await loginService.logout()
      if (response) {
        dispatch(removeUser())
      }
    } catch (error) {
      console.log('there was an error')
    }
  }
}

export default loginSlice.reducer
