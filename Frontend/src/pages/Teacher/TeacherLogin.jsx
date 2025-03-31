import { useEffect } from "react";
import { useLoginTeacherMutation } from "../../redux/teachers/teacher";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import usersApi from "../../redux/users/users";
import { useForm } from "react-hook-form";

export default function TeacherLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Clear storage on component mount
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        dispatch(usersApi.util.resetApiState());
    }, [dispatch]);

    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [loginTeacher, { isLoading, error }] = useLoginTeacherMutation();

    const onSubmit = async (data) => {
        try {
            const response = await loginTeacher(data).unwrap();
            console.log("Login successful:", response);

            // Store user data in localStorage
            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "teacher");
            window.dispatchEvent(new Event("storage"));
            navigate("/teacher/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
            setError("root", { message: "Invalid email or password" });
        }
    };

    return (
        <div className="w-full flex items-center justify-center min-h-screen">
            <div className="py-8 px-4 flex md:flex-grow md:place-items-center">
                <div className="max-w-[500px] w-full bg-white shadow-md rounded px-6 pt-6 pb-8 mt-20 md:mt-10 md:px-8 2xl:px-10 2xl:max-w-[800px]">
                    <h2 className="text-center text-2xl md:text-4xl 2xl:text-5xl font-semibold text-gray-800 mb-6">
                        Teacher Dashboard Login
                    </h2>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col">
                            <label className="text-sm md:text-[1em] 2xl:text-xl font-semibold">Email:</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="bg-gray-100 py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-sm md:text-[1em] 2xl:text-lg"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm md:text-[1em] 2xl:text-xl font-semibold">Password:</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="bg-gray-100 py-2 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-sm md:text-[1em] 2xl:text-lg"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>

                        {errors.root && <p className="text-red-500 text-center">{errors.root.message}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-500 hover:bg-blue-600 p-3 text-white rounded-lg mt-4 transition-all duration-200 font-semibold text-lg"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
