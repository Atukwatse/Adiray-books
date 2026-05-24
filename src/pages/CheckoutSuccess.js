import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract transaction details passed via navigate state
  const { orderId, total, email } = location.state || {};

  useEffect(() => {
    document.title = "Order Confirmed | Adiray Books";
    // Redirect if direct navigation happened without order state
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="min-h-[80vh] bg-white flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full text-center">
        {/* Animated Checkmark Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/15 mb-8 relative">
          <div className="absolute inset-0 bg-gold rounded-full opacity-10 animate-ping"></div>
          <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-charcoal shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold font-serif text-charcoal mb-4 uppercase tracking-tight">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 font-light tracking-wide max-w-md mx-auto mb-10">
          Thank you for choosing Adiray Books. Your payment has been processed successfully, and your literary journey is beginning.
        </p>

        {/* Invoice Summary Box */}
        <div className="bg-gray-50 border border-gray-100 p-8 rounded-none text-left mb-10 divide-y divide-gray-200/60 shadow-sm max-w-md mx-auto">
          <div className="pb-4 flex justify-between items-center text-sm">
            <span className="text-gray-400 font-light uppercase tracking-wider">Order ID</span>
            <span className="font-mono font-bold text-charcoal">{orderId}</span>
          </div>

          <div className="py-4 flex justify-between items-center text-sm">
            <span className="text-gray-400 font-light uppercase tracking-wider">Total Charged</span>
            <span className="font-bold text-charcoal">${total.toFixed(2)}</span>
          </div>

          <div className="pt-4 flex justify-between items-center text-sm">
            <span className="text-gray-400 font-light uppercase tracking-wider">Confirmation Email</span>
            <span className="font-semibold text-charcoal truncate max-w-[200px]">{email}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-8 font-light max-w-sm mx-auto">
          A receipt and tracking number have been sent to your email. You can check shipping progression inside your account dashboards.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Link
            to="/orders"
            className="flex-1 h-14 bg-charcoal text-white font-semibold uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center border border-charcoal"
          >
            Track Order History
          </Link>
          
          <Link
            to="/shop"
            className="flex-1 h-14 bg-white text-charcoal font-semibold uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-center border border-charcoal"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
