import { Link } from "react-router"; // Use react-router-dom for web apps
import React from "react";
import { useGetUserByIdQuery } from "./redux/users/users";
import getUserId from "./utils/getUserId";
import useLogout from "./utils/LogOut";

const NavBar = () => {
  const userId = getUserId();
  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  const role = user ? user.role.trim().toLowerCase() : "";
  const logout = useLogout(role);

  if (isLoading) return   (
    <nav className="nav-bar">
      <h1>Welcome</h1>
    </nav>
  );
  if (error) return null;



  if (role === "student") {
    return (
      <nav className="nav-bar student-nav">
        <div>
          <div className="i-nav-bar">
            <h2>Welcome to your Dashboard, {user.name}</h2>
            <div className="drop">
              <div className="pro-pic">
                <div className="pro-head"></div>
                <div className="pro-body"></div>
              </div>
              <div className="dropdown">
                <div className="d-info">
                  {user.email} <br /> {user.role}
                </div>
                <Link to="/student/dashboard" className="d-link">
                  Dashboard
                </Link>
                <Link to="/student/dashboard" className="d-link">
                  Profile
                </Link>
                <div onClick={() => logout()} role="button" className="d-link">
                  Log Out
                </div>
                <Link to="/student/dashboard" className="d-link">
                  Settings
                </Link>
              </div>
            </div>
          </div>
          <div className="sub-nav-bar">
            <div className="nav-info-container">
              <Link to="/student/dashboard"  className="courses">Dashboard</Link>
              <Link to="/student/dashboard/courses/edit" className="nav-name">Courses</Link>
              <Link to="/student/dashboard" className="courses">Discover New</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  } else if (role == "teacher") {
    return (
      <nav className="nav-bar teacher-nav">
        <div className="i-nav-bar">
          <h2>Welcome to your Dashboard, {user.name}</h2>
          <div className="drop">
            <div className="pro-pic">
              <div className="pro-head"></div>
              <div className="pro-body"></div>
            </div>
            <div className="dropdown">
              <div className="d-info">
                {user.email} <br /> {user.role}
              </div>
              <Link to="/teacher/dashboard" className="d-link">
                Dashboard
              </Link>
              <Link to="/teacher/dashboard" className="d-link">
                Profile
              </Link>
              <div onClick={() => logout()} role="button" className="d-link">
                  Log Out
              </div>
              <Link to="/teacher/dashboard" className="d-link">
                Settings
              </Link>
            </div>
          </div>
        </div>
        <div className="sub-nav-bar">
          <div className="nav-info-container">
            <Link to="/teacher/dashboard" className="courses">
              Dashboard
            </Link>
            <Link to="teacher/dashboard/courses/edit" className="nav-name">
              Edit Courses
            </Link>
            <Link to={"teacher/dashboard/courses/add"} className="courses">
              Add New
            </Link>
          </div>
        </div>
      </nav>
    );
  } else if (role === "admin") {
    return (
      <nav className="nav-bar admin-nav">
        <div>
          <div className="i-nav-bar">
            <h2>Welcome to your Dashboard, {user.name}</h2>
            <div className="drop">
              <div className="pro-pic">
                <div className="pro-head"></div>
                <div className="pro-body"></div>
              </div>
              <div className="dropdown">
                <div className="d-info">
                  {user.email} <br /> {user.role}
                </div>
                <Link to="/admin/dashboard" className="d-link">
                  Dashboard
                </Link>
                <Link to="/admin/dashboard" className="d-link">
                  Profile
                </Link>
                <div onClick={() => logout()} role="button" className="d-link">
                  Log Out
                </div>
                <Link to="/admin/dashboard" className="d-link">
                  Settings
                </Link>
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
      </nav>
    );
  } else {
    return (
      <nav className="nav-bar">
        <h1>Welcome</h1>
        <h2></h2>
      </nav>
    );
  }
};

export default NavBar;
