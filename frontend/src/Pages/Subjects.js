import React, { useMemo, useEffect, useState } from 'react'
import { useTable } from 'react-table'
import { SubjectColumns } from '../Components/SubjectColumns'
import './SubjectsStyles.css'
import axios from 'axios';
import baseurl from "../Components/baseurl";
import { getUserData } from "../Auth";
import OnHoverScrollContainer from "./../Components/CustomeScroll";
import { useNavigate } from "react-router-dom";
import { fetchFacultyAuth,fetchHODAuth,fetchPCAuth } from './../Components/Verify';

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
  const navigate = useNavigate();

  const tableInstance = useTable({
    columns,
    data
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = tableInstance


  useEffect(() => {
    if(getUserData()===undefined){
      navigate("/roles");
    }
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
      <div className="title">View Subjects</div>
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
