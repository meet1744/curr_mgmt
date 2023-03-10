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

  const [subject, setSubject] = useState({ dept: dept, DDUcode: "", semester: "", subjectName: "", facultyList: "", subSequence: "" });
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [faculties, setFaculties] = useState([]);


  const facultyOptions = faculties.map((f) => ({
    label: `${f.facultyId} - ${f.facultyName}`,
    value: `${f.facultyId} - ${f.facultyName}`
  }));
  const seqOption = [];
  const semOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
  ];


  const handleFacultyChange = (selectedOptions) => {
    setSelectedFaculties(selectedOptions);
  };


  useEffect(() => {
    axios.get(`${baseurl}/PC/getallfaculty`, { headers: { Authorization: token } })
      .then((res) => {
        setFaculties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const numbers = selectedFaculties.map((faculty) => faculty.label.split(" ")[0]);
    const f = numbers.map((number) => { return searchFacultyById(number) });
    setSubject({ ...subject, facultyList: f })
  }, [selectedFaculties]);


  const searchFacultyById = (facultyId) => {
    return faculties.find((faculty) => faculty.facultyId === facultyId);
  };


  const addsubjectform = (e) => {
    console.log(subject)
    e.preventDefault();
  }
  

  return (
    <>
      <div className='cont-3'>
        <form onSubmit={addsubjectform} >
          <h3 className="label">DDU ID:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, DDUcode: e.target.value }) }} value={subject.id} />
          <h3 className="label">Subject Name:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, subjectName: e.target.value }) }} value={subject.name} />
          <h3 className="label">Faculties:</h3>
          <Select options={facultyOptions} placeholder='Select faculties' styles={customStyles}
            onChange={handleFacultyChange}
            isMulti
            maxMenuHeight={150}
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
            <Select options={semOptions} placeholder='Select sem' styles={customStyles}
              onChange={(e) => { setSubject({ ...subject, semester: e.target.value }) }}
              menuPlacement='top'
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
            <Select options={seqOption} placeholder='Select sequence' styles={customStyles}
              onChange={(e) => { setSubject({ ...subject, subSequence: e.value }) }}
              menuPlacement='top'
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
