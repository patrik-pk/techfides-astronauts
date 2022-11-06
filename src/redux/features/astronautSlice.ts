import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'

import { astronautData, headCells } from '../../astronauts'

export type Astronaut = {
  id: string | null
  firstName: string
  lastName: string
  birthDate: string | Dayjs | null
  ability: string
}

type AstronautState = {
  data: Array<Astronaut>
  // headCells: Array<any>
}

const initialState: AstronautState = {
  data: []
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
    }
  }
})

export const { setAstronauts } = astronautSlice.actions
