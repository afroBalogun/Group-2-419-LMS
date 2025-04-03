import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users";
import useUserId from "../../utils/useUserId";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useGetCoursesQuery } from "../../redux/courses/course";
import { FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";

export default function StudentDashboard() {
    const navigate = useNavigate();
    const studentId = useUserId();
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [dueAssignments, setDueAssignments] = useState([]);

    useEffect(() => {
        if (!studentId) navigate("/student/login");
    }, [studentId, navigate]);

    const { data: courses, isLoading, error } = useGetCoursesQuery();
    const { data: student } = useGetUserByIdQuery(studentId, { skip: !studentId });

    useEffect(() => {
        if (courses && studentId) {
            const enrolledCourses = courses.filter(course => 
                course.students?.includes(studentId)
            );
            setFilteredCourses(enrolledCourses);

            const assignments = enrolledCourses.flatMap(course => 
                course.assignments?.map(assignment => ({
                    ...assignment,
                    courseTitle: course.title
                })) || []
            );

            setDueAssignments(assignments);
        }
    }, [courses, studentId]);

    if (isLoading) return <Loading />;
    if (error) return <p className="text-red-500 text-center">Error fetching courses</p>;

    return (
        <main className="px-28 py-4 flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>

            {/* My Courses Section */}
            <section className="bg-white shadow-lg p-4 rounded-md border-2 border-gray-200">
                <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                    <FaChalkboardTeacher />
                    My Courses
                </h1>
                <h3 className="text-lg font-bold text-gray-700">Enrolled Courses:</h3>

                {filteredCourses.length > 0 ? (
                    <ul className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <li
                                key={course._id}
                                className="shadow-lg w-full p-5 flex flex-col gap-3 rounded-md bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                onClick={() => navigate(`/student/dashboard/course/${course._id}`)}
                            >
                                <h4 className="text-xl font-semibold text-orange-800">{course.title}</h4>
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

            {/* Due Assignments Section */}
            <section className="bg-white shadow-lg p-4 rounded-md border-2 border-gray-200">
                <h1 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                    <FaClipboardList />
                    Due Assignments
                </h1>

                {dueAssignments.length > 0 ? (
                    <ul className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dueAssignments.map((assignment) => (
                            <AssignmentCard key={assignment._id} assignment={assignment} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 italic mt-2">No due assignments at the moment.</p>
                )}
            </section>
        </main>
    );
}

// Countdown Timer Component
const AssignmentCard = ({ assignment }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(assignment.dueDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(assignment.dueDate));
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, [assignment.dueDate]);

    return (
        <li 
            className={`shadow-md w-full p-5 flex flex-col gap-3 rounded-md border-l-4 hover:cursor-pointer ${
                timeLeft.overdue ? "bg-red-100 border-red-500" : "bg-orange-100 border-orange-500"
            }`}
        >
            <h4 className="text-lg font-semibold text-orange-800">{assignment.title}</h4>
            <p className="text-sm text-gray-700">{assignment.description}</p>
            <p className="text-xs text-gray-600">
                Course: <span className="font-semibold">{assignment.courseTitle}</span>
            </p>
            <p className="text-xs text-gray-500">
                Due Date: <span className="font-semibold">{assignment.dueDate || "No Due Date"}</span>
            </p>

            {/* Countdown Timer */}
            <p className={`text-sm font-bold ${timeLeft.overdue ? "text-red-600" : "text-orange-800"}`}>
                {timeLeft.overdue 
                    ? "Overdue!" 
                    : `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m left`}
            </p>
        </li>
    );
};

// Function to calculate time left
function calculateTimeLeft(dueDate) {
    if (!dueDate) return { days: 0, hours: 0, minutes: 0, overdue: false };

    const now = new Date();
    const due = new Date(dueDate);
    const difference = due - now;

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, overdue: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);

    return { days, hours, minutes, overdue: false };
}
