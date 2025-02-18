import { useNavigate } from "react-router"
import useForm from "../../utils/useForm";
import { useRegisterTeacherMutation } from "../../redux/teachers/teacher";

export default function TeacherRegister(){

    // Work on the Teacher registration Page UI 


    const navigate = useNavigate();
    const { formData: teacherInfo, handleInputChange, resetForm } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const [registerTeacher, { isLoading, error }] = useRegisterTeacherMutation();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerTeacher(teacherInfo).unwrap();
            console.log('Registration successful:', response);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "teacher");  // Store role

            navigate("/teacher/dashboard")
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
                    value={teacherInfo.name} 
                />
                
                <label htmlFor="teacherEmail">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={teacherInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                />

                <label htmlFor="teacherPassword">Password</label>
                <input
                    type="text"
                    id="teacherPassword"
                    name="password"
                    value={teacherInfo.password}
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