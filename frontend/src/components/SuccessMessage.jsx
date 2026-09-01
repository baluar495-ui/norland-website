// frontend/src/components/SuccessMessage.jsx - 25 lines
import React from 'react';

const SuccessMessage = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Message Sent! 🎉</h3>
      <p className="text-gray-600">Thank you for reaching out. We'll get back to you shortly.</p>
    </div>
  );
};

export default SuccessMessage;