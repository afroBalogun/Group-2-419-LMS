import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users"
import getUserId from "../../utils/getUserId";
import TeacherNavBar from "./TeacherNavBar";
import TeacherCourseList from "./TeacherCourseList";
import useFetch from "../../utils/useFetch";

export default function TeacherCourses(){

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
    });

    const {data: courses, isPending} = useFetch('http://localhost:5000/courses');


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
            <div className="teacher-dashboard">
                <TeacherNavBar teacher = {teacher}/>
                <section>
                    <h2>Courses</h2>
                    {isPending && <div>Pending Courses</div>}
                    <TeacherCourseList courses={courses} />
                </section>
            </div>
    );
}