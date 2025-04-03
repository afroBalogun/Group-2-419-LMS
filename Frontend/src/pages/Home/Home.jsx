import { Link } from "react-router";
import { useGetUsersQuery } from "../../redux/users/users";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import SomeNav from "../../components/SomeNav";
import Features from "./Features";
import Reviews from "./Reviews";

export default function Home() {
    const { data: users, isLoading, error } = useGetUsersQuery();

    return (
        <div className="w-full">
            {/* Header Section */}
            <SomeNav/>

            {/* Hero Section */}
            <section className="text-center w-full mb-13">
            <div className="relative h-[450px] flex flex-col items-center justify-center gap-1 shadow-lg">
                {/* Background with lowered brightness */}
                <div className="absolute inset-0 bg-[url(/images/uni1.jpg)] bg-cover bg-center brightness-50"></div>

                {/* Content stays on top without brightness effect */}
                <h2 className="relative text-white text-3xl md:text-5xl font-bold z-10">
                    Naijirian <span className="">Learning Management System</span>
                </h2>
                <p>
                    <span className="relative text-white text-lg md:text-xl font-semibold z-10">Empowering Education, Anytime, Anywhere</span>
                </p>

                {/* Login Section */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-2">
                    <LoginButton to="/student/login" icon={<FaUserGraduate />} label="Student Login" />
                    <LoginButton to="/teacher/login" icon={<FaChalkboardTeacher />} label="Teacher Login" />
                </div>
            </div>

            </section>
                
                
            {/* Welcome Section */}
            <section>
                <div className="w-full py-8 px-4 md:px-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome to Naijirian LMS</h2>
                    <p className="text-gray-600 text-center mt-4 max-w-3xl mx-auto">
                        Naijirian LMS is a platform designed to enhance the learning experience for students and teachers alike. 
                        Our system provides a seamless interface for managing courses, assignments, and communication between educators and learners.
                    </p>
                </div>
            </section>

            {/* Features */}
            <Features/>

            {/* Testimonials Section */}
            <Reviews/>
            

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
        className="relative bg-orange-800 px-8 py-4 text-white rounded-full flex items-center gap-3 shadow-lg 
                   hover:scale-105 transition-all duration-200 hover:bg-orange-950 focus:ring focus:ring-blue-300"
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
