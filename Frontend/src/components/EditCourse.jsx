import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";
import getBaseUrl from "../utils/baseUrl";
import { useUpdateCourseMutation } from "../redux/courses/course";
import Loading from "./Loading";
import { useGetUserByIdQuery } from "../redux/users/users";
import useUserId from "../utils/useUserId";
import FileUpload from "./FileUpload";

export default function EditCourse() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useForm setup
    const { register, handleSubmit, control, setValue, getValues } = useForm({
        defaultValues: {
            title: "",
            description: "",
            assignments: [],
        },
    });

    // useFieldArray for dynamic assignment fields
    const { fields, append, remove } = useFieldArray({
        control,
        name: "assignments",
    });

    const [updateCourse] = useUpdateCourseMutation();

    const userId = useUserId(); 
    const { data: user } = useGetUserByIdQuery(userId, { skip: !userId });

    let role = user?.role || "guest";
    role = role.toLowerCase();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`${getBaseUrl()}/courses/${courseId}`);
                if (!response.ok) throw new Error("Failed to fetch course");

                const data = await response.json();
                setValue("title", data.title);
                setValue("description", data.description);
                setValue("assignments", data.assignments || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId, setValue]);

    // Submit form data
    const onSubmit = async (formData) => {
        if (!courseId) {
            alert("Invalid course ID");
            return;
        }

        try {
            await updateCourse({ courseId, updateData: formData }).unwrap();
            alert("Course updated successfully!");
            navigate(`/${role}/dashboard/courses`);
        } catch (err) {
            alert("Error updating course");
            console.error("Update Error:", err);
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500">Error loading course: {error}</p>;

    return (
        <main className="w-full flex justify-center items-center p-4">
            <section className="w-full max-w-lg md:w-1/2 shadow-md flex flex-col gap-4 p-6 bg-white rounded-lg">
                <h2 className="text-xl font-bold text-gray-700">Edit Course</h2>

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

                    {/* Assignments Section */}
                    <h3 className="text-lg font-semibold mt-4 text-gray-700">Assignments</h3>
                    {fields.map((assignment, index) => (
                        <div key={assignment.id} className="flex flex-col gap-2 border p-3 rounded-md bg-gray-100">
                            <input
                                type="text"
                                placeholder="Assignment Title"
                                {...register(`assignments.${index}.title`, { required: "Title is required" })}
                                className="p-2 border rounded-md w-full focus:ring focus:ring-blue-300"
                            />
                            <input
                                type="date"
                                {...register(`assignments.${index}.dueDate`, { required: "Due date is required" })}
                                className="p-2 border rounded-md w-full focus:ring focus:ring-blue-300"
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    
                    {/* Add Assignment Button */}
                    <button
                        type="button"
                        onClick={() => append({ title: "", dueDate: "" })}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
                    >
                        + Add Assignment
                    </button>
                    <FileUpload/>

                    <button 
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all"
                    >
                        Update Course
                    </button>
                </form>
            </section>
        </main>
    );
}
