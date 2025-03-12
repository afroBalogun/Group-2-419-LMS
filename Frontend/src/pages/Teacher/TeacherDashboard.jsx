import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users"
import getUserId from "../../utils/useUserId";
import useUserId from "../../utils/useUserId";
import useCourses from "../../utils/useCourses";
import Loading from "../../components/Loading";

export default function TeacherDashboard(){
    const navigate = useNavigate()
    const teacherId = useUserId();  // Get user ID from localStorage

    // If no userId, redirect to login
    if (!teacherId) {
        navigate("/teacher/login");  
        return null;
    }

    // teacher Data
    const { data: teacher, error, isLoading  } = useGetUserByIdQuery(teacherId, {
        skip:!teacherId,
    });

    console.log(teacher)

    const { courses } = useCourses();
    console.log(courses)

    if (isLoading) return <Loading/>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <main className="px-8 py-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold">Teacher Dashboard</h2>
            <div>
                <h2 className="text-lg font-bold">Teaching Courses:</h2>
                <ul className="p-2 grid grid-cols-3 gap-8">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <li 
                                key={course._id} 
                                className="shadow-md w-[350px] p-4 py-6 flex flex-col gap-3 justify-around hover:cursor-pointer hover:scale-110 transition-all duration-200"
                                onClick={() => navigate(`/teacher/dashboard/course/${course._id}`)} 
                            >
                                <h4 className="font-semibold text-2xl text-blue-500">{course.title}</h4>
                                <p className="font-stretch-75%">{course.description}</p>
                                <p className="text-sm">
                                    Students Enrolled: <span className="font-bold">{course.students.length} student(s)</span>
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