import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material'

import {
  setAstronauts,
  setSelectedAstronauts,
} from 'src/redux/features/astronautSlice'
import { openDialog, setDialogLoading } from 'src/redux/features/dialogSlice'

import { getAstronautsFromDb } from 'src/shared/utils'
import { Astronaut } from 'src/shared/types'

const DeleteAstronautDialog = () => {
  const dispatch = useDispatch()
  const { isOpen, loading } = useSelector(
    (state: any) => state.dialog.confirmDelete
  )
  const { selected } = useSelector((state: any) => state.astronaut)

  const close = () => {
    dispatch(
      openDialog({
        type: 'confirmDelete',
        bool: false,
      })
    )
  }

  const confirmDeletion = async () => {
    dispatch(
      setDialogLoading({
        type: 'confirmDelete',
        bool: true,
      })
    )

    try {
      const selectedIds = selected.map((item: Astronaut) => item.id)

      await axios.delete(`astronaut/${selectedIds}`)
      const data = await getAstronautsFromDb()

      dispatch(setAstronauts(data))
      dispatch(setSelectedAstronauts([]))
      dispatch(
        setDialogLoading({
          type: 'confirmDelete',
          bool: false,
        })
      )
      close()
    } catch (e) {
      dispatch(
        setDialogLoading({
          type: 'confirmDelete',
          bool: false,
        })
      )
      alert(e)
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() =>
        dispatch(
          openDialog({
            type: 'confirmDelete',
            bool: false,
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
            transform: 'translateX(-50%) translateY(-50%)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <DialogTitle>Confirm deletion</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete? This action cannot be undone!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()}>Cancel</Button>
        <Button onClick={() => confirmDeletion()} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAstronautDialog
