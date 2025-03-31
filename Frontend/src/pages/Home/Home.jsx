import { Link } from "react-router";
import { useGetUsersQuery } from "../../redux/users/users";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";

export default function Home() {
    const { data: users, isLoading, error } = useGetUsersQuery();

    return (
        <div className="w-full flex flex-col items-center justify-center p-8 gap-10">
            {/* Hero Section */}
            <section className="text-center max-w-3xl">
                <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                    Welcome to the <span className="text-blue-500">Learning Management System</span>
                </h1>
                <p className="text-gray-600 mt-4 text-lg">
                    A powerful platform for students, teachers, and administrators to engage in seamless learning experiences. 
                    Join us today and start your educational journey.
                </p>
            </section>

            {/* Login Section */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-6">
                <LoginButton to="/student/login" icon={<FaUserGraduate />} label="Student Login" />
                <LoginButton to="/teacher/login" icon={<FaChalkboardTeacher />} label="Teacher Login" />
            </div>

            {/* Users Section (Optional)
            {users && users.length > 0 && <UsersSection users={users} />}
            {isLoading && <p className="text-gray-500">Loading users...</p>}
            {error && <p className="text-red-500">Error fetching users.</p>} */}
        </div>
    );
}

// Reusable Login Button Component
const LoginButton = ({ to, icon, label }) => (
    <Link 
        to={to} 
        className="relative bg-blue-500 px-8 py-4 text-white rounded-full flex items-center gap-3 shadow-lg 
                   hover:scale-105 transition-all duration-200 hover:bg-blue-600 focus:ring focus:ring-blue-300"
        aria-label={label}
    >
        {icon}
        <span className="font-semibold text-lg">{label}</span>
    </Link>
);

// Users Section
const UsersSection = ({ users }) => (
    <section className="w-full mt-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Our Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {users.map(user => (
                <div key={user.id} className="bg-white shadow-md rounded-lg p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                </div>
            ))}
        </div>
    </section>
);
