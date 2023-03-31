import React from 'react'
import "./addsubjectStyles.css";
import Select from 'react-select';
import { getUserData } from "../Auth";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from "react";
import baseurl from "../Components/baseurl";
import { fetchPCAuth } from './../Components/Verify';
import { useNavigate } from 'react-router-dom';
import OnHoverScrollContainer from "./../Components/CustomeScroll";

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
  let token;

  let dept=getUserData().pcDto.dept;

  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetchPCAuth(navigate)
      dept = getUserData().pcDto.dept;
      token = "Bearer " + getUserData().token;
      setSubject({ ...subject, dept: dept });
    } catch (err) { }
  }, [])


  const [subject, setSubject] = useState({ dduCode: "", subjectName: "", facultyList: "", subSequence: "" });
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [selectedsem, setSelectedsem] = useState({});
  const [seq, setSeq] = useState([]);
  const [faculties, setFaculties] = useState([]);


  const facultyOptions = faculties.map((f) => ({
    label: `${f.facultyId} - ${f.facultyName}`,
    value: `${f.facultyId} - ${f.facultyName}`
  }));
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
  const seqOptions = seq.map((s) => ({
    label: s,
    value: s
  }));

  useEffect(() => {
    dept = getUserData().pcDto.dept;
    token = "Bearer " + getUserData().token;
    axios.post(`${baseurl}/PC/getallfaculty`, dept, { headers: { "Authorization": token } })
      .then((res) => {
        setFaculties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const numbers = selectedFaculties.map((faculty) => faculty.label.split(" ")[0]);
    const f = numbers.map((number) => { return searchFacultyById(number) });
    setSubject({ ...subject, facultyList: f })
    // setSubject({...subject,dept:dept});
  }, [selectedFaculties]);

  useEffect(() => {
    if (selectedsem.label) {
      setSubject({ ...subject, semester: selectedsem.label });
    }
    // setSubject({...subject,dept:dept});
  }, [selectedsem]);



  const handleFacultyChange = (selectedOptions) => {
    setSelectedFaculties(selectedOptions);
  };


  const handlesemchange = (selectedOptions) => {
    dept = getUserData().pcDto.dept;
    token = "Bearer " + getUserData().token;
    setSelectedsem(selectedOptions);
    const semester = selectedOptions ? selectedOptions.label : '';
    setSubject({ ...subject, semester: semester });
    setSubject({...subject,dept:dept});
    console.log(subject);
    axios.get(`${baseurl}/PC/getremainingsubsequence/${semester}`, { headers: { "Authorization": token } }, semester)
      .then((res) => {
        setSeq(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const searchFacultyById = (facultyId) => {
    return faculties.find((faculty) => faculty.facultyId === facultyId);
  };


  const addsubjectform = (e) => {
    console.log(subject);
    dept = getUserData().pcDto.dept;
    token = "Bearer " + getUserData().token;
    setSubject({...subject,dept:dept});
    const addsubjectresponse = axios.post(`${baseurl}/PC/addnewsubject`, subject, { headers: { "Authorization": token } });
    toast.promise(
      addsubjectresponse,
      {
        pending: {
          render() {
            return "Please Wait!!"
          },
          icon: "✋",
        },
        success: {
          render() {
            return `Subject Added Successfully!!`
          },
          icon: "🚀",
        },
        error: {
          render({ data }) {
            console.log(data);
            if (data.response.status === 400 || data.response.status === 404 || data.response.status === 401)
              return data.response.data.status;
            return `Subject with same DDU code already exists!!`
          },
          icon: "💥",
        }
      },
      {
        className: 'dark-toast',
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
    e.preventDefault();
  }


  const customNoOptionsMessage = () => {
    return "Select sem first!";
  };


  return (
    <>
      <div className="title">Add Subject</div>
      <ToastContainer />
        <div className='cont-3'>
          <OnHoverScrollContainer>
            <form onSubmit={addsubjectform} >
              <h3 className="label">DDU ID:</h3>
              <input type="text" onChange={(e) => { setSubject({ ...subject, dduCode: e.target.value }) }} value={subject.id} />
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
                  onChange={handlesemchange}
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
                <Select options={seqOptions} noOptionsMessage={customNoOptionsMessage} placeholder='Select sequence' styles={customStyles}
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
          </OnHoverScrollContainer>
        </div>
      </>
      );
}

      export default Addsubject;