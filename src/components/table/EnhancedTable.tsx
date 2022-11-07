import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  TableContainer,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Checkbox,
  CircularProgress
} from '@mui/material'

import EnhancedTableHead, { HeadCell } from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

import { setSelectedAstronauts } from 'src/redux/features/astronautSlice'

import { sortData } from 'src/shared/utils'
import { Astronaut } from 'src/shared/types'

export type Order = 'asc' | 'desc'
export type OrderBy = string | undefined

const headCells: HeadCell[] = [
  {
    label: 'First name',
    id: 'firstName'
  },
  {
    label: 'Last name',
    id: 'lastName'
  },
  {
    label: 'Birth date',
    id: 'birthDate'
  },
  {
    label: 'Ability',
    id: 'ability'
  }
]

const defaultOrderBy = headCells[0].id

const EnhancedTable = () => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<OrderBy>(defaultOrderBy)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const { data, selected, loading } = useSelector(
    (state: any) => state.astronaut
  )
  const dispatch = useDispatch()

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // if newly clicked orderBy property is the same as current one,
  // change order to opposite
  // if it is different,
  // set orderBy to new property and reset the order to "asc"
  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  // select/unselect single item
  const selectItem = (clickedItem: Astronaut) => {
    const selectedIds = selected.map((item: Astronaut) => item.id)

    const newSelected = selectedIds.includes(clickedItem.id)
      ? selected.filter((item: Astronaut) => item.id != clickedItem.id)
      : [...selected, clickedItem]

    dispatch(setSelectedAstronauts(newSelected))
  }

  // select/unselect all items
  const selectAllItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(setSelectedAstronauts(data))
      return
    }
    dispatch(setSelectedAstronauts([]))
  }

  // avoid mutating data
  const copiedData = JSON.parse(JSON.stringify(data))

  // sort data according to order and orderBy
  const sortedData =
    typeof orderBy == 'string'
      ? sortData(copiedData, orderBy, order)
      : copiedData

  // then slice sorted data according to pagination
  const slicedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Paper
      sx={{
        position: 'relative',
        p: {
          xs: 1,
          md: 2,
          lg: 3
        },
        paddingBottom: {
          xs: 0,
          md: 0,
          lg: 0
        },
        backgroundColor: theme =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey['900']
            : theme.palette.grey['100'],
        boxShadow: 'none',
        borderRadius: 2
      }}
    >
      <EnhancedTableToolbar selected={selected} />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-labelledby='tableTitle'>
          <EnhancedTableHead
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            selectedAmount={selected.length}
            itemsAmount={data.length}
            onRequestSort={(e, property: string) => handleRequestSort(property)}
            onSelectAllClick={selectAllItems}
          />

          <TableBody sx={{ position: 'relative' }}>
            {/* "<div> cannot appear as a child of <tbody>" fixed with table row and cell */}
            {loading && (
              <TableRow>
                <TableCell
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                    border: 'none'
                  }}
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}

            {/* render data here */}
            {slicedData.map((item: Astronaut, i: number) => {
              const selectedIds = selected.map((item: Astronaut) => item.id)
              const isItemSelected = selectedIds.includes(item.id)
              const labelId = `enhanced-table-checkbox-${i}`

              return (
                <TableRow
                  hover
                  onClick={() => selectItem(item)}
                  role='checkbox'
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={i}
                  selected={isItemSelected}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox
                      color='primary'
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId
                      }}
                    />
                  </TableCell>

                  <TableCell align={headCells[0].align || 'left'}>
                    {item.firstName}
                  </TableCell>
                  <TableCell align={headCells[1].align || 'left'}>
                    {item.lastName}
                  </TableCell>
                  <TableCell align={headCells[2].align || 'left'}>
                    {String(item.birthDate)}
                  </TableCell>
                  <TableCell align={headCells[3].align || 'left'}>
                    {item.ability}
                  </TableCell>
                </TableRow>
              )
            })}

            {/* create empty space if there are no items */}
            {!slicedData.length && (
              <TableRow
                style={{
                  height: '250px'
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e: any, newPage: number) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default EnhancedTable
