import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import dayjs, { Dayjs } from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import { openDialog } from '../redux/features/dialogSlice'
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

import { Astronaut } from '../astronauts'

type AstronautForm = {
  firstName: string
  lastName: string
  birthDate: string | Dayjs | null
  ability: string
}

const emptyFormData = {
  firstName: '',
  lastName: '',
  birthDate: dayjs('1980-01-01'),
  ability: ''
}

const AddAstronautDialog = ({ type, open, setOpen }: any) => {
  const [formData, setFormData] = useState<AstronautForm>(emptyFormData)
  const isOpen = useSelector((state: any) => state.dialog.addAstronaut.isOpen)

  const dispatch = useDispatch()

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement> | null
  ) => {
    if (!e) {
      return
    }

    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleDateChange = (newValue: Dayjs | null) => {
    if (!newValue) {
      return
    }

    setFormData({
      ...formData,
      birthDate: newValue
    })
  }

  const onSubmit = () => {
    const id = uuidv4()

    const astronaut: Astronaut = {
      id,
      ...formData
    }

    console.log('add new astronaut', astronaut)

    setFormData(emptyFormData)
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

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
          {type == 'edit' ? 'Edit astronaut' : 'Add astronaut'}
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
          />
          <TextField
            fullWidth
            margin='normal'
            name='lastName'
            label='Last Name'
            type='text'
            variant='outlined'
            onChange={handleInputChange}
          />
          <DesktopDatePicker
            label='Datebirth'
            inputFormat='DD/MM/YYYY'
            value={formData.birthDate}
            onChange={handleDateChange}
            renderInput={(params: any) => (
              <TextField {...params} fullWidth margin='normal' />
            )}
          />
          <TextField
            fullWidth
            margin='normal'
            name='ability'
            label='Ability'
            type='text'
            variant='outlined'
            onChange={handleInputChange}
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
