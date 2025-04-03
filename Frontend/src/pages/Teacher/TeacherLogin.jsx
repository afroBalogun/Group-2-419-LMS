import { useEffect } from "react";
import { useLoginTeacherMutation } from "../../redux/teachers/teacher";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import usersApi from "../../redux/users/users";
import { useForm } from "react-hook-form";
import SomeNav from "../../components/SomeNav";

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
        <div className="w-full">
            <SomeNav/>
            <div className="w-full flex items-center justify-center min-h-screen bg-[url(/images/teach-board.jpg)] bg-cover bg-center">
                <div className="relative max-w-[500px] w-full bg-white shadow-md rounded px-6 pt-6 pb-8 mt-20 md:mt-10 md:px-8 2xl:px-10 2xl:max-w-[800px] z-10">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                        Teacher Dashboard Login
                    </h2>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Email:</label>
                        <input
                            type="email"
                            autoFocus
                            placeholder="Enter your email"
                            className={`bg-gray-100 p-2 rounded-md outline-none border ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            } focus:ring-2 focus:ring-orange-400`}
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className={`bg-gray-100 p-2 rounded-md outline-none border ${
                                errors.password ? "border-red-500" : "border-gray-300"
                            } focus:ring-2 focus:ring-orange-400`}
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-orange-800 text-white py-4 rounded-md font-semibold hover:bg-orange-900 transition-all duration-200 disabled:bg-orange-950 hover:cursor-pointer"
                    >
                        {isLoading ? (
                            <span className="flex justify-center items-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
}
