import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users"
import getUserId from "../../utils/getUserId";
import StudentCourseList from "./StudentCourseList";
import useFetch from "../../utils/useFetch";

export default function StudentCourses(){

    // Create the extensive UI for the dashboard, the data have already been linked
    // when logged in
    // the functionality to fetch all use data has been provided in the home page.

    const navigate = useNavigate()
    const studentId = getUserId();  // Get user ID from localStorage

    // If no userId, redirect to login
    if (!studentId) {
        navigate("student/login");  
        return null;
    }

    // student Data
    const { data: student, error, isLoading  } = useGetUserByIdQuery(studentId, {
    });

    const {data: courses, isPending} = useFetch('http://localhost:5000/courses');

    const filteredCourses = courses?.filter((course) => course.students?.includes(student?.name) ) || [];


    return (
            <div className="student-dashboard">
                <section>
                    <h2>Courses</h2>
                    {isPending && <div>Pending Courses</div>}
                    <StudentCourseList courses={filteredCourses} />
                </section>
            </div>
    );
}