import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";

export default function AdminLayout() {
    return (
        <div className="w-screen">
            <Navbar/>
            <Outlet/>
        </div>
    )
}