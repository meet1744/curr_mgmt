import React from "react";
import { Link } from "react-router-dom";
import "./FacultyNavStyles.css";

function FacultyNav() {
    return (
        <>
            <div className="sidenav cont">
                <Link to="/Faculty/Subjects">My Subjects</Link>
                <Link to="/Faculty/UpdateMySubject">Update My Subject</Link>
            </div>
        </>
    );
}

export default FacultyNav;