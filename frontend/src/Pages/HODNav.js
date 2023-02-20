import React from "react";
import { Link } from "react-router-dom";
import "./HODNavStyles.css";

function HODNav() {
    return (
        <>
            <div className="sidenav">
                <Link to="/HOD/Subjects">All Subjects</Link>
                <Link to="/HOD/AddFaculty">Add Faculty</Link>
                <Link to="/HOD/DeleteFaculty">Delete Faculty</Link>
                <Link to="/HOD/AppointPC">Appoint Program Coordonator</Link>
                <Link to="/HOD/Logs">Logs</Link>
            </div>
        </>
    );
}

export default HODNav;