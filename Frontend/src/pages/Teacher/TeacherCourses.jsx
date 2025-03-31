import { useEffect, useState } from "react";
import getBaseUrl from "../../utils/baseUrl";
import useUserId from "../../utils/useUserId";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function TeacherCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const studentId = useUserId();
    const navigate = useNavigate();

    // Fetch courses
    const fetchCourses = async () => {
        setLoading(true);
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

    useEffect(() => {
        fetchCourses();
    }, []);

    // Delete course
    const handleDelete = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        try {
            const response = await fetch(`${getBaseUrl()}/courses/delete-course/${courseId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, 
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Failed to delete course");

            setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
            alert("Course deleted successfully!");
        } catch (error) {
            console.error("Remove Error:", error);
            alert("Failed to delete.");
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500 text-center">Error fetching courses: {error}</p>;

    return (
        <main className="w-full flex justify-center items-center p-4">
            <section className="w-3/4 shadow-md flex flex-col gap-4 p-10 bg-white rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Courses</h2>
                    <button 
                        onClick={() => navigate(`/teacher/dashboard/add-course`)}
                        className="text-white bg-blue-500 text-sm rounded-md px-4 py-2 hover:scale-105 hover:shadow-xl transition-all"
                    >
                        Add New Course
                    </button>
                </div>

                {courses.length === 0 ? (
                    <p className="text-center text-gray-500 mt-4">No courses available.</p>
                ) : (
                    <table className="w-full border-separate border-spacing-8">
                        <thead className="uppercase font-semibold">
                            <tr>
                                <td>#</td>
                                <td>Course Name</td>
                                <td>Course Description</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={course._id}>
                                    <td>{index + 1}</td>
                                    <td>{course.title}</td>
                                    <td>{course.description}</td>
                                    <td className="flex gap-2">
                                        <button 
                                            onClick={() => navigate(`/teacher/dashboard/edit-course/${course._id}`)}
                                            className="text-white flex justify-center items-center gap-1 bg-green-500 text-sm rounded-md px-4 py-1 hover:scale-105 hover:shadow-xl transition-all"
                                        >
                                            <FaEdit />
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(course._id)}
                                            className="text-white flex justify-center items-center gap-1 bg-red-500 text-sm rounded-md px-4 py-1 hover:scale-105 hover:shadow-xl transition-all"
                                        >
                                            <RiDeleteBin5Line />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </main>
    );
}
