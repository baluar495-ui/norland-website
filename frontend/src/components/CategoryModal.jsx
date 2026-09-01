// frontend/src/components/CategoryModal.jsx - 85 lines
import React, { useState } from 'react';
import ProductDetailModal from './ProductDetailModal';

const CategoryModal = ({ category, products, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!category) return null;

  const handleProductClick = (product) => {
    console.log('🖱️ Product clicked:', product.name);
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
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

          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
              <span className="text-sm text-gray-500">({products?.length || 0} products in this category)</span>
            </div>
          </div>

          {/* Products List - Clickable */}
          <div className="p-6">
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="flex items-center gap-4 bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-100 text-left"
                  >
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                      <img 
                        src={product.image_url || '/images/placeholder.jpg'} 
                        alt={product.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                      <p className="text-green-600 font-medium text-sm">{product.price}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No products found in this category.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={closeProductDetail}
      />
    </>
  );
};

export default CategoryModal;