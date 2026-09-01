// frontend/src/components/OrderConfirmation.jsx - 40 lines
import React from 'react';

const OrderConfirmation = ({ orderNumber, onContinue, onTrack }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed! </h2>
        <p className="text-gray-600 mb-4">Thank you for your order. We'll process it shortly.</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500">Order Number</p>
          <p className="text-lg font-bold text-green-600">{orderNumber}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={onContinue}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </button>
          <button 
            onClick={onTrack}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;