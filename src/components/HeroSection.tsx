
import schoolLogo from "@/assets/school-logo.jpg";
import schoolEmblem from "@/assets/emblem.jpg";
import schoolImage01 from "@/assets/school01.jpg";
import schoolImage02 from "@/assets/school02.jpg";
import schoolImage03 from "@/assets/school03.jpg";
import schoolImage04 from "@/assets/school04.jpg";
import schoolImage05 from "@/assets/school05.jpg";
import schoolImage06 from "@/assets/school06.jpg";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slideImages = [schoolImage01, schoolImage02, schoolImage03, schoolImage04, schoolImage05, schoolImage06];

export const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
    };

    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Background Slideshow */}
            <div className="absolute inset-0">
                {slideImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={image}
                            alt={`School view ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#50597366]"></div>
                    </div>
                ))}
            </div>

            {/* Slide Controls */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
                <button
                    onClick={prevSlide}
                    className="inline-flex items-center justify-center p-2 rounded-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
                <button
                    onClick={nextSlide}
                    className="inline-flex items-center justify-center p-2 rounded-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {slideImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${index === currentSlide
                            ? "bg-amber-400 scale-125"
                            : "bg-white/50 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">


                    {/* School Name */}
                    <h1 className="text-5xl md:text-7xl mb-6 text-white drop-shadow-2xl font-bold tracking-wide">
                        DEWANGANJ PRIMARY SCHOOL
                    </h1>

                    {/* Subtitle */}
                    <div className="text-center mb-12">
                        <p className="text-xl md:text-2xl text-amber-300 font-semibold mb-2 drop-shadow-lg">
                            {"Estd. - 1925 "}
                            <span className="text-white/90 font-medium drop-shadow-lg">
                                (100 Years of Journey From 1925 to 2025)
                            </span>
                        </p>
                    </div>

                    {/* School Logo */}
                    {/* <div className="flex flex-col sm:flex-row justify-center opacity-75 backdrop-blur-3xl items-center rounded-xl gap-4 sm:gap-8 md:gap-12 bg-white drop-shadow-2xl mb-8 p-4 sm:p-6">
                        <img
                            src={schoolLogo}
                            alt="Dewanganj Primary School Logo"
                            className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48"
                        />
                        <img
                            src={schoolEmblem}
                            alt="School Emblem - 100 Years of Excellence"
                            className="h-16 sm:h-20 md:h-24 lg:h-32"
                        />
                    </div> */}


                    {/* Call to Action */}
                    {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2">
                            Explore Our Legacy
                        </button>
                        <button className="bg-white/10 border border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50">
                            Admission Information
                        </button>
                    </div> */}
                </div>
            </div>
        </section>
    );
};