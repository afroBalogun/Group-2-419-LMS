import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";

export default function TeacherLayout() {
    return (
        <div className="w-screen">
            <NavBar/>
            <Outlet/>
        </div>
    )
}