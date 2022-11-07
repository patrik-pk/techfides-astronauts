import React from 'react'
import { useDispatch } from 'react-redux'
import { Toolbar, Typography, Tooltip, IconButton, Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FilterListIcon from '@mui/icons-material/FilterList'

import { Astronaut } from '../redux/features/astronautSlice'
import { openEditAstronaut, openDialog } from '../redux/features/dialogSlice'

type EnhancedTableToolbarProps = {
  selected: Astronaut[]
}

const EnhancedTableToolbar = ({ selected }: EnhancedTableToolbarProps) => {
  const dispatch = useDispatch()

  const editItems = () => {
    if (selected.length != 1) {
      return
    }

    dispatch(openEditAstronaut(selected[0]))
  }

  const deleteItems = () => {
    if (!selected.length) {
      return
    }

    dispatch(
      openDialog({
        type: 'confirmDelete',
        bool: true
      })
    )
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        borderRadius: 1,
        ...(selected.length > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {selected.length > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {selected.length} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', fontWeight: 600 }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Astronaut Records
        </Typography>
      )}
      {selected.length > 0 ? (
        <Box
          sx={{
            display: 'flex'
          }}
        >
          {selected.length == 1 && (
            <Tooltip title='Edit'>
              <IconButton onClick={() => editItems()}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title='Delete'>
            <IconButton onClick={() => deleteItems()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : null
      // (
      //   <Tooltip title='Filter list'>
      //     <IconButton>
      //       <FilterListIcon />
      //     </IconButton>
      //   </Tooltip>
      // )
      }
    </Toolbar>
  )
}

export default EnhancedTableToolbar
