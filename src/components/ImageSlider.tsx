import React, { useState, useEffect } from "react";

interface SliderProps {
  images: string[]; // Array of image URLs
  interval?: number; // Time interval for sliding in milliseconds
  height?: string; // Tailwind height class
  width?: string; // Tailwind width class
}

const Slider: React.FC<SliderProps> = ({
  images,
  interval = 4000,
  height = "h-[32rem]",
  width = "full",
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Effect to handle the automatic sliding
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images.length, interval]);

  // Return null if images array is empty
  if (images.length === 0) return null;

  return (
    <div className={`relative w-${width} ${height} overflow-hidden rounded-md`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
