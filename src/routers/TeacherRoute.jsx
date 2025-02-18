import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function TeacherRoute({ children }) {
    const token = (localStorage.getItem('token'));
    
    if (!token) {
        return <Navigate to="/admin" replace />;
    }

    return children ? children : <Outlet />;
}