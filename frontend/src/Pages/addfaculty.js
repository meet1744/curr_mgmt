import "./addfacultyStyles.css";
import { getUserData } from "../Auth";
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import baseurl from "../Components/baseurl";

export default function Addfaculty() {
    let dept = getUserData().hodDto.dept;
    let token = "Bearer " + getUserData().token;

    const [faculty, setFaculty] = useState({ dept: dept, facultyId: "", facultyName: "", emailId: "", password: "" });

    const addfacultyform = (e) => {
        e.preventDefault();
        console.log(token);
        console.log(faculty);

        const addfacultyresponse = axios.post(`${baseurl}/HOD/addnewfaculty`, faculty, { headers: { "Authorization": token } });

        toast.promise(
            addfacultyresponse,
            {
                pending: {
                    render() {
                        return "Please Wait!!"
                    },
                    icon: "✋",
                },
                success: {
                    render() {
                        return `Faculty Added Successfully!!`
                    },
                    icon: "🚀",
                },
                error: {
                    render({ data }) {
                        console.log(data);
                        if (data.response.status === 400 || data.response.status === 404 || data.response.status === 401)
                            return data.response.data.status;
                        return 'Faculty with same Id already exists!!';
                    },
                    icon: "💥",
                }
            },
            {
                className: 'dark-toast',
                position: toast.POSITION.BOTTOM_RIGHT,
            }
        );

        // document.getAllElementsById('addFacultyForm').reset();
    }

    return (
        <>
            <ToastContainer />
            <div className="cont-1">
                <form onSubmit={addfacultyform} id="addFacultyForm">
                    <h3 className="label">ID:</h3>
                    <input type="text" onChange={(e) => { setFaculty({ ...faculty, facultyId: e.target.value }) }} value={faculty.id} />
                    <h3 className="label">Name:</h3>
                    <input type="text" onChange={(e) => { setFaculty({ ...faculty, facultyName: e.target.value }) }} value={faculty.name} />
                    <h3 className="label">Email:</h3>
                    <input type="email" onChange={(e) => { setFaculty({ ...faculty, emailId: e.target.value }) }} value={faculty.email} />
                    <h3 className="label">Password:</h3>
                    <input type="text" onChange={(e) => { setFaculty({ ...faculty, password: e.target.value }) }} value={faculty.password} />
                    <input type="submit" className="SubmitButton coolBeans" value="Add Faculty" />
                </form>
            </div>
        </>
    );
}