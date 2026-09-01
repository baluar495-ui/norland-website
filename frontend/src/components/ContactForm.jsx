// frontend/src/components/ContactForm.jsx - 85 lines
import React, { useState } from 'react';
import ProductSelector from './ProductSelector';
import SuccessMessage from './SuccessMessage';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    products: [],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = (product) => {
    if (product && !formData.products.includes(product)) {
      setFormData(prev => ({
        ...prev,
        products: [...prev.products, product]
      }));
    }
  };

  const handleRemoveProduct = (productToRemove) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p !== productToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill in all required fields (Name, Phone, and Message)');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      console.log('📩 Message sent:', formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', phone: '', email: '', products: [], message: '' });
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  if (submitted) {
    return <SuccessMessage />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Sarah Narmuli"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="e.g. 0772 389 748"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address (optional)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="e.g. sarah@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>

        <ProductSelector 
          onAddProduct={handleAddProduct}
          selectedProducts={formData.products}
          onRemoveProduct={handleRemoveProduct}
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us what's on your mind..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>

        <p className="text-xs text-gray-400 mt-4 text-center">
          <span className="text-red-500">*</span> Name, phone number and message are required.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;