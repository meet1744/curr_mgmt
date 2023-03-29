import React from "react";
import { Link } from "react-router-dom";
import "./NavStyles.css";

function HODNav() {
    return (
        <>
            <div className="sidenav">
                <div className="navmargin">
                    <Link to="/HOD/Subjects">All Subjects</Link>
                    <Link to="/HOD/AddFaculty">Add Faculty</Link>
                    <Link to="/HOD/DeleteFaculty">Delete Faculty</Link>
                    <Link to="/HOD/AppointPC">Appoint Program Coordinator</Link>
                    <Link to="/HOD/Logs">Logs</Link>
                </div>
            </div>
        </>
    );
}

export default HODNav;