import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users"
import getUserId from "../../utils/getUserId";

export default function StudentDashboard(){

    const navigate = useNavigate()

    const studentId = getUserId();  // Get user ID from localStorage

    // If no userId, redirect to login
    if (!studentId) {
        navigate("/login");  
        return null;
    }

    // STudent Data
    const { data: student, error, isLoading  } = useGetUserByIdQuery(studentId, {
    })

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Welcome, {student.name}</h1>
            <p>Email: {student.email}</p>
            <p>Role: {student.role}</p>
        </div>
    );
}