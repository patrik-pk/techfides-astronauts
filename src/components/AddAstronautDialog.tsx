import React, { useState, useEffect } from 'react'
import { addDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import dayjs, { Dayjs } from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import {
  openDialog,
  setAstronaut,
  setAstronautValue,
  emptyAstronaut
} from '../redux/features/dialogSlice'
import { Astronaut } from '../redux/features/astronautSlice'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { astronautsCollectionRef } from '../App'

const AddAstronautDialog = () => {
  const { isOpen, astronaut, isEditing } = useSelector(
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

  const handleDateChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      return
    }
  }

  const onSubmit = async () => {
    const id = uuidv4()

    const newAstronaut: Astronaut = {
      ...astronaut,
      id
    }

    await addDoc(astronautsCollectionRef, newAstronaut)

    console.log('add new astronaut', astronaut)

    dispatch(setAstronaut(emptyAstronaut))
    // setFormData(emptyFormData)
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
        <DialogTitle>
          {isEditing ? 'Edit astronaut' : 'Add astronaut'}
        </DialogTitle>
        <DialogContent>
          <TextField
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
            fullWidth
            margin='normal'
            name='lastName'
            label='Last Name'
            type='text'
            variant='outlined'
            onChange={handleInputChange}
            value={astronaut.lastName}
          />
          {/* <DesktopDatePicker
            label='Datebirth'
            inputFormat='DD/MM/YYYY'
            value={formData.birthDate}
            onChange={handleDateChange}
            renderInput={(params: any) => (
              <TextField {...params} fullWidth margin='normal' />
            )}
          /> */}
          <TextField
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
          <Button onClick={() => onSubmit()}>Add astronaut</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  )
}

export default AddAstronautDialog
