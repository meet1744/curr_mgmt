import React from 'react'
import "./addsubjectStyles.css";
import Select from 'react-select';
import { getUserData } from "../Auth";
import axios from 'axios';
import { useEffect, useState } from "react";
import baseurl from "../Components/baseurl";

const customStyles = {
  valueContainer: (base) => ({
    ...base,
    justifyContent: 'left',
  }),
  container: (base) => ({
    ...base,
    width: '80%',
    margin: 'auto'
  }),
  control: (base) => ({
    ...base,
    maxHeight: "50px",
    cursor: "pointer",
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "black" : "white",
    cursor: "pointer",
    borderRadius: 3,
    '&:hover': {
      backgroundColor: "grey",
      color: "white",
      borderRadius: 0,
    }
  })
};

const Addsubject = () => {

  let dept = getUserData().pcDto.dept;
  let token = "Bearer " + getUserData().token;

  const [subject, setSubject] = useState({ dept: dept, DDUcode: "", subjectName: "", facultyList: "", subSequence: "" });

  const [faculties, setFaculties] = useState([]);
  const [selected,setSelected] = useState();
  const facultyOptions = faculties.map((f) => ({
    // label: f,
    // value: f
    label: `${f.facultyId} - ${f.facultyName}`,
    value: `${f.facultyId} - ${f.facultyName}`
  }));
  useEffect(() => {
    axios.get(`${baseurl}/PC/getallfaculty`, { headers: { Authorization: token } })
        .then((res) => {
            setFaculties(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}, []);
  const facultyhandle = (option) => {
    setSelected(option);
  }
  const addsubjectform = () => {

  }

  return (
    <>
      <div className='cont-3'>
        <form onSubmit={addsubjectform} >
          <h3 className="label">Subject ID:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, facultyId: e.target.value }) }} value={subject.id} />
          <h3 className="label">Subject Name:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, facultyName: e.target.value }) }} value={subject.name} />
          <h3 className="label">Faculties:</h3>
          <Select options={facultyOptions} placeholder='Select faculties' styles={customStyles}
            onChange={(e) => { facultyhandle(e.target.value); }}
            value={selected}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'grey',
              },
              
            })}
            
          />
          <div className='block'>
            <h3 className="label">Sem:</h3>
            <Select options={facultyOptions} placeholder='Select sem' styles={customStyles}
              onChange={(e) => { facultyhandle(e.target.value); }}
              isMulti
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: 'grey',
                },
              })}
            />
          </div>
          <div className='block'>
            <h3 className="label">Sequence:</h3>
            <Select options={facultyOptions} placeholder='Select sequence' styles={customStyles}
              onChange={(e) => { facultyhandle(e.target.value); }}
              
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: 'grey',
                },
              })}
            />
          </div>
          <input type="submit" className="SubmitButton coolBeans" value="Add Subject" />
        </form>
      </div>
    </>
  );
}

export default Addsubject;
