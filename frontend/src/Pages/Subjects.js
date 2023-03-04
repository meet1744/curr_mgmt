import React, { useMemo, useEffect, useState } from 'react'
import { useTable } from 'react-table'
import { SubjectColumns } from '../Components/SubjectColumns'
import MOCK_DATA from '../Components/MOCK_DATA.json'
import './SubjectsStyles.css'

const Subjects = ({ role }) => {

  const [subjects, setSubjects] = useState([]);

  const columns = useMemo(() => SubjectColumns, [])
  const data = useMemo(() => subjects, [])

  const tableInstance = useTable({
    columns,
    data
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = tableInstance


  useEffect(() => {
    
  },[]);




  return (
    <>
      <div className='subjectscont'>
        <table {...getTableProps()}>
          <thead>
            {
              headerGroups && headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))
                  }
                </tr>
              ))
            }
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
