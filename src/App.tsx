import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import dayjs from 'dayjs'
import {
  Container,
  Box,
  Typography,
  Paper,
  ThemeProvider,
  Button,
  createTheme,
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import AddAstronautDialog from 'src/components/dialog/AddAstronautDialog'
import DeleteAstronautDialog from 'src/components/dialog/DeleteAstronautDialog'
import EnhancedTable from 'src/components/table/EnhancedTable'
import ThemeSwitch from 'src/components/ThemeSwitch'

import { setAstronauts, setLoading } from 'src/redux/features/astronautSlice'
import { openDialog } from 'src/redux/features/dialogSlice'
import { setMode } from 'src/redux/features/themeSlice'

import { getAstronautsFromDb } from 'src/shared/utils'
import { Astronaut } from 'src/shared/types'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD

const App = () => {
  const mode = useSelector((state: any) => state.theme.mode)
  const dispatch = useDispatch()

  useEffect(() => {
    const getAstronauts = async () => {
      dispatch(setLoading(true))

      try {
        const data = await getAstronautsFromDb()
        dispatch(setAstronauts(data))
        dispatch(setLoading(false))
      } catch (err) {
        alert(err)
        dispatch(setLoading(false))
      }
    }

    getAstronauts()
  }, [])

  const theme = createTheme({
    palette: {
      mode,
    },
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AddAstronautDialog />
        <DeleteAstronautDialog />

        <Paper
          sx={{
            minHeight: '100vh',
          }}
        >
          <Container maxWidth='md'>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: {
                  xs: 4,
                  sm: 6,
                  md: 10,
                },
              }}
            >
              <Typography
                variant='h1'
                sx={{
                  mr: 4,
                  fontSize: 32,
                  fontWeight: 700,
                }}
              >
                Astronaut Dashboard D
              </Typography>

              <ThemeSwitch
                onChange={() =>
                  dispatch(setMode(mode == 'light' ? 'dark' : 'light'))
                }
                checked={mode == 'dark'}
              />
            </Box>

            <Typography
              variant={'body2'}
              sx={{
                marginTop: 3,
              }}
            >
              Keep evidence of astronauts. Create, edit and delete them.
            </Typography>

            <Button
              variant='contained'
              sx={{
                marginTop: 4,
              }}
              onClick={() =>
                dispatch(
                  openDialog({
                    type: 'addAstronaut',
                    bool: true,
                  })
                )
              }
            >
              Add astronaut
            </Button>

            <Box
              sx={{
                marginTop: 4,
                paddingBottom: 6,
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
