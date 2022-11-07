import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'

type Mode = 'dark' | 'light'

type ThemeState = {
  mode: Mode
}

let storedMode = localStorage.getItem('theme')
storedMode = typeof storedMode == 'string' ? JSON.parse(storedMode) : ''

const initialState: ThemeState = {
  mode: storedMode == 'dark' || storedMode == 'light' ? storedMode : 'dark'
}

export const themeSlice = createSlice({
  name: 'astronaut',
  initialState,
  reducers: {
    setMode: (state: ThemeState, action: PayloadAction<Mode>) => {
      state.mode = action.payload
      localStorage.setItem('theme', JSON.stringify(state.mode))
    }
  }
})

export const { setMode } = themeSlice.actions
