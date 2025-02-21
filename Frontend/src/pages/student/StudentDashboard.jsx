import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users"
import getUserId from "../../utils/getUserId";
import StudentNavBar from "./StudentNavBar";

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
        <div className="student-dashboard">
            <StudentNavBar student = {student}/>
            <h2>Welcome to your Dashboard, {student.name}</h2>
            <p>Email: {student.email}</p>
            <p>Role: {student.role}</p>
            {/*<p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet magna vel lectus elementum varius. 
                Donec condimentum, libero nec malesuada ultricies, erat sem interdum mi, a volutpat libero magna sit amet libero. 
                Morbi sed eros a justo tempus pretium. 
                Maecenas convallis, urna eu ultricies interdum, ipsum orci tristique elit, at lacinia risus nulla sed metus.

                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                Cras tincidunt, felis at imperdiet faucibus, nisi ex facilisis lorem, eget pretium lectus quam ut dui. In hac habitasse platea dictumst. 
                Integer sit amet tortor id turpis cursus gravida. Nulla facilisi. Curabitur volutpat velit ut arcu ultricies, ut aliquam ipsum tincidunt.

                Fusce ac neque eget elit vulputate tincidunt. Vivamus elementum, ligula at fermentum fermentum, ex dui luctus odio, in cursus libero velit non leo. 
                Sed non est vitae massa ullamcorper semper. Etiam dictum orci ut mi pretium, sit amet elementum mauris condimentum. 
                Nulla ut leo vel mauris aliquet lobortis. Donec eget nisi et turpis tincidunt scelerisque.
            </p>*/}
            <div className="footer">
                &copy; GROUP 2 LMS 2025. All Rights Reserved.
            </div>
        </div>
    );
}   