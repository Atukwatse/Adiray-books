import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="responsive-container py-8">

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <div className="mb-4 space-x-6">
            <a href="/refund-policy" className="hover:text-mustard transition-colors">Refund Policy</a>
            <a href="/help" className="hover:text-mustard transition-colors">Help Center</a>
            <a href="/contact" className="hover:text-mustard transition-colors">Contact Us</a>
          </div>
          &copy; {new Date().getFullYear()} ADIRAY BOOKS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
