import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import { Worker } from '@react-pdf-viewer/core';
import axios from 'axios';
import baseurl from "../Components/baseurl";
import { getUserData } from "../Auth";
import "./pcsubjectdetailsStyles.css";
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


const PCSubjectdetails = () => {
  let token = "Bearer " + getUserData().token;
  let dept = getUserData().pcDto.dept;

  const [pcSubject, setPCSubject] = useState(JSON.parse(localStorage.getItem('pcsubject')) || []);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [seq, setSeq] = useState([]);
  const [alldept, setAllDept] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [viewPdf, setViewPdf] = useState(null);


  useEffect(() => {
    axios.post(`${baseurl}/PC/getallfaculty`, dept, { headers: { "Authorization": token } })
      .then((res) => {
        setFaculties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(`${baseurl}/PC/getremainingsubsequence/${pcSubject.semester}`, { headers: { "Authorization": token } }, pcSubject.semester)
      .then((res) => {
        const arr = res.data;
        arr.push(pcSubject.subSequence);
        arr.sort((a, b) => a - b);
        setSeq(arr);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(`${baseurl}/PC/getalldept`, { headers: { "Authorization": token } })
      .then((res) => {
        setAllDept(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);



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
  const subSequenceOptions = seq.map((s) => ({
    value: JSON.stringify(s),
    label: JSON.stringify(s)
  }));
  const deptOptions = alldept.map((d) => ({
    value: d,
    label: `${d.deptId} - ${d.deptName}`
  }));
  const facultyOptions = faculties.map((f) => ({
    label: `${f.facultyId} - ${f.facultyName}`,
    value: `${f.facultyId} - ${f.facultyName}`
  }));

  const defaultsem = () => {
    return semOptions[semOptions.findIndex(option => option.value === JSON.stringify(pcSubject.semester))]
  }

  const defaultseq = () => {
    return subSequenceOptions[subSequenceOptions.findIndex(option => option.value === JSON.stringify(pcSubject.subSequence))]
  }

  const defaultdept = () => {
    return deptOptions[deptOptions.findIndex(option => option.value === pcSubject.dept)];
  }

  const handleFacultyChange = (selectedOptions) => {
    setSelectedFaculties(selectedOptions);
  };


  const updatesubjectform = (e) => {
    e.preventDefault();
    console.log(pcSubject)
  }


  return (
    <div>
      <ToastContainer />
      <div className="subjectdetailcontainer">
        <form onSubmit={updatesubjectform} >
          <h3 className="label margint gap3">Subject Name:</h3>
          <input type="text" onChange={(e) => { setPCSubject({ ...pcSubject, subjectName: e.target.value }) }} value={pcSubject.subjectName || ''} />
          <h3 className="label margint gap3">Semester:</h3>
          <Select options={semOptions} placeholder='Select semester' styles={customStyles}
            value={defaultsem()}
            onChange={(e) => { setPCSubject({ ...pcSubject, semester: e.value }) }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'grey',
              },
            })}
          />
          <h3 className="label margint gap3">subSequence:</h3>
          <Select options={subSequenceOptions} placeholder='Select sequence' styles={customStyles}
            value={defaultseq()}
            onChange={(e) => { setPCSubject({ ...pcSubject, subSequence: e.value }) }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'grey',
              },
            })}
          />
          <h3 className="label margint">AICTEcode:</h3>
          <input type="text" onChange={(e) => { setPCSubject({ ...pcSubject, aictecode: e.target.value }) }} value={pcSubject.aictecode || ''} />
          <h3 className="label margint">effectiveDate:</h3>
          <input type="text" onChange={(e) => { setPCSubject({ ...pcSubject, effectiveDate: e.target.value }) }} value={pcSubject.effectiveDate || ''} />
          <h3 className="label margint">removedDate:</h3>
          <input type="text" onChange={(e) => { setPCSubject({ ...pcSubject, removedDate: e.target.value }) }} value={pcSubject.removedDate || ''} />
          <h3 className="label margint">subjectType:</h3>
          <input type="text" onChange={(e) => { setPCSubject({ ...pcSubject, subjectType: e.target.value }) }} value={pcSubject.subjectType || ''} />
          <h3 className="label margint">subjectTypeExplanation:</h3>
          <input type="text" onChange={(e) => { setPCSubject({ ...pcSubject, subjectTypeExplanation: e.target.value }) }} value={pcSubject.subjectTypeExplanation || ''} />
          <h3 className="label margint">theoryMarks:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, theoryMarks: e.target.value }) }} value={pcSubject.theoryMarks || ''} />
          <h3 className="label margint">sessionalMarks:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, sessionalMarks: e.target.value }) }} value={pcSubject.sessionalMarks || ''} />
          <h3 className="label margint">termworkMarks:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, termworkMarks: e.target.value }) }} value={pcSubject.termworkMarks || ''} />
          <h3 className="label margint">practicalMarks:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, practicalMarks: e.target.value }) }} value={pcSubject.practicalMarks || ''} />
          <h3 className="label margint">totalMarks:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, totalMarks: e.target.value }) }} value={pcSubject.totalMarks || ''} />
          <h3 className="label margint">LectureHours:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, lectureHours: e.target.value }) }} value={pcSubject.lectureHours || ''} />
          <h3 className="label margint">tutorial:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, tutorial: e.target.value }) }} value={pcSubject.tutorial || ''} />
          <h3 className="label margint">PracticalHours:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, practicalHours: e.target.value }) }} value={pcSubject.practicalHours || ''} />
          <h3 className="label margint">totalHours:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, totalHours: e.target.value }) }} value={pcSubject.totalHours || ''} />
          <h3 className="label margint">lectureAndTheoryCredit:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, lectureAndTheoryCredit: e.target.value }) }} value={pcSubject.lectureAndTheoryCredit || ''} />
          <h3 className="label margint">practicalCredit:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, practicalCredit: e.target.value }) }} value={pcSubject.practicalCredit || ''} />
          <h3 className="label margint">totalCredit:</h3>
          <input type="number" onChange={(e) => { setPCSubject({ ...pcSubject, totalCredit: e.target.value }) }} value={pcSubject.totalCredit || ''} />
          <h3 className="label margint">parentDept:</h3>
          <Select options={deptOptions} placeholder='select parent dept' styles={customStyles}
            value={defaultdept()}
            onChange={(e) => { setPCSubject({ ...pcSubject, parentDept: e.value }) }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'grey',
              },
            })}
          />
          <h3 className="label margint">extraInfo:</h3>
          <input type="text" onChange={(e) => { setPCSubject({ ...pcSubject, extraInfo: e.target.value }) }} value={pcSubject.extraInfo || ''} />
          <h3 className="label margint">Faculties:</h3>
          <Select options={facultyOptions} placeholder='Select faculties' styles={customStyles}
            onChange={handleFacultyChange}
            isMulti
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'grey',
              },
            })}
          />
          <button type="submit" className="SubmitButton coolBeans margint">Update</button>
        </form>

        <h4>View PDF</h4>
        <div className='pdf-container'>
          {viewPdf && <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
            <Viewer fileUrl={viewPdf} plugins={[defaultLayoutPluginInstance]} />
          </Worker>}
          {!viewPdf && <>No pdf file uploaded</>}
        </div>
      </div>
    </div >
  )
}

export default PCSubjectdetails
