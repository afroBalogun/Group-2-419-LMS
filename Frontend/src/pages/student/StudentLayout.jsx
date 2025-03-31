import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
export default function StudentLayout() {
    return (
        <div className="w-screen">
            <Navbar/>
            <Outlet/>
        </div>
    )
}