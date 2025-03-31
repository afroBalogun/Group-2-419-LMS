import { useParams } from "react-router";
import { useGetCourseByIdQuery } from "../redux/courses/course";
import Loading from "./Loading";

export default function CourseInfoPage() {
    const { courseId } = useParams();

    // Fetch course data using RTK Query
    const { data: course, isLoading, error } = useGetCourseByIdQuery(courseId);

    if (isLoading) return <Loading />;
    if (error) return <p className="text-center text-red-600 font-semibold">Error: {error.message}</p>;
    if (!course) return <p className="text-center text-gray-500">Course not found.</p>;

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
            {/* Course Title */}
            <h1 className="text-3xl font-bold text-blue-600 mb-2">{course.title}</h1>
            <p className="text-gray-700 text-lg">{course.description}</p>
            <p className="text-md font-semibold text-gray-800 mt-2">Lecturer: {course.teacher?.name}</p>

            {/* Assignments Section */}
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

            {/* Download Course File Button */}
            {course.fileUrl && (
                <a
                    href={course.fileUrl}
                    download
                    className="mt-6 block bg-[#008a63] text-white text-center font-semibold py-2 px-4 rounded-md shadow-md hover:bg-[#00704f] hover:shadow-lg transition-all duration-200"
                >
                    Download Course File
                </a>
            )}
            
        </div>
    );
}
