import React from 'react'
import Select from 'react-select';
import { useEffect, useState } from "react";
import axios from "axios";
import baseurl from "../Components/baseurl";
import { getUserData } from "../Auth";
import { ToastContainer, toast } from 'react-toastify';
import { fetchHODAuth } from './../Components/Verify';
import { useNavigate } from 'react-router-dom';


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

const AppointPC = () => {
    let token;
    let dept;
    const navigate = useNavigate();
    const [programCoordinator, setProgramCoordinator] = useState([]);
    const [faculties, setFaculties] = useState([]);
    let programcoordinatorsOption = faculties.map((f) => ({
        label: `${f.facultyId} - ${f.facultyName}`,
        value: `${f.facultyId} - ${f.facultyName}`
    }));
    useEffect(() => {
        try {
            fetchHODAuth(navigate)
            dept = getUserData().hodDto.dept;
            token = "Bearer " + getUserData().token;
            axios.post(`${baseurl}/HOD/getallfaculty`, dept, { headers: { Authorization: token } })
                .then((res) => {
                    setFaculties(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) { }
    }, []);

    const appointPChandle = (option) => {
        setProgramCoordinator(option);
    }
    // const searchFacultyById = (facultyId) => {
    //     return faculties.find((faculty) => faculty.facultyId === facultyId);
    // };
    const appointPCform = (e) => {
        e.preventDefault();
        // const pc = searchFacultyById(programCoordinator.split("-")[0].trim());
        const facultyid = programCoordinator.split("-")[0].trim();
        // console.log(pc);
        const addpcresponse = axios.get(`${baseurl}/HOD/appointpc/${facultyid}`, { headers: { "Authorization": token } }, facultyid);
        toast.promise(
            addpcresponse,
            {
                pending: {
                    render() {
                        return "Please Wait!!"
                    },
                    icon: "✋",
                },
                success: {
                    render() {
                        return `Program Coordinator Appointed Successfully!!`
                    },
                    icon: "🚀",
                },
                error: {
                    render({ data }) {
                        console.log(data);
                        if (data.response.status === 400 || data.response.status === 404 || data.response.status === 401)
                            return data.response.data.status;
                        return `Program coordinator already exists!!`
                    },
                    icon: "💥",
                }
            },
            {
                className: 'dark-toast',
                position: toast.POSITION.BOTTOM_RIGHT,
            }
        );
    }

    return (
        <>
            <div className="title">Appoint Program Coordinator</div>
            <ToastContainer />
            <div className='container'>
                <form onSubmit={appointPCform} >
                    <h3 className="label margint">Faculty:</h3>
                    <Select options={programcoordinatorsOption} placeholder='Select program coordinator to appoint' styles={customStyles}
                        onChange={(e) => { appointPChandle(e.value); }}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: 'grey',
                            },
                        })}
                    />
                    <button type="submit" className="SubmitButton coolBeans margint">Appoint</button>
                </form>
            </div>
        </>
    )
}

export default AppointPC
