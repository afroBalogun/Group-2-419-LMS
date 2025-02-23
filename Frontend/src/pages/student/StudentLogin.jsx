import { useState, useEffect } from "react"
import { useLoginStudentMutation } from "../../redux/students/student";
import { useNavigate } from "react-router";
import useForm from "../../utils/useForm";
import { useDispatch } from "react-redux";
import usersApi from "../../redux/users/users";

export default function StudentLogin(){

    const dispatch = useDispatch();
    const navigate = useNavigate()

    // Customize a log in page for students

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        dispatch(usersApi.util.resetApiState());
    }, [dispatch]);




    const [loginStudent, { isLoading, error }] = useLoginStudentMutation();

    const { formData: studentLoginInfo, handleInputChange, resetForm } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginStudent(studentLoginInfo).unwrap();
            console.log('Login successful:', response);
            localStorage.setItem("token", response.token);  // Store the token
            localStorage.setItem("userId", response.userId);  // Store the userId
            localStorage.setItem("role", "student");  // Store role

            navigate("/student/dashboard")
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="login-form">
                
                <label htmlFor="studentEmail">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={studentLoginInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                />

                <label htmlFor="studentPassword">Password</label>
                <input
                    type="text"
                    id="studentPassword"
                    name="password"
                    value={studentLoginInfo.password}
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