// frontend/src/components/ImageCarousel.jsx - 47 lines
import React, { useState, useEffect, useRef } from 'react';
import slide1 from '../images/Slide1.jpg';
import slide2 from '../images/Slide2.jpg';
import slide3 from '../images/slide3.jpg';
import slide4 from '../images/Slide4.jpg';



const ImageCarousel = () => {
  const images = [slide1, slide2, slide3, slide4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageHeight, setImageHeight] = useState('auto');
  const imgRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Update height when image loads or changes
  useEffect(() => {
    const img = new Image();
    img.src = images[currentIndex];
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const containerWidth = window.innerWidth;
      setImageHeight(containerWidth / aspectRatio);
    };
  }, [currentIndex, images]);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100" style={{ height: imageHeight !== 'auto' ? `${imageHeight}px` : 'auto' }}>
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            ref={index === currentIndex ? imgRef : null}
            src={img} 
            alt={`Slide ${index + 1}`} 
            className="w-full h-full object-cover" 
          />
        </div>
      ))}
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;