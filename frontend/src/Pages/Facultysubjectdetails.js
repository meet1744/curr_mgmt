import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import { Worker } from '@react-pdf-viewer/core';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import baseurl from "../Components/baseurl";
import { getUserData } from "../Auth";
import "./pcsubjectdetailsStyles.css";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

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


const FacultySubjectdetails = () => {
    let token = "Bearer " + getUserData().token;
    let dept = getUserData().facultyDto.dept;
    const [facultySubject, setFacultySubject] = useState(JSON.parse(localStorage.getItem('facultysubject')) || []);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [seq, setSeq] = useState([]);
    const [alldept,setAllDept] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfFileError, setPdfFileError] = useState('');
    const [viewPdf, setViewPdf] = useState(null);


    useEffect(() => {
        axios.get(`${baseurl}/Faculty/getremainingsubsequence/${facultySubject.semester}`, { headers: { "Authorization": token } }, facultySubject.semester)
            .then((res) => {
                const arr = res.data;
                arr.push(facultySubject.subSequence);
                arr.sort((a, b) => a - b);
                setSeq(arr);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(`${baseurl}/Faculty/getalldept`,{header: {"Authorization": token}})
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


    const fileType = ['application/pdf'];

    const handlePdfFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                reader.onloadend = (e) => {
                    setPdfFile(e.target.result);
                    setPdfFileError('');
                }
            }
            else {
                setPdfFile(null);
                setPdfFileError('Please select valid pdf file');
            }
        }
        else {
            console.log('select your file');
        }
        handlePdfFileView();
        console.log(pdfFile);
    }


    const handlePdfFileView = () => {
        if (pdfFile !== null) {
            setViewPdf(pdfFile);
        }
        else {
            setViewPdf(null);
        }
    }

    const defaultsem = () => {
        return semOptions[semOptions.findIndex(option => option.value === JSON.stringify(facultySubject.semester))]
    }

    const defaultseq = () => {
        return subSequenceOptions[subSequenceOptions.findIndex(option => option.value === JSON.stringify(facultySubject.subSequence))]
    }

    const updatesubjectform = () => {

    }


    return (
        <div>
            <ToastContainer />
            <div className="subjectdetailcontainer">
                <form onSubmit={updatesubjectform} >
                    <h3 className="label margint gap3">Subject Name:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, subjectName: e.target.value }) }} value={facultySubject.subjectName || undefined} />
                    <h3 className="label margint gap3">Semester:</h3>
                    <Select options={semOptions} placeholder='Select semester' styles={customStyles}
                        value={defaultsem()}
                        onChange={(e) => { setFacultySubject({ ...facultySubject, semester: e.target.value }) }}
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
                        onChange={(e) => { setFacultySubject({ ...facultySubject, subSequence: e.target.value }) }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'grey',
                            },
                        })}
                    />
                    <h3 className="label margint">AICTEcode:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, AICTEcode: e.target.value }) }} value={facultySubject.AICTEcode || undefined} />
                    <h3 className="label margint">effectiveDate:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, effectiveDate: e.target.value }) }} value={facultySubject.effectiveDate || undefined} />
                    <h3 className="label margint">removedDate:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, removedDate: e.target.value }) }} value={facultySubject.removedDate || undefined} />
                    <h3 className="label margint">subjectType:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, subjectType: e.target.value }) }} value={facultySubject.subjectType || undefined} />
                    <h3 className="label margint">subjectTypeExplanation:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, subjectTypeExplanation: e.target.value }) }} value={facultySubject.subjectTypeExplanation || undefined} />
                    <h3 className="label margint">theoryMarks:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, theoryMarks: e.target.value }) }} value={facultySubject.theoryMarks || undefined} />
                    <h3 className="label margint">sessionalMarks:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, sessionalMarks: e.target.value }) }} value={facultySubject.sessionalMarks || undefined} />
                    <h3 className="label margint">termworkMarks:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, termworkMarks: e.target.value }) }} value={facultySubject.termworkMarks || undefined} />
                    <h3 className="label margint">practicalMarks:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, practicalMarks: e.target.value }) }} value={facultySubject.practicalMarks || undefined} />
                    <h3 className="label margint">totalMarks:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, totalMarks: e.target.value }) }} value={facultySubject.totalMarks || undefined} />
                    <h3 className="label margint">LectureHours:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, LectureHours: e.target.value }) }} value={facultySubject.LectureHours || undefined} />
                    <h3 className="label margint">tutorial:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, tutorial: e.target.value }) }} value={facultySubject.tutorial || undefined} />
                    <h3 className="label margint">PracticalHours:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, PracticalHours: e.target.value }) }} value={facultySubject.PracticalHours || undefined} />
                    <h3 className="label margint">totalHours:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, totalHours: e.target.value }) }} value={facultySubject.totalHours || undefined} />
                    <h3 className="label margint">lectureAndTheoryCredit:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, lectureAndTheoryCredit: e.target.value }) }} value={facultySubject.lectureAndTheoryCredit || undefined} />
                    <h3 className="label margint">practicalCredit:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, practicalCredit: e.target.value }) }} value={facultySubject.practicalCredit || undefined} />
                    <h3 className="label margint">totalCredit:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, totalCredit: e.target.value }) }} value={facultySubject.totalCredit || undefined} />
                    <h3 className="label margint">dept:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, dept: e.target.value }) }} value={facultySubject.dept || undefined} />
                    <h3 className="label margint">parentDept:</h3>
                    <Select options={deptOptions} placeholder='select parent dept' styles={customStyles}
                        onChange={(e) => { setFacultySubject({ ...facultySubject, parentDept: e.target.value }) }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'grey',
                            },
                        })}
                    />
                    <h3 className="label margint">extraInfo:</h3>
                    <input type="text" onChange={(e) => { setFacultySubject({ ...facultySubject, extraInfo: e.target.value }) }} value={facultySubject.extraInfo || undefined} />
                    <input type="file" accept='.pdf' className='form-control margint' onChange={handlePdfFileChange} />
                    {pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
                    <br />
                    <button type="submit" className="SubmitButton coolBeans margint">Update</button>
                </form>


                <h4>View PDF</h4>
                <div className='pdf-container'>
                    {viewPdf && <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                        <Viewer fileUrl={viewPdf} plugins={[defaultLayoutPluginInstance]} />
                    </Worker>}
                    {!viewPdf && <>No pdf file selected</>}
                </div>
            </div>
        </div >
    )
}

export default FacultySubjectdetails
