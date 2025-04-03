import FileUpload from "../../components/FileUpload";
import SomeNav from "../../components/SomeNav";

export default function About() {
    return (
        <div className="w-full">
            <SomeNav/>
            <div className="w-full flex justify-center items-center min-h-screen bg-[url(/images/welcome.jpg)] bg-cover bg-center">
                <div className="bg-white shadow-lg rounded-lg p-8 w-[90%] max-w-md md:max-w-lg">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                        About Us
                    </h2>
                    <p className="text-gray-600 text-center mt-4">
                        Welcome to Naijirian Hub, your premier online learning platform dedicated to providing a diverse range of courses tailored to the unique needs of Nigerian students. Our mission is to empower learners with the knowledge and skills they need to succeed in today's competitive world.
                    </p>
                </div>
            </div>
        </div>
    );
}