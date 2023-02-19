import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import {doLogin} from "./../Auth/index.js";
import 'react-toastify/dist/ReactToastify.css';
import "./LoginPageStyles.css";
import baseurl from "./../Components/baseurl";


function LoginPage({ role }) {
    let page = "";
    if (role === "HOD") {
        page += "HODPage";
    }
    else if (role === "Faculty") {
        page += "FacultyPage";
    }
    else {
        page += "PCPage";
    }
    const loginfun = (data) => {
        const returndata = axios.post(`${baseurl}/api/v1/auth/login`, data).then((response)=>response.data);
        console.log(returndata);
        doLogin(returndata,()=>{
            console.log("login details saved in localstorage");
        });

        toast.promise(
            returndata,
            {
                pending: {
                    render() {
                        return "Please Wait!!"
                    },
                    icon: "✋",
                },
                success: {
                    render({ data }) {
                        return `Login Successfully!!`
                    },
                    icon: "🚀",
                },
                error: {
                    render({ data }) {
                        console.log(data);
                        if (data.response.status === 400 || data.response.status === 404)
                            return data.response.data.status;
                        return `Something went wrong!!`
                    },
                    icon: "💥",
                }
            }
        )
    }
    const [login, setLogin] = useState({ role: role, id: "", password: "" });
    const loginForm = (e) => {
        console.log(login);
        e.preventDefault();
        doLogin()
        if (login.id === '' || login.password === '') {
            toast.error("Please fill all the fields");
            return;
        }

        loginfun(login);

    }

    return (
        <>
            <ToastContainer />
            <div className="container">
                
                <form onSubmit={loginForm} >
                    <h3 className="label">ID:</h3>
                    <input type="text" onChange={(e) => { setLogin({ ...login, id: e.target.value }) }} value={login.id} />
                    <h3 className="label">Password:</h3>
                    <input type="password" onChange={(e) => { setLogin({ ...login, password: e.target.value }) }} value={login.password} />
                    <input type="submit" className="SubmitButton coolBeans login" value="Login"></input>
                </form>
            </div>
        </>
    );
}

export default LoginPage;