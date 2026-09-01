// frontend/src/components/Header.jsx - Updated navigation
import React, { useState, useEffect } from 'react';
import logo from '../images/NorlandLogo.jpg';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(total);
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToCart = () => {
    window.location.href = '/cart';
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Brand Name */}
        <button onClick={goHome} className="flex items-center space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden shadow-sm flex-shrink-0 bg-white border border-gray-200">
            <img 
              src={logo} 
              alt="Norland DRC Logo" 
              className="w-full h-full object-contain p-1" 
            />
          </div>
          <span className="text-xl md:text-2xl font-bold text-green-700">Norland DRC</span>
        </button>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex space-x-8">
          <button onClick={goHome} className="text-gray-700 hover:text-green-600 font-medium">Home</button>
          <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-green-600 font-medium">Products</button>
          <button onClick={() => scrollToSection('benefits')} className="text-gray-700 hover:text-green-600 font-medium">Benefits</button>
          <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-green-600 font-medium">Contact</button>
        </nav>

        {/* Call to Action & Cart Buttons */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <button 
            onClick={goToCart}
            className="relative text-gray-700 hover:text-green-600 transition-colors"
            aria-label="View Cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-green-600 hover:bg-green-700 text-white px-3 md:px-4 py-2 rounded-lg font-medium transition-colors text-xs md:text-sm"
          >
            Free Consultation
          </button>
          <button className="md:hidden text-gray-700 hover:text-green-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;