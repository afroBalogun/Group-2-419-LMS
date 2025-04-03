import { useNavigate } from "react-router";
import SomeNav from "../../components/SomeNav";

export default function PrivacyPolicy() {
    const navigate = useNavigate();

    return (
        <div className="w-full">
            <SomeNav />
            <div className="min-h-screen bg-gray-100 text-gray-800 p-6 md:p-10">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
                    <h1 className="text-3xl font-bold text-orange-800">Privacy Policy</h1>
                    <p className="mt-2 text-sm text-gray-600">Last Updated: March 2025</p>

                    <section className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-700">1. Information We Collect</h2>
                        <p className="mt-2 text-gray-600">
                            We collect personal and usage information to improve our services.
                        </p>
                    </section>

                    <section className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-700">2. How We Use Your Information</h2>
                        <p className="mt-2 text-gray-600">
                            Your data is used to enhance our platform, provide support, and comply with legal obligations.
                        </p>
                    </section>

                    <section className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-700">3. Data Protection</h2>
                        <p className="mt-2 text-gray-600">
                            We implement strict security measures to protect your personal information from unauthorized access.
                        </p>
                    </section>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 bg-orange-800 text-white px-6 py-2 rounded-md hover:bg-orange-900 transition duration-300"
                        aria-label="Go back to the previous page"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
