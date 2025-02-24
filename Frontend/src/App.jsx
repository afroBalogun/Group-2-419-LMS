import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./footer";



export default function App() {
    document.title = 'GROUP 2 LMS';
    return (
        <div>
            <NavBar/>
            <main>
            <Outlet />
            </main>
            <Footer/>
        </div>
    );
}
