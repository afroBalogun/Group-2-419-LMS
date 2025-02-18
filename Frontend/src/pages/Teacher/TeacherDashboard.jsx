import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users"
import getUserId from "../../utils/getUserId";

export default function TeacherDashboard(){

    // Create the extensive UI for the dashboard, the data have already been linked
    // when logged in
    // the functionality to fetch all use data has been provided in the home page.

    const navigate = useNavigate()
    const teacherId = getUserId();  // Get user ID from localStorage

    // If no userId, redirect to login
    if (!teacherId) {
        navigate("/login");  
        return null;
    }

    // teacher Data
    const { data: teacher, error, isLoading  } = useGetUserByIdQuery(teacherId, {
    })

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Welcome, {teacher.name}</h1>
            <p>Email: {teacher.email}</p>
            <p>Role: {teacher.role}</p>
        </div>
    );
}