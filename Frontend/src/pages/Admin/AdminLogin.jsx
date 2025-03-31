import { useLoginAdminMutation } from "../../redux/admins/admin";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [loginAdmin] = useLoginAdminMutation();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await loginAdmin(data).unwrap();
            console.log("Login successful:", response);
            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "admin");
            window.dispatchEvent(new Event("storage"));
            navigate("/admin/dashboard");
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="w-full flex items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl bg-white shadow-md rounded-lg p-6 md:p-10 lg:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                    Admin Dashboard Login
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
                    {/* Email Field */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-semibold text-sm md:text-base">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter Admin Email"
                            className="bg-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                            {...register("email", { required: true })}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-semibold text-sm md:text-base">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="bg-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                            {...register("password", { required: true })}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 mt-4"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
