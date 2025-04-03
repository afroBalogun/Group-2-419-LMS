import SomeNav from "../../components/SomeNav";

export default function Contact() {
    return (
        <div className="w-full">
            <SomeNav />
            <div className="relative w-full flex justify-center items-center min-h-screen p-10 bg-cover bg-center bg-[url(/images/contact.jpg)]">

                {/* Contact Form Container (stays on top) */}
                <div className="relative flex flex-col gap-2 bg-white shadow-lg rounded-lg p-8 w-[90%] max-w-md md:max-w-lg z-10">
                    <h2 className="text-2xl font-bold text-center text-gray-700">
                        Contact Us
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Have any questions? Reach out to us and we'll be happy to help!
                    </p>

                    {/* Contact Details */}
                    <div className="flex flex-col gap-1 text-gray-600 mb-2">
                        <p><strong>Email:</strong> support@lms.com</p>
                        <p><strong>Phone:</strong> +1 234 567 890</p>
                        <p><strong>Address:</strong> 123 Learning St, Knowledge City, WK 45678</p>
                    </div>

                    {/* Contact Form */}
                    <form className="flex flex-col gap-4">
                        <input type="text" placeholder="Your Name" className="bg-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200" />
                        <input type="email" placeholder="Your Email" className="bg-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200" />
                        <textarea placeholder="Your Message" rows={4} className="bg-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"></textarea>
                        <button type="submit"                             className="bg-orange-800 text-white py-4 rounded-md font-semibold hover:bg-orange-900 transition-all duration-200 disabled:bg-orange-950 hover:cursor-pointer">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
