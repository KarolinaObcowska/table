import React from 'react'

const Filter = ({ column, table }) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return <input type="text" value={columnFilterValue ?? ''} onChange={(e) => column.setFilterValue(e.target.value)} placeholder={`Search...`} className="w-full p-1 border shadow rounded" />
}

export default Filter
