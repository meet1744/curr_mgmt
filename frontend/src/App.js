import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import './App.css';
import Background from "./Components/Background";
import Authorization from "./Components/Authorization";
import Navbar from "./Components/nav";
import RolesPage from "./Pages/RolesPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import HODPage from "./Pages/HODPage";
import FacultyPage from "./Pages/FacultyPage";
import PCPage from "./Pages/PCPage";

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
          <Route exact path="/authorized" element={<Authorization />} >
            <Route exact path="HOD" element={<HODPage />} />
            <Route exact path="Faculty" element={<FacultyPage />} />
            <Route exact path="PC" element={<PCPage />} />
          </Route>
        </Routes>
        <Background />
      </BrowserRouter>

    </div>
  );
}

export default App;
