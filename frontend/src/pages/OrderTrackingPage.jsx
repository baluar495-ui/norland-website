// frontend/src/pages/OrderTrackingPage.jsx - 80 lines
import React, { useState, useEffect } from 'react';
import OrderSearch from '../components/OrderSearch';
import OrderDetails from '../components/OrderDetails';
import OrderStatusTimeline from '../components/OrderStatusTimeline';

const OrderTrackingPage = () => {
  const [order, setOrder] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderParam = params.get('order');
    
    if (orderParam) {
      setOrderNumber(orderParam);
      searchOrder(orderParam);
    } else {
      const lastOrder = localStorage.getItem('lastOrder');
      if (lastOrder) {
        const orderData = JSON.parse(lastOrder);
        setOrderNumber(orderData.orderNumber);
        setOrder(orderData);
      }
    }
  }, []);

  const searchOrder = (orderNum) => {
    setSearching(true);
    setNotFound(false);
    
    setTimeout(() => {
      const lastOrder = localStorage.getItem('lastOrder');
      if (lastOrder) {
        const orderData = JSON.parse(lastOrder);
        if (orderData.orderNumber === orderNum) {
          setOrder(orderData);
          setSearching(false);
          return;
        }
      }
      
      const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
      const foundOrder = allOrders.find(o => o.orderNumber === orderNum);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setNotFound(true);
      }
      setSearching(false);
    }, 1000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      searchOrder(orderNumber.trim());
    }
  };

  const goHome = () => window.location.href = '/';

  if (!order && !searching && !notFound) {
    return (
      <OrderSearch 
        orderNumber={orderNumber}
        onOrderChange={(e) => setOrderNumber(e.target.value)}
        onSearch={handleSearch}
        onBack={goHome}
      />
    );
  }

  if (searching) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for your order...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find an order with that number. Please check and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <OrderDetails order={order} />
      <OrderStatusTimeline status={order?.status || 'pending'} />
      
      <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
        <button 
          onClick={goHome}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Continue Shopping
        </button>
        <button 
          onClick={() => window.location.href = '/contact'}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Need Help?
        </button>
      </div>
    </div>
  );
};

export default OrderTrackingPage;