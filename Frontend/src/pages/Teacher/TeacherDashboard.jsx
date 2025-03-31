import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users";
import useUserId from "../../utils/useUserId";
import useCourses from "../../utils/useCourses";
import Loading from "../../components/Loading";

export default function TeacherDashboard() {
    const navigate = useNavigate();
    const teacherId = useUserId();  // Get user ID from localStorage

    // Redirect if no user ID
    useEffect(() => {
        if (!teacherId) navigate("/teacher/login");
    }, [teacherId, navigate]);

    // Fetch teacher data
    const { data: teacher, error, isLoading } = useGetUserByIdQuery(teacherId, {
        skip: !teacherId,
    });

    // Fetch courses
    const { courses = [] } = useCourses();  // Ensure courses is always an array

    if (isLoading) return <Loading />;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <main className="px-8 py-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold">Teacher Dashboard</h2>

            <section>
                <h2 className="text-lg font-bold">Teaching Courses:</h2>
                
                {courses.length > 0 ? (
                    <ul className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <li 
                                key={course._id} 
                                className="shadow-md w-full p-4 py-6 flex flex-col gap-3 bg-white rounded-lg transition-all duration-200 hover:cursor-pointer hover:scale-105"
                                onClick={() => navigate(`/teacher/dashboard/course/${course._id}`)} 
                            >
                                <h4 className="font-semibold text-xl text-blue-500">{course.title}</h4>
                                <p className="text-gray-700">{course.description}</p>
                                <p className="text-sm text-gray-600">
                                    Students Enrolled: <span className="font-bold">{course.students.length} student(s)</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 mt-4">No courses assigned yet. Start by creating one!</p>
                )}
            </section>
        </main>
    );
}
