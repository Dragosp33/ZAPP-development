import { createSlice } from '@reduxjs/toolkit'
const initialState = 0

const keySlice = createSlice({
  name: 'updateBlogKey',
  initialState,
  reducers: {
    increment(state, action) {
      return state + 1
    },
  },
})
export const { increment } = keySlice.actions

export default keySlice.reducer
