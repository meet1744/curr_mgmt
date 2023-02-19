import React from "react";
import { Link } from "react-router-dom";
import "./RolesPageStyles.css";

function RolesPage(props) {
    const selectRole = (e) => {
        e.preventDefault();
    };
    
    return (
        <>
            <div className="rolescontainer">
                <form onSubmit={selectRole}>
                    <Link to="/login"><input type="submit" className="roleButton" value="HOD" onClick={() => props.setRole("hod")} /></Link>
                    <Link to="/login"><input type="submit" className="roleButton" value="Faculty" onClick={() => props.setRole("faculty")}/></Link>
                    <Link to="/login" ><input type="submit" className="roleButton" value="Program Coordinator" onClick={() => props.setRole("pc")}/></Link>
                </form>
            </div>
        </>
    );
}

export default RolesPage;