import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import updateBlogKey from './reducers/updateBlogKey'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import darkmodeReducer from './reducers/darkmodeReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    updatekey: updateBlogKey,
    user: loginReducer,
    userlist: usersReducer,
    mode: darkmodeReducer,
  },
})

export default store
