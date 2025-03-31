import { useEffect, useState } from "react";
import getBaseUrl from "../utils/baseUrl";
import { useNavigate } from "react-router";
import Loading from "./Loading";
import { useDeleteCourseMutation } from "../redux/courses/course";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function ManageCourses(){
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    // get student
    // const studentId = useUserId()

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

    const [ deleteCourse] = useDeleteCourseMutation()


    const handleDelete = async (courseId) => {    
        const token = localStorage.getItem("token");  // Get token
        console.log("Token:", token);  // Debugging
    
        if (!token) {
            alert("No authentication token found. Please log in.");
            return;
        }
    
        try {
            const response = await fetch(`${getBaseUrl()}/courses/delete-course/${courseId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json"
                }
            });
    
            const data = await response.json();
            console.log("Delete Response:", data); // Debugging
    
            if (response.ok) {
                setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
                alert("Deleted successfully!");
            } else {
                alert(data.message || "Failed to delete.");
            }
        } catch (error) {
            console.error("Remove Error:", error);
            alert("Failed to delete.");
        }
    };
    
    


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
            <td className="hover:underline hover:cursor-pointer transition-all duration-100" onClick={() => navigate(`/admin/dashboard/course/${course._id}`)}>
                {course.title}
            </td>
            <td>{course.teacher.name}</td>
            <td className="flex gap-2">
                <button onClick={() => navigate(`/admin/dashboard/edit-course/${course._id}`)} className="text-white flex justify-center items-center gap-1 bg-[#008a63] text-sm rounded-md px-4 py-1 hover:cursor-pointer transition-all duration-100 hover:scale-105 hover:shadow-xl">
                    <FaEdit />Edit
                </button>
                <button onClick={() => handleDelete(course._id)} className="text-white flex justify-center items-center gap-1 bg-red-500 text-sm rounded-md px-4 py-1 hover:cursor-pointer transition-all duration-100 hover:scale-105 hover:shadow-xl">
                    <RiDeleteBin5Line />
                    Delete
                </button>
            </td>
        </tr>
    ));
    return(
        <main className="w-full flex justify-center items-center p-4">
        <section className="w-3/4 shadow-md flex flex-col gap-2 justify-center p-10">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Courses</h2>
                <button onClick={() => navigate(`/admin/dashboard/add-course`)} className="text-white bg-blue-500 text-sm rounded-md px-4 py-2 hover:cursor-pointer transition-all duration-100 hover:scale-105 hover:shadow-xl">
                    Add New Course
                </button>
            </div>
            <table className="w-full border-separate border-spacing-2">
                <thead className="uppercase font-semibold">
                    <tr>
                        <td>s/n</td>
                        <td>Course Name</td>
                        <td>Course Lecturer</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody className="">
                    {courseDetails}
                </tbody>
            </table>
        </section>
    </main>
    )
}