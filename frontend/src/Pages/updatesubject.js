import React from 'react'
import Select from 'react-select';
import { useEffect, useState } from "react";
import axios from "axios";
// import "./deletefacultyStyles.css";
import { getUserData } from "../Auth";
import baseurl from "../Components/baseurl";
import { ToastContainer, toast } from 'react-toastify';

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

const Updatesubject = () => {

    let token = "Bearer " + getUserData().token;
    let dept = getUserData().pcDto.dept;
    console.log(dept);
    const [subject, setSubject] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const subjectsOption = subjects.map((s) => ({
        label: `${s.dduCode} - ${s.subjectName} , sem - ${s.semester}`,
        value: `${s.dduCode} - ${s.subjectName} , sem - ${s.semester}`
    }));

    useEffect(() => {
        axios.post(`${baseurl}/PC/getallsubjects`, dept, { headers: { "Authorization": token } })
            .then((res) => {
                setSubjects(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const updatesubjecthandle = (option) => {
        setSubject(option);
    }

    const updatesubjectform = (e) => {
        axios.get(`${baseurl}/Pdf/createpdf`, { headers: { "Authorization": token } })
            .then((res) => {

                // var data = new Blob([res.data], { type: 'application/pdf' });
    
                // var tempLink = document.createElement('a');
                // tempLink.href = window.URL.createObjectURL(data);
                
                // tempLink.setAttribute('download', 'filename.pdf');
                // tempLink.click();
                console.log(res.data);
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'filename.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();




            })
            .catch((error) => {
                console.log(error);
            });
        e.preventDefault();

    }

    return (
        <div>
            <ToastContainer />
            <div className="container">
                <form onSubmit={updatesubjectform} >
                    <h3 className="label margint">Subjects:</h3>
                    <Select options={subjectsOption} placeholder='Select subject to update' styles={customStyles}
                        onChange={(e) => { updatesubjecthandle(e.value); }}
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
        </div>
    )
}

export default Updatesubject
