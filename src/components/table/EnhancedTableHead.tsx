import React from 'react'
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  Checkbox,
  Box
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'

import { Order, OrderBy } from './EnhancedTable'

export type HeadCell = {
  label: string
  id: string
  align?: 'left' | 'center' | 'right' | 'justify'
}

type EnhancedTableHeadProps = {
  headCells: HeadCell[]
  order: Order
  orderBy: OrderBy
  selectedAmount: number
  itemsAmount: number
  onRequestSort: (event: React.MouseEvent, property: string) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const EnhancedTableHead = ({
  headCells,
  order,
  orderBy,
  selectedAmount,
  itemsAmount,
  onRequestSort,
  onSelectAllClick
}: EnhancedTableHeadProps) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={selectedAmount > 0 && selectedAmount < itemsAmount}
            checked={itemsAmount > 0 && selectedAmount === itemsAmount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all astronauts'
            }}
          />
        </TableCell>

        {headCells.map(cell => (
          <TableCell
            align={cell.align || 'left'}
            key={cell.id}
            sortDirection={orderBy === cell.id ? order : false}
            sx={{
              width: 100,
              fontWeight: 600
            }}
          >
            <TableSortLabel
              active={orderBy == cell.id}
              direction={orderBy === cell.id ? order : 'asc'}
              onClick={(e: React.MouseEvent) => onRequestSort(e, cell.id)}
            >
              {cell.label}
              {orderBy === cell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
