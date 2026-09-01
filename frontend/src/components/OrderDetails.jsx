// frontend/src/components/OrderDetails.jsx - 70 lines
import React from 'react';

const OrderDetails = ({ order }) => {
  const orderDate = order?.date ? new Date(order.date) : new Date();

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Order Received';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      default: return 'Pending';
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Order Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Order Tracking</h1>
            <p className="text-sm text-gray-500">Order #{order?.orderNumber}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(order?.status || 'pending')}`}>
            {getStatusText(order?.status || 'pending')}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Placed on {orderDate.toLocaleDateString()} at {orderDate.toLocaleTimeString()}
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
        <div className="space-y-3">
          {order?.items?.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image_url || '/images/placeholder.jpg'} 
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium text-gray-800">{item.price}</p>
            </div>
          ))}
          
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span className="text-green-600">${order?.total || '0.00'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Delivery Information</h3>
        <div className="space-y-2 text-gray-600">
          <p><span className="font-medium text-gray-700">Name:</span> {order?.customer?.fullName || 'N/A'}</p>
          <p><span className="font-medium text-gray-700">Phone:</span> {order?.customer?.phone || 'N/A'}</p>
          <p><span className="font-medium text-gray-700">Address:</span> {order?.customer?.address || 'N/A'}</p>
          <p><span className="font-medium text-gray-700">City:</span> {order?.customer?.city || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;