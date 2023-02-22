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

function App() {
  const [role, setRole] = useState({});
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
            <Route exact path="Subjects" element={<Subjects />} />
            <Route exact path="AddFaculty" element={<Addfaculty />} />
            <Route exact path="DeleteFaculty" element={<Deletefaculty />} />
            <Route exact path="AppointPC" element={<AppointPC />} />
          </Route>
          <Route exact path="Faculty" element={
            <>
              <FacultyNav />
              <Outlet />
            </>
          } >

          </Route>
          <Route exact path="PC" element={
            <>
              <PCNav />
              <Outlet />
            </>
          } >
            
          </Route>
        </Routes>
        <Background />
      </BrowserRouter>

    </div>
  );
}

export default App;
