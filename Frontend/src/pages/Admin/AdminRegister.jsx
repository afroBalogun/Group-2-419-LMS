import { useNavigate } from "react-router";
import { useRegisterAdminMutation } from "../../redux/admins/admin";
import { useForm } from "react-hook-form";

export default function AdminRegister() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [registerAdmin, { isLoading, error }] = useRegisterAdminMutation();

    const onSubmit = async (data) => {
        try {
            const response = await registerAdmin(data).unwrap();
            console.log("Registration successful:", response);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "admin"); // Store role

            navigate("/admin/dashboard");
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Admin Registration</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block font-medium">Name:</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                        placeholder="Enter your name"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block font-medium">Email:</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", { required: true })}
                        placeholder="Enter your email"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block font-medium">Password:</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", { required: true })}
                        placeholder="Enter your password"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>

                {error && (
                    <p className="text-red-500 text-sm mt-2">
                        {error.data?.message || "Registration failed"}
                    </p>
                )}
            </form>
        </div>
    );
}
