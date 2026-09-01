// frontend/src/components/ProductDots.jsx - 20 lines
import React from 'react';

const ProductDots = ({ total, currentIndex, onDotClick }) => {
  if (total <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <div className="flex justify-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
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
        {currentIndex + 1} / {total}
      </p>
    </div>
  );
};

export default ProductDots;