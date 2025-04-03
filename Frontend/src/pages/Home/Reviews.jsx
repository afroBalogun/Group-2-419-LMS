export default function Reviews() {
    const AllReviews = [
        {
            id: 1,
            name: "Tunde Ogunleye",
            degree: "BSc. Computer Science",
            review: "This may be just a certificate, but this is the most valuable achievement in my career so far for me.",
            image: "/images/tunde.jpg"
        },
        {
            id: 2,
            name: "Chiamaka Okafor",
            degree: "BSc. Business Administration",
            review: "I love the interactive features of Naijirian LMS. It makes studying so much more engaging!",
            image: "/images/chiamaka.jpg"
        },
        {
            id: 3,
            name: "Francis Okoro",
            degree: "BSc. Mechanical Engineering",
            review: "The support from the Naijirian LMS team is incredible. They are always there to help when I need it.",
            image: "/images/francis.jpg"
        }
    ];

    return (
        <section className="w-full flex flex-col items-center gap-6 py-24 px-4 md:px-8">
            {/* Section Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                Alumni Stories
            </h2>
            <p className="text-gray-600 text-center mt-2 max-w-2xl">
                Hear from our alumni about their experiences and how <span className="font-semibold">Naijirian LMS</span> has impacted their learning journey.
            </p>

            {/* Reviews Grid */}
            <div className="flex justify-center flex-wrap gap-6 mt-6">
                {AllReviews.map((review) => (
                    <div 
                        key={review.id} 
                        className="w-full sm:w-[350px] flex flex-col items-center border-2 border-gray-100 rounded-lg shadow-md p-5 bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        {/* Profile Section */}
                        <div className="flex items-center gap-4">
                            <img 
                                src={review.image} 
                                alt={`Photo of ${review.name}`} 
                                className="h-20 w-20 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{review.name}</h3>
                                <p className="text-gray-600 text-sm">{review.degree}</p>
                            </div>
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-600 text-center mt-4">{review.review}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
