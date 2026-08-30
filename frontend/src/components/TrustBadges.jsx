// frontend/src/components/TrustBadges.jsx - 70 lines
import React from 'react';

const TrustBadges = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600">30+</div>
            <div className="text-xs md:text-sm text-gray-600 uppercase font-medium">Natural Ingredients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600">1.2M+</div>
            <div className="text-xs md:text-sm text-gray-600 uppercase font-medium">Lives Transformed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600">100%</div>
            <div className="text-xs md:text-sm text-gray-600 uppercase font-medium">Years of Research</div>
          </div>
        </div>

        {/* Scroll to Explore */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm animate-bounce">↓ Scroll to explore</p>
        </div>

        {/* Trust Badges Row with Real Icons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-6">
          <span className="inline-flex items-center gap-2 text-xs md:text-sm bg-green-100 text-green-700 px-3 py-2 rounded-full">
            <i className="fas fa-certificate text-green-600"></i>
            WHO Certified
          </span>
          <span className="inline-flex items-center gap-2 text-xs md:text-sm bg-green-100 text-green-700 px-3 py-2 rounded-full">
            <i className="fas fa-shield-alt text-green-600"></i>
            Genuine Products
          </span>
          <span className="inline-flex items-center gap-2 text-xs md:text-sm bg-green-100 text-green-700 px-3 py-2 rounded-full">
            <i className="fas fa-star text-yellow-500"></i>
            5-Star Reviews
          </span>
          <span className="inline-flex items-center gap-2 text-xs md:text-sm bg-green-100 text-green-700 px-3 py-2 rounded-full">
            <i className="fas fa-truck text-green-600"></i>
            Fast Delivery DRC
          </span>
          <span className="inline-flex items-center gap-2 text-xs md:text-sm bg-green-100 text-green-700 px-3 py-2 rounded-full">
            <i className="fas fa-clock text-green-600"></i>
            Same-Day Response
          </span>
        </div>

        {/* Visit Website Link */}
        <div className="text-center mb-4">
          <a 
            href="https://www.norland-international.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-green-600 hover:text-green-800 font-medium"
          >
            <i className="fas fa-globe mr-2"></i>
            Visit www.norland-international.com
          </a>
        </div>

        {/* Countries/Flags Row */}
        <div className="text-center">
          <p className="text-xs font-semibold text-gray-700 uppercase mb-3 flex items-center justify-center gap-2">
            <i className="fas fa-globe-africa text-green-600"></i>
            Norland Global Franchise
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇺🇬 Uganda</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇰🇪 Kenya</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇹🇿 Tanzania</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇿🇼 Zimbabwe</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇳🇬 Nigeria</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇬🇭 Ghana</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇿🇲 Zambia</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇿🇦 South Africa</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇨🇲 Cameroon</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇷🇼 Rwanda</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇨🇭 Switzerland</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇨🇩 DRC</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-gray-100 px-3 py-1 rounded">🇲🇦 Morocco</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-600 px-3 py-1 rounded">+ More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;