import React from 'react'
import "./addsubjectStyles.css";
import Select from 'react-select';
import { getUserData } from "../Auth";
import { useState } from "react";
import axios from 'axios';

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

  // let dept = getUserData().PCDto.dept;
  // let token = "Bearer " + getUserData().token;

  const [subject, setSubject] = useState({ dept: "dept", DDUcode: "", subjectName: "", facultyList: "" });

  const [faculties, setFaculties] = useState([]);
  const facultyOptions = faculties.map((f) => ({
    label: f,
    value: f
  }));
  const facultyhandle = (option) => {
    setFaculties(option);
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
            value={faculties}
            onChange={(e) => { facultyhandle(e.target.value); }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'grey',
              },
            })}
          />
          <input type="submit" className="SubmitButton coolBeans" value="Add Faculty" />
        </form>
      </div>
    </>
  );
}

export default Addsubject;
