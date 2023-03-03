import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { Columns } from '../Components/Columns'
import './SubjectsStyles.css'

const Subjects = ({ role }) => {

  const columns = useMemo(() => Columns, [])
  const data = useMemo(() => role, [role])


  const tableInstance = useTable({
    columns,
    data
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = tableInstance

  return (
    <>
      <div className=''>
        <table {...getTableProps()}>
          <thead>
            {
              headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))
                  }
                </tr>
              ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {
              rows && rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Subjects
