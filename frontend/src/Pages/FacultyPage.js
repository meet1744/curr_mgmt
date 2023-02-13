import React from "react";
import { Link } from "react-router-dom";
import "./FacultyPageStyles.css";

function FacultyPage(){
    return(
        <>
            <div className="cont">
                <div className="sidenav">
                    <Link to="/FacultySubjects">My Subjects</Link>
                    <Link to="/FacultyUpdateSubjects">Update Subject</Link>
                </div>
                <div className="middlecont">

                </div>
            </div>
        </>
    );
}

export default FacultyPage;