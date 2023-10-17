import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    },
  },
})
export const { changeNotification, removeNotification } =
  notificationSlice.actions

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

export const setNotification = (content, time = 5) => {
  console.log(time)
  return async (dispatch) => {
    dispatch(changeNotification(content))
    await sleep(time * 1000)
    dispatch(removeNotification())
  }
}

export default notificationSlice.reducer
