import { useState } from "react";
import { useNavigate } from "react-router";


const TeacherAddCourses = () => {



    const [title, setTitle] = useState('');
    const [teacher, setTeacher] = useState('');
    const [info, setInfo] = useState('');
    const [confirm, setConfirm] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) =>{
        e.preventDefault();
        const course = {title, description: info, teacher};
        const timeValue = 1000

        setConfirm('Adding Course...');
        setTimeout(() => {
            fetch('http://localhost:5000/courses/', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(course)
            }).then(() =>{
                setConfirm('Course Added');
                setTimeout(() =>{
                    setConfirm("You will be redirected to Dashboard in " + timeValue/1000 + " seconds");
                    setTimeout(() =>{
                        navigate('../dashboard');}, timeValue);
                }, timeValue)
            })
            

        }, timeValue);
    }    




    return ( 
        <div className="course-form">
            <h1>Add Course</h1>
            <form onSubmit={handleSubmit}>
                <label>Course Name</label>
                <input 
                    type="text" 
                    required 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <label>Course Details</label>
                <textarea 
                    required
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                ></textarea>
                <label>Course teacher</label>
                <input 
                    type="text"
                    required 
                    value={teacher}
                    onChange={(e) => setTeacher(e.target.value)}
                />
                <button>Add course</button>
            </form>
            <div>{confirm}</div>
        </div>
     );
}
 
export default TeacherAddCourses;
