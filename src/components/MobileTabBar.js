import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileTabBar = ({ onSearchOpen, setIsCategoryOverlayOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCategories, setShowCategories] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fa-home', path: '/' },
    { id: 'shop', label: 'Shop', icon: 'fa-store', path: '/shop' },
    { id: 'search', label: 'Search', icon: 'fa-search', action: onSearchOpen },
    { id: 'account', label: 'Account', icon: 'fa-user', path: '/account' }
  ];

  const categories = [
    { id: 'all', label: 'All Books', path: '/shop' },
    { id: 'fiction', label: 'Fiction', path: '/categories/fiction' },
    { id: 'nonfiction', label: 'Non-fiction', path: '/categories/nonfiction' },
    { id: 'technology', label: 'Technology', path: '/categories/technology' },
    { id: 'business', label: 'Business', path: '/categories/business' }
  ];

  const handleNavClick = (item) => {
    if (item.id === 'search') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        if (onSearchOpen) onSearchOpen();
      }, 300);
    } else if (item.id === 'shop') {
      setShowCategories(!showCategories);
    } else {
      navigate(item.path);
      setShowCategories(false);
    }
  };

  return (
    <>
      {/* Full-Screen Category Modal */}
      {showCategories && (
        <div className="fixed inset-0 z-[100] bg-white sm:hidden flex flex-col animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-6 border-b border-gray-100">
            <h3 className="font-black text-charcoal uppercase tracking-[0.2em] text-sm">Explore Categories</h3>
            <button 
              onClick={() => setShowCategories(false)} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 active:bg-gray-100 transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

          {/* Centered Content */}
          <div className="flex-grow flex flex-col items-center justify-center p-8 overflow-y-auto">
            <div className="w-full max-w-md space-y-4 animate-slide-up">
              {categories.map((cat, index) => (
                <button
                  key={cat.id}
                  onClick={() => { navigate(cat.path); setShowCategories(false); }}
                  className="w-full px-8 py-5 bg-gray-50 rounded-2xl text-center text-sm font-black text-charcoal hover:bg-amber-50 hover:text-amber-700 transition-all border-2 border-transparent hover:border-amber-200 active:scale-95 flex items-center justify-between group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="uppercase tracking-widest">{cat.label}</span>
                  <i className="fas fa-chevron-right text-[10px] text-gray-300 group-hover:text-amber-400 transition-colors"></i>
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setShowCategories(false)}
              className="mt-12 text-xs font-black text-gray-400 uppercase tracking-[0.3em] hover:text-charcoal transition-colors underline underline-offset-8 decoration-gold/50"
            >
              Back to Store
            </button>
          </div>
        </div>
      )}

      {/* Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-white border-t border-gray-100 z-[70] sm:hidden flex items-center justify-around px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex flex-col items-center justify-center w-16 h-16 transition-all relative ${
                isActive || (item.id === 'shop' && showCategories) ? 'text-[#EA580C]' : 'text-black'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all ${
                isActive ? 'bg-orange-50' : 'bg-transparent'
              }`}>
                <i className={`fas ${item.icon} text-lg`}></i>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-inherit">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-[1.5px] w-8 h-1 bg-[#EA580C] rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
};

export default MobileTabBar;
