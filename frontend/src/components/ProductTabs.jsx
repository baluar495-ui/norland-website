// frontend/src/components/ProductTabs.jsx - 30 lines
import React from 'react';

const ProductTabs = ({ tags, currentIndex, onTabClick }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {tags.map((tag, index) => (
        <button 
          key={tag}
          onClick={() => onTabClick(index)}
          className={`text-sm font-medium transition-colors ${
            currentIndex === index ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-600'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default ProductTabs;