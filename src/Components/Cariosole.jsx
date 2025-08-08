import { useEffect, useState } from "react";
import banner1 from "../assets/sports_banner.jpg";
import banner2 from "../assets/sports_banner2.jpg";
import banner3 from "../assets/sports_banner3.jpg";

const images = [banner1, banner2, banner3];

const Cariosole = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };
  return (
    <div className="p-5">
      {/* Carousel container */}
      <div className="w-full h-[200px] md:h-[500px] rounded-2xl overflow-hidden relative">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Centered overlay text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white  bg-black/40 px-4 py-2 rounded">
            <p className="text-2xl md:text-4xl font-semibold">
              Welcome to Sport Shop
            </p>
            <p className="text-center">We make export</p>
          </h2>
        </div>
      </div>

      {/* Navigation dots placed below */}
      <div className="mt-2 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? "bg-orange-300 w-8" : "bg-gray-400 w-2"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Cariosole;
