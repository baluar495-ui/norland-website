// frontend/src/components/EmptyCart.jsx - 20 lines
import React from 'react';

const EmptyCart = ({ onStartShopping }) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <button 
          onClick={onStartShopping}
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;