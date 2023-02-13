import React from "react";
import { Link } from "react-router-dom";
import "./HODPageStyles.css";

function HODPage() {
    return (
        <>
            <div className="cont">
                <div className="sidenav">
                    <Link to="/HODAllSubjects">All Subjects</Link>
                    <Link to="/HODAddFaculty">Add Faculty</Link>
                    <Link to="/HODDeleteFaculty">Delete Faculty</Link>
                    <Link to="/HODAppointPC">Appoint Program Coordonator</Link>
                    <Link to="/HODLogs">Logs</Link>
                </div>
                <div className="middlecont">
                </div>
            </div>
        </>
    );
}

export default HODPage;