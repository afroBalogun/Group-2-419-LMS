import { Link } from "react-router";


const StudentNavBar = ({ student }) => {

    return (
      <div className="nav-bar">
        <div className="nav-info-container">
            <div className="courses">Courses</div>
            <div className="nav-name">Progress</div>
            <div className="courses">Discover New</div>
        </div>
        <div className="drop">
          <div className="pro-pic">
            <div className="pro-head"></div>
            <div className="pro-body"></div>
          </div>
          <div className="dropdown">
            <Link to="/student/dashboard"  className="d-a">Dashboard</Link>
            <Link to="/student/dashboard"  className="d-a">Profile</Link>
            <Link to="/student/login"  className="d-a">Log Out</Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default StudentNavBar;
  