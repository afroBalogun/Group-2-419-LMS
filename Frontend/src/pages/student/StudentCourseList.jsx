import { Link, useLocation } from "react-router";

const StudentCourseList = ({ courses }) => {
  const location = useLocation();
  const isEditMode = location.pathname.endsWith("/edit");
  const isViewMode = location.pathname.endsWith("/dashboard");



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
                  <button onClick={() => handleDelete(course.id)}>Remove Course</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourseList;
