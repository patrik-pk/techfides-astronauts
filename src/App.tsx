import React from 'react'
import {
  Container,
  Box,
  Typography,
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import EnhancedTable from './components/EnhancedTable'
import ThemeSwitch from './components/ThemeSwitch'

import { astronautData, headCells } from './astronauts'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
                  fontSize: 32,
                  fontWeight: 700
                }}
              >
                Astronaut Dashboard
              </Typography>

              <ThemeSwitch />
            </Box>

            <Typography
              variant={'body2'}
              sx={{
                marginTop: 3
              }}
            >
              Keep evidence of astronauts. Create, edit and delete them.
            </Typography>

            <Box
              sx={{
                marginTop: 4
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
