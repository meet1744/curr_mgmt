import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import './App.css';
import Background from "./Components/Background";
import Navbar from "./Components/nav";
import RolesPage from "./Pages/RolesPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import HODNav from "./Pages/HODNav";
import FacultyNav from "./Pages/FacultyNav";
import PCNav from "./Pages/PCNav";
import Subjects from "./Pages/Subjects";
import Addfaculty from "./Pages/addfaculty";
import Deletefaculty from "./Pages/deletefaculty";
import AppointPC from "./Pages/appointPC";
import Addsubject from "./Pages/addsubject";
import Deletesubject from "./Pages/deletesubject";
import UpdateMySubject from "./Pages/UpdateMySubject";
import Updatesubject from "./Pages/updatesubject";
import PCSubjectdetails from "./Pages/pcsubjectdetails";
import Logs from "./Pages/logs";
import FacultySubjectdetails from "./Pages/Facultysubjectdetails";

function App() {
  const [role, setRole] = useState({});
  const [facultySubject,setFacultySubject] = useState({});
  const [pcSubject,setPCSubject] = useState({});
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/login" element={<LoginPage role={role} />} />
          <Route exact path="/roles" element={<RolesPage setRole={setRole} />} />
          <Route exact path="HOD" element={
            <>
              <HODNav />
              <Outlet />
            </>
          } >
            <Route exact path="Subjects" element={<Subjects role={role} />} />
            <Route exact path="AddFaculty" element={<Addfaculty />} />
            <Route exact path="DeleteFaculty" element={<Deletefaculty />} />
            <Route exact path="AppointPC" element={<AppointPC />} />
            <Route exact path="logs" element={<Logs/>} />
          </Route>
          <Route exact path="Faculty" element={
            <>
              <FacultyNav />
              <Outlet />
            </>
          } >
            <Route exact path="Subjects" element={<Subjects role={role} />} />
            <Route exact path="UpdateMySubject" element={<UpdateMySubject setFacultySubject={setFacultySubject} />} />
            <Route exact path="FacultySubjectDetails" element={<FacultySubjectdetails facultySubject={facultySubject} />} />
          </Route>
          <Route exact path="PC" element={
            <>
              <PCNav />
              <Outlet />
            </>
          } >
            <Route exact path="Subjects" element={<Subjects role={role} />} />
            <Route exact path="AddSubject" element={<Addsubject />} />
            <Route exact path="DeleteSubject" element={<Deletesubject />} />
            <Route exact path="UpdateSubject" element={<Updatesubject setPCSubject={setPCSubject} />} />
            <Route exact path="PCSubjectDetails" element={<PCSubjectdetails pcSubject={pcSubject} />} />
          </Route>
        </Routes>
        <Background />
      </BrowserRouter>

    </div>
  );
}

export default App;
