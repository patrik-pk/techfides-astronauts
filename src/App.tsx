import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { openDialog } from './redux/features/dialogSlice'
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
import EnhancedTable from './components/EnhancedTable'
import ThemeSwitch from './components/ThemeSwitch'

import { astronautData, headCells } from './astronauts'

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [addOpen, setAddOpen] = useState<boolean>(false)

  const dispatch = useDispatch()

  const theme = createTheme({
    palette: {
      mode
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AddAstronautDialog open={addOpen} setOpen={setAddOpen} />

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
                data={astronautData}
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
