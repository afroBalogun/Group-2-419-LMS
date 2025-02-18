import { useNavigate } from "react-router"
import useForm from "../../utils/useForm";
import { useRegisterStudentMutation } from "../../redux/students/student";

export default function StudentRegister(){

    // Work on the Student registration PAge UI 


    const navigate = useNavigate();

    const { formData: studentInfo, handleInputChange, resetForm } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const [registerStudent, { isLoading, error }] = useRegisterStudentMutation();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerStudent(studentInfo).unwrap();
            console.log('Registration successful:', response);
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("role", "student");  // Store role

            navigate("/student/dashboard")
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
                    value={studentInfo.name} 
                />
                
                <label htmlFor="studentEmail">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={studentInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                />

                <label htmlFor="studentPassword">Password</label>
                <input
                    type="text"
                    id="studentPassword"
                    name="password"
                    value={studentInfo.password}
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