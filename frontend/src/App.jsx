// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      if (path === '/cart') {
        setCurrentPage('cart');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handleNavigation);
    handleNavigation();

    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const renderPage = () => {
    if (currentPage === 'cart') {
      return <CartPage />;
    }
    return <HomePage />;
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