'use client'
import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  SortingState,
  useBlockLayout,
} from '@tanstack/react-table'
import { useSticky } from 'react-table-sticky'

import Filter from './Filter'
import { useEffect, useMemo, useState } from 'react'

const Table = ({ data }) => {
  const [sorting, setSorting] = useState()
  const [columns, setColumns] = useState([])
  const [columnPinning, setColumnPinning] = useState({})

  useEffect(() => {
    if (data.length) {
      const cols = Object?.keys(data[0])?.map((key) => ({
        header: key,
        footer: (props) => props.column.id,
        accessorKey: key,
        header: () => <span>{key}</span>,
      }))
      setColumns([...cols])
    }
  }, [data])

  const table = useReactTable({
    data,

    state: {
      sorting,
      columnPinning,
    },
    useSticky,
    useBlockLayout,
    onSortingChange: setSorting,
    columns,
    onColumnPinningChange: setColumnPinning,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    fixedColumns: true,
  })

  return (
    <div className="w-screen max-h-full px-12">
      <div style={{ maxWidth: '100%', height: '90%', overflow: 'scroll' }}>
        <table className=" shadow-md w-full overflow-scroll">
          <thead className="header">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="py-4 text-xs text-gray-700 uppercase border-b bg-gray-100">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`z-10  p-6 text-xs text-gray-700 uppercase bg-gray-50  ${
                        ['Kod', 'Nazwa', 'Kolor', 'Komentarze'].includes(header.id) && `sticky  z-10 overflow-hidden   top-0 stickyHeader-${header.id}`
                      }`}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(header.column.columnDef.header, header.getContext())}

                          {header.column.getCanFilter() ? (
                            <div className="mt-2">
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="mt-4 text-gray-900 whitespace-nowrap ">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: '1px solid #e5e7eb',
                  }}
                  className=" border-b "
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className={` text-xs  px-6 py-4 ${
                          ['Kod', 'Nazwa', 'Kolor', 'Komentarze'].includes(cell.column.id) && `sticky bg-white  z-10 overflow-hidden shadow stickyHeader-${cell.column.id}   top-0 `
                        }`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="h-2" />
      {columns.length !== 0 && (
        <div className="flex items-center w-full gap-2 justify-center py-12">
          <button className="border bg-gray-200 px-3 rounded p-1" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
            {'<<'}
          </button>
          <button className="border rounded p-1 bg-gray-200 px-3" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            {'<'}
          </button>
          <button className="border rounded p-1 bg-gray-200 px-3" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            {'>'}
          </button>
          <button className="border rounded p-1 bg-gray-200 px-3" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
            {'>>'}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            className="p-2 rounded"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default Table
