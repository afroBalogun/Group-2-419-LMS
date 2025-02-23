import { Link, useLocation, useNavigate } from "react-router";

const TeacherCourseList = ({ courses }) => {
  const location = useLocation();
  const isEditMode = location.pathname.endsWith("/edit");
  const isViewMode = location.pathname.endsWith("/dashboard");
  const navigate = useNavigate();

  const handleEdit = (courseId) => {
    navigate("/teacher/dashboard/courses/edit/" + courseId);
  };
  const handleDelete = (courseId) => {     
    fetch('http://localhost:5000/courses/' + courseId, {
      method:'DELETE'
    }).then(() =>{
      window.location.reload();
    })
  };  

  return (
    <div className="course-container">
      <div className={"card-container" + (isEditMode ? "-edit" : "")}>
        {courses?.map((course) => (
          <div className="card" key={course.id}>
            {isViewMode && (
              <Link to={"../courses/"+ course.id}>
                <h2>{course.title}</h2>
                <p>{course.teacher}</p>
                <p>{course.description}</p>
              </Link>
            )}
            {isEditMode && (
              <div>
                  <h2>{course.title}</h2>
                  <p>{course.teacher}</p>
                <div className="edit-buttons">  
                  <button onClick={() => handleEdit(course.id)}>Edit</button>
                  <button onClick={() => handleDelete(course.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCourseList;
