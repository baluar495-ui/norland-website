// frontend/src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  const { name, category, description, is_premium, is_best_seller } = product;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{category}</p>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        {is_premium && (
          <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Premium</span>
        )}
        {is_best_seller && (
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Best Seller</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;