import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth, useCart } from '../context/AppContext';
import Logo from './Logo';

const CartIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const Header = ({ 
  cartCount, 
  cartTotal, 
  onSearchOpen, 
  onSearchClose,
  isSearchOpen,
  onCartClick, 
  isMobileMenuOpen, 
  onMobileMenuToggle,
  isCategoryOverlayOpen,
  setIsCategoryOverlayOpen
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Consume Auth and Cart Contexts
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount: ctxCartCount } = useCart();
  const displayCartCount = cartCount !== undefined ? cartCount : ctxCartCount;

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const categories = [
    { name: 'All Books', path: '/shop', icon: 'fas fa-book-open' },
    { name: 'Fiction', path: '/categories/fiction', icon: 'fas fa-feather' },
    { name: 'Nonfiction', path: '/categories/nonfiction', icon: 'fas fa-file-alt' },
    { name: 'Technology', path: '/categories/technology', icon: 'fas fa-laptop-code' },
    { name: 'Business', path: '/categories/business', icon: 'fas fa-briefcase' },
    { name: 'Educational', path: '/categories/educational', icon: 'fas fa-graduation-cap' },
    { name: 'Fiction', path: '/categories/fiction', icon: 'fas fa-feather' },
    { name: 'eBooks', path: '/categories/ebooks', icon: 'fas fa-tablet-alt' },
    { name: 'Audiobooks', path: '/categories/audiobooks', icon: 'fas fa-headphones' },
    { name: 'Teens & YA', path: '/categories/teens-ya', icon: 'fas fa-user-graduate' },
    { name: 'Kids', path: '/categories/kids', icon: 'fas fa-child' },
    { name: 'Inspirational', path: '/categories/inspirational', icon: 'fas fa-sun' },
    { name: 'Novels', path: '/categories/novels', icon: 'fas fa-book' }
  ];

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

  // Load search history from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('adiray_search_history') || '[]');
    setSearchHistory(history);
  }, []);

  // Auto-focus search input when active
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      // Save to history
      const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('adiray_search_history', JSON.stringify(newHistory));
      
      navigate(`/shop?q=${encodeURIComponent(query)}`);
      onSearchClose();
    }
  };

  const handleHistoryClick = (query) => {
    setSearchQuery(query);
    navigate(`/shop?q=${encodeURIComponent(query)}`);
    onSearchClose();
  };

  const CategoryOverlay = () => (
    <div className={`fixed inset-0 z-[100] bg-charcoal/98 backdrop-blur-md overflow-y-auto transition-all duration-500 ease-out ${isCategoryOverlayOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      <div className="min-h-screen flex flex-col p-6 sm:p-12">
        <div className="flex justify-between items-center mb-12">
          <Logo variant="horizontal" theme="dark" className="h-8" />
          <button 
            onClick={() => setIsCategoryOverlayOpen(false)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-all outline-none"
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
        
        <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col justify-center">
          <div className="mb-12">
            <h2 className="text-white text-4xl sm:text-6xl font-serif font-black uppercase tracking-tighter mb-4">
              Explore<br/><span className="text-gold">Collections</span>
            </h2>
            <p className="text-white/40 text-lg sm:text-xl max-w-md font-light">
              Discover our carefully curated selections across premium genres.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.path}
                onClick={() => setIsCategoryOverlayOpen(false)}
                className="group relative h-80 overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              >
                {/* Background Image Overlay */}
                <div className="absolute inset-0">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-white text-2xl font-serif font-bold uppercase tracking-wide mb-1 group-hover:text-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-widest leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gold text-charcoal flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">
          © 2026 Adiray Books • South Sudan Leading Online Bookstore
        </div>
      </div>
    </div>
  );

  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex flex-col transition-all duration-300 font-sans ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md' 
        : 'bg-white shadow-sm'
    }`}>
      <CategoryOverlay />

      {/* Pop-down Search Overlay */}
      <div 
        className={`absolute top-full left-0 w-full z-40 bg-white/98 backdrop-blur-md border-b border-gray-200 transition-all duration-300 ease-out transform ${
          isSearchOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
      >
        <div className="responsive-container py-6">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
              <div className="flex-1 relative">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for today?"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-gold/30 focus:bg-white rounded-2xl text-charcoal outline-none transition-all placeholder:text-gray-400 font-medium"
                />
              </div>
              <button 
                type="button" 
                onClick={onSearchClose}
                className="text-sm font-black text-charcoal uppercase tracking-widest px-4 py-2 hover:text-gold transition-colors"
              >
                Cancel
              </button>
            </form>

            {searchHistory.length > 0 && (
              <div className="mt-8">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Recent Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((query, bidx) => (
                    <button
                      key={bidx}
                      onClick={() => handleHistoryClick(query)}
                      className="px-4 py-2 bg-gray-100 rounded-full text-xs font-bold text-charcoal hover:bg-gold/10 hover:text-gold transition-all flex items-center gap-2 group"
                    >
                      <i className="fas fa-history text-[10px] text-gray-300 group-hover:text-gold"></i>
                      {query}
                    </button>
                  ))}
                  <button 
                    onClick={() => {
                      setSearchHistory([]);
                      localStorage.removeItem('adiray_search_history');
                    }}
                    className="text-[10px] font-black text-red-400 uppercase tracking-widest ml-2 hover:text-red-500"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Mini-Bar */}
      <div className={`relative z-[80] text-gray-500 text-[10px] sm:text-xs tracking-widest uppercase py-2 hidden md:block border-b border-gray-100 transition-all duration-300 ${
        isScrolled ? 'bg-gray-50/80 backdrop-blur-sm' : 'bg-gray-50'
      }`}>
        <div className="responsive-container flex justify-end items-center">
          <div className="flex items-center divide-x divide-gray-300">
            <Link 
              to="/about" 
              className="pr-4 hover:text-orange-600 transition-colors"
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="px-4 hover:text-orange-600 transition-colors"
            >
              Contact
            </Link>
            
            {/* Auth User / My Account Top Link */}
            <div className="px-4 relative auth-dropdown">
              <button 
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                className="hover:text-charcoal transition-colors flex items-center"
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
                      
                      {user?.role === 'Admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setIsAuthDropdownOpen(false)}
                          className="w-full mt-4 flex items-center justify-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-amber-100 transition-colors"
                        >
                          <i className="fas fa-chart-line"></i>
                          Admin Dashboard
                        </Link>
                      )}

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
                      <button onClick={() => { navigate('/account'); setIsAuthDropdownOpen(false); }} className="w-full bg-charcoal text-white py-2 text-sm font-semibold uppercase tracking-widest hover:bg-black transition-colors">Go to Account</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <Link 
              to="/wishlist" 
              className="pl-4 hover:text-orange-600 text-gray-500 transition-colors flex items-center"
            >
              <i className="far fa-heart mr-1.5"></i> Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className={`text-charcoal border-b border-gray-200 relative z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}>
        <div className="responsive-container h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center min-w-0">
            <Logo variant="horizontal" theme="light" className="h-6 sm:h-8 w-auto max-w-full object-contain" />
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
          <div className="flex items-center space-x-2 sm:space-x-6 shrink-0 ml-2">
            {/* Mobile Search Icon (Triggers top search bar) */}
            {/* Mobile Search Icon (Triggers pop-down search bar) */}
            {/* Mobile Search Icon (Triggers pop-down search bar) */}
            <button
              onClick={() => isSearchOpen ? onSearchClose() : onSearchOpen()}
              className="md:hidden w-10 h-10 flex items-center justify-center text-charcoal hover:text-gold transition-colors"
              aria-label="Toggle search"
            >
              <i className="fas fa-search text-xl"></i>
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onCartClick}
              aria-label="Open shopping cart"
              className="relative transition-colors duration-200 group flex items-center p-1 text-charcoal hover:text-orange-600"
            >
              <CartIcon className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform" />
              {displayCartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border border-white">
                  {displayCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Sub-Bar (Desktop) */}
      <div className={`border-b border-gray-200 hidden md:block relative z-20 transition-all duration-300 ${
        isScrolled ? 'bg-gray-50/95 backdrop-blur-sm' : 'bg-white shadow-sm'
      }`}>
        <div className="responsive-container lg:px-4">
          <nav className="flex items-center justify-center overflow-x-auto no-scrollbar py-3.5">
            <div className="flex items-center whitespace-nowrap text-[11px] lg:text-[13px] font-medium uppercase tracking-wider text-charcoal/80">
              <Link to="/" className={`px-4 hover:text-gold transition-colors ${isActive('/') ? 'text-gold' : ''}`}>Home</Link>
              <div className="h-4 w-px bg-gray-200"></div>
              
              <Link to="/shop" className={`px-4 hover:text-gold transition-colors ${isActive('/shop') ? 'text-gold' : ''}`}>Books</Link>
              <div className="h-4 w-px bg-gray-200"></div>
              
              <Link to="/categories/fiction" className={`px-4 hover:text-gold transition-colors ${isActive('/categories/fiction') ? 'text-gold' : ''}`}>Fiction</Link>
              <div className="h-4 w-px bg-gray-200"></div>
              
              <Link to="/categories/nonfiction" className={`px-4 hover:text-gold transition-colors ${isActive('/categories/nonfiction') ? 'text-gold' : ''}`}>Nonfiction</Link>
              <div className="h-4 w-px bg-gray-200"></div>
              
              <Link to="/categories/ebooks" className={`px-4 hover:text-gold transition-colors ${isActive('/categories/ebooks') ? 'text-gold' : ''}`}>eBooks</Link>
              <div className="h-4 w-px bg-gray-200"></div>
              
              <Link to="/categories/audiobooks" className={`px-4 hover:text-gold transition-colors ${isActive('/categories/audiobooks') ? 'text-gold' : ''}`}>Audiobooks</Link>
              <div className="h-4 w-px bg-gray-200"></div>
              
              <Link to="/categories/teens-ya" className={`px-4 hover:text-gold transition-colors ${isActive('/categories/teens-ya') ? 'text-gold' : ''}`}>Teens & YA</Link>
              <div className="h-4 w-px bg-gray-200"></div>
              
              <Link to="/categories/kids" className={`px-4 hover:text-gold transition-colors ${isActive('/categories/kids') ? 'text-gold' : ''}`}>Kids</Link>
              <div className="h-4 w-px bg-gray-200"></div>
              
              <Link to="/categories/business" className={`px-4 hover:text-gold transition-colors ${isActive('/categories/business') ? 'text-gold' : ''}`}>Business</Link>
              <div className="h-4 w-px bg-gray-200"></div>
              
              <Link to="/categories/technology" className={`px-4 hover:text-gold transition-colors ${isActive('/categories/technology') ? 'text-gold' : ''}`}>Technology</Link>
              <div className="h-4 w-px bg-gray-200"></div>
              
              <Link to="/categories/educational" className={`px-4 hover:text-gold transition-colors ${isActive('/categories/educational') ? 'text-gold' : ''}`}>Educational</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
