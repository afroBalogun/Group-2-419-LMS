import { useState, useRef, useEffect } from "react";
import { useGetUserByIdQuery } from "../redux/users/users";
import useUserId from "../utils/useUserId";
import { FaUserCircle, FaSignOutAlt, FaHome, FaChalkboardTeacher } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import useLogout from "../utils/LogOut";
import Loading from "./Loading";

export default function NavBar() {
    const userId = useUserId();
    const { data: user, isLoading, error } = useGetUserByIdQuery(userId, { skip: !userId });

    const location = useLocation();
    const isInAdmin = location.pathname.includes("/admin");

    let role = user?.role || "guest";
    role = role.toLowerCase();

    const [showDropDown, setShowDropDown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const dropdownRef = useRef(null); // ⬅️ Reference for dropdown

    const toggleDropDown = () => setShowDropDown(prev => !prev);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    const logout = useLogout();

    // ⬇️ Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropDown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (isLoading) return <nav className="bg-blue-500"><Loading/></nav>;
    if (error) return <nav className="bg-red-500"><h2>Error loading user</h2></nav>;

    return (
        <nav className="w-full bg-blue-500 p-4 shadow-lg text-white relative">
            {/* Top Bar */}
            <div className="flex justify-between items-center">
                {/* Logo & Welcome Text */}
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">Welcome, {user?.name || "Guest"}</h2>
                    <span className="text-sm font-medium bg-white text-blue-500 px-2 py-1 rounded-md">
                        {user.role}
                    </span>
                </div>

                {/* Profile & Menu Button */}
                <div className="flex items-center gap-4">
                    <FaUserCircle onClick={toggleDropDown} className="text-4xl cursor-pointer hover:scale-110 transition-all" />
                </div>
            </div>

            {/* Dropdown Menu */}
            <ul 
                ref={dropdownRef} 
                className={`absolute right-4 top-16 bg-white text-gray-800 shadow-md rounded-lg p-4 w-52 transition-all duration-200 z-20 ${showDropDown ? "block" : "hidden"}`}
            >
                <li className="flex flex-col items-center text-center border-b pb-3">
                    <FaUserCircle className="text-4xl mb-2" />
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </li>
                <li className="mt-3 p-2 rounded-lg hover:bg-gray-200 transition hover:cursor-pointer">
                    <Link to={`/`}>🏠 Home</Link>
                </li>
                <li className="p-2 rounded-lg hover:bg-gray-200 transition hover:cursor-pointer">
                    <button onClick={logout} className="flex items-center gap-2 w-full text-left">
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
            </ul>

            {/* Navbar Links */}
            <div className={`px-6 mt-4 transition-all duration-200 md:flex md:justify-center ${menuOpen ? "block" : "hidden md:flex"}`}>
                <ul className="flex flex-col md:flex-row gap-4">
                    <NavItem to={`/${role}/dashboard`} icon={<FaHome />} label="Dashboard" />
                    <NavItem to={`/${role}/dashboard/courses`} icon={<FaChalkboardTeacher />} label="Courses" />
                    {isInAdmin && <NavItem to={`/${role}/dashboard/manage-users`} icon={<FaUserCircle />} label="Users" />}
                </ul>
            </div>
        </nav>
    );
}

// Reusable Nav Item Component
const NavItem = ({ to, icon, label }) => (
    <li className="bg-green-600 px-4 py-2 rounded-lg shadow-md hover:scale-105 transition-all flex items-center gap-2">
        <Link to={to} className="flex items-center gap-2">{icon} {label}</Link>
    </li>
);
