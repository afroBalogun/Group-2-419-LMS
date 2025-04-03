import { Link } from "react-router";

export default function Footer() {
    const footItems = [
        { id: 1, name: "Privacy Policy", link: "/privacy-policy" },
        { id: 2, name: "Terms of Service", link: "/terms-of-service" },
        { id: 3, name: "Contact Us", link: "/contact-us" }
    ];

    return (
        <footer className="w-full bg-gray-900 text-gray-400 p-4 flex flex-col md:flex-row md:justify-between items-center gap-4 text-center">
            {/* Links Section */}
            <ul className="flex flex-wrap justify-center md:justify-start gap-4">
                {footItems.map((item) => (
                    <li key={item.id} className="border-r last:border-none pr-4">
                        <Link to={item.link} className="hover:text-white transition duration-300">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Admin Login & Copyright */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                {/* <Link
                    to="/admin/login"
                    className="bg-orange-800 text-white px-4 py-2 rounded-lg hover:bg-orange-950 transition duration-300"
                >
                    Admin Login
                </Link> */}
                <p className="text-sm">&copy; GROUP 2 LMS 2025. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
