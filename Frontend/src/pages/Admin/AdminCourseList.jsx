const AdminCourseList = () => {
    return (
        <div className="admin-course-list">
            <div className="card-container">
                <div className="row-container">
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
                                </tbody>
                            </table>
                        </div> 
                    </div> 
                </div>
            </div>
        </div>         
    );
}
 
export default AdminCourseList;