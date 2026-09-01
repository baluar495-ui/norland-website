// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      
      if (path === '/cart') {
        setCurrentPage('cart');
      } else if (path === '/checkout') {
        setCurrentPage('checkout');
      } else if (path === '/order-tracking' || path.startsWith('/order-tracking?')) {
        setCurrentPage('order-tracking');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handleNavigation);
    handleNavigation();

    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;