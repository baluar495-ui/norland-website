// frontend/src/components/CategoryCarousel.jsx - With Auto-Scroll
import React, { useState, useEffect } from 'react';
import CategoryIcon from './CategoryIcon';
import CategoryModal from './CategoryModal';
import { fetchCategories, fetchProductsByCategory } from '../services/api';

const CategoryCarousel = ({ products = [] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsToShow = 4;

  // Fetch categories with product counts from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        console.log('📦 Categories loaded:', data);
        setCategories(data);
      } catch (error) {
        console.error('❌ Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  // AUTO-SCROLL: Move to next set of categories every 5 seconds
  useEffect(() => {
    if (categories.length === 0) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [categories.length]);

  const getProductCount = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? parseInt(category.product_count) : 0;
  };

  const handleCategoryClick = async (categoryName) => {
    console.log(`🖱️ Clicked category: ${categoryName}`);
    try {
      const products = await fetchProductsByCategory(categoryName);
      console.log(`📦 Found ${products.length} products in ${categoryName}:`, products);
      setCategoryProducts(products);
      setSelectedCategory(categoryName);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
    }
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setCategoryProducts([]);
  };

  const getVisibleCategories = () => {
    if (categories.length === 0) return [];
    const visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (startIndex + i) % categories.length;
      visible.push(categories[index]);
    }
    return visible;
  };

  const goToPrevious = () => {
    setStartIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const goToNext = () => {
    setStartIndex((prev) => (prev + 1) % categories.length);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto text-center py-8">
        <div className="text-gray-600">Loading categories...</div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="max-w-5xl mx-auto text-center py-8">
        <div className="text-gray-600">No categories found.</div>
      </div>
    );
  }

  const visibleCategories = getVisibleCategories();

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {visibleCategories.map((category, index) => (
            <button
              key={`${category.name}-${index}`}
              onClick={() => handleCategoryClick(category.name)}
              className="bg-white rounded-2xl shadow-lg p-4 md:p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className="flex justify-center mb-3">
                <CategoryIcon name={category.name} />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-1">
                {category.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                {getProductCount(category.name)} products
              </p>
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center gap-6 mt-6">
          <button 
            onClick={goToPrevious}
            className="bg-white hover:bg-gray-100 text-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <span className="text-xs md:text-sm text-gray-500 font-medium">
            {startIndex + 1} - {((startIndex + itemsToShow - 1) % categories.length) + 1} / {categories.length}
          </span>
          
          <button 
            onClick={goToNext}
            className="bg-white hover:bg-gray-100 text-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === startIndex ? 'bg-green-600 w-6' : 'bg-gray-300'
              }`}
              onClick={() => setStartIndex(index)}
            />
          ))}
        </div>
      </div>

      <CategoryModal 
        category={selectedCategory}
        products={categoryProducts}
        onClose={closeModal}
      />
    </>
  );
};

export default CategoryCarousel;