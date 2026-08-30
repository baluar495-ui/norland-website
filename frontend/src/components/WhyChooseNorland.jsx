// frontend/src/components/WhyChooseNorland.jsx - 48 lines
import React from 'react';

const WhyChooseNorland = () => {
  const benefits = [
    {
      icon: 'fa-leaf',
      title: 'Pure Natural Formulas',
      description: 'Every product is formulated from carefully selected herbal and bio-health ingredients with zero harmful additives.'
    },
    {
      icon: 'fa-flask',
      title: 'Clinically Researched',
      description: 'Over three decades of Chinese bio-health research underpin each formula — results you can measure, not just feel.'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Certified & Authentic',
      description: 'All products are verified for their authenticity. No counterfeits, no shortcuts — your safety is non-negotiable.'
    },
    {
      icon: 'fa-hand-holding-heart',
      title: 'Personal Guidance',
      description: 'Not sure which product fits your condition? Get a free health consultation before you spend a single shilling.'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Why Choose Norland Heading */}
        <div className="text-center mb-3">
          <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">Why Choose Norland</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
          Science-backed healing,<br />
          <span className="text-green-600">naturally delivered.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`fas ${benefit.icon} text-2xl text-green-600`}></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseNorland;