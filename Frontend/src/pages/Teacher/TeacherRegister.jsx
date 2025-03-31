import { useNavigate } from "react-router";
import { useRegisterTeacherMutation } from "../../redux/teachers/teacher";
import { useForm } from "react-hook-form";

export default function TeacherRegister() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();
    const [registerTeacher, { isLoading, error }] = useRegisterTeacherMutation();

    const onSubmit = async (data) => {
        try {
            const response = await registerTeacher(data).unwrap();
            console.log("Registration successful:", response);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "teacher");

            reset(); // Clear form fields
            navigate("/teacher/dashboard");
        } catch (err) {
            console.error("Registration failed:", err);
            setError("root", { message: err?.data?.message || "Registration failed" });
        }
    };

    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <div className="py-8 px-4 flex md:flex-grow md:place-items-center">
                <div className="max-w-[500px] w-full bg-white shadow-md rounded px-6 pt-6 pb-8 md:px-8 2xl:px-10 2xl:max-w-[800px]">
                    <h2 className="text-center text-2xl md:text-4xl 2xl:text-5xl font-semibold text-gray-800 mb-6">
                        Teacher Register
                    </h2>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col">
                            <label className="text-sm md:text-lg font-semibold">Email:</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter Your Email"
                                className="bg-gray-100 py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-sm md:text-lg"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm md:text-lg font-semibold">Name:</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your Fullname"
                                className="bg-gray-100 py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-sm md:text-lg"
                                {...register("name", { required: "Fullname is required" })}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm md:text-lg font-semibold">Password:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="bg-gray-100 py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-sm md:text-lg"
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>

                        {errors.root && <p className="text-red-500 text-center">{errors.root.message}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-500 hover:bg-blue-600 p-3 text-white rounded-lg mt-4 transition-all duration-200 font-semibold text-lg"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
