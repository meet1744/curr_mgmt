import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import "./pcsubjectdetailsStyles.css";

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


const PCSubjectdetails = ({PCSubjectdetails}) => {


  const [subject, setSubject] = useState({});
  const [semester, Semester] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);



  const facultyOptions = faculties.map((f) => ({
    label: f,
    value: f
  }));


  const facultyhandle = (option) => {
    setFaculties(option);
  }

  const semesterOptions = semester.map((s) => ({
    label: ``,
    value: ``
  }));
  const subSequenceOptions = semester.map((s) => ({
    label: ``,
    value: ``
  }));


  const updatesubjectform = (e) => {

  }


  return (
    <div>
      <ToastContainer />
      <div className="subjectdetailcontainer">
        <form onSubmit={updatesubjectform} >
          <h3 className="label margint gap3">Subject Name:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, subjectName: e.target.value }) }} value={subject.subjectName} />
          <h3 className="label margint gap3">Semester:</h3>
          <Select options={semesterOptions} placeholder='Select semester' styles={customStyles}
            onChange={(e) => { setSubject({ ...subject, semester: e.target.value }) }}
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
            onChange={(e) => { setSubject({ ...subject, subSequence: e.target.value }) }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: 'grey',
              },
            })}
          />
          <h3 className="label margint">AICTEcode:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, AICTEcode: e.target.value }) }} value={subject.AICTEcode} />
          <h3 className="label margint">effectiveDate:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, effectiveDate: e.target.value }) }} value={subject.effectiveDate} />
          <h3 className="label margint">removedDate:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, removedDate: e.target.value }) }} value={subject.removedDate} />
          <h3 className="label margint">subjectType:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, subjectType: e.target.value }) }} value={subject.subjectType} />
          <h3 className="label margint">subjectTypeExplanation:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, subjectTypeExplanation: e.target.value }) }} value={subject.subjectTypeExplanation} />
          <h3 className="label margint">theoryMarks:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, theoryMarks: e.target.value }) }} value={subject.theoryMarks} />
          <h3 className="label margint">sessionalMarks:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, sessionalMarks: e.target.value }) }} value={subject.sessionalMarks} />
          <h3 className="label margint">termworkMarks:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, termworkMarks: e.target.value }) }} value={subject.termworkMarks} />
          <h3 className="label margint">practicalMarks:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, practicalMarks: e.target.value }) }} value={subject.practicalMarks} />
          <h3 className="label margint">totalMarks:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, totalMarks: e.target.value }) }} value={subject.totalMarks} />
          <h3 className="label margint">LectureHours:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, LectureHours: e.target.value }) }} value={subject.LectureHours} />
          <h3 className="label margint">tutorial:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, tutorial: e.target.value }) }} value={subject.tutorial} />
          <h3 className="label margint">PracticalHours:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, PracticalHours: e.target.value }) }} value={subject.PracticalHours} />
          <h3 className="label margint">totalHours:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, totalHours: e.target.value }) }} value={subject.totalHours} />
          <h3 className="label margint">lectureAndTheoryCredit:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, lectureAndTheoryCredit: e.target.value }) }} value={subject.lectureAndTheoryCredit} />
          <h3 className="label margint">practicalCredit:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, practicalCredit: e.target.value }) }} value={subject.practicalCredit} />
          <h3 className="label margint">totalCredit:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, totalCredit: e.target.value }) }} value={subject.totalCredit} />
          <h3 className="label margint">dept:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, dept: e.target.value }) }} value={subject.dept} />
          <h3 className="label margint">parentDept:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, parentDept: e.target.value }) }} value={subject.parentDept} />
          <h3 className="label margint">extraInfo:</h3>
          <input type="text" onChange={(e) => { setSubject({ ...subject, extraInfo: e.target.value }) }} value={subject.extraInfo} />
          <h3 className="label margint">Faculties:</h3>
          <Select options={facultyOptions} placeholder='Select faculties' styles={customStyles}
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
          <button type="submit" className="SubmitButton coolBeans margint">Update</button>
        </form>
      </div>
    </div >
  )
}

export default PCSubjectdetails
