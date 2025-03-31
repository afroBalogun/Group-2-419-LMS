import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users";
import useUserId from "../../utils/useUserId";
import { useEffect, useState } from "react";
import useCourses from "../../utils/useCourses";
import Loading from "../../components/Loading";

export default function StudentDashboard() {
    const navigate = useNavigate();
    const studentId = useUserId();
    const [refresh, setRefresh] = useState(false);

    
    // If no userId, redirect to login
    useEffect(() => {
        if (!studentId) navigate("/student/login");
    }, [studentId, navigate]);

    // Fetch student data
    const { data: student, isLoading, error } = useGetUserByIdQuery(studentId, {
        skip: !studentId,
    });

    // Force refetch when `refresh` changes
    useEffect(() => {
        if (studentId) {
            setRefresh((prev) => !prev); 
        }
    }, [student?.enrolledCourses]);

    const { courses } = useCourses();
    console.log("Courses:", courses);

    return (
        <main className="px-8 py-4 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>

            <section>
                <h3 className="text-lg font-bold text-gray-700">Enrolled Courses:</h3>

                {courses.length > 0 ? (
                    <ul className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
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
