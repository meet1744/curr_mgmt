// import React from "react";
import "./addfacultyStyles.css";
<<<<<<< HEAD
import { useState } from "react";
import { getUserData } from "../Auth";
=======
// import { useState , useEffect} from "react";
import React, { useState } from 'react';
import axios from 'axios';
>>>>>>> 48767dda1cbecc92251baefcf3766254d4cd68ec

export default function Addfaculty() {
    let dept=getUserData().hodDto.dept;
    const [faculty, setFaculty] = useState({deptid:dept,id:"",name:"",email:"",password:""});

<<<<<<< HEAD
    const addfacultyform = (e) => {
        e.preventDefault();
        console.log(faculty);
=======
    const [faculty, setFaculty] = useState([]);

    const addfacultyform = () => {
        // const [data, setData] = useState([]);
        axios.post('http://localhost:8080/addfaculty')
            .then(response => console.log(response))
            .catch(error => console.error(error));

>>>>>>> 48767dda1cbecc92251baefcf3766254d4cd68ec
    }

    return (
        <>
            <div className="cont-1">
                <form onSubmit={addfacultyform} >
                    <h3 className="label">ID:</h3>
                    <input type="text" onChange={(e) => { setFaculty({ ...faculty, id: e.target.value }) }} value={faculty.id} />
                    <h3 className="label">Name:</h3>
                    <input type="text" onChange={(e) => { setFaculty({ ...faculty, name: e.target.value }) }} value={faculty.name} />
                    <h3 className="label">Email:</h3>
                    <input type="email" onChange={(e) => { setFaculty({ ...faculty, email: e.target.value }) }} value={faculty.email} />
                    <h3 className="label">Password:</h3>
                    <input type="text" onChange={(e) => { setFaculty({ ...faculty, password: e.target.value }) }} value={faculty.password} />
                    <input type="submit" className="SubmitButton coolBeans" value="Add Faculty" />
                </form>
            </div>
        </>
    );
}