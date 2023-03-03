import React from "react";
import { Link } from "react-router-dom";
import "./PCNavStyles.css";

function PCNav() {
    return (
        <>
            <div className="sidenav cont">
                <Link to="/PC/Subjects">All Subject</Link>
                <Link to="/PC/AddSubject">Add Subjects</Link>
                <Link to="/PC/UpdateSubject">Update Subject</Link>
                <Link to="/PC/DeleteSubject">Delete Subject</Link>
            </div>
        </>
    );
}

export default PCNav;