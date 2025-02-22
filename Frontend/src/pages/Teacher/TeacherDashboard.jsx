import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users"
import getUserId from "../../utils/getUserId";
import TeacherCourseList from "./TeacherCourseList";
import useFetch from "../../utils/useFetch";

export default function TeacherDashboard(){

    // Create the extensive UI for the dashboard, the data have already been linked
    // when logged in
    // the functionality to fetch all use data has been provided in the home page.

    const navigate = useNavigate()
    const teacherId = getUserId();  // Get user ID from localStorage

    // If no userId, redirect to login
    if (!teacherId) {
        navigate("/teacher/login");  
        return null;
    }

    // teacher Data
    const { data: teacher, error, isLoading  } = useGetUserByIdQuery(teacherId, {
    });

    const {data: courses, isPending} = useFetch('http://localhost:5000/courses');
    const filteredCourses = courses?.filter((course) => course.teacher === teacher?.name) || [];


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
            <div className="teacher-dashboard">
                <h1>Welcome, {teacher.name}</h1>
                <p>Email: {teacher.email}</p>
                <p>Role: {teacher.role}</p>
                <section>
                    <h2>Courses</h2>
                    {isPending && <div>Pending Courses</div>}
                    <TeacherCourseList courses={filteredCourses} />
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
            </div>
    );
}