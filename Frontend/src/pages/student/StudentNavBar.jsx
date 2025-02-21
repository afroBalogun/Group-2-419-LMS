import { Link } from "react-router";


const StudentNavBar = ({ student }) => {

    return (
      <div >
        <div className="nav-bar">
          <h2>Welcome to your Dashboard, {student.name}</h2>
          <div className="drop">
            <div className="pro-pic">
              <div className="pro-head"></div>
              <div className="pro-body"></div>
            </div>
            <div className="dropdown">
              <Link to="/student/dashboard"  className="d-a">Dashboard</Link>
              <Link to="/student/dashboard"  className="d-a">Profile</Link>
              <Link to="/student/login"  className="d-a">Log Out</Link>
              <Link to="/student/dashboard"  className="d-a">Settings</Link>
            </div>
          </div>
        </div>
        <div className="sub-nav-bar">
          <div className="nav-info-container">
              <div className="courses">Dashboard</div>
              <div className="nav-name">Courses</div>
              <div className="courses">Discover New</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default StudentNavBar;
  