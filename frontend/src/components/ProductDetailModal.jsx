// frontend/src/components/ProductDetailModal.jsx - 90 lines
import React, { useState } from 'react';
import CartConfirmation from './CartConfirmation';

const ProductDetailModal = ({ product, onClose }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  if (!product) return null;

  // Parse benefits if it's a string (from PostgreSQL array)
  const benefits = Array.isArray(product.benefits) 
    ? product.benefits 
    : product.benefits ? product.benefits.split(',') : [];

  // WhatsApp number (DRC)
  const whatsappNumber = '243841049898';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20Norland%20DRC%2C%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}.%20Can%20you%20please%20provide%20more%20information%3F`;

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
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
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
    setAddedProduct(product);
    setShowConfirmation(true);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Product Image */}
            <div className="md:w-2/5 bg-gray-50 p-6 flex items-center justify-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
              <img 
                src={product.image_url || '/images/placeholder.jpg'} 
                alt={product.name}
                className="w-full h-auto max-h-80 object-contain"
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
            </div>

            {/* Product Info */}
            <div className="md:w-3/5 p-6 md:p-8">
              <div>
                <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {product.tag || 'Popular'}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-green-600 mb-4">
                  {product.price}
                </p>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.full_description || product.description}
              </p>

              {benefits.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Key Benefits:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-1 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </button>
                
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-lg font-medium transition-colors flex-1 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              <p className="text-xs text-gray-400 mt-4 text-center">
                Free delivery within Uganda • 100% Authentic Products
              </p>
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

export default ProductDetailModal;