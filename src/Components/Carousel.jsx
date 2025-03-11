import { useState, useEffect } from "react";
import { Link } from "react-router";

const images = [
  { src: "/Men Shoe.jpg", link: "/Men", text: "Men For Men Shoe" },
  { src: "/Women Shoe.jpg", link: "/Women", text: "Women For Women Shoe" },
  { src: "/children Shoe.jpg", link: "/Children", text: "Children For Children Shoe" },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleManualChange = (newIndex) => {
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-4">
      {/* Carousel Images */}
      <div className="overflow-hidden rounded-lg relative h-64 w-full">
        {images.map((image, index) => (
          <Link
            key={index}
            to={image.link}
            className={`absolute w-full h-full transition-opacity duration-700 cursor-pointer ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-xl font-bold">
                {image.text}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={() => handleManualChange((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/50 text-white p-3 rounded-full"
      >
        &#10094;
      </button>

      {/* Next Button */}
      <button
        onClick={() => handleManualChange((currentIndex + 1) % images.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/50 text-white p-3 rounded-full"
      >
        &#10095;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={() => handleManualChange(index)}
          />
        ))}
      </div>
    </div>
  );
}
