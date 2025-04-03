import { useState, useRef, useEffect } from "react";
import { useGetUserByIdQuery } from "../redux/users/users";
import useUserId from "../utils/useUserId";
import { FaUserCircle, FaSignOutAlt, FaHome, FaChalkboardTeacher } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import useLogout from "../utils/LogOut";
import Loading from "./Loading";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";



export default function Navbar() {
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

    if (isLoading) return <nav className="bg-orange-800"></nav>;
    if (error) return <nav className="bg-red-500"><h2>Error loading user</h2></nav>;

    return (
        <nav className="w-full relative">

            {/* Header */}
            <header className="bg-orange-800 text-white flex justify-between items-center mb-6 p-2 ">
                <a href="/" className="logo flex items-center gap-2">
                    <img src="/images/logo.jpg" alt="logo" className="w-10 h-10 rounded-full" />
                    <h2>Naijirian</h2>
                </a>

                {/* Menu */}
                <div className="menu-options flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <IoIosHelpCircleOutline size={25}/>
                        <p>Help</p>
                    </div>
                    <div className="flex items-center gap-4">                
                        <div className="flex items-center gap-4">
                            <FaRegCircleUser  size={30} className="cursor-pointer hover:scale-110 transition-all" />
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleDropDown} >
                            <p className="hover:underline">Account</p>
                            <RiArrowDropDownLine size={25}/>
                        </div>
                    </div>
                </div>
            </header>


            {/* Welcome and NavLinks*/}
            <div className="flex text-gray-800 flex-col justify-between gap-2 px-28 ">
                <div className="border-b-[2px] border-gray-200">
                    {/* Logo & Welcome Text */}
                    <div className="flex items-center gap-2">
                        <h2 className="text-3xl font-bold">Hi, {user?.name || "Guest"}!</h2>
                    </div>

                    {/* Navbar Links */}
                    <div className={`relative top-2 mt-2 transition-all duration-200 flex`}>
                        <ul className="flex flex-wrap md:flex-row gap-4">
                            <NavItem to={`/${role}/dashboard`} label="My Library" className= "w-20" />
                            <NavItem to={`/${role}/dashboard/courses`} label="Manage Courses" className= "w-20" />
                            {isInAdmin && <NavItem to={`/${role}/dashboard/manage-users`} label="Users" className= "w-20" />}
                        </ul>
                    </div>
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


        </nav>
    );
}

// Reusable Nav Item Component
const NavItem = ({ to, icon, label }) => (
    <li className={`py-2 flex items-center gap-2 transition-all ${location.pathname === to ? "underline underline-offset-8 font-bold" : "hover:underline hover:underline-offset-8 hover:scale-105"}`}>
        <Link to={to} className="flex items-center gap-2">{icon} {label}</Link>
    </li>
);
