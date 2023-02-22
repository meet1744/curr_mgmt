// import React from "react";
import "./addfacultyStyles.css";
import { getUserData } from "../Auth";
import React, { useState } from 'react';
import axios from 'axios';

export default function Addfaculty() {
    let dept=getUserData().hodDto.dept;
    let token="Bearer "+getUserData().token;

    const [faculty, setFaculty] = useState({dept:dept,facultyId:"",facultyName:"",emailId:"",password:""});

    const addfacultyform = (e) => {
        e.preventDefault();
        console.log(token);
        console.log(faculty);
        
        axios.post('http://localhost:8080/HOD/addfaculty',faculty,{headers : {Authorization:token}})
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }

    return (
        <>
            <div className="cont-1">
                <form onSubmit={addfacultyform} >
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