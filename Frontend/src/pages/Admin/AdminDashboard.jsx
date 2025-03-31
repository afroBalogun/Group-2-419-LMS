import { FaBookReader, FaUserCheck, FaPercentage } from "react-icons/fa";
import { useGetCoursesQuery, useGetTotalEnrollmentsQuery } from "../../redux/courses/course";
import { useGetUsersQuery } from "../../redux/users/users";
import { FaBook, FaUsers } from "react-icons/fa6";

export default function AdminDashboard() {
    const { data: users, isLoading: usersLoading } = useGetUsersQuery();
    const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();
    const { data: totalEnrollments, isLoading: enrollmentsLoading } = useGetTotalEnrollmentsQuery();

    const roleCounts = users?.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
    }, {}) || {};

    const totalUsers = users?.length || 0;
    const activeUsers = Math.floor(totalUsers * 0.75); // Assume 75% active users for now.

    return (
        <main className="p-6 flex flex-col gap-8">
            {/* System Overview */}
            <section>
                <h2 className="text-2xl font-bold mb-3">📊 System Overview</h2>
                <p className="italic text-gray-600">Learning Management System Statistics</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <StatCard 
                        title="Total Users" 
                        value={usersLoading ? <SkeletonLoader /> : totalUsers} 
                        icon={<FaUsers size={40} className="text-blue-600" />} 
                    />
                    <StatCard 
                        title="Total Courses" 
                        value={coursesLoading ? <SkeletonLoader /> : courses?.length || 0} 
                        icon={<FaBook size={40} className="text-green-600" />} 
                    />
                    <StatCard 
                        title="Total Enrollments" 
                        value={enrollmentsLoading ? <SkeletonLoader /> : totalEnrollments?.totalEnrollments || 0} 
                        icon={<FaBookReader size={40} className="text-red-600" />} 
                    />
                    <StatCard 
                        title="Active Users" 
                        value={usersLoading ? <SkeletonLoader /> : activeUsers} 
                        icon={<FaUserCheck size={40} className="text-purple-600" />} 
                    />
                    <StatCard 
                        title="Student vs Teacher Ratio" 
                        value={
                            usersLoading 
                                ? <SkeletonLoader /> 
                                : `${roleCounts.Student || 0} : ${roleCounts.Teacher || 0}`
                        }
                        icon={<FaPercentage size={40} className="text-indigo-600" />} 
                    />
                </div>
            </section>

            {/* Users Overview */}
            <section className="w-full">
                <h2 className="text-2xl font-bold mb-3">👥 Users Overview</h2>
                <p className="italic text-gray-600">User Distribution by Role</p>

                <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse border border-gray-300 shadow-lg">
                        <thead className="bg-gray-100">
                            <tr className="border border-gray-300">
                                <th className="p-3 text-left">#</th>
                                <th className="p-3 text-left">User Role</th>
                                <th className="p-3 text-left">Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(roleCounts).map(([role, count], index) => (
                                <tr key={role} className="border border-gray-200 hover:bg-gray-50">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 font-medium">{role}</td>
                                    <td className="p-3">{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

// Reusable Stat Card Component
const StatCard = ({ title, value, icon }) => (
    <div 
        className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border-gray-300 hover:shadow-lg transition-all duration-200"
        aria-label={`${title}: ${value}`}
    >
        {icon}
        <div>
            <h4 className="text-lg font-semibold">{value}</h4>
            <p className="text-gray-600">{title}</p>
        </div>
    </div>
);

// Skeleton Loader for better loading state
const SkeletonLoader = () => (
    <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
);
