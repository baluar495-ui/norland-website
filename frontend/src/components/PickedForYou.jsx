// frontend/src/components/PickedForYou.jsx - 120 lines
import React, { useState, useEffect } from 'react';
import PickedProductCard from './PickedProductCard';
import ProductModal from './ProductModal';
import ProductTabs from './ProductTabs';
import ProductNavigation from './ProductNavigation';
import { fetchFeaturedProducts } from '../services/api';

const PickedForYou = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [tags, setTags] = useState([]);
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load and group products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchFeaturedProducts();
        const grouped = {};
        data.forEach(product => {
          const tag = product.tag || 'Uncategorized';
          if (!grouped[tag]) grouped[tag] = [];
          grouped[tag].push(product);
        });
        setGroupedProducts(grouped);
        setTags(Object.keys(grouped));
      } catch (error) {
        console.error('❌ Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (tags.length === 0) return;
    const currentProducts = groupedProducts[tags[currentTagIndex]] || [];
    if (currentProducts.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % currentProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [tags, currentTagIndex, groupedProducts]);

  const goToTag = (index) => {
    setCurrentTagIndex(index);
    setCurrentProductIndex(0);
  };

  const goToPrevious = () => {
    const currentProducts = groupedProducts[tags[currentTagIndex]] || [];
    if (currentProducts.length === 0) return;
    setCurrentProductIndex((prev) => 
      prev === 0 ? currentProducts.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    const currentProducts = groupedProducts[tags[currentTagIndex]] || [];
    if (currentProducts.length === 0) return;
    setCurrentProductIndex((prev) => (prev + 1) % currentProducts.length);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-600">Loading products...</div>
        </div>
      </div>
    );
  }

  if (tags.length === 0) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-600">No products available</div>
        </div>
      </div>
    );
  }

  const currentTag = tags[currentTagIndex];
  const currentProducts = groupedProducts[currentTag] || [];
  const currentProduct = currentProducts[currentProductIndex] || currentProducts[0];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Picked just for you.
          </h2>
          <ProductTabs 
            tags={tags} 
            currentIndex={currentTagIndex} 
            onTabClick={goToTag} 
          />
        </div>

        <div className="relative">
          {currentProduct && (
            <PickedProductCard 
              product={currentProduct} 
              onLearnMore={openModal} 
            />
          )}
          
          <ProductNavigation 
            totalProducts={currentProducts.length}
            currentIndex={currentProductIndex}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onDotClick={setCurrentProductIndex}
          />
        </div>

        <div className="text-center mt-8">
          <a href="#" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2">
            Loved shopping with us? Tell us about it →
          </a>
        </div>
      </div>

      <ProductModal product={selectedProduct} onClose={closeModal} />
    </div>
  );
};

export default PickedForYou;