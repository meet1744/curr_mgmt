import React from "react";
import { useState } from "react";

function LoginPage({role}) {

    const [login, setLogin] = useState({role:role});
    const loginForm = (e) => {
        console.log(login);
        e.preventDefault();
    }

    return (
        <>
            <div className="container">
                <form onSubmit={loginForm} >
                    <h3 className="label">ID:</h3>
                    <input type="text" onChange={(e)=>{setLogin({...login,ID:e.target.value})}} />
                    <h3 className="label">Password:</h3>
                    <input type="password" onChange={(e)=>{setLogin({...login,password:e.target.value})}} />
                    <input type="submit" className="SubmitButton coolBeans" value="Login" />
                </form>
            </div>
        </>
    );
}

export default LoginPage;