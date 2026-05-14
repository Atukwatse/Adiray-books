import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = ({ 
  cartCount, 
  cartTotal, 
  onSearchOpen, 
  onCartClick, 
  isMobileMenuOpen, 
  onMobileMenuToggle 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

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

  const handleLogin = () => {
    navigate('/login');
    setIsAuthDropdownOpen(false);
  };

  const handleRegister = () => {
    navigate('/register');
    setIsAuthDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setIsAuthDropdownOpen(false);
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
    setIsAuthDropdownOpen(false);
  };

  const handleOrders = () => {
    navigate('/orders');
    setIsAuthDropdownOpen(false);
  };

  const subNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/shop' },
    { name: 'Fiction', path: '/shop' },
    { name: 'Nonfiction', path: '/shop' },
    { name: 'eBooks', path: '/shop' },
    { name: 'Audiobooks', path: '/shop' },
    { name: 'Teens & YA', path: '/shop' },
    { name: 'Kids', path: '/shop' },
    { name: 'Business', path: '/shop' },
    { name: 'Technology', path: '/shop' },
    { name: 'Educational', path: '/shop' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery, 'in category:', searchCategory);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex flex-col w-full shadow-sm bg-white font-sans">
      
      {/* Top Mini-Bar */}
      <div className="bg-gray-50 text-gray-500 text-[10px] sm:text-xs tracking-widest uppercase py-2 hidden lg:block border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center divide-x divide-gray-300">
            <span className="pr-4 hover:text-charcoal cursor-pointer transition-colors flex items-center">
              <i className="fas fa-map-marker-alt mr-1.5"></i> Stores & Events
            </span>
            <span className="px-4 hover:text-charcoal cursor-pointer transition-colors">Membership</span>
            <span className="px-4 hover:text-charcoal cursor-pointer transition-colors">Blog</span>
            <span className="px-4 hover:text-charcoal cursor-pointer transition-colors">Gift Cards</span>
          </div>
          <div className="flex items-center divide-x divide-gray-300">
            <Link to="/about" className="pr-4 hover:text-charcoal transition-colors">About Us</Link>
            <Link to="/contact" className="px-4 hover:text-charcoal transition-colors">Contact</Link>
            
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
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl z-50 normal-case tracking-normal">
                  {isAuthenticated ? (
                    <div>
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <p className="text-sm font-bold text-charcoal">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      <div className="py-2">
                        <button onClick={handleProfile} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-charcoal transition-colors">My Profile</button>
                        <button onClick={handleOrders} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-charcoal transition-colors">Order History</button>
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">Sign Out</button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <button onClick={handleLogin} className="w-full bg-charcoal text-white py-2 text-sm font-semibold uppercase tracking-widest hover:bg-black transition-colors mb-3">Sign In</button>
                      <button onClick={handleRegister} className="w-full border border-charcoal text-charcoal py-2 text-sm font-semibold uppercase tracking-widest hover:bg-charcoal hover:text-white transition-colors">Create Account</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <Link to="/wishlist" className="pl-4 hover:text-charcoal transition-colors flex items-center">
              <i className="far fa-heart mr-1.5"></i> Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="bg-white text-charcoal border-b border-gray-200 relative z-30">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 bg-charcoal flex items-center justify-center">
              <span className="text-white font-bold text-lg font-serif">AB</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-charcoal font-serif tracking-tight uppercase">
              Adiray <span className="text-gold font-light">&</span> Books
            </h1>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-3xl mx-8 relative">
            <form onSubmit={handleSearch} className="w-full flex border border-gray-300 focus-within:border-charcoal focus-within:ring-1 focus-within:ring-charcoal transition-all">
              {/* Category Dropdown inside search */}
              <select 
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="bg-gray-50 border-r border-gray-300 text-gray-600 text-sm px-3 py-2 outline-none cursor-pointer hidden lg:block"
              >
                <option value="All">All</option>
                <option value="Books">Books</option>
                <option value="eBooks">eBooks</option>
                <option value="Audiobooks">Audiobooks</option>
              </select>
              
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
          <div className="flex items-center space-x-6 shrink-0">
            
            {/* Mobile Search Toggle */}
            <button className="md:hidden text-charcoal hover:text-gold transition-colors">
              <i className="fas fa-search text-xl"></i>
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onCartClick}
              className="relative text-charcoal hover:text-gold transition-colors duration-200 group flex items-center"
            >
              <i className="fas fa-shopping-bag text-2xl group-hover:scale-105 transition-transform"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gold text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden text-charcoal hover:text-gold transition-colors duration-200"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Category Sub-Bar */}
      <div className="bg-white border-b border-gray-200 py-3 hidden lg:block shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-center">
            <div className="flex items-center divide-x divide-gray-300">
              {subNavLinks.map((cat, idx) => (
                <Link 
                  key={cat.name} 
                  to={cat.path} 
                  className={`px-4 xl:px-5 text-[15px] font-serif text-charcoal hover:text-gold transition-colors whitespace-nowrap ${idx === 0 ? 'pl-0' : ''} ${idx === subNavLinks.length - 1 ? 'pr-0' : ''}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 absolute top-full left-0 w-full z-50 shadow-xl">
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
            {subNavLinks.map((cat) => (
              <Link 
                key={cat.name} 
                to={cat.path} 
                className="block px-6 py-3 text-charcoal hover:bg-gray-50 hover:text-gold font-serif border-b border-gray-50 last:border-0"
                onClick={onMobileMenuToggle}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Mobile Auth / Utility Links */}
          <div className="border-t border-gray-200 bg-gray-50 py-4 px-6 space-y-4">
             {isAuthenticated ? (
               <>
                 <p className="text-sm font-bold text-charcoal mb-2">Hi, {user?.firstName}</p>
                 <button onClick={() => { handleProfile(); onMobileMenuToggle(); }} className="block w-full text-left text-sm text-gray-600 hover:text-charcoal"><i className="far fa-user w-5"></i> My Profile</button>
                 <button onClick={() => { handleOrders(); onMobileMenuToggle(); }} className="block w-full text-left text-sm text-gray-600 hover:text-charcoal"><i className="fas fa-box w-5"></i> Order History</button>
                 <Link to="/wishlist" onClick={onMobileMenuToggle} className="block w-full text-left text-sm text-gray-600 hover:text-charcoal"><i className="far fa-heart w-5"></i> Wishlist</Link>
                 <button onClick={() => { handleLogout(); onMobileMenuToggle(); }} className="block w-full text-left text-sm text-red-600 mt-4"><i className="fas fa-sign-out-alt w-5"></i> Sign Out</button>
               </>
             ) : (
               <>
                 <button onClick={() => { handleLogin(); onMobileMenuToggle(); }} className="w-full bg-charcoal text-white py-2 text-sm font-semibold uppercase tracking-widest">Sign In</button>
                 <button onClick={() => { handleRegister(); onMobileMenuToggle(); }} className="w-full border border-charcoal text-charcoal py-2 text-sm font-semibold uppercase tracking-widest">Create Account</button>
               </>
             )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
