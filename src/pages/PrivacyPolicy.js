import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Adiray Books";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
        <h1 className="text-3xl font-serif font-black text-charcoal uppercase tracking-tighter mb-8 border-b border-gold/20 pb-6">
          Privacy <span className="text-gold">Policy</span>
        </h1>
        
        <div className="prose prose-slate max-w-none space-y-6 text-slate-600 font-light leading-relaxed">
          <p className="font-bold text-charcoal">Last updated: June 20, 2026</p>
          
          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4 uppercase tracking-wider text-sm">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, make a purchase, or communicate with us. This may include your name, email address, phone number, shipping address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4 uppercase tracking-wider text-sm">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Process your orders and manage your account</li>
              <li>Communicate with you about products, services, and promotions</li>
              <li>Improve our website and customer service experience</li>
              <li>Ensure compliance with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4 uppercase tracking-wider text-sm">3. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4 uppercase tracking-wider text-sm">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@adiraybooks.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
