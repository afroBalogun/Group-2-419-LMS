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

    // Mutation for enrolling a student in a course
    const [enrollStudent] = useEnrollStudentMutation();

    const [removeStudent] = useRemoveStudentMutation();
    // get student
    const studentId = useUserId()

    const navigate = useNavigate()

    const handleEnroll = async (courseId) => {
        if (!studentId) return alert("Student ID not found!");

        try {
            await enrollStudent({ courseId, studentId }).unwrap();
            alert("Enrollment successful!");
            window.location.href = "/student/dashboard";
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
            window.location.href = "/student/dashboard";
        } catch (error) {
            console.error("Remove Error:", error);
            alert("Failed to remove.");
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
            <td>{course.teacher.name}</td>
            <td className="flex gap-2">
            <button onClick={() => handleEnroll(course._id)} className="text-white flex justify-center items-center gap-1 bg-blue-500 text-sm rounded-md px-4 py-1 hover:cursor-pointer transition-all duration-100 hover:scale-105 hover:shadow-xl">
                <HiOutlineAcademicCap />
                Enroll
            </button>
            <button onClick={() => handleRemove(course._id)} className="text-white flex justify-center items-center gap-1 bg-red-500 text-sm rounded-md px-4 py-1 hover:cursor-pointer transition-all duration-100 hover:scale-105 hover:shadow-xl">
                <RiDeleteBin5Line />
                Remove
            </button>


            </td>
        </tr>
    ));

    return (
        <main className="w-full flex justify-center items-center p-4">
            <section className="w-3/4 shadow-md flex flex-col gap-2 justify-center p-10">
                <h2 className="text-xl font-bold">Courses</h2>
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
    );
}
