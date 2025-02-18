import { useNavigate } from "react-router"
import useForm from "../../utils/useForm";
import { useRegisterAdminMutation } from "../../redux/admins/admin";

export default function AdminRegister(){

    // Work on the Admin registration PAge UI 

    const navigate = useNavigate();

    const { formData: adminInfo, handleInputChange, resetForm } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const [registerAdmin, { isLoading, error }] = useRegisterAdminMutation();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerAdmin(adminInfo).unwrap();
            console.log('Registration successful:', response);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "admin");  // Store role

            navigate("/admin/dashboard")
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="registration-form">

                <label htmlFor="Name">Name:</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    value={adminInfo.name} 
                />
                
                <label htmlFor="adminEmail">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={adminInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                />

                <label htmlFor="adminPassword">Password</label>
                <input
                    type="text"
                    id="adminPassword"
                    name="password"
                    value={adminInfo.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="form-input"
                />

                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? 'Registering....' : 'Register'}
                </button>

                {error && <p className="error-message">{error.data?.message || 'Registration failed'}</p>}
            </form>
        </div>
    )
}