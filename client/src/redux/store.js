import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/reducer'
import { detailsReducer } from './details/reducer'
import { favoritesReducer } from './favorites/reducer'
import { schedulesReducer } from './schedules/reducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schedules: schedulesReducer,
    details: detailsReducer,
    favorites: favoritesReducer,
  },
})
