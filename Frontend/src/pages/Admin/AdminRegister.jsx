import { useNavigate } from "react-router";
import { useRegisterAdminMutation } from "../../redux/admins/admin";
import { useForm } from "react-hook-form";

export default function AdminRegister() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [registerAdmin, { isLoading, error }] = useRegisterAdminMutation();

    const onSubmit = async (data) => {
        try {
            const response = await registerAdmin(data).unwrap();
            console.log("Registration successful:", response);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "admin");

            navigate("/admin/dashboard");
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-md rounded-lg p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                    Admin Registration
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: "Name is required" })}
                            placeholder="Enter your name"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            placeholder="Enter your email"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                            placeholder="Enter your password"
                            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                            {error.data?.message || "Registration failed"}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
