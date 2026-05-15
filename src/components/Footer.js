import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ADIRAY BOOKS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
