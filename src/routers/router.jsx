import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import App from "../App";
import { Children } from "react";
import StudentLogin from "../pages/student/StudentLogin";
import StudentRegister from "../pages/student/StudentRegister";
import StudentDashboard from "../pages/student/StudentDashboard";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/student",
        element: <Student />,
        Children: [
            {
                path: "/register",
                element: <StudentRegister />,
            },
            {
                path: "/login",
                element: <StudentLogin/>
            },
            {
                path: "/dashboard",
                element: <StudentDashboard/>
            }
        ]
    }
])