import { useEffect } from "react";
import { useLoginStudentMutation } from "../../redux/students/student";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import usersApi from "../../redux/users/users";

export default function StudentLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Clear storage on mount
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        dispatch(usersApi.util.resetApiState());
    }, [dispatch]);

    const { register, handleSubmit, watch } = useForm();
    const [loginStudent, { isLoading }] = useLoginStudentMutation();

    // Watch form inputs
    const studentLoginInfo = watch();
    
    const onSubmit = async (data) => {
        try {
            const response = await loginStudent(data).unwrap();
            console.log("Login successful:", response);

            // Store user data in localStorage
            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "student");
            window.dispatchEvent(new Event("storage"));
            navigate("/student/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="w-full items-center justify-center flex flex-grow">
            <div className="py-8 px-4 flex md:flex-grow md:place-items-center">
                <div className="h-[350px] max-w-[500px] mx-auto bg-white shadow-md rounded px-4 pt-4 pb-8 mt-20 md:h-[400px] md:mt-10 md:px-8 2xl:px-10 2xl:max-w-[800px] 2xl:h-[500px]">
                    <h2 className="p-4 text-[1.4em] text-[#383838] font-semibold md:text-4xl text-center 2xl:text-5xl">
                        Student Dashboard Login
                    </h2>
                    <form className="flex flex-col p-2 gap-2 2xl:gap-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm md:text-[1em] 2xl:text-xl font-semibold">Email:</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter Your Email"
                                className="bg-gray-100 py-2 px-4 rounded-2xl outline-0 transition-all duration-200 text-sm md:text-[1em] 2xl:text-lg"
                                {...register("email", { required: "Email is required" })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm md:text-[1em] 2xl:text-xl font-semibold">Password:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="bg-gray-100 py-2 px-4 rounded-2xl outline-0 transition-all duration-200 text-sm md:text-[1em] 2xl:text-lg"
                                {...register("password", { required: "Password is required" })}
                            />
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            <span className="text-sm md:text-[1em] 2xl:text-xl">Don't have an account?</span>
                            <Link to="/student/register" className="text-blue-400 hover:text-blue-600 transition-all duration-200">Sign Up</Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-400 p-3 text-white rounded-3xl mt-4 hover:cursor-pointer hover:scale-110 font-semibold transition-all duration-200 2xl:text-xl 2xl:mt-7"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
