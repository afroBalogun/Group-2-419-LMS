import { FaBookReader, FaUserCheck, FaPercentage } from "react-icons/fa";
import { useGetCoursesQuery, useGetTotalEnrollmentsQuery } from "../../redux/courses/course";
import { useGetUsersQuery } from "../../redux/users/users";
import { FaBook, FaUsers } from "react-icons/fa6";

export default function AdminDashboard() {
    const { data: users, isLoading: usersLoading } = useGetUsersQuery();
    const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();
    const { data: totalEnrollments, isLoading: enrollmentsLoading } = useGetTotalEnrollmentsQuery();
    // const { data: mostEnrolledCourse, isLoading: mostCourseLoading } = useGetMostEnrolledCourseQuery();

    // Function to get the count of each role
    const getUserRoleCounts = (users = []) => {
        return users.reduce((acc, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1;
            return acc;
        }, {});
    };

    const roleCounts = users ? getUserRoleCounts(users) : {};
    const totalUsers = users?.length || 0;
    const activeUsers = Math.floor(totalUsers * 0.75); // Assume 75% active users for now.

    return (
        <main className="p-8 flex flex-col gap-6">
            {/* System Overview */}
            <section>
                <h2 className="text-2xl font-bold mb-2">📊 System Overview</h2>
                <p className="italic text-gray-600">Learning Management System Statistics</p>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
                    <StatCard 
                        title="Total Users" 
                        value={usersLoading ? "Loading..." : totalUsers} 
                        icon={<FaUsers size={40} className="text-blue-600" />} 
                    />
                    <StatCard 
                        title="Total Courses" 
                        value={coursesLoading ? "Loading..." : courses?.length || 0} 
                        icon={<FaBook size={40} className="text-green-600" />} 
                    />
                    <StatCard 
                        title="Total Enrollments" 
                        value={enrollmentsLoading ? "Loading..." : totalEnrollments?.totalEnrollments || 0} 
                        icon={<FaBookReader size={40} className="text-red-600" />} 
                    />
                    <StatCard 
                        title="Active Users" 
                        value={usersLoading ? "Loading..." : activeUsers} 
                        icon={<FaUserCheck size={40} className="text-purple-600" />} 
                    />
                    {/* <StatCard 
                        title="Most Enrolled Course" 
                        value={mostCourseLoading ? "Loading..." : mostEnrolledCourse?.title || "N/A"} 
                        icon={<FaBook size={40} className="text-orange-600" />} 
                    /> */}
                    <StatCard 
                        title="Student vs Teacher Ratio" 
                        value={
                            usersLoading 
                                ? "Loading..." 
                                : `${roleCounts.Student || 0} : ${roleCounts.Teacher || 0}`
                        }
                        icon={<FaPercentage size={40} className="text-indigo-600" />} 
                    />
                </div>
            </section>

            {/* Users Overview */}
            <section className="w-full">
                <h2 className="text-2xl font-bold mb-2">👥 Users Overview</h2>
                <p className="italic text-gray-600">User Distribution by Role</p>

                <table className="w-full mt-4 border-collapse border border-gray-300 shadow-lg">
                    <thead className="bg-gray-100">
                        <tr className="border border-gray-300">
                            <th className="p-3">#</th>
                            <th className="p-3">User Role</th>
                            <th className="p-3">Frequency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(roleCounts).map(([role, count], index) => (
                            <tr key={role} className="border border-gray-200 hover:bg-gray-50">
                                <td className="p-3 text-center">{index + 1}</td>
                                <td className="p-3 text-center font-medium">{role}</td>
                                <td className="p-3 text-center">{count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

// Reusable Stat Card Component
const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border-gray-400 hover:shadow-xl transition-all duration-200">
        {icon}
        <div>
            <h4 className="text-lg font-semibold">{value}</h4>
            <p className="text-gray-600">{title}</p>
        </div>
    </div>
);
