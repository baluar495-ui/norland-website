// frontend/src/components/OrderStatusTimeline.jsx - 65 lines
import React from 'react';

const OrderStatusTimeline = ({ status }) => {
  const steps = [
    { 
      key: 'pending', 
      label: 'Order Placed', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    { 
      key: 'processing', 
      label: 'Processing', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      key: 'shipped', 
      label: 'Shipped', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    },
    { 
      key: 'delivered', 
      label: 'Delivered', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  const currentIndex = steps.findIndex(s => s.key === status);
  const statusSteps = steps.map((step, index) => ({
    ...step,
    completed: index <= currentIndex,
    active: index === currentIndex
  }));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="font-semibold text-gray-800 mb-6">Order Status</h3>
      <div className="relative">
        {statusSteps.map((step) => (
          <div key={step.key} className="flex items-start gap-4 mb-6 last:mb-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
            }`}>
              {step.icon}
            </div>
            
            <div className="flex-1">
              <h4 className={`font-medium ${step.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                {step.label}
              </h4>
              {step.active && (
                <p className="text-sm text-green-600">In progress...</p>
              )}
              {step.completed && !step.active && (
                <p className="text-sm text-gray-500">Completed</p>
              )}
            </div>
            
            {step.completed && (
              <div className="text-green-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusTimeline;