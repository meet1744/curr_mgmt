import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
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
        const returndata = axios.post(`${baseurl}/logindetails/${page}`, data);
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
                        if (data.message === "Request failed with status code 500" || data.message === "Request failed with status code 406")
                            return `Email already exist!!`
                        return `Registration Failed!!`
                    },
                    icon: "💥",
                }
            }
        )
    }
    const [login, setLogin] = useState({ role: role, ID: "", password: "" });
    const loginForm = (e) => {
        console.log(login);
        e.preventDefault();

        if (login.ID === '' || login.password === '') {
            toast.error("Please fill all the fields");
            return;
        }

        // loginfun(login);

    }

    return (
        <>
            <div className="container">
                {/* <ToastContainer /> */}
                <form onSubmit={loginForm} >
                    <h3 className="label">ID:</h3>
                    <input type="text" onChange={(e) => { setLogin({ ...login, ID: e.target.value }) }} value={login.ID} />
                    <h3 className="label">Password:</h3>
                    <input type="password" onChange={(e) => { setLogin({ ...login, password: e.target.value }) }} value={login.password} />
                    <input type="submit" className="SubmitButton coolBeans login" value="Login"></input>
                </form>
            </div>
        </>
    );
}

export default LoginPage;