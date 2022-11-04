import React, { useState } from 'react'
import {
  TableContainer,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Box,
  Checkbox
} from '@mui/material'
import EnhancedTableHead, { HeadCell } from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'

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
  const [selected, setSelected] = useState<any[]>([]) // selected contains array of id's

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

  const selectItem = (id: any) => {
    // remove id from selected if it contains it, otherwise add the id to selected
    const newSelected: any[] = selected.includes(id)
      ? selected.filter(selectedId => selectedId != id)
      : [...selected, id]

    setSelected(newSelected)
  }

  const selectAllItems = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map(item => item.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  // sort data first
  const sortedData =
    typeof orderBy == 'string'
      ? data.sort((a: any, b: any) => {
          let orderTypeVal = order == 'desc' ? 1 : -1

          if (b[orderBy] < a[orderBy]) {
            return -1 * orderTypeVal
          }
          if (b[orderBy] > a[orderBy]) {
            return 1 * orderTypeVal
          }
          return 0
        })
      : data

  // then slice sorted data according to pagination
  const slicedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <Paper>
      <EnhancedTableToolbar selectedAmount={selected.length} />
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
            {slicedData.map((item: any, i) => {
              const isItemSelected = selected.indexOf(item.id) != -1
              const labelId = `enhanced-table-checkbox-${i}`

              return (
                <TableRow
                  hover
                  onClick={() => selectItem(item.id)}
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

                  {Object.keys(item)
                    .filter(key => key != 'id')
                    .map((key, j) => (
                      <TableCell align={headCells[j].align || 'left'} key={j}>
                        {item[key]}
                      </TableCell>
                    ))}
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
