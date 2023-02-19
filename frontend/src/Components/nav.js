import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { navdata } from "./navdata";
import './navstyle.css';
import { doLogout, getUserData, isLoggedIn } from "../Auth";

function Navbar() {

    const [userlink, setUserlink] = useState("");
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState([]);
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        setLogin(isLoggedIn());
        setUser(getUserData());
        handlerole();
    }, [login]);

    const handledashboard = () => {
        
        handleClick();
    }

    const handlerole =() => {
        console.log(user);
        if (user.hodDto === null && user.facultyDto === null)
            setUserlink("PC");
        else if (user.pcDto === null && user.facultyDto === null)
            setUserlink("HOD");
        else
            setUserlink("Faculty");
    }

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handlelogout = () => {
        doLogout();
        handleClick();
    }

    const handlelogin = () => {
        handleClick();
    }

    let dashlink = isLoggedIn() ? `/authorized/${userlink}` : "/roles";
    let loglink = isLoggedIn() ? "/" : "/roles";
    let logtitle = isLoggedIn() ? "Logout" : "Authorized Login";
    let loghandler = isLoggedIn() ? handlelogout : handlelogin;



    return (
        <nav className="NavbarItem">
            <h2 className="logo">
                Curriculum Management
            </h2>
            <div className="menu-icon" onClick={handleClick}>
                <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
            <ul className={clicked ? "nav-menu active" : "nav-menu"}>
                <li>
                    <NavLink to={dashlink} onClick={handledashboard} className="nav-links-mobile coolBeans">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to={loglink} onClick={loghandler} className="nav-links-mobile coolBeans">{logtitle}</NavLink>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar;