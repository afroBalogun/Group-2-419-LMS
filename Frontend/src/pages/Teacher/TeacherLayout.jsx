import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";

export default function TeacherLayout() {
    return (
        <div className="w-screen">
            <Navbar/>
            <Outlet className="min-h-screen"/>
        </div>
    )
}