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

    const [subject, setSubject] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const subjectsOption = subjects.map((s) => ({
        label: `${s.DDUcode} - ${s.subjectName} , sem - ${s.semester}`,
        value: `${s.DDUcode} - ${s.subjectName} , sem - ${s.semester}`
    }));

    useEffect(() => {

    }, []);

    const deletesubjecthandle = (option) => {
        setSubject(option);
    }

    const updatesubjectform = (e) => {
        e.preventDefault();

    }

    return (
        <div>
            <ToastContainer />
            <div className="container">
                <form onSubmit={updatesubjectform} >
                    <h3 className="label margint">Subjects:</h3>
                    <Select options={subjectsOption} placeholder='Select subject to update' styles={customStyles}
                        onChange={(e) => { deletesubjecthandle(e.value); }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'grey',
                            },
                        })}
                    />
                    <button type="submit" className="SubmitButton coolBeans margint">Delete</button>
                </form>
            </div>
        </div>
    )
}

export default Updatesubject
