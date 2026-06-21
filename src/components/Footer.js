import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white hidden lg:block">
      <div className="responsive-container py-8">

        {/* Copyright */}
        <div className="text-center text-gray-400 text-base">
          <div className="mb-4 space-x-6">
            <a href="/refund-policy" className="hover:text-gold transition-colors">Refund Policy</a>
            <a href="/help" className="hover:text-gold transition-colors">Help Center</a>
            <a href="/contact" className="hover:text-gold transition-colors">Contact Us</a>
          </div>
          
          {/* Social Icons for Desktop */}
          <div className="flex justify-center space-x-5 mb-6">
            <a href="https://facebook.com/adiraybooks" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold/10 hover:text-gold hover:border-gold transition-all group">
              <i className="fab fa-facebook-f text-lg"></i>
            </a>
            <a href="https://instagram.com/adiraybooks" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold/10 hover:text-gold hover:border-gold transition-all group">
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a href="https://tiktok.com/@adiraybooks" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold/10 hover:text-gold hover:border-gold transition-all group">
              <i className="fab fa-tiktok text-lg"></i>
            </a>
            <a href="https://wa.me/211920889342" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold/10 hover:text-gold hover:border-gold transition-all group">
              <i className="fab fa-whatsapp text-lg"></i>
            </a>
          </div>
          &copy; {new Date().getFullYear()} ADIRAY BOOKS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
