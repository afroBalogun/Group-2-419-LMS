import { useEffect, useState } from "react";
import getBaseUrl from "../../utils/baseUrl";
import { useDeleteCourseMutation } from "../../redux/courses/course";
import useUserId from "../../utils/useUserId";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";


export default function TeacherCourses() {
    // Store courses in state
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [deleteStudent] = useDeleteCourseMutation();
    // get student
    const studentId = useUserId()
    const navigate = useNavigate()

    
    const handleDelete = async (courseId) => {    
        try {
            fetch(`${getBaseUrl()}/courses/delete-course/${courseId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, 
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(console.log).catch(console.error);

            window.location.reload()
            alert("Deleted successfully!");
        } catch (error) {
            console.error("Remove Error:", error);
            alert("Failed to delete.");
        }
    };


    

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

    // Handle loading state
    if (loading) return <Loading/>;

    // Handle errors
    if (error) return <p>Error fetching courses: {error}</p>;

    // Handle empty courses
    if (courses.length === 0) return <p>No courses available.</p>;

    // Generate table rows
    const courseDetails = courses.map((course, index) => (
        <tr key={index} className="">
            <td>{index + 1}</td>
            <td>{course.title}</td>
            <td>{course.description}</td>
            <td className="flex gap-2">
                <button onClick={() => navigate(`/teacher/dashboard/edit-course/${course._id}`)} className="text-white flex justify-center items-center gap-1 bg-[#008a63] text-sm rounded-md px-4 py-1 hover:cursor-pointer transition-all duration-100 hover:scale-105 hover:shadow-xl">
                    <FaEdit />
                    Edit
                </button>
                <button onClick={() => handleDelete(course._id)} className="text-white flex justify-center items-center gap-1 bg-red-500 text-sm rounded-md px-4 py-1 hover:cursor-pointer transition-all duration-100 hover:scale-105 hover:shadow-xl">
                    <RiDeleteBin5Line />
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <main className="w-full flex justify-center items-center p-4">
            <section className="w-3/4 shadow-md flex flex-col gap-2 justify-center p-10">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">Courses</h2>
                    <button onClick={() => navigate(`/teacher/dashboard/add-course`)} className="text-white bg-blue-500 text-sm rounded-md px-4 py-2 hover:cursor-pointer transition-all duration-100 hover:scale-105 hover:shadow-xl">
                        Add New Course
                    </button>
                </div>
                <table className="w-full border-separate border-spacing-8">
                    <thead className="uppercase font-semibold">
                        <tr>
                            <td>s/n</td>
                            <td>Course Name</td>
                            <td>Course Description</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody className="">
                        {courseDetails}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
