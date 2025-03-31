import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users";
import useUserId from "../../utils/useUserId";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useGetCoursesQuery } from "../../redux/courses/course";

export default function StudentDashboard() {
    const navigate = useNavigate();
    const studentId = useUserId();
    const [filteredCourses, setFilteredCourses] = useState([]);

    // Redirect to login if no studentId
    useEffect(() => {
        if (!studentId) navigate("/student/login");
    }, [studentId, navigate]);

    // Fetch all courses
    const { data: courses, isLoading, error } = useGetCoursesQuery();
    
    // Fetch student data
    const { data: student } = useGetUserByIdQuery(studentId, { skip: !studentId });

    // Filter courses where student is enrolled
    useEffect(() => {
        if (courses && studentId) {
            const enrolledCourses = courses.filter(course => 
                course.students?.includes(studentId)
            );
            setFilteredCourses(enrolledCourses);
        }
    }, [courses, studentId]);

    if (isLoading) return <Loading />;
    if (error) return <p className="text-red-500 text-center">Error fetching courses</p>;

    return (
        <main className="px-8 py-4 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>

            <section>
                <h3 className="text-lg font-bold text-gray-700">Enrolled Courses:</h3>

                {filteredCourses.length > 0 ? (
                    <ul className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <li
                                key={course._id}
                                className="shadow-lg w-full p-5 flex flex-col gap-3 rounded-md bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => navigate(`/student/dashboard/course/${course._id}`)}
                            >
                                <h4 className="text-xl font-semibold text-blue-600">{course.title}</h4>
                                <p className="text-gray-700">{course.description}</p>
                                <p className="text-sm text-gray-600">
                                    Lecturer: <span className="font-bold">{course.teacher?.name || "Unknown"}</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic mt-2">You are not enrolled in any courses yet.</p>
                )}
            </section>
        </main>
    );
}
