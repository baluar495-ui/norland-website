// frontend/src/pages/HomePage.jsx - 50 lines
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import ImageCarousel from '../components/ImageCarousel';
import TrustBadges from '../components/TrustBadges';
import WhyChooseNorland from '../components/WhyChooseNorland';
import PickedForYou from '../components/PickedForYou';
import { fetchProducts } from '../services/api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <div>
      {/* Full-width Carousel */}
      <ImageCarousel />
      
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Heal from within.<br />
            <span className="text-green-600">Live without limits.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Norland products harness decades of bio-health research to restore balance, boost vitality, and transform lives — naturally.
          </p>
        </div>
      </section>

      {/* Trust Badges Section */}
      <TrustBadges />

      {/* Why Choose Norland Section */}
      <WhyChooseNorland />

      {/* Picked For You Section */}
      <PickedForYou />

      {/* Our Products Section - Title Only for Now */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Our Products</h2>
        <p className="text-center text-gray-600 mb-8">Targeted solutions for every health need.</p>
        <div className="text-center py-8 text-gray-500">
          <p>Products coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;  // ✅ Only ONE export statement