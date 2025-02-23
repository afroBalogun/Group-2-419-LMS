import { useState,  useEffect } from "react"
import { useLoginTeacherMutation } from "../../redux/teachers/teacher";
import { useNavigate } from "react-router";
import useForm from "../../utils/useForm";
import { useDispatch } from "react-redux";
import usersApi from "../../redux/users/users";

export default function TeacherLogin(){

        // Customize a log in page for teachers
        const dispatch = useDispatch();
        useEffect(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                dispatch(usersApi.util.resetApiState());
            }, [dispatch]);
        


    const navigate = useNavigate()
    const [loginTeacher, { isLoading, error }] = useLoginTeacherMutation();

    const { formData: teacherLoginInfo, handleInputChange, resetForm } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginTeacher(teacherLoginInfo).unwrap();
            console.log('Login successful:', response);
            localStorage.setItem("token", response.token);  // Store the token
            localStorage.setItem("userId", response.userId);  // Store the userId
            localStorage.setItem("role", "teacher");  // Store role

            navigate("/teacher/dashboard")
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="login-form">
                
                <label htmlFor="teacherEmail">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={teacherLoginInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                />

                <label htmlFor="teacherPassword">Password</label>
                <input
                    type="text"
                    id="teacherPassword"
                    name="password"
                    value={teacherLoginInfo.password}
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