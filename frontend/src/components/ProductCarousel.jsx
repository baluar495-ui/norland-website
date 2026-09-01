// frontend/src/components/ProductCarousel.jsx - 50 lines
import React from 'react';
import PickedProductCard from './PickedProductCard';

const ProductCarousel = ({ product, totalProducts, currentIndex, onPrevious, onNext, onLearnMore }) => {
  return (
    <div className="relative">
      <PickedProductCard 
        product={product} 
        onLearnMore={onLearnMore} 
      />
      
      {totalProducts > 1 && (
        <>
          <button 
            onClick={onPrevious}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            aria-label="Previous product"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={onNext}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-100 text-gray-800 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            aria-label="Next product"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;