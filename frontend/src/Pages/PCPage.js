import React from "react";
import { Link } from "react-router-dom";
import "./PCPageStyles.css";

function PCPage(){
    return(
        <>
            <div className="cont">
                <div className="sidenav">
                    <Link to="/PCAddSubjects">Add Subjects</Link>
                    <Link to="/PCUpdateSubjects">Update Subject</Link>
                    <Link to="/PCDeleteSubjects">Delete Subject</Link>
                    <Link to="/PCAllSubjects">All Subject</Link>
                </div>
                <div className="middlecont">
                    
                </div>
            </div>
        </>
    );
}

export default PCPage;