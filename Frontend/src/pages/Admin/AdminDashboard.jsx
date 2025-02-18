import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users"
import getUserId from "../../utils/getUserId";

export default function AdminDashboard(){

    // Create the extensive UI for the dashboard, the data have already been linked
    // when logged in
    // the functionality to fetch all use data has been provided in the home page.

    const navigate = useNavigate()

    const adminId = getUserId();  // Get user ID from localStorage

    // If no userId, redirect to login
    if (!adminId) {
        navigate("/login");  
        return null;
    }

    // admin Data
    const { data: admin, error, isLoading  } = useGetUserByIdQuery(adminId, {
    })

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Welcome, {admin.name}</h1>
            <p>Email: {admin.email}</p>
            <p>Role: {admin.role}</p>
        </div>
    );
}