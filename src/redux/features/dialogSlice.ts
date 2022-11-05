import { createSlice } from '@reduxjs/toolkit'

type AddDialog = {
  isOpen: boolean
}

type DialogState = {
  addAstronaut: AddDialog
}

const initialState: DialogState = {
  addAstronaut: {
    isOpen: false
  }
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state: any, action: any) => {
      const { payload } = action
      const { type, bool } = payload

      state[type].isOpen = typeof bool == 'boolean' ? bool : !state[type].isOpen
    }
  }
})

export const { openDialog } = dialogSlice.actions

export default dialogSlice.reducer
