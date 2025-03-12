import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users";
import useUserId from "../../utils/useUserId";
import { useEffect, useState } from "react";
import getBaseUrl from "../../utils/baseUrl";
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

    if (isLoading) return <Loading/>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <main className="px-8 py-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold">Student Dashboard</h2>
            <div>
                <h2 className="text-lg font-bold">Enrolled Courses:</h2>
                <ul className="p-2 grid grid-cols-3 gap-8">
                    {courses.length > 0 ? (
                        courses
                            .filter((course) => course._id) // Only process valid courses
                            .map((course) => (
                                <li 
                                    key={course._id} 
                                    className="shadow-md w-[350px] p-4 py-6 flex flex-col gap-3 justify-around hover:cursor-pointer hover:scale-110 transition-all duration-200"
                                    onClick={() => navigate(`/student/dashboard/course/${course._id}`)} 
                                >
                                    <h4 className="font-semibold text-2xl text-blue-500">{course.title}</h4>
                                    <p className="font-stretch-75%">{course.description}</p>
                                    <p className="text-sm">
                                        Lecturer: <span className="font-bold">{course.teacher?.name || "Unknown"}</span>
                                    </p>
                                </li>
                            ))
                    ) : (
                        <p>No enrolled courses found.</p>
                    )}
                </ul>

            </div>
        </main>
    );
}
