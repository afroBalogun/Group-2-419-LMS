import { useNavigate } from "react-router";
import SomeNav from "../../components/SomeNav";

export default function TermsOfService() {
    const navigate = useNavigate();
    return (
        <div className="w-full">
            <SomeNav />
            <div className="w-full min-h-screen bg-gray-100 text-gray-800 p-6 md:p-10">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-orange-800">Terms of Service</h1>
                    <p className="mt-2 md:mt-4">Last Updated: March 2025</p>

                    <section className="mt-4 md:mt-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-700">1. Introduction</h2>
                        <p className="mt-2">By accessing or using our platform, you agree to be bound by these Terms of Service.</p>
                    </section>

                    <section className="mt-4 md:mt-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-700">2. User Responsibilities</h2>
                        <p className="mt-2">You agree to use our platform for lawful purposes and comply with all applicable laws.</p>
                    </section>

                    <section className="mt-4 md:mt-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-700">3. Account Security</h2>
                        <p className="mt-2">Users are responsible for maintaining the security of their accounts.</p>
                    </section>

                    <button 
                        onClick={() => navigate(-1)} 
                        className="mt-4 md:mt-6 bg-orange-800 text-white px-4 md:px-6 py-2 rounded-md hover:bg-orange-900"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
