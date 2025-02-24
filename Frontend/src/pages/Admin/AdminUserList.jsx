
const AdminUserList = () => {


  return (
    <div className="admin-user-list">
        <div className="card-container">
            <div className="row-container">
                <div className="card admin-dashboard__card">
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
                            </tbody>
                        </table>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  );
};

export default AdminUserList;


/*
    

*/
