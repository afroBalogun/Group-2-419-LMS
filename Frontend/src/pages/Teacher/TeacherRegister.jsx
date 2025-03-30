import { useNavigate } from "react-router";
import { useRegisterTeacherMutation } from "../../redux/teachers/teacher";
import { useForm } from "react-hook-form";

export default function TeacherRegister() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [registerTeacher, { isLoading, error }] = useRegisterTeacherMutation();

    const onSubmit = async (data) => {
        try {
            const response = await registerTeacher(data).unwrap();
            console.log("Registration successful:", response);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "teacher"); // Store role

            navigate("/teacher/dashboard");
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <div className="w-full items-center justify-center flex flex-grow">
            <div className="py-8 px-4 flex md:flex-grow md:place-items-center">
                <div className="h-[400px] max-w-[500px] mx-auto bg-white shadow-md rounded px-4 pt-4 pb-8 md:w-[450px] mt-20 md:h-[450px] md:mt-10 md:px-8 2xl:px-10 2xl:max-w-[800px] 2xl:h-[500px]">
                    <h2 className="p-4 text-[1.4em] text-[#383838] font-semibold md:text-4xl text-center 2xl:text-5xl">
                        Teacher Register
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
                            <label className="text-sm md:text-[1em] 2xl:text-xl font-semibold">Name:</label>
                            <input
                                id="text"
                                type="text"
                                placeholder="Enter your Fullname"
                                className="bg-gray-100 py-2 px-4 rounded-2xl outline-0 transition-all duration-200 text-sm md:text-[1em] 2xl:text-lg"
                                {...register("name", { required: "Fullname is required" })}
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

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-400 p-3 text-white rounded-3xl mt-4 hover:cursor-pointer hover:scale-110 font-semibold transition-all duration-200 2xl:text-xl 2xl:mt-7"
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
