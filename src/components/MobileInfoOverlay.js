import React, { useState, useEffect } from 'react';

const MobileInfoOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close overlay on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* Floating Info Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-12 h-12 bg-charcoal text-white rounded-full shadow-lg flex items-center justify-center z-[60] active:scale-90 transition-transform border-2 border-gold/30 hover:bg-black"
        aria-label="Information"
      >
        <i className="fas fa-info text-lg"></i>
      </button>

      {/* Backdrop with Blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-[70] transition-all duration-300 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* Popover Card */}
          <div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <i className="fas fa-share-alt text-3xl"></i>
              </div>
              
              <h3 className="text-xl font-serif font-black text-charcoal uppercase tracking-tighter mb-2">Connect With <span className="text-gold">Us</span></h3>
              <p className="text-gray-500 text-sm mb-8">Follow us on social media for latest updates and collections.</p>
              
              <div className="grid grid-cols-4 gap-4">
                <a href="#" className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center group-active:scale-95 transition-transform">
                    <i className="fab fa-facebook-f text-xl"></i>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Facebook</span>
                </a>
                <a href="#" className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#E4405F]/10 text-[#E4405F] flex items-center justify-center group-active:scale-95 transition-transform">
                    <i className="fab fa-instagram text-xl"></i>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Instagram</span>
                </a>
                <a href="#" className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center group-active:scale-95 transition-transform">
                    <i className="fab fa-twitter text-xl"></i>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Twitter</span>
                </a>
                <a href="#" className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-active:scale-95 transition-transform">
                    <i className="fab fa-whatsapp text-xl"></i>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">WhatsApp</span>
                </a>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 flex justify-center border-t border-slate-100">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs font-black text-charcoal uppercase tracking-widest hover:text-gold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileInfoOverlay;
