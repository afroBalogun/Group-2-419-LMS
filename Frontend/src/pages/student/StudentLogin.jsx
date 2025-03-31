import { useEffect } from "react";
import { useLoginStudentMutation } from "../../redux/students/student";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import usersApi from "../../redux/users/users";

export default function StudentLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Reset auth state on mount
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        dispatch(usersApi.util.resetApiState());
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const [loginStudent, { isLoading }] = useLoginStudentMutation();

    const onSubmit = async (data) => {
        try {
            const response = await loginStudent(data).unwrap();
            console.log("Login successful:", response);

            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "student");
            window.dispatchEvent(new Event("storage"));
            navigate("/student/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
            setError("login", {
                type: "manual",
                message: err.data?.message || "Invalid email or password",
            });
        }
    };

    return (
        <div className="w-full flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-[90%] max-w-md md:max-w-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                    Student Dashboard Login
                </h2>

                {errors.login && (
                    <p className="text-red-500 text-center">{errors.login.message}</p>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium">Email:</label>
                        <input
                            type="email"
                            autoFocus
                            placeholder="Enter your email"
                            className={`bg-gray-100 p-2 rounded-md outline-none border ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            } focus:ring-2 focus:ring-blue-400`}
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
                            } focus:ring-2 focus:ring-blue-400`}
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <span className="text-sm text-gray-600">Don't have an account?</span>
                        <Link
                            to="/student/register"
                            className="text-blue-500 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition-all duration-200 disabled:bg-blue-300"
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
    );
}
