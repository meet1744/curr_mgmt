import React from 'react'
import Select from 'react-select';
import { useEffect, useState } from "react";
import axios from "axios";
import "./deletefacultyStyles.css";
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

const Deletefaculty = () => {
    let token = "Bearer " + getUserData().token;
    const [faculty, setFaculty] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const facultiesOption = faculties.map((f) => ({
        label: `${f.facultyId} - ${f.facultyName}`,
        value: `${f.facultyId} - ${f.facultyName}`
    }));
    useEffect(() => {
        axios.get(`${baseurl}/HOD/getallfaculty`, { headers: { Authorization: token } })
            .then((res) => {
                setFaculties(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const deletefacultyhandle = (option) => {
        setFaculty(option);
    }
    const deletefacultyform = (e) => {
        e.preventDefault();
        const facultyid = faculty.split("-")[0].trim();
        console.log(facultyid);
        console.log(token);
        const deletefacultyresponse = axios.delete(`${baseurl}/HOD/getfaculty/${facultyid}`, { headers: { "Authorization": token }},facultyid )
            .then(response => console.log(response))
            .catch(error => console.error(error));
        toast.promise(
            deletefacultyresponse,
            {
                pending: {
                    render() {
                        return "Please Wait!!"
                    },
                    icon: "✋",
                },
                success: {
                    render() {
                        return `Faculty deleted Successfully!!`
                    },
                    icon: "🚀",
                },
                error: {
                    render({ data }) {
                        console.log(data);
                        if (data.response.status === 400 || data.response.status === 404 || data.response.status === 401)
                            return data.response.data.status;
                        return `Something went wrong!!`
                    },
                    icon: "💥",
                }
            },
            {
                className: 'dark-toast',
                position: toast.POSITION.BOTTOM_RIGHT,
            }
        );
        // axios.delete(`${baseurl}/faculties/${facultyid}`)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }
    return (
        <>
            <ToastContainer/>
            <div className="container">
                <form onSubmit={deletefacultyform} >
                    <h3 className="label margint">Faculty:</h3>
                    <Select options={facultiesOption} placeholder='Select faculty to delete' styles={customStyles}
                        onChange={(e) => { deletefacultyhandle(e.value); }}
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
        </>
    )
}

export default Deletefaculty;
