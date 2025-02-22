import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./footer";



export default function App() {
    return (
        <div>
            <NavBar/>
            <h2>App</h2>
            <Outlet />
            <Footer/>
        </div>
    );
}
