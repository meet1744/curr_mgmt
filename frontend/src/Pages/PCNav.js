import React from "react";
import { Link } from "react-router-dom";
import "./PCNavStyles.css";

function PCNav() {
    return (
        <>
            <div className="sidenav cont">
                <Link to="/PC/Subjects">All Subject</Link>
                <Link to="/PC/AddSubjects">Add Subjects</Link>
                <Link to="/PC/UpdateSubjects">Update Subject</Link>
                <Link to="/PC/DeleteSubjects">Delete Subject</Link>
            </div>
        </>
    );
}

export default PCNav;