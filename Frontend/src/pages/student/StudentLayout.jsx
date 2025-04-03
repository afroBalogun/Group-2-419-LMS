import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
export default function StudentLayout() {
    return (
        <div className="w-screen min-h-screen">
            <Navbar/>
            <Outlet/>
        </div>
    )
}