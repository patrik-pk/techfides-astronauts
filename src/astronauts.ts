import { HeadCell } from './components/EnhancedTableHead'
import { Dayjs } from 'dayjs'

export type Astronaut = {
  id: any
  firstName: string
  lastName: string
  birthDate: string | Dayjs | null
  ability: string
}

export const headCells: HeadCell[] = [
  {
    label: 'First name',
    id: 'firstName'
  },
  {
    label: 'Last name',
    id: 'lastName'
    // align: 'center',
  },
  {
    label: 'Birth date',
    id: 'birthDate'
  },
  {
    label: 'Ability',
    id: 'ability'
  }
]

export const astronautData: Astronaut[] = [
  {
    id: 1,
    firstName: 'Astronaut',
    lastName: 'One',
    birthDate: '1. 1. 1980',
    ability: 'random ability'
  },
  {
    id: 2,
    firstName: 'Bstronaut',
    lastName: 'Two',
    birthDate: '2. 1. 1980',
    ability: 'random ability dsfds fds fdsf dsfsd'
  },
  {
    id: 3,
    firstName: 'Astronaut',
    lastName: 'Three',
    birthDate: '3. 1. 1980',
    ability: 'random ability'
  },
  {
    id: 4,
    firstName: 'Astronaut',
    lastName: 'Four',
    birthDate: '4. 1. 1980',
    ability: 'brandom ability'
  },
  {
    id: 5,
    firstName: 'Astronaut',
    lastName: 'One',
    birthDate: '1. 1. 1980',
    ability: 'random ability'
  },
  {
    id: 6,
    firstName: 'Astronaut',
    lastName: 'Two',
    birthDate: '2. 1. 1980',
    ability: 'random ability'
  },
  {
    id: 7,
    firstName: 'Astronaut',
    lastName: 'Three',
    birthDate: '3. 1. 1980',
    ability: 'random ability'
  },
  {
    id: 8,
    firstName: 'Astronaut',
    lastName: 'Four',
    birthDate: '4. 1. 1980',
    ability: 'random ability'
  },
  {
    id: 9,
    firstName: 'Astronaut',
    lastName: 'One',
    birthDate: '1. 1. 1980',
    ability: 'random ability dsf ds'
  },
  {
    id: 9,
    firstName: 'Astronaut',
    lastName: 'Two',
    birthDate: '2. 1. 1980',
    ability: 'random ability'
  },
  {
    id: 10,
    firstName: 'Astronaut',
    lastName: 'Three',
    birthDate: '3. 1. 1980',
    ability: 'random ability'
  },
  {
    id: 11,
    firstName: 'Astronaut',
    lastName: 'Four',
    birthDate: '4. 1. 1980',
    ability: 'random ability'
  }
]
