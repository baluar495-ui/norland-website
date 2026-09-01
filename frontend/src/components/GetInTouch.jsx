// frontend/src/components/GetInTouch.jsx - 35 lines
import React from 'react';
import ContactForm from './ContactForm';

const GetInTouch = () => {
  return (
    <div id="contact" className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Get In Touch</h2>
            <p className="text-gray-600">We'd Love to Hear From You</p>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;