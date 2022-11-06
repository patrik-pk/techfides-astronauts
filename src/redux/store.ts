import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit'
import { dialogSlice } from './features/dialogSlice'
import { astronautSlice } from './features/astronautSlice'
import { EnhancedStore } from '@reduxjs/toolkit/dist/configureStore'

const rootReducer = combineReducers({
  dialog: dialogSlice.reducer,
  astronaut: astronautSlice.reducer
} as any)

export const store: EnhancedStore = configureStore({
  reducer: rootReducer
  // reducer: {
  //   dialog: dialogSlice.reducer,
  //   astronaut: astronautSlice.reducer
  // }
})

export type RootState = ReturnType<typeof rootReducer>
