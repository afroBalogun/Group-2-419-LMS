import { Link } from "react-router";
import ProgressBar from "./ProgressBar";

const StudentCourseList = ({ courses }) => {



  return (
    <div className="course-container">
      <div className="card-container">
        {courses?.map((course) => (
          <div className="card" key={course.id}>
            <Link to ={"../courses/" + course.id}>
              <h3>{course.title}</h3>
              <p>{course.teacher}</p>
              <ProgressBar progress={course.progress} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourseList;