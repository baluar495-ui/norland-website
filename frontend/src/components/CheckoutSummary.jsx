// frontend/src/components/CheckoutSummary.jsx - 30 lines
import React from 'react';

const CheckoutSummary = ({ itemCount, total, onPlaceOrder, onBack }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} items)</span>
          <span>${total}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-bold text-gray-800">
          <span>Total</span>
          <span className="text-green-600">${total}</span>
        </div>
      </div>

      <button 
        onClick={onPlaceOrder}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Place Order
      </button>

      <button 
        onClick={onBack}
        className="w-full text-center text-sm text-green-600 hover:text-green-700 mt-3"
      >
        ← Return to Cart
      </button>
    </div>
  );
};

export default CheckoutSummary;