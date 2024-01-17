import { configureStore } from '@reduxjs/toolkit'

import userReducer from './userReducer'
import eventReducer from './eventReducer'
import eventImageReducer from './eventImageReducer'

export default configureStore({
  reducer: {
    user: userReducer,
    event: eventReducer,
    eventImage:eventImageReducer
  },
})