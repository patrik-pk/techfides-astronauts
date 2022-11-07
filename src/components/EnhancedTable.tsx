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
  Box,
  Checkbox,
  CircularProgress
} from '@mui/material'
import EnhancedTableHead, { HeadCell } from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

import {
  Astronaut,
  setSelectedAstronauts
} from '../redux/features/astronautSlice'

import { RootState } from '../redux/store'

export type Order = 'asc' | 'desc'
export type OrderBy = string | undefined

type SimpleTableProps = {
  headCells: HeadCell[]
  data: Array<any>
  defaultOrderBy?: OrderBy
}
const EnhancedTable = ({
  headCells,
  data,
  defaultOrderBy
}: SimpleTableProps) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<OrderBy>(defaultOrderBy)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const { selected, loading } = useSelector(
    (state: RootState) => state.astronaut
  )
  const dispatch = useDispatch()
  // const [selected, setSelectedAstronauts] = useState<Astronaut[]>([])

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const selectItem = (clickedItem: Astronaut) => {
    const selectedIds = selected.map((item: Astronaut) => item.id)

    const newSelected = selectedIds.includes(clickedItem.id)
      ? selected.filter((item: Astronaut) => item.id != clickedItem.id)
      : [...selected, clickedItem]

    dispatch(setSelectedAstronauts(newSelected))
  }

  const selectAllItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data
      dispatch(setSelectedAstronauts(newSelected))
      return
    }
    dispatch(setSelectedAstronauts([]))
  }

  // sort data first
  const copiedData = JSON.parse(JSON.stringify(data))

  const sortedData =
    typeof orderBy == 'string'
      ? copiedData.sort((a: any, b: any) => {
          let orderTypeVal = order == 'desc' ? 1 : -1

          if (b[orderBy] < a[orderBy]) {
            return -1 * orderTypeVal
          }
          if (b[orderBy] > a[orderBy]) {
            return 1 * orderTypeVal
          }
          return 0
        })
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

      <EnhancedTableToolbar selected={selected} />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-labelledby='tableTitle'>
          <EnhancedTableHead
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            selectedAmount={selected.length}
            itemsAmount={data.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={selectAllItems}
          />

          <TableBody>
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

                  {/* Keys are not always in correct order */}
                  {/* {Object.keys(item)
                    .filter(key => key != 'id')
                    .map((key, j) => (
                      <TableCell align={headCells[j].align || 'left'} key={j}>
                        {item[key]}
                      </TableCell>
                    ))} */}
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
