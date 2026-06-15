import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth, useCart } from '../context/AppContext';
import Logo from './Logo';

const CartIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path
      fill="currentColor"
      d="M8.5 9.5c0-2 1.6-3.5 3.5-3.5h12.4c5.5 0 7 3.1 8 7.7l1.3 6.1h22.6c4.3 0 7.2 3.9 6.3 8.1l-4.1 18.4c-.7 3.2-3.4 5.4-6.7 5.4H32.1c-5.8 0-8.3-2.7-9.5-8.2L16.4 15H12c-1.9 0-3.5-1.6-3.5-3.5Zm25.3 48c0 3.6-2.9 6.5-6.5 6.5s-6.5-2.9-6.5-6.5 2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5Zm23.7 0c0 3.6-2.9 6.5-6.5 6.5s-6.5-2.9-6.5-6.5S47.4 51 51 51s6.5 2.9 6.5 6.5ZM28.1 43.7c.4 1.9 1.4 2.5 3.7 2.5h20.4c1.7 0 3.1 1.4 3.1 3.1s-1.4 3.1-3.1 3.1H31.8c-5.3 0-8.4-2.4-9.5-7.5l-.4-1.9h6l.2.7Z"
    />
  </svg>
);

const Header = ({ 
  cartCount, 
  cartTotal, 
  onSearchOpen, 
  onCartClick, 
  isMobileMenuOpen, 
  onMobileMenuToggle 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const location = useLocation();
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  // Consume Auth and Cart Contexts
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount: ctxCartCount } = useCart();
  
  const displayCartCount = cartCount !== undefined ? cartCount : ctxCartCount;

  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAuthDropdownOpen && !event.target.closest('.auth-dropdown')) {
        setIsAuthDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAuthDropdownOpen]);

  // Handle scroll detection for sticky header effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/login');
    setIsAuthDropdownOpen(false);
  };

  const handleRegister = () => {
    navigate('/register');
    setIsAuthDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsAuthDropdownOpen(false);
    navigate('/');
  };

  const subNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/shop' },
    { name: 'Fiction', path: '/categories/fiction' },
    { name: 'Nonfiction', path: '/categories/nonfiction' },
    { name: 'eBooks', path: '/categories/ebooks' },
    { name: 'Audiobooks', path: '/categories/audiobooks' },
    { name: 'Teens & YA', path: '/categories/teens-ya' },
    { name: 'Kids', path: '/categories/kids' },
    { name: 'Business', path: '/categories/business' },
    { name: 'Technology', path: '/categories/technology' },
    { name: 'Educational', path: '/categories/educational' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 font-sans ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md' 
        : 'bg-white shadow-sm'
    }`}>
      
      {/* Top Mini-Bar */}
      <div className={`relative z-[80] text-gray-500 text-[10px] sm:text-xs tracking-widest uppercase py-2 hidden md:block border-b border-gray-100 transition-all duration-300 ${
        isScrolled ? 'bg-gray-50/80 backdrop-blur-sm' : 'bg-gray-50'
      }`}>
        <div className="responsive-container flex justify-end items-center">
          <div className="flex items-center divide-x divide-gray-300">
            <Link 
              to="/about" 
              className={`pr-4 transition-colors ${
                isActive('/about') ? 'text-orange-600 font-bold' : 'hover:text-orange-600 text-gray-500'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`px-4 transition-colors ${
                isActive('/contact') ? 'text-orange-600 font-bold' : 'hover:text-orange-600 text-gray-500'
              }`}
            >
              Contact
            </Link>
            
            {/* Auth User / My Account Top Link */}
            <div className="px-4 relative auth-dropdown">
              <button 
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                className="hover:text-charcoal transition-colors flex items-center"
                aria-expanded={isAuthDropdownOpen}
                aria-haspopup="menu"
              >
                <i className="far fa-user mr-1.5"></i> 
                {isAuthenticated ? `Hi, ${user?.firstName}` : 'My Account'}
                <i className="fas fa-chevron-down ml-1.5 text-[8px]"></i>
              </button>

              {/* Auth Dropdown Menu */}
              {isAuthDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white border border-gray-200 shadow-2xl z-[100] normal-case tracking-normal">
                  {isAuthenticated ? (
                    <div className="p-4">
                      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                        {user?.picture ? (
                          <img
                            src={user.picture}
                            alt={`${user?.firstName || 'Account'} profile`}
                            className="w-11 h-11 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-charcoal text-white flex items-center justify-center font-bold text-sm">
                            {(user?.firstName || 'A').charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-charcoal truncate">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full mt-4 flex items-center justify-center gap-2 bg-charcoal text-white py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="p-4">
                      <button onClick={handleLogin} className="w-full bg-charcoal text-white py-2 text-sm font-semibold uppercase tracking-widest hover:bg-black transition-colors">Sign In</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <Link 
              to="/wishlist" 
              className={`pl-4 transition-colors flex items-center ${
                isActive('/wishlist') ? 'text-orange-600 font-bold' : 'hover:text-orange-600 text-gray-500'
              }`}
            >
              <i className={`${isActive('/wishlist') ? 'fas' : 'far'} fa-heart mr-1.5`}></i> Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className={`text-charcoal border-b border-gray-200 relative z-30 transition-all duration-300 ${
        isScrolled ? 'bg-transparent' : 'bg-white'
      }`}>
        <div className="responsive-container h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <Logo variant="horizontal" theme="light" className="h-7 sm:h-8 w-auto" />
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-3xl mx-4 lg:mx-8 relative">
            <form onSubmit={handleSearch} className="w-full flex border border-gray-300 focus-within:border-charcoal focus-within:ring-1 focus-within:ring-charcoal transition-all">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Title, Author, Keyword or ISBN"
                className="flex-1 px-4 py-2 text-sm text-charcoal placeholder-gray-400 outline-none"
              />
              <button type="submit" className="bg-charcoal text-white px-5 hover:bg-black transition-colors flex items-center justify-center">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-6 shrink-0">
            
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden text-charcoal hover:text-orange-600 transition-colors p-1"
            >
              <i className={`fas ${isMobileSearchOpen ? 'fa-times font-semibold' : 'fa-search'} text-xl`}></i>
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onCartClick}
              aria-label="Open shopping cart"
              className={`relative transition-colors duration-200 group flex items-center p-1 ${
                isActive('/cart') ? 'text-orange-600' : 'text-charcoal hover:text-orange-600'
              }`}
            >
              <CartIcon className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-105 transition-transform" />
              {displayCartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border border-white">
                  {displayCartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={onMobileMenuToggle}
              className="md:hidden text-charcoal hover:text-orange-600 transition-colors duration-200 p-1"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Expansion */}
      {isMobileSearchOpen && (
        <div className="md:hidden w-full bg-gray-50 border-b border-gray-200 px-4 py-3 z-20 transition-all duration-300">
          <form onSubmit={handleSearch} className="w-full flex border border-gray-300 bg-white focus-within:border-charcoal focus-within:ring-1 focus-within:ring-charcoal">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for books, authors, ISBN..."
              className="flex-1 px-4 py-2 text-sm text-charcoal placeholder-gray-400 outline-none"
            />
            <button type="submit" className="bg-charcoal text-white px-5 hover:bg-black transition-colors flex items-center justify-center">
              <i className="fas fa-search text-sm"></i>
            </button>
          </form>
        </div>
      )}

      {/* Category Sub-Bar */}
      <div className={`border-b border-gray-200 py-3 hidden md:block relative z-20 transition-all duration-300 ${
        isScrolled ? 'bg-transparent' : 'bg-white shadow-sm'
      }`}>
        <div className="responsive-container">
          <nav className="flex items-center justify-center">
            <div className="flex items-center divide-x divide-gray-300">
              {subNavLinks.map((cat, idx) => {
                const active = isActive(cat.path);
                const isFirst = idx === 0;
                const isLast = idx === subNavLinks.length - 1;
                
                let underlineClass = 'after:left-4 after:right-4';
                if (isFirst) underlineClass = 'after:left-0 after:right-4';
                if (isLast) underlineClass = 'after:left-4 after:right-0';
                
                return (
                  <Link 
                    key={cat.name} 
                    to={cat.path} 
                    className={`px-4 xl:px-5 text-[15px] font-serif transition-colors whitespace-nowrap relative py-1 ${isFirst ? 'pl-0' : ''} ${isLast ? 'pr-0' : ''} ${
                      active 
                        ? `text-orange-600 font-bold after:absolute after:bottom-[-8px] ${underlineClass} after:h-[3px] after:bg-orange-600 after:rounded-full` 
                        : 'text-charcoal hover:text-orange-600 font-medium'
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 absolute top-full left-0 w-full z-50 shadow-xl max-h-[calc(100vh-8.5rem)] overflow-y-auto">
          {/* Mobile Search Input if opened */}
          <div className="p-4 border-b border-gray-100 bg-gray-50 md:hidden">
             <form onSubmit={handleSearch} className="flex border border-gray-300">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 px-4 py-2 text-sm outline-none"
              />
              <button type="submit" className="bg-charcoal text-white px-4">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          <div className="py-2">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Categories
            </div>
            {subNavLinks.map((cat) => {
              const active = isActive(cat.path);
              return (
                <Link 
                  key={cat.name} 
                  to={cat.path} 
                  className={`block px-6 py-3 font-serif border-b border-gray-50 last:border-0 transition-all duration-200 ${
                    active 
                      ? 'text-orange-600 bg-orange-50/30 font-bold border-l-4 border-orange-600 pl-5' 
                      : 'text-charcoal hover:bg-gray-50 hover:text-orange-600'
                  }`}
                  onClick={onMobileMenuToggle}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Auth / Utility Links */}
          <div className="border-t border-gray-200 bg-gray-50 py-4 px-6 space-y-4">
             {isAuthenticated ? (
               <>
                 <p className="text-sm font-bold text-charcoal mb-2">Hi, {user?.firstName}</p>
                 <Link to="/wishlist" onClick={onMobileMenuToggle} className="block w-full text-left text-sm text-gray-600 hover:text-charcoal"><i className="far fa-heart w-5"></i> Wishlist</Link>
                 <button onClick={() => { handleLogout(); onMobileMenuToggle(); }} className="block w-full text-left text-sm text-red-600 mt-4"><i className="fas fa-sign-out-alt w-5"></i> Logout</button>
               </>
             ) : (
               <>
                 <button onClick={() => { handleLogin(); onMobileMenuToggle(); }} className="w-full bg-charcoal text-white py-2 text-sm font-semibold uppercase tracking-widest">Sign In</button>
               </>
             )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
