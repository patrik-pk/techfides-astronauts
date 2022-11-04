import React from 'react'
import { Toolbar, Typography, Tooltip, IconButton, Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { visuallyHidden } from '@mui/utils'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FilterListIcon from '@mui/icons-material/FilterList'

type EnhancedTableToolbarProps = {
  selectedAmount: number
}

const EnhancedTableToolbar = ({
  selectedAmount
}: EnhancedTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedAmount > 0 && {
          bgcolor: theme =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            )
        })
      }}
    >
      {selectedAmount > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {selectedAmount} selected
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
      {selectedAmount > 0 ? (
        <Box
          sx={{
            display: 'flex'
          }}
        >
          {selectedAmount == 1 && (
            <Tooltip title='Edit'>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title='Delete'>
            <IconButton>
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
