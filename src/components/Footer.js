import React from 'react';

const Footer = () => {
  const footerLinks = [
    { href: '#about', label: 'ABOUT US' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'CONTACT' },
    { href: '#terms', label: 'TERMS OF SERVICE' }
  ];

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-8 mb-6">
          {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-white hover:text-gold transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ADIRAY BOOKS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
