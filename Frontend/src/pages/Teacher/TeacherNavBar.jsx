import { Link } from "react-router";


const TeacherNavBar = ({ teacher }) => {

    return (
      <div className="nav-container">
        <div className="nav-bar">
          <h2>Welcome to your Dashboard, {teacher.name}</h2>
          <div className="drop">
            <div className="pro-pic">
              <div className="pro-head"></div>
              <div className="pro-body"></div>
            </div>
            <div className="dropdown">
              <div className="d-info">{teacher.email} <br/> {teacher.role}</div>
              <Link to="/teacher/dashboard"  className="d-link">Dashboard</Link>
              <Link to="/teacher/dashboard"  className="d-link">Profile</Link>
              <Link to="/teacher/login"  className="d-link">Log Out</Link>
              <Link to="/teacher/dashboard"  className="d-link">Settings</Link>
            </div>
          </div>
        </div>
        <div className="sub-nav-bar">
          <div className="nav-info-container">
              <Link to= "/teacher/dashboard" className="courses">Dashboard</Link>
              <Link to= "../dashboard/courses/edit" className="nav-name">Edit Courses</Link>
              <Link to= "/teacher/dashboard" className="courses">Add New</Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default TeacherNavBar;
  