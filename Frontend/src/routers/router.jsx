import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Home from "../pages/Home/Home";
import StudentRegister from "../pages/student/StudentRegister";
import StudentLogin from "../pages/student/StudentLogin";
import StudentDashboard from "../pages/student/StudentDashboard";
import TeacherRegister from "../pages/Teacher/TeacherRegister";
import TeacherLogin from "../pages/Teacher/TeacherLogin";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import AdminRegister from "../pages/Admin/AdminRegister";
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import StudentLayout from "../pages/student/StudentLayout";
import TeacherLayout from "../pages/Teacher/TeacherLayout";
import AdminLayout from "../pages/Admin/AdminLayout";
import CourseInfoPage from "../components/CourseInfo";
import StudentCourses from "../pages/student/StudentCourses";
import TeacherCourses from "../pages/Teacher/TeacherCourses";
import EditCourse from "../components/EditCourse";
import ManageCourses from "../components/ManageCourses";
import AddCourse from "../components/AddCourse";
import ManageUsers from "../components/ManageUsers";
import About from "../pages/About/About";
import Contact from "../pages/Contact-us/Contact";
import PrivacyPolicy from "../pages/Privacy Policy/PrivacyPolicy";
import TermsOfService from "../pages/Terms Of Service/TermsOfService";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact-us',
                element: <Contact />
            },
            {
                path: 'privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: 'terms-of-service',
                element: <TermsOfService />
            },
            {
                path: 'student',
                children: [
                    {
                        path: 'register',
                        element: <StudentRegister />
                    },
                    {
                        path: 'login',
                        element: <StudentLogin />
                    },
                    {
                        path: 'dashboard',
                        element: <ProtectedRoute allowedRoles={["student"]}> <StudentLayout/> </ProtectedRoute>,
                        children: [
                            {
                                path: '',
                                element: <StudentDashboard />
                            },
                            {
                                path: "course/:courseId",
                                element: <CourseInfoPage/>
                            },
                            {
                                path: "courses",
                                element: <StudentCourses/>
                            }
                        ]
                    }
                ]
            },
            {
                path: 'teacher',
                children: [
                    {
                        path: 'register',
                        element: <TeacherRegister />
                    },
                    {
                        path: 'login',
                        element: <TeacherLogin />
                    },
                    {
                        path: 'dashboard',
                        element: <ProtectedRoute allowedRoles={["teacher"]}> <TeacherLayout /> </ProtectedRoute>,
                        children: [
                            {
                                path: '',
                                element: <TeacherDashboard />
                            },
                            {
                                path: "course/:courseId",
                                element: <CourseInfoPage/>
                            },
                            {
                                path: "courses",
                                element: <TeacherCourses/>
                            },
                            {
                                path: "edit-course/:courseId",
                                element: <EditCourse/>
                            },
                            {
                                path: "add-course",
                                element: <AddCourse/>
                            }
                        ]
                    }
                ]
            },
            {
                path: 'admin',
                children: [
                    {
                        path: 'register',
                        element: <AdminRegister />
                    },
                    {
                        path: 'login',
                        element: <AdminLogin />
                    },
                    {
                        path: 'dashboard',
                        element: <ProtectedRoute allowedRoles={["admin"]}> <AdminLayout /> </ProtectedRoute>,
                        children: [
                            {
                                path: '',
                                element: <AdminDashboard />
                            },
                            {
                                path: "courses",
                                element: <ManageCourses/>
                            },                            
                            {
                                path: "edit-course/:courseId",
                                element: <EditCourse/>
                            },
                            {
                                path: "course/:courseId",
                                element: <CourseInfoPage/>
                            },
                            {
                                path: "add-course",
                                element: <AddCourse/>
                            },
                            {
                                path: "manage-users",
                                element: <ManageUsers/>
                            }
                        ]
                    }
                ]
            },
        ]
    }
]);

export default router;