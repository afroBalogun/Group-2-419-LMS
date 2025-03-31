import { Outlet } from "react-router";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};


export default App;
