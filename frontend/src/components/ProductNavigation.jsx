// frontend/src/components/ProductNavigation.jsx - 65 lines
import React from 'react';

const ProductNavigation = ({ 
  totalProducts, 
  currentIndex, 
  onPrevious, 
  onNext, 
  onDotClick 
}) => {
  if (totalProducts <= 1) return null;

  return (
    <>
      {/* Navigation Arrows */}
      <div className="relative">
        <button 
          onClick={onPrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white hover:bg-gray-100 text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="Previous product"
        >
          <i className="fas fa-chevron-left text-sm"></i>
        </button>

        <button 
          onClick={onNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white hover:bg-gray-100 text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="Next product"
        >
          <i className="fas fa-chevron-right text-sm"></i>
        </button>
      </div>

      {/* Dots and Counter */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalProducts }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-green-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => onDotClick(index)}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500">
          {currentIndex + 1} / {totalProducts}
        </p>
      </div>
    </>
  );
};

export default ProductNavigation;