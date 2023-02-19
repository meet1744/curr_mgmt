import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../Auth';

const Authorization=()=> {
    return isLoggedIn() ? <Outlet/> : <Navigate to="/login" />;
}

export default Authorization;