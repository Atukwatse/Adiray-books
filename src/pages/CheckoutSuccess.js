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
    <div className="min-h-screen bg-[#F5F2EB] py-16 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Celebration Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/15 mb-6 relative">
            <div className="absolute inset-0 bg-gold rounded-full opacity-10 animate-ping"></div>
            <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center text-white shadow-lg">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-charcoal mb-4 uppercase tracking-tight">
            It's Official.
          </h1>
          <p className="text-gray-500 font-light tracking-widest uppercase text-xs">
            Your literary journey begins today.
          </p>
        </div>

        {/* Digital Receipt Card */}
        <div className="bg-white shadow-2xl relative overflow-hidden mb-12">
          {/* Perforated Top Edge Effect */}
          <div className="absolute top-0 left-0 right-0 h-1 flex justify-between">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-[#F5F2EB] rounded-full -mt-1"></div>
            ))}
          </div>

          <div className="p-8 md:p-12">
            <div className="flex justify-between items-start mb-10 pb-6 border-b border-gray-100">
              <div>
                <span className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Receipt for Order</span>
                <span className="text-2xl font-mono font-bold text-charcoal">{orderId}</span>
              </div>
              <button 
                onClick={() => window.print()}
                className="text-gray-400 hover:text-gold transition-colors"
                title="Print Receipt"
              >
                <i className="fas fa-print text-xl"></i>
              </button>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex justify-between">
                <span className="text-gray-500 font-light italic">Status</span>
                <span className="text-sm font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-100">Paid & Confirmed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-light italic">Customer Email</span>
                <span className="text-sm font-medium text-charcoal">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-light italic">Transaction Total</span>
                <span className="text-xl font-bold text-charcoal">${total?.toFixed(2)}</span>
              </div>
            </div>

            {/* Fulfillment Roadmap / Stepper */}
            <div className="relative pt-10 pb-4">
              <div className="absolute top-10 left-0 w-full h-0.5 bg-gray-100"></div>
              <div className="absolute top-10 left-0 w-1/4 h-0.5 bg-gold"></div>
              
              <div className="relative flex justify-between">
                {[
                  { label: 'Placed', icon: 'fa-check', active: true },
                  { label: 'Processing', icon: 'fa-box', active: false },
                  { label: 'Shipped', icon: 'fa-truck', active: false },
                  { label: 'Arrived', icon: 'fa-house', active: false },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-500 z-10 ${
                      step.active ? 'bg-gold text-white shadow-lg shadow-gold/20' : 'bg-white border-2 border-gray-100 text-gray-300'
                    }`}>
                      <i className={`fas ${step.icon} text-xs`}></i>
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${step.active ? 'text-charcoal' : 'text-gray-300'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Perforated Bottom Edge Effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 flex justify-between">
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="w-2 h-2 bg-[#F5F2EB] rounded-full -mb-1"></div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/shop"
            className="flex-1 h-14 bg-charcoal text-white font-bold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all duration-300 flex items-center justify-center space-x-3 group"
          >
            <i className="fas fa-arrow-left text-xs group-hover:-translate-x-1 transition-transform"></i>
            <span>Browse More</span>
          </Link>
          
          <Link
            to="/"
            className="flex-1 h-14 bg-white border-2 border-charcoal text-charcoal font-bold uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            Dashboard
          </Link>
        </div>

        <p className="mt-12 text-center text-[10px] text-gray-400 font-light uppercase tracking-[0.3em]">
          ADIRAY BOOKS — EST. 2024
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
