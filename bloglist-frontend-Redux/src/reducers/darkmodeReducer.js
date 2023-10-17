import { createSlice } from '@reduxjs/toolkit'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'

const darkmodeSlice = createSlice({
  name: 'mode',
  initialState: 'light',
  reducers: {
    initialMode(state, action) {
      return action.payload
    },
    toggleMode(state, action) {
      const k = state === 'light' ? 'dark' : 'light'
      window.localStorage.setItem('mode', k)
      return k
    },
  },
})

export const { toggleMode, initialMode } = darkmodeSlice.actions

export const setMode = () => {
  return async (dispatch) => {
    dispatch(toggleMode())
  }
}

// export const setMode

// export const setMode = () => {
//   return async (dispatch) => {
//     const mode = window.localStorage.getItem('mode')
//       window.localStorage.setItem(
//         'loggedBlogappUser',
//         JSON.stringify(loginData),
//       )
//       blogService.setToken(loginData.token)
//       dispatch(setUser(loginData))
//     } catch (exception) {
//       removeUser()
//       console.log('error ', exception)
//     }
//   }
// }

export default darkmodeSlice.reducer
