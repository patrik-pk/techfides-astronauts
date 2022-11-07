import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { openDialog } from './redux/features/dialogSlice'
import { RootState } from './redux/store'
import {
  Container,
  Box,
  Typography,
  Paper,
  ThemeProvider,
  Button,
  createTheme
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import AddAstronautDialog from './components/AddAstronautDialog'
import DeleteAstronautDialog from './components/DeleteAstronautDialog'
import EnhancedTable from './components/EnhancedTable'
import ThemeSwitch from './components/ThemeSwitch'

import { HeadCell } from './components/EnhancedTableHead'

import { db } from './firebase/firebase'
import {
  Astronaut,
  setAstronauts,
  setLoading
} from './redux/features/astronautSlice'

// import { useAppSelector } from './hooks/hooks'

// import { astronautData, headCells } from './astronauts'

export const astronautsCollectionRef = collection(db, 'astronauts')

const headCells: HeadCell[] = [
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

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [addOpen, setAddOpen] = useState<boolean>(false)

  const astronauts = useSelector((state: RootState) => state.astronaut.data)
  const dispatch = useDispatch()

  // const [astronauts, setAstronauts] = useState<Astronaut[]>([])

  useEffect(() => {
    const getAstronauts = async () => {
      dispatch(setLoading(true))

      try {
        const data = await getDocs(astronautsCollectionRef)
        const formattedData: Astronaut[] = data.docs.map(
          doc => ({ ...doc.data(), id: doc.id } as Astronaut)
        )

        console.log('set?', formattedData)
        dispatch(setAstronauts(formattedData))
        dispatch(setLoading(false))
      } catch (e) {
        alert(e)
        dispatch(setLoading(false))
      }
    }

    getAstronauts()
  }, [])

  // const astronauts = useAppSelector(state => state.astr)
  // console.log('astron', astronauts)

  const theme = createTheme({
    palette: {
      mode
    }
  })

  useEffect(() => {
    console.log('astro changed', astronauts)
  }, [astronauts])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AddAstronautDialog />
        <DeleteAstronautDialog />

        <Paper
          sx={{
            minHeight: '100vh'
          }}
        >
          <Container maxWidth='md'>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 10
              }}
            >
              <Typography
                variant='h1'
                sx={{
                  mr: 4,
                  fontSize: 32,
                  fontWeight: 700
                }}
              >
                Astronaut Dashboard
              </Typography>

              <ThemeSwitch
                onChange={() => setMode(mode == 'light' ? 'dark' : 'light')}
              />
            </Box>

            <Typography
              variant={'body2'}
              sx={{
                marginTop: 3
              }}
            >
              Keep evidence of astronauts. Create, edit and delete them.
            </Typography>

            <Button
              variant='contained'
              sx={{
                marginTop: 4
              }}
              onClick={() =>
                dispatch(
                  openDialog({
                    type: 'addAstronaut',
                    bool: true
                  })
                )
              }
            >
              Add astronaut
            </Button>

            <Box
              sx={{
                marginTop: 4,
                paddingBottom: 6
              }}
            >
              <EnhancedTable
                headCells={headCells}
                data={astronauts}
                defaultOrderBy={headCells[0].id}
              />
            </Box>
          </Container>
        </Paper>
      </ThemeProvider>
    </>
  )
}
export default App
