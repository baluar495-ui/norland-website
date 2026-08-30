// frontend/src/pages/CartPage.jsx - 85 lines
import React, { useState, useEffect } from 'react';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import EmptyCart from '../components/EmptyCart';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    calculateTotal(cart);
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return acc + (price * (item.quantity || 1));
    }, 0);
    setTotal(sum.toFixed(2));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updated = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      localStorage.setItem('cart', '[]');
      setTotal(0);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const goBack = () => {
    window.location.href = '/';
  };

  const handleCheckout = () => {
    alert('Checkout coming soon!');
  };

  if (cartItems.length === 0) {
    return <EmptyCart onStartShopping={goBack} />;
  }

  const itemCount = cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        <div className="flex gap-3">
          <button 
            onClick={goBack}
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            ← Continue Shopping
          </button>
          <button 
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {cartItems.map((item) => (
            <CartItem 
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        <OrderSummary 
          itemCount={itemCount}
          total={total}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default CartPage;