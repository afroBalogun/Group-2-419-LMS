import { Link } from "react-router";

export default function SomeNav() {
    return (
        <nav className="flex items-center justify-between py-4 px-8">
            <a href= "/" className="flex items-center">
                <img src="/images/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
                <span className="text-lg font-bold">NaiJirian</span>
            </a>
            <ul className="flex space-x-4">
                <li><Link to="/about" className="hover:text-green-700">About</Link></li>
                <li><Link to="/contact-us" className="hover:text-green-700">Contact Us</Link></li>
            </ul>
        </nav>
    );
}