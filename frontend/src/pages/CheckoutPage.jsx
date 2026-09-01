// frontend/src/pages/CheckoutPage.jsx - 80 lines
import React, { useState, useEffect } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutSummary from '../components/CheckoutSummary';
import OrderConfirmation from '../components/OrderConfirmation';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    deliveryOption: 'standard'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    calculateTotal(cart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return acc + (price * (item.quantity || 1));
    }, 0);
    setTotal(sum.toFixed(2));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const now = new Date();
    const orderNum = `ORD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    setOrderNumber(orderNum);
    
    const order = {
      orderNumber: orderNum,
      customer: formData,
      items: cartItems,
      total: total,
      date: now.toISOString(),
      status: 'pending'
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    allOrders.push(order);
    localStorage.setItem('allOrders', JSON.stringify(allOrders));
    
    localStorage.setItem('cart', '[]');
    window.dispatchEvent(new Event('cartUpdated'));
    setOrderPlaced(true);
  };

  const goBack = () => window.location.href = '/cart';
  const goHome = () => window.location.href = '/';
  const goTrack = () => window.location.href = `/order-tracking?order=${orderNumber}`;

  if (orderPlaced) {
    return <OrderConfirmation orderNumber={orderNumber} onContinue={goHome} onTrack={goTrack} />;
  }

  const itemCount = cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some products before checking out.</p>
          <button onClick={goHome} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <CheckoutForm formData={formData} onChange={handleInputChange} />
          </form>
        </div>

        <div className="lg:w-96">
          <CheckoutSummary 
            itemCount={itemCount}
            total={total}
            onPlaceOrder={handleSubmit}
            onBack={goBack}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;