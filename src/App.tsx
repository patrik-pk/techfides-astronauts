import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
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

import AddAstronautDialog from './components/dialog/AddAstronautDialog'
import DeleteAstronautDialog from './components/dialog/DeleteAstronautDialog'
import EnhancedTable from './components/table/EnhancedTable'
import ThemeSwitch from './components/ThemeSwitch'

import { setAstronauts, setLoading } from './redux/features/astronautSlice'
import { openDialog } from './redux/features/dialogSlice'

import { getAstronautsFromDb } from './shared/utils'

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [addOpen, setAddOpen] = useState<boolean>(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const getAstronauts = async () => {
      dispatch(setLoading(true))

      try {
        const data = await getAstronautsFromDb()

        dispatch(setAstronauts(data))
        dispatch(setLoading(false))
      } catch (e) {
        alert(e)
        dispatch(setLoading(false))
      }
    }

    getAstronauts()
  }, [])

  const theme = createTheme({
    palette: {
      mode
    }
  })

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
                Astronaut Dashboard A
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
              <EnhancedTable />
            </Box>
          </Container>
        </Paper>
      </ThemeProvider>
    </>
  )
}
export default App
