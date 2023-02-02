import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from "react";
import './App.css';
import Background from "./Components/Background";
import Navbar from "./Components/nav";
import RolesPage from "./Pages/RolesPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

function App() {
  const [role, setRole] = useState({});
  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/roles" element={<RolesPage setRole={setRole}/>} />
          <Route exact path="/login" element={<LoginPage role={role}/>} />
        </Routes>
        <Background />
      </BrowserRouter>
    </div>
  );
}

export default App;
