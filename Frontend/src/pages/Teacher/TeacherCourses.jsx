import { useEffect, useState } from "react";
import { useGetCoursesQuery, useDeleteCourseMutation } from "../../redux/courses/course";
import useUserId from "../../utils/useUserId";
import { useGetUserByIdQuery } from "../../redux/users/users";
import { useNavigate } from "react-router";
import Loading from "../../components/Loading";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function TeacherCourses() {
    const teacherId = useUserId();
    const navigate = useNavigate();

    // Fetch teacher details
    const { data: teacher, error: teacherError, isLoading: teacherLoading } = useGetUserByIdQuery(teacherId, {
        skip: !teacherId,
    });

    // Fetch all courses
    const { data: allCourses, error: coursesError, isLoading: coursesLoading, refetch } = useGetCoursesQuery();

    // RTK Query mutation for deleting a course
    const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

    // Filter only the courses that the teacher is teaching
    const teacherCourses = allCourses?.filter(course => teacher?.coursesTeaching?.includes(course._id)) || [];

    // Handle Delete
    const handleDelete = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;

        try {
            await deleteCourse(courseId).unwrap();
            refetch(); // Force refresh of course list
        } catch (error) {
            console.error("Remove Error:", error);
            alert("Failed to delete.");
        }
    };

    // Handle loading & errors
    if (teacherLoading || coursesLoading) return <Loading />;
    if (teacherError || coursesError) return <p className="text-red-500 text-center">Error fetching data.</p>;

    return (
        <main className="w-full flex justify-center items-center p-4">
            <section className="w-3/4 shadow-md flex flex-col gap-4 p-10 bg-white rounded-lg">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Courses</h2>
                    {/* <button 
                        onClick={() => navigate(`/teacher/dashboard/add-course`)}
                        className="text-white bg-blue-500 text-sm rounded-md px-4 py-2 hover:scale-105 hover:shadow-xl transition-all"
                    >
                        Add New Course
                    </button> */}
                </div>

                {teacherCourses.length === 0 ? (
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
                            {teacherCourses.map((course, index) => (
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
                                            disabled={isDeleting}
                                        >
                                            <RiDeleteBin5Line />
                                            {isDeleting ? "Deleting..." : "Delete"}
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
