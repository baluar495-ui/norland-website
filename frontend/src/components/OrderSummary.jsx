// frontend/src/components/OrderSummary.jsx - 35 lines
import React from 'react';

const OrderSummary = ({ itemCount, total, onCheckout }) => {
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
        onClick={onCheckout}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;