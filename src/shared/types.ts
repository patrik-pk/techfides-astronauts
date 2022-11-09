import { Dayjs } from 'dayjs'

// birthDate is stored as timestamp in redux
// and then converted to date when rendering

export type Astronaut = {
  id: string
  firstName: string
  lastName: string
  birthDate: number
  ability: string
}
