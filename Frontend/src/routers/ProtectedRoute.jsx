import { Navigate } from "react-router";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        // Redirect to specific login pages based on the role
        return <Navigate to="/student/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return children; // Return the actual component
};

export default ProtectedRoute;
