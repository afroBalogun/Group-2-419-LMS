import { useParams } from "react-router";
import { useGetCourseByIdQuery } from "../redux/courses/course";
import Loading from "./Loading";

export default function CourseInfoPage() {
    const { courseId } = useParams();

    // Fetch course data using RTK Query
    const { data: course, isLoading, error } = useGetCourseByIdQuery(courseId);

    if (isLoading) return <Loading/>;
    if (error) return <p>Error: {error.message}</p>;
    if (!course) return <p>Course not found.</p>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-blue-600">{course.title}</h1>
            <p className="text-lg">{course.description}</p>
            <p className="text-md font-semibold">Lecturer: {course.teacher?.name}</p>

            {/* Assignments Section */}
            <div className="mt-4">
                <h2 className="text-xl font-bold">Assignments:</h2>
                {course.assignments?.length > 0 ? (
                    <ul className="list-disc ml-4">
                        {course.assignments.map((assignment) => (
                            <li key={assignment._id} className="text-sm">
                                <span className="font-semibold">{assignment.title}</span> - Due:{" "}
                                <span className="text-red-500">{new Date(assignment.dueDate).toDateString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm italic text-gray-500">No assignments available.</p>
                )}
            </div>
            <button className="text-sm bg-[#008a63]">
                Download Course File
            </button>
        </div>
    );
}
