import React, { useMemo, useEffect, useState } from 'react'
import { useTable } from 'react-table'
import { SubjectColumns } from '../Components/SubjectColumns'
import MOCK_DATA from '../Components/MOCK_DATA.json'
import './SubjectsStyles.css'
import axios from 'axios';
import baseurl from "../Components/baseurl";
import { getUserData } from "../Auth";

const Subjects = () => {
  let token = "Bearer " + getUserData().token;
  let role = localStorage.getItem('role');
  let dept;
  const userData = getUserData();
  if (userData.hodDto !== null) {
    dept = userData.hodDto.dept;
  } else if (userData.pcDto !== null) {
    dept = userData.pcDto.dept;
  } else if (userData.facultyDto !== null) {
    dept = userData.facultyDto.dept;
  }

  let urlrole = (role === "hod") ? ("HOD") : ((role === "pc") ? ("PC") : ("Faculty"))

  const [subjects, setSubjects] = useState([]);

  const columns = useMemo(() => SubjectColumns, [subjects])
  const data = useMemo(() => subjects, [subjects])

  const tableInstance = useTable({
    columns,
    data
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = tableInstance


  useEffect(() => {
    axios.post(`${baseurl}/${urlrole}/getallsubjects`, dept, { headers: { "Authorization": token } })
      .then((res) => {
        console.log("inside axios", res.data)
        setSubjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




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
