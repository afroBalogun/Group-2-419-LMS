import { useNavigate } from "react-router";
import { useGetUserByIdQuery } from "../../redux/users/users";
import getUserId from "../../utils/getUserId";
import useFetch from "../../utils/useFetch";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const adminId = getUserId(); // Get user ID from localStorage

  // If no userId, redirect to login
  if (!adminId) {
    navigate("/admin/login");
    return null;
  }

  // Fetch courses and admin data
  const { data: courses, isPending } = useFetch('http://localhost:5000/courses');
  const { data: admin, error, isLoading } = useGetUserByIdQuery(adminId);

  // Calculate counts only if courses data is available
  const totalTeacherCount = courses?.length;
  const totalStudentCount = courses?.reduce(
    (total, course) => total + course.students.length,
    0
  );

  // Unique teacher names using a Set (only counts names once)
  const uniqueTeachers = new Set(courses?.map(course => course.teacher));
  // Unique student names across all courses using a Set
  const uniqueStudents = new Set();
  courses?.forEach(course => {
    course.students.forEach(student => uniqueStudents.add(student));
  });
  const totalUserCount = uniqueTeachers.size + uniqueStudents.size;

  // Render loading/error states or the dashboard
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1>Dashboard</h1>
      </header>

        {/* User Management Overview */}
        <div className="card-container">
            <div className="row-container">
                <div className="card admin-dashboard__card">
                    <div className="card-header">User Management Overview</div>
                    <div className="card-body">
                        <p><strong>Total Users:</strong> {totalUserCount}</p>
                        <p><strong>New Sign-ups (Last 7 Days):</strong> 5</p>
                        <p><strong>Active Users:</strong> 8</p>
                        <p>{uniqueTeachers}</p>
                    </div>
                </div>


                <div className="card admin-dashboard__card">
                    <div className="card-header">Platform Usage Statistics</div>
                    <div className="card-body">
                        <p><strong>Page Views:</strong> 5000</p>
                        <p><strong>Sessions:</strong> 3500</p>
                        <p><strong>Avg. Session Duration:</strong> 5 min</p>
                        <div className="admin-dashboard__chart-placeholder">
                        Chart Here
                        </div>
                    </div>
                </div>

                {/*<div className="card admin-dashboard__card">
                    <div className="card-header">User Management</div>
                    <div className="card-body">
                        <table className="table table-striped">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>john@example.com</td>
                            <td>
                                <button className="btn btn-sm btn-primary">Edit</button>
                                <button className="btn btn-sm btn-danger">Delete</button>
                            </td>
                            </tr>
                            {/* Additional rows can go here 
                        </tbody>
                        </table>
                    </div>
                </div>



                <div className="card admin-dashboard__card">
                    <div className="card-header">Course Management</div>
                    <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Enrolled</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>C001</td>
                            <td>Introduction to Programming</td>
                            <td>300</td>
                            <td>
                            <button className="btn btn-sm btn-primary">Edit</button>
                            <button className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                        {/* Additional rows can go here 
                        </tbody>
                    </table>
                    </div> 
                </div> */}
            </div>
        </div>
    </div>
  );
}
/*<section className="admin-dashboard__settings">
          <h2>Settings</h2>
          <div className="card admin-dashboard__card">
            <div className="card-header">General Settings</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="siteName">Site Name</label>
                  <input type="text" className="form-control" id="siteName" defaultValue="My Learning Platform" />
                </div>
                <div className="form-group">
                  <label htmlFor="adminEmail">Admin Email</label>
                  <input type="email" className="form-control" id="adminEmail" defaultValue="admin@example.com" />
                </div>
                <button type="submit" className="btn btn-success">Save Settings</button>
              </form>
            </div>
          </div>
        </section>*/