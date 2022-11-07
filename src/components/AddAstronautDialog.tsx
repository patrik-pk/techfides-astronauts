import React, { useState, useEffect } from 'react'
import { addDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { v4 as uuidv4 } from 'uuid'
import dayjs, { Dayjs } from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import {
  openDialog,
  setAstronaut,
  setAstronautValue,
  emptyAstronaut,
  setDialogLoading,
  setShowErrors
} from '../redux/features/dialogSlice'
import { Astronaut } from '../redux/features/astronautSlice'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
  Box
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { astronautsCollectionRef } from '../App'

import {
  addAstronaut,
  updateAstronaut,
  setSelectedAstronauts
} from '../redux/features/astronautSlice'

const AddAstronautDialog = () => {
  const { isOpen, isEditing, astronaut, loading, showErrors } = useSelector(
    (state: any) => state.dialog.addAstronaut
  )

  const dispatch = useDispatch()

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement> | null
  ) => {
    if (!e) {
      return
    }

    const key = e.currentTarget.name
    const value = e.currentTarget.value

    dispatch(
      setAstronautValue({
        key,
        value
      })
    )
  }

  const handleDateChange = (value: Dayjs | null) => {
    if (!value) {
      return
    }

    const formatted = value.format('LL')
    console.log('date change value', formatted)

    dispatch(
      setAstronautValue({
        key: 'birthDate',
        value: formatted
      })
    )
  }

  const isFormValid = () => {
    const keywords = ['firstName', 'lastName', 'birthDate', 'ability']
    let isValid = true

    keywords.forEach(key => {
      console.log('keeey', key)
      console.log('astro', astronaut)

      if (!astronaut[key].length) {
        isValid = false
      }
    })

    if (!isValid) {
      dispatch(setShowErrors(true))
      return false
    }

    return true
  }

  const addNewAstronaut = async () => {
    if (!isFormValid()) {
      return
    }

    const id = uuidv4()

    const newAstronaut: Astronaut = {
      ...astronaut,
      id
    }

    dispatch(
      setDialogLoading({
        type: 'addAstronaut',
        bool: true
      })
    )

    try {
      await addDoc(astronautsCollectionRef, newAstronaut)

      dispatch(setAstronaut(emptyAstronaut))
      dispatch(addAstronaut(newAstronaut))
      dispatch(
        openDialog({
          type: 'addAstronaut',
          bool: false
        })
      )
      dispatch(
        setDialogLoading({
          type: 'addAstronaut',
          bool: false
        })
      )
    } catch (e) {
      dispatch(
        setDialogLoading({
          type: 'addAstronaut',
          bool: false
        })
      )
      alert(e)
    }
  }

  const editExistingAstronaut = async () => {
    dispatch(
      setDialogLoading({
        type: 'addAstronaut',
        bool: true
      })
    )

    try {
      const userDoc = doc(db, 'astronauts', astronaut.id)
      await updateDoc(userDoc, astronaut)

      dispatch(setAstronaut(emptyAstronaut))
      dispatch(updateAstronaut(astronaut))
      dispatch(setSelectedAstronauts([]))
      dispatch(
        openDialog({
          type: 'addAstronaut',
          bool: false
        })
      )
      dispatch(
        setDialogLoading({
          type: 'addAstronaut',
          bool: false
        })
      )
    } catch (e) {
      alert(e)
      dispatch(
        setDialogLoading({
          type: 'addAstronaut',
          bool: false
        })
      )
    }
  }

  const onSubmit = async () => {
    if (isEditing) {
      editExistingAstronaut()
      return
    }

    addNewAstronaut()
  }

  useEffect(() => {
    console.log(astronaut)
  }, [astronaut])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={isOpen}
        onClose={() =>
          dispatch(
            openDialog({
              type: 'addAstronaut',
              bool: false
            })
          )
        }
        fullWidth={true}
        maxWidth={'xs'}
      >
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%) translateY(-50%)'
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <DialogTitle>
          {isEditing ? 'Edit astronaut' : 'Add astronaut'}
        </DialogTitle>
        <DialogContent>
          <TextField
            error={showErrors && !astronaut.firstName.length}
            autoFocus
            fullWidth
            margin='normal'
            name='firstName'
            label='First Name'
            type='text'
            variant='outlined'
            onChange={handleInputChange}
            value={astronaut.firstName}
          />
          <TextField
            error={showErrors && !astronaut.lastName.length}
            fullWidth
            margin='normal'
            name='lastName'
            label='Last Name'
            type='text'
            variant='outlined'
            onChange={handleInputChange}
            value={astronaut.lastName}
          />
          <DesktopDatePicker
            label='Datebirth'
            inputFormat='DD/MM/YYYY'
            value={dayjs(astronaut.birthDate)}
            onChange={handleDateChange}
            renderInput={(params: any) => (
              <TextField {...params} fullWidth margin='normal' />
            )}
          />
          <TextField
            error={showErrors && !astronaut.ability.length}
            fullWidth
            margin='normal'
            name='ability'
            label='Ability'
            type='text'
            variant='outlined'
            onChange={handleInputChange}
            value={astronaut.ability}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              dispatch(
                openDialog({
                  type: 'addAstronaut',
                  bool: false
                })
              )
            }
          >
            Cancel
          </Button>
          <Button onClick={() => onSubmit()}>
            {isEditing ? 'Edit astronaut' : 'Add astronaut'}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}

export default AddAstronautDialog
