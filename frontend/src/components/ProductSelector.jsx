// frontend/src/components/ProductSelector.jsx - 45 lines
import React, { useState } from 'react';

const ProductSelector = ({ onAddProduct, selectedProducts, onRemoveProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState('');

  const productOptions = [
    'Micro-Molecule Peptides',
    'Miss Viva Elegance Perfume',
    'Natural Beta Carotene',
    'NMN Anti-Aging',
    'Produce and Meat Purifier',
    'Propolis-Lecithin Capsules',
    'Sanitary Pads Napkins',
    'Sanitary Pantyliners',
    'Sea Buckthorn',
    'Vision Vitale Capsules',
    'Vitality Tonic Wine'
  ];

  const handleAdd = () => {
    if (selectedProduct) {
      onAddProduct(selectedProduct);
      setSelectedProduct('');
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Products You Liked
      </label>
      <div className="flex gap-2">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
        >
          <option value="">Select a product...</option>
          {productOptions.map((product) => (
            <option key={product} value={product}>{product}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
        >
          Add
        </button>
      </div>

      {selectedProducts.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedProducts.map((product) => (
            <span
              key={product}
              className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
            >
              {product}
              <button
                type="button"
                onClick={() => onRemoveProduct(product)}
                className="text-green-500 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSelector;