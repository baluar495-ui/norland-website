// frontend/src/components/OrderSearch.jsx - 35 lines
import React from 'react';

const OrderSearch = ({ orderNumber, onOrderChange, onSearch, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Track Your Order</h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600">Enter your order number to track your order status</p>
          </div>
          
          <form onSubmit={onSearch} className="flex gap-3">
            <input
              type="text"
              value={orderNumber}
              onChange={onOrderChange}
              placeholder="e.g. ORD-20260101-1234"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Track Order
            </button>
          </form>
          
          <button 
            onClick={onBack}
            className="block text-center text-sm text-green-600 hover:text-green-700 mt-4"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSearch;