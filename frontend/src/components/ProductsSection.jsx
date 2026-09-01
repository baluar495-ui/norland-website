// frontend/src/components/ProductsSection.jsx - 40 lines
import React from 'react';
import CategoryCarousel from './CategoryCarousel';

const ProductsSection = ({ products = [], loading = false }) => {
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Products</h2>
      <p className="text-center text-gray-600 mb-8">Targeted solutions for every health need.</p>
      <CategoryCarousel products={products} />
    </div>
  );
};

export default ProductsSection;