import { useParams } from "react-router";
import { useGetCourseByIdQuery } from "../redux/courses/course";
import { useGetUserByIdQuery, useGetUsersQuery } from "../redux/users/users";
import useUserId from "../utils/useUserId";
import Loading from "./Loading";
import FileDownload from "./FileDownload";

export default function CourseInfoPage() {
    const { courseId } = useParams();
    const userId = useUserId();

    // Fetch course and user dataa
    const { data: course, isLoading, error } = useGetCourseByIdQuery(courseId);
    const { data: user, isLoading: userLoading } = useGetUserByIdQuery(userId, { skip: !userId });
    const { data: allUsers, isLoading: usersLoading } = useGetUsersQuery();

    if (isLoading || userLoading || usersLoading) return <Loading />;
    if (error) return <p className="text-center text-red-600 font-semibold">Error: {error.message}</p>;
    if (!course) return <p className="text-center text-gray-500">Course not found.</p>;

    // Get user role
    const role = user?.role?.toLowerCase(); // "student" or "teacher"

    // Filter students based on their IDs in the course
    const enrolledStudents = allUsers?.filter((user) => course.students.includes(user._id)) || [];

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-4">
            {/* Course Title */}
            <h1 className="text-3xl font-bold text-orange-800 mb-2">{course.title}</h1>
            <p className="text-gray-700 text-lg">{course.description}</p>
            <p className="text-md font-semibold text-gray-800 mt-2">Lecturer: {course.teacher?.name}</p>

            {/* Conditional Rendering Based on Role */}
            {role === "student" ? (
                // Show Assignments for Students
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Assignments</h2>
                    {course.assignments?.length > 0 ? (
                        <ul className="space-y-2">
                            {course.assignments.map((assignment) => (
                                <li key={assignment._id} className="p-3 bg-gray-100 rounded-md shadow-sm">
                                    <span className="font-semibold">{assignment.title}</span> - Due:{" "}
                                    <span className="text-red-500">{new Date(assignment.dueDate).toDateString()}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm italic text-gray-500">No assignments available.</p>
                    )}
                </div>
            ) : role === "teacher" ? (
                // Show Students Offering the Course for Teachers
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Students Offering This Course</h2>
                    {enrolledStudents.length > 0 ? (
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-2 px-4 text-left">Name</th>
                                        <th className="py-2 px-4 text-left">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrolledStudents.map((student) => (
                                        <tr key={student._id} className="border-b">
                                            <td className="py-2 px-4">{student.name}</td>
                                            <td className="py-2 px-4">{student.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-sm italic text-gray-500">No students enrolled yet.</p>
                    )}

                    {/* Assignments Section for Teachers */}
                    <div className="mt-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Assignments</h2>
                        {course.assignments?.length > 0 ? (
                            <ul className="space-y-2">
                                {course.assignments.map((assignment) => (
                                    <li key={assignment._id} className="p-3 bg-gray-100 rounded-md shadow-sm">
                                        <span className="font-semibold">{assignment.title}</span> - Due:{" "}
                                        <span className="text-red-500">{new Date(assignment.dueDate).toDateString()}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm italic text-gray-500">No assignments available.</p>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-sm italic text-gray-500 mt-4">You do not have access to this course.</p>
            )}

            {/* Course File Download Section */}
            {course.courseMaterial && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Course Materials</h2>
                    <FileDownload filePath={course.courseMaterial} fileName={`${course.title} - Materials`} />
                </div>
            )}

        </div>
    );
}
