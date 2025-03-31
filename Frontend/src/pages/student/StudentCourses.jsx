import { useEffect, useState } from "react";
import getBaseUrl from "../../utils/baseUrl";
import { useEnrollStudentMutation, useRemoveStudentMutation } from "../../redux/courses/course";
import useUserId from "../../utils/useUserId";
import Loading from "../../components/Loading";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function StudentCourses() {
    // Store courses in state
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mutations for enrolling/removing students
    const [enrollStudent, { isLoading: enrolling }] = useEnrollStudentMutation();
    const [removeStudent, { isLoading: removing }] = useRemoveStudentMutation();

    const studentId = useUserId();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`${getBaseUrl()}/courses`);
                if (!response.ok) throw new Error("Failed to fetch courses");

                const data = await response.json();
                setCourses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleEnroll = async (courseId) => {
        if (!studentId) return alert("Student ID not found!");

        try {
            await enrollStudent({ courseId, studentId }).unwrap();
            alert("Enrollment successful!");
            setCourses((prev) => prev.map(course => 
                course._id === courseId ? { ...course, enrolled: true } : course
            ));
        } catch (error) {
            console.error("Enrollment Error:", error);
            alert("Failed to enroll.");
        }
    };

    const handleRemove = async (courseId) => {
        if (!studentId) return alert("Student ID not found!");

        try {
            await removeStudent({ courseId, studentId }).unwrap();
            alert("Removed successfully!");
            setCourses((prev) => prev.filter(course => course._id !== courseId));
        } catch (error) {
            console.error("Remove Error:", error);
            alert("Failed to remove.");
        }
    };

    // Handle loading state
    if (loading) return <Loading />;

    // Handle errors
    if (error) return <p className="text-center text-red-600 font-semibold">{error}</p>;

    return (
        <main className="w-full flex justify-center items-center p-4">
            <section className="w-full md:w-3/4 shadow-md flex flex-col gap-4 justify-center p-6 bg-white rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800">Courses</h2>

                {/* Responsive Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 shadow-sm rounded-md">
                        <thead className="uppercase font-semibold bg-gray-100">
                            <tr className="border-b">
                                <th className="p-3 text-left">S/N</th>
                                <th className="p-3 text-left">Course Name</th>
                                <th className="p-3 text-left">Lecturer</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <tr key={course._id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3 font-medium">{course.title}</td>
                                        <td className="p-3">{course.teacher?.name}</td>
                                        <td className="p-3 flex gap-2">
                                            <button
                                                onClick={() => handleEnroll(course._id)}
                                                disabled={enrolling}
                                                className={`flex items-center gap-1 px-4 py-1 text-white text-sm rounded-md transition-all duration-200 ${
                                                    enrolling ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                                                }`}
                                            >
                                                <HiOutlineAcademicCap />
                                                {enrolling ? "Enrolling..." : "Enroll"}
                                            </button>

                                            <button
                                                onClick={() => handleRemove(course._id)}
                                                disabled={removing}
                                                className={`flex items-center gap-1 px-4 py-1 text-white text-sm rounded-md transition-all duration-200 ${
                                                    removing ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
                                                }`}
                                            >
                                                <RiDeleteBin5Line />
                                                {removing ? "Removing..." : "Remove"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        No courses available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
