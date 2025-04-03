export default function Features() {
    const AllFeatures = [
        {
            id: 1,
            title: "Diversity Personalized Learning",
            description: "Tailored cultural experiences to meet individual student needs.",
            image: "/images/puzzle-mural.png"
        },
        {
            id: 2,
            title: "User-Friendly Interface",
            description: "Our platform is designed with simplicity in mind, ensuring that both students and teachers can navigate easily.",
            image: "/images/user-ui.png"
        },
        {
            id: 3,
            title: "Comprehensive Course Management",
            description: "Easily create, manage, and track courses and assignments.",
            image: "/images/course-management-ui.png"
        }
    ];

    return (
        <section className="w-full flex flex-col items-center py-24 px-4 md:px-8 bg-[url(/images/features.png)] bg-cover max-[500px]:bg-center relative">

            <h2 className="text-2xl font-bold text-gray-800 text-center relative z-10">
                What’s special about the Naijirian Hub?
            </h2>

            <div className="flex flex-col gap-8 mt-6 relative z-10">
                {AllFeatures.map((feature) => (
                    <div key={feature.id} className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
                        <img
                            src={feature.image}
                            alt={`Feature - ${feature.title}`}
                            className="h-48 md:h-60 w-auto object-cover"
                        />
                        <div className="text-center md:text-left max-w-md">
                            <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
