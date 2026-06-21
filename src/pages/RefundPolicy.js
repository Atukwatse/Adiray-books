import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RefundPolicy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Refund Policy | Adiray Books";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-amber-700 hover:text-amber-900 transition-colors font-medium"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-200 overflow-hidden">
          <div className="bg-amber-600 p-8 sm:p-12 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <i className="fas fa-undo-alt text-white text-3xl"></i>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Refund Policy</h1>
            <p className="text-amber-100 max-w-xl mx-auto">
              Our commitment to your satisfaction. Please read our return and refund guidelines below.
            </p>
          </div>

          <div className="p-8 sm:p-12 space-y-10 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mr-3 text-sm">01</span>
                Return Policy Overview
              </h2>
              <p>
                We have a <span className="font-bold text-amber-700">2-day return policy</span>, which means you have 2 days after receiving your item to request a return.
              </p>
              <p className="mt-4">
                To be eligible for a return, your item must be in the same condition that you received it, <span className="underline decoration-amber-300">unworn or unused</span>, and in its original packaging. You’ll also need the receipt or proof of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mr-3 text-sm">02</span>
                How to Start a Return
              </h2>
              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <p className="mb-4">
                  To start a return, you can contact us at: 
                  <a href="mailto:info@adiraybooks.com" className="ml-2 font-bold text-amber-700 hover:underline">info@adiraybooks.com</a>
                </p>
                <p>
                  If your return is accepted, we’ll send you instructions on how and where to send your package. <span className="font-semibold text-red-600">Items sent back to us without first requesting a return will not be accepted.</span>
                </p>
              </div>
            </section>

            <section className="grid sm:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-3 flex items-center">
                  <i className="fas fa-exclamation-triangle text-amber-500 mr-2"></i>
                  Damages and Issues
                </h2>
                <p className="text-sm">
                  Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-3 flex items-center">
                  <i className="fas fa-ban text-red-500 mr-2"></i>
                  Exceptions
                </h2>
                <p className="text-sm">
                  Unfortunately, we cannot accept returns on sale items or gift cards.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mr-3 text-sm">03</span>
                Exchanges
              </h2>
              <p>
                The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-amber-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mr-3 text-sm">04</span>
                Refunds
              </h2>
              <p>
                We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. 
              </p>
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 text-sm italic">
                Note: It can take some time for your bank or credit card company to process and post the refund too.
              </div>
            </section>

            <div className="pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-500 mb-4">Have more questions about returns?</p>
              <a 
                href="mailto:info@adiraybooks.com" 
                className="inline-flex items-center px-6 py-3 bg-mustard hover:bg-amber-600 text-charcoal font-bold rounded-full transition-all transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-envelope mr-2"></i>
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
