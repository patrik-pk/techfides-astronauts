import { configureStore } from '@reduxjs/toolkit'
import dialogReducer from './features/dialogSlice'

export const store = configureStore({
  reducer: {
    dialog: dialogReducer
  }
})
