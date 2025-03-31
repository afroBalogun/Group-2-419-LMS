import { useEffect, useState } from "react";
import getBaseUrl from "../utils/baseUrl";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import { useDeleteCourseMutation } from "../redux/courses/course";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ManageCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const [deleteCourse] = useDeleteCourseMutation();

    const handleDelete = async (courseId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("No authentication token found. Please log in.");
            return;
        }

        try {
            const response = await fetch(`${getBaseUrl()}/courses/delete-course/${courseId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setCourses((prev) => prev.filter((course) => course._id !== courseId));
                alert("Deleted successfully!");
            } else {
                const data = await response.json();
                alert(data.message || "Failed to delete.");
            }
        } catch (error) {
            alert("Failed to delete.");
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (courses.length === 0) return <p className="text-gray-500 text-center">No courses available.</p>;

    return (
        <main className="w-full flex justify-center items-center p-4">
            <section className="w-full max-w-4xl shadow-md flex flex-col gap-4 p-6 bg-white rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-700">Courses</h2>
                    <button
                        onClick={() => navigate(`/admin/dashboard/add-course`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                        Add New Course
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="p-2 text-left">S/N</th>
                                <th className="p-2 text-left">Course Name</th>
                                <th className="p-2 text-left">Course Lecturer</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={course._id} className="border-b">
                                    <td className="p-2">{index + 1}</td>
                                    <td
                                        className="p-2 text-blue-600 hover:underline cursor-pointer"
                                        onClick={() => navigate(`/admin/dashboard/course/${course._id}`)}
                                    >
                                        {course.title}
                                    </td>
                                    <td className="p-2">{course.teacher.name}</td>
                                    <td className="p-2 flex gap-2">
                                        <button
                                            onClick={() => navigate(`/admin/dashboard/edit-course/${course._id}`)}
                                            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition-all"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course._id)}
                                            className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-all"
                                        >
                                            <RiDeleteBin5Line /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
