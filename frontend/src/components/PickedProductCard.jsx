// frontend/src/components/PickedProductCard.jsx - 65 lines
import React, { useState } from 'react';
import CartConfirmation from './CartConfirmation';

const PickedProductCard = ({ product, onLearnMore }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already in cart
    const existingIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
      existingCart[existingIndex].quantity = (existingCart[existingIndex].quantity || 1) + 1;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity: 1
      });
    }
    
    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Trigger cart update event for header
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show confirmation modal
    setAddedProduct(product);
    setShowConfirmation(true);
  };

  const getColor = (name) => {
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#FF5722'];
    const index = name ? name.length % colors.length : 0;
    return colors[index];
  };

  return (
    <>
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 h-72 md:h-96 bg-gray-100 flex items-center justify-center p-4">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name || 'Product'}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center text-white text-xl font-bold p-4 text-center"
                style={{ backgroundColor: getColor(product.name) }}
              >
                {product.name || 'Product'}
              </div>
            )}
            <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {product.tag || 'Popular'}
            </div>
          </div>

          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-green-600 font-medium mb-3">
              {product.price || 'Price available on request'}
            </p>
            <p className="text-gray-600 text-sm md:text-base mb-4">
              {product.description}
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onLearnMore(product)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Learn More →
              </button>
              <button 
                onClick={handleAddToCart}
                className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <CartConfirmation 
        product={addedProduct} 
        onClose={() => {
          setShowConfirmation(false);
          setAddedProduct(null);
        }} 
      />
    </>
  );
};

export default PickedProductCard;