import { EnhancedStore } from '@reduxjs/toolkit/dist/configureStore'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { dialogSlice } from './features/dialogSlice'
import { astronautSlice } from './features/astronautSlice'
import { themeSlice } from './features/themeSlice'

const rootReducer = combineReducers({
  dialog: dialogSlice.reducer,
  astronaut: astronautSlice.reducer,
  theme: themeSlice.reducer,
} as any)

export const store: EnhancedStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof rootReducer>
