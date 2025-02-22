import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


const TeacherEditCourses = () => {

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [teacher, setTeacher] = useState('');
    const [info, setInfo] = useState('');
    const [confirm, setConfirm] = useState('');
    const [isPending,setIsPending] = useState(true);
    const navigate = useNavigate();

    const url = 'http://localhost:5000/courses/' + id
    useEffect(() =>{
        fetch(url)
        .then(res => {
            if (!res.ok ){
                navigate('Notfound');
                throw Error('Could not fetch data');
            }
            return res.json();
        })
        .then(data => {
            setTitle(data.title);
            setTeacher(data.teacher);
            setInfo(data.description);
            setIsPending(false);
        })
        .catch(err =>{
            console.log(err.message)
        })
    }, [url] )

    const handleSubmit = (e) =>{
        e.preventDefault();
        const course = {title, description: info, teacher};
        const timeValue = 1000

        setConfirm('Editing Course...');
        setTimeout(() => {
            fetch('http://localhost:5000/courses/' + id, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(course)
            }).then(() =>{
                setConfirm('Edit Complete');
                setTimeout(() =>{
                    setConfirm("You will be redirected to Edit Courses Page in " + timeValue/1000 + " seconds");
                    setTimeout(() =>{
                        navigate('../dashboard/courses/edit');}, timeValue);
                }, timeValue)
            })
            

        }, timeValue);
    }    




    return ( 
        <div className="course-form">
            <h1>Edit Course</h1>
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
                <button>Confirm Edit</button>
            </form>
            <div>{confirm}</div>
        </div>
     );
}
 
export default TeacherEditCourses;
