import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { doLogin } from "./../Auth/index.js";
import 'react-toastify/dist/ReactToastify.css';
import "./LoginPageStyles.css";
import baseurl from "./../Components/baseurl";
import { Navigate } from "react-router-dom";



function LoginPage({ role }) {

    const loginfun = (data) => {
        const returndata = axios.post(`${baseurl}/api/v1/auth/login`, data).then((response) => {
            console.log(response);
            doLogin(response.data, function () {
                console.log("login details saved in localstorage");
                console.log(JSON.stringify(role));
                if (JSON.stringify(role) === "hod")
                    <Navigate to="/HOD/Subjects" replace={true} />;
                else if (JSON.stringify(role) === "faculty")
                    <Navigate to="/Faculty/Subjects" replace={true} />;
                else if (JSON.stringify(role) === "pc")
                    <Navigate to="/PC/Subjects" replace={true} />;
            });
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
            },
            {
                className: 'dark-toast',
                position: toast.POSITION.BOTTOM_RIGHT,
            }
        )
    }
    const [login, setLogin] = useState({ role: role, id: "", password: "" });
    const loginForm = (e) => {
        console.log(login);
        e.preventDefault();

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