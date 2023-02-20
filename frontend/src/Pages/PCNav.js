import React from "react";
import { Link } from "react-router-dom";
import "./PCNavStyles.css";

function PCNav() {
    return (
        <>
            <div className="sidenav cont">
                <Link to="/PCAllSubjects">All Subject</Link>
                <Link to="/PCAddSubjects">Add Subjects</Link>
                <Link to="/PCUpdateSubjects">Update Subject</Link>
                <Link to="/PCDeleteSubjects">Delete Subject</Link>
            </div>
        </>
    );
}

export default PCNav;