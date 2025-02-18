import { useState } from "react"
import { useLoginAdminMutation } from "../../redux/admins/admin";
import { useNavigate } from "react-router";
import useForm from "../../utils/useForm";

export default function AdminLogin(){

    // Customize a log in page for admins

    const navigate = useNavigate()


    const [loginAdmin, { isLoading, error }] = useLoginAdminMutation();

    const { formData: adminLoginInfo, handleInputChange, resetForm } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginAdmin(adminLoginInfo).unwrap();
            console.log('Login successful:', response);
            localStorage.setItem("token", response.token);  // Store the token
            localStorage.setItem("userId", response.userId);  // Store the userId
            localStorage.setItem("role", "admin");  // Store role

            navigate("/admin/dashboard")
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="login-form">
                
                <label htmlFor="adminEmail">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={adminLoginInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                />

                <label htmlFor="adminPassword">Password</label>
                <input
                    type="text"
                    id="adminPassword"
                    name="password"
                    value={adminLoginInfo.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="form-input"
                />

                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                {error && <p className="error-message">{error.data?.message || 'Login failed'}</p>}
            </form>
        </div>
    )
}