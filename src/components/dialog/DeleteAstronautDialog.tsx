import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { doc, deleteDoc } from 'firebase/firestore'

import { db } from '../../firebase/firebase'

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
import {
  Astronaut,
  setAstronauts,
  setSelectedAstronauts
} from 'src/redux/features/astronautSlice'
import { openDialog, setDialogLoading } from '../../redux/features/dialogSlice'

import { getAstronautsFromDb } from '../../shared/utils'

const DeleteAstronautDialog = () => {
  const dispatch = useDispatch()
  const { isOpen, loading } = useSelector(
    (state: any) => state.dialog.confirmDelete
  )
  const { data, selected } = useSelector((state: any) => state.astronaut)

  const close = () => {
    dispatch(
      openDialog({
        type: 'confirmDelete',
        bool: false
      })
    )
  }

  const confirmDeletion = async () => {
    dispatch(
      setDialogLoading({
        type: 'confirmDelete',
        bool: true
      })
    )

    try {
      const selectedIds = selected.map((item: Astronaut) => item.id)
      const userDocs = selectedIds.map((id: string) => {
        const newDoc = doc(db, 'astronauts', id)
        return deleteDoc(newDoc)
      })

      await Promise.all(userDocs)
      const data = await getAstronautsFromDb()

      dispatch(setAstronauts(data))

      // const newAstronauts = data.filter(
      //   (item: Astronaut) => !selectedIds.includes(item.id)
      // )

      // dispatch(setAstronauts(newAstronauts))
      dispatch(setSelectedAstronauts([]))
      dispatch(
        setDialogLoading({
          type: 'confirmDelete',
          bool: false
        })
      )
      close()
    } catch (e) {
      dispatch(
        setDialogLoading({
          type: 'confirmDelete',
          bool: false
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
