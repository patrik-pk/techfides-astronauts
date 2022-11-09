import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { Astronaut } from 'src/shared/types'

type AstronautState = {
  data: Array<Astronaut>
  selected: Array<Astronaut>
  loading: boolean
}

const initialState: AstronautState = {
  data: [],
  selected: [],
  loading: false,
}

export const astronautSlice = createSlice({
  name: 'astronaut',
  initialState,
  reducers: {
    setAstronauts: (
      state: AstronautState,
      action: PayloadAction<Astronaut[]>
    ) => {
      state.data = action.payload
    },
    setSelectedAstronauts: (
      state: AstronautState,
      action: PayloadAction<Astronaut[]>
    ) => {
      state.selected = action.payload
    },
    setLoading: (state: AstronautState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setAstronauts, setSelectedAstronauts, setLoading } =
  astronautSlice.actions
