import React from "react";
import { Link } from "react-router-dom";
import "./NavStyles.css";

function FacultyNav() {
    return (
        <>
            <div className="sidenav cont">
                <div className="navmargin">
                    <Link to="/Faculty/Subjects">My Subjects</Link>
                    <Link to="/Faculty/UpdateMySubject">Update My Subject</Link>
                </div>
            </div>
        </>
    );
}

export default FacultyNav;