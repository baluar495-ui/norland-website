// frontend/src/components/CartItem.jsx - 50 lines
import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center gap-4">
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={item.image_url || '/images/placeholder.jpg'} 
          alt={item.name}
          className="w-full h-full object-contain p-1"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.name}</h3>
        <p className="text-green-600 font-medium">{item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="w-8 text-center font-medium">{item.quantity || 1}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
          className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <button 
        onClick={() => onRemove(item.id)}
        className="text-red-400 hover:text-red-600 transition-colors"
        aria-label="Remove item"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;