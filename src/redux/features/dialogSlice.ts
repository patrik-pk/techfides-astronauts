import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { createSlice } from '@reduxjs/toolkit'

import { Astronaut } from './astronautSlice'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'

// type AstronautData = {
//   id: string | null
//   firstName: string
//   lastName: string
//   birthDate: string | Dayjs | null
//   ability: string
// }

type AddDialog = {
  isOpen: boolean
  isEditing: boolean
  astronaut: Astronaut
}

type DialogState = {
  addAstronaut: AddDialog
}

type OpenDialogPayload = {
  type: keyof DialogState
  bool: boolean | undefined
}

type SetAstronautValuePayload = {
  key: string
  value: string
}

export const emptyAstronaut: Astronaut = {
  id: null,
  firstName: '',
  lastName: '',
  // birthDate: dayjs('1980-01-01'),
  birthDate: '',
  ability: ''
}

const initialState: DialogState = {
  addAstronaut: {
    isOpen: false,
    isEditing: false,
    astronaut: emptyAstronaut
  }
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (
      state: DialogState,
      action: PayloadAction<OpenDialogPayload>
    ) => {
      const { payload } = action
      const { type, bool } = payload

      state[type].isOpen = typeof bool == 'boolean' ? bool : !state[type].isOpen
    },
    handleDateChange: (state: DialogState, action: PayloadAction<any>) => {
      const newValue = action.payload

      if (!newValue) {
        return
      }

      state.addAstronaut.astronaut = {
        ...state.addAstronaut.astronaut,
        birthDate: newValue
      }
    },
    setAstronautValue: (
      state: DialogState,
      action: PayloadAction<SetAstronautValuePayload>
    ) => {
      const { key, value } = action.payload

      state.addAstronaut.astronaut = {
        ...state.addAstronaut.astronaut,
        [key]: value
      }
    },
    setAstronaut: (state: DialogState, action: PayloadAction<Astronaut>) => {
      state.addAstronaut.astronaut = action.payload
    }
  }
})

export const {
  openDialog,
  setAstronaut,
  setAstronautValue
} = dialogSlice.actions
