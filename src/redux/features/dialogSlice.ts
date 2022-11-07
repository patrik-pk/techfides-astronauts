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

interface Dialog {
  isOpen: boolean
  loading: boolean
}

interface AddDialog extends Dialog {
  isEditing: boolean
  astronaut: Astronaut
  showErrors: boolean
}

interface ConfirmDeleteDialog extends Dialog {}

type DialogState = {
  addAstronaut: AddDialog
  confirmDelete: ConfirmDeleteDialog
}

type OpenDialogPayload = {
  type: keyof DialogState
  bool: boolean | undefined
}

type SetAstronautValuePayload = {
  key: string
  value: string
}

type SetDialogLoadingPayload = {
  type: keyof DialogState
  bool: boolean
}

export const emptyAstronaut: Astronaut = {
  id: '',
  firstName: '',
  lastName: '',
  birthDate: 'January 1, 1980',
  ability: ''
}

const initialState: DialogState = {
  addAstronaut: {
    isOpen: false,
    loading: false,
    showErrors: false,
    isEditing: false,
    astronaut: emptyAstronaut
  },
  confirmDelete: {
    isOpen: false,
    loading: false
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
      const { type, bool } = action.payload

      // close all dialogs first
      let key: keyof DialogState
      for (key in state) {
        state[key].isOpen = false
      }

      state[type].isOpen = typeof bool == 'boolean' ? bool : !state[type].isOpen

      if (type == 'addAstronaut') {
        state.addAstronaut = {
          ...state.addAstronaut,
          isEditing: false,
          showErrors: false,
          astronaut: emptyAstronaut
        }
      }
    },
    setDialogLoading: (
      state: DialogState,
      action: PayloadAction<SetDialogLoadingPayload>
    ) => {
      const { type, bool } = action.payload

      state[type].loading = bool
    },
    setShowErrors: (state: DialogState, action: PayloadAction<boolean>) => {
      state.addAstronaut.showErrors = action.payload
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
    setAstronautForm: (
      state: DialogState,
      action: PayloadAction<Astronaut>
    ) => {
      state.addAstronaut.astronaut = action.payload
    },
    openEditAstronaut: (
      state: DialogState,
      action: PayloadAction<Astronaut>
    ) => {
      state.addAstronaut = {
        ...state.addAstronaut,
        isOpen: true,
        isEditing: true,
        astronaut: action.payload
      }
    }
  }
})

export const {
  openDialog,
  setAstronautForm,
  setAstronautValue,
  openEditAstronaut,
  setDialogLoading,
  setShowErrors
} = dialogSlice.actions
