import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import getBaseUrl from "../utils/baseUrl";
import { useCreateCourseMutation } from "../redux/courses/course";
import Loading from "./Loading";
import useUserId from "../utils/useUserId";
import { useGetUserByIdQuery, useGetUsersQuery } from "../redux/users/users";

export default function AddCourse() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { register, handleSubmit } = useForm();

    const [createCourse] = useCreateCourseMutation();
    const userId = useUserId(); 
    const { data: user } = useGetUserByIdQuery(userId, { skip: !userId });
    const { data: users } = useGetUsersQuery();
    const teachers = users?.filter(user => user.role.toLowerCase() === "teacher") || [];

    let role = user?.role || "guest";
    role = role.toLowerCase();

    const onSubmit = async (formData) => {
        if (role === "teacher") {
            formData.teacher = userId;
        } else if (role === "admin" && !formData.teacher) {
            alert("Please select a teacher for this course");
            return;
        }

        try {
            setLoading(true);
            await createCourse(formData).unwrap();
            alert("Course added successfully!");
            navigate(`/${role}/dashboard/courses`);
        } catch (err) {
            setError("Error creating course");
            console.error("Create Course Error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500 text-center">{error}</p>;

    return (
        <main className="w-full flex justify-center items-center p-4">
            <section className="w-full max-w-lg md:w-1/2 shadow-md flex flex-col gap-4 p-6 bg-white rounded-lg">
                <h2 className="text-xl font-bold text-gray-700">Add Course</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Course Title"
                        {...register("title", { required: "Course title is required" })}
                        className="p-3 border rounded-md w-full focus:ring focus:ring-blue-300"
                    />
                    <textarea
                        placeholder="Course Description"
                        {...register("description", { required: "Course description is required" })}
                        className="p-3 border rounded-md w-full focus:ring focus:ring-blue-300"
                    />

                    {role === "admin" && teachers.length > 0 && (
                        <select 
                            {...register("teacher", { required: "Teacher is required" })} 
                            className="p-3 border rounded-md w-full focus:ring focus:ring-blue-300"
                        >
                            <option value="">Select a Teacher</option>
                            {teachers.map((teacher) => (
                                <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                            ))}
                        </select>
                    )}
                    
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all"
                    >
                        Add Course
                    </button>
                </form>
            </section>
        </main>
    );
}
