import { useNavigate } from "react-router";
import ProgressBar from "./ProgressBar";

const StudentCourseList = ({ courses }) => {

  const navigate = useNavigate();


  return (
    <div className="course-container">
      <div className="card-container">
        {courses.map((course) => (
          <div className="card" key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.teacher}</p>
            <ProgressBar progress={course.progress} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourseList;