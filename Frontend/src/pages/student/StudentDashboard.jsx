import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users"
import getUserId from "../../utils/getUserId";
import StudentNavBar from "./StudentNavBar";
import StudentCourseList from "./StudentCourseList";
import useFetch from "../../utils/useFetch";

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
    });

    // Courses Data
    const {data: courses, isPending} = useFetch('http://localhost:5000/courses');

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="student-dashboard">
            <StudentNavBar student = {student}/>
            <section>
                <h2>Enrolled Courses</h2>
                {isPending && <div>Pending Courses</div>}
                <StudentCourseList courses={courses} />
            </section>
            <section>
                <h2>Announcements</h2>
                <div className="announcements">
                    <div className="announcement">
                        <strong>New Assignment:</strong> Check out the new assignment for Course 1.
                    </div>
                    <div className="announcement">
                        <strong>Reminder:</strong> Next class is scheduled for Monday at 10 AM.
                    </div>
                </div>
            </section>
            <div className="footer">
                &copy; GROUP 2 LMS 2025. All Rights Reserved.
            </div>
        </div>
    );
}   