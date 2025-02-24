import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./footer";
import Home from "./pages/Home/Home";

export default function App() {
return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
