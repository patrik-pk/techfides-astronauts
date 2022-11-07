import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'

export type Astronaut = {
  id: string
  firstName: string
  lastName: string
  birthDate: string
  ability: string
}

type AstronautState = {
  data: Array<Astronaut>
  selected: Array<Astronaut>
  loading: boolean
  // headCells: Array<any>
}

const initialState: AstronautState = {
  data: [],
  selected: [],
  loading: false
  // headCells
}

export const astronautSlice = createSlice({
  name: 'astronaut',
  initialState,
  // initialState: 0,
  reducers: {
    setAstronauts: (
      state: AstronautState,
      action: PayloadAction<Astronaut[]>
    ) => {
      state.data = action.payload
      console.log('update astronatus', state.data)
    },
    addAstronaut: (state: AstronautState, action: PayloadAction<Astronaut>) => {
      state.data = [...state.data, action.payload]
    },
    updateAstronaut: (
      state: AstronautState,
      action: PayloadAction<Astronaut>
    ) => {
      state.data = state.data.map(item =>
        item.id == action.payload.id ? action.payload : item
      )
    },
    setSelectedAstronauts: (
      state: AstronautState,
      action: PayloadAction<Astronaut[]>
    ) => {
      state.selected = action.payload
    },
    setLoading: (state: AstronautState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const {
  setAstronauts,
  addAstronaut,
  updateAstronaut,
  setSelectedAstronauts,
  setLoading
} = astronautSlice.actions
