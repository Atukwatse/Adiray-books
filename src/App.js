import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { AppProvider, useCart, useAuth, useBooks } from './context/AppContext';
import useDebounce from './hooks/useDebounce';
import Splash from './components/Splash';
import Admin from './pages/Admin';
import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Cart from './pages/Cart';
import BookDetails from './pages/BookDetails';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Educational from './pages/categories/Educational';
import Inspirational from './pages/categories/Inspirational';
import Novels from './pages/categories/Novels';
import Childrens from './pages/categories/Childrens';
import Business from './pages/categories/Business';
import Technology from './pages/categories/Technology';
import Fiction from './pages/categories/Fiction';
import Nonfiction from './pages/categories/Nonfiction';
import EBooks from './pages/categories/EBooks';
import Audiobooks from './pages/categories/Audiobooks';
import TeensYA from './pages/categories/TeensYA';

// Sample book data matching the image design
const booksData = [
  {
    id: 1,
    title: "THE SILENT ALGORITHM",
    author: "EVELYN REED",
    price: 24.99,
    genre: "tech",
    rating: 4.5,
    cover: "https://picsum.photos/seed/silent-algorithm/280/400.jpg",
    featured: true
  },
  {
    id: 2,
    title: "QUANTUM HORIZONS",
    author: "DR. MICHAEL CHEN",
    price: 29.99,
    genre: "tech",
    rating: 4.8,
    cover: "https://picsum.photos/seed/quantum-horizons/280/400.jpg",
    featured: true
  },
  {
    id: 3,
    title: "THE MIDNIGHT GARDEN",
    author: "EMMA WILLIAMS",
    price: 19.99,
    genre: "fiction",
    rating: 4.2,
    cover: "https://picsum.photos/seed/midnight-garden/280/400.jpg",
    featured: false
  },
  {
    id: 4,
    title: "BUSINESS MASTERY",
    author: "ROBERT ANDERSON",
    price: 34.99,
    genre: "business",
    rating: 4.6,
    cover: "https://picsum.photos/seed/business-mastery/280/400.jpg",
    featured: true
  },
  {
    id: 5,
    title: "ANCIENT WISDOM",
    author: "LISA MARTINEZ",
    price: 22.50,
    genre: "history",
    rating: 4.3,
    cover: "https://picsum.photos/seed/ancient-wisdom/280/400.jpg",
    featured: false
  },
  {
    id: 6,
    title: "MINDFUL LEADERSHIP",
    author: "DAVID THOMPSON",
    price: 27.99,
    genre: "business",
    rating: 4.7,
    cover: "https://picsum.photos/seed/mindful-leadership/280/400.jpg",
    featured: true
  },
  {
    id: 7,
    title: "ART OF CODE",
    author: "SOPHIE LAURENT",
    price: 31.99,
    genre: "tech",
    rating: 4.4,
    cover: "https://picsum.photos/seed/art-of-code/280/400.jpg",
    featured: false
  },
  {
    id: 8,
    title: "PSYCHOLOGY TODAY",
    author: "DR. JAMES WILSON",
    price: 26.99,
    genre: "psychology",
    rating: 4.5,
    cover: "https://picsum.photos/seed/psychology-today/280/400.jpg",
    featured: true
  }
];

const genres = [
  { id: 'fiction', label: 'Fiction' },
  { id: 'technology', label: 'Technology' },
  { id: 'finance', label: 'Finance' },
  { id: 'biography', label: 'Biography' }
];

// MainLayout Component with all the global state and layout wrapper
function MainLayout() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  
  // Use Centralized Cart Context
  const { 
    cart, 
    cartCount, 
    cartTotal, 
    addToCart: ctxAddToCart, 
    removeFromCart: ctxRemoveFromCart, 
    updateCartQuantity: ctxUpdateCartQuantity 
  } = useCart();

  const { books } = useBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debounce the search input by 300ms
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortBy, setSortBy] = useState('featured');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Keep filteredBooks in sync when books catalog updates or filters change
  useEffect(() => {
    let filtered = books.filter(book => {
      const bookGenre = (book.genre || book.category || '').toLowerCase();
      const matchesSearch = debouncedSearchTerm === '' || 
        book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        bookGenre.includes(debouncedSearchTerm.toLowerCase());
      
      const matchesGenre = selectedGenres.length === 0 || 
        selectedGenres.some(g => g.toLowerCase() === bookGenre);
      const matchesPrice = book.price <= maxPrice;
      
      return matchesSearch && matchesGenre && matchesPrice;
    });

    // Sort books
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    setFilteredBooks(filtered);
  }, [debouncedSearchTerm, selectedGenres, maxPrice, sortBy, books]);

  // Cart functionality wrapped with notification triggers
  const addToCart = (book) => {
    ctxAddToCart(book);
    showNotification(`${book.title} added to cart!`);
  };

  const updateCartQuantity = (bookId, quantity) => {
    ctxUpdateCartQuantity(bookId, quantity);
  };

  const removeFromCart = (bookId) => {
    ctxRemoveFromCart(bookId);
    showNotification('Item removed from cart');
  };

  const getCartCount = () => cartCount;
  const getCartTotal = () => cartTotal;

  // Notification system
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Genre filter handlers
  const handleGenreChange = (genreId) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  // Search handlers
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  // Mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Splash page completion handler
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {/* Splash Page */}
      {showSplash && <Splash onComplete={handleSplashComplete} />}
      
      {/* Main App */}
      {!showSplash && (
        <div className="min-h-screen bg-white flex flex-col">
          <Header
            cartCount={getCartCount()}
            cartTotal={getCartTotal()}
            onSearchOpen={openSearch}
            onCartClick={() => navigate('/cart')}
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuToggle={toggleMobileMenu}
          />

          {/* Search Overlay */}
          {isSearchOpen && (
            <div className="fixed inset-0 bg-charcoal bg-opacity-95 z-50 flex items-center justify-center">
              <div className="relative w-full max-w-2xl px-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for books, authors, or genres..."
                  className="w-full px-6 py-4 text-lg bg-transparent border-b-2 border-mustard text-white placeholder-gray-400 outline-none"
                  autoFocus
                />
                <button
                  onClick={closeSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-mustard transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          )}

          <div className="flex-grow">
            <Outlet context={{
              filteredBooks,
              addToCart,
              updateCartQuantity,
              removeFromCart,
              genres,
              selectedGenres,
              maxPrice,
              sortBy,
              handleGenreChange,
              setMaxPrice,
              setSortBy,
              isMobileMenuOpen,
              setIsMobileMenuOpen,
              cart
            }} />
          </div>

          <Footer />

          {/* Notification */}
          {notification && (
            <Notification message={notification} />
          )}
        </div>
      )}
    </>
  );
}

// Main App component
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/categories/educational" element={<Educational />} />
            <Route path="/categories/inspirational" element={<Inspirational />} />
            <Route path="/categories/novels" element={<Novels />} />
            <Route path="/categories/childrens" element={<Childrens />} />
            <Route path="/categories/business" element={<Business />} />
            <Route path="/categories/technology" element={<Technology />} />
            <Route path="/categories/fiction" element={<Fiction />} />
            <Route path="/categories/nonfiction" element={<Nonfiction />} />
            <Route path="/categories/ebooks" element={<EBooks />} />
            <Route path="/categories/audiobooks" element={<Audiobooks />} />
            <Route path="/categories/teens-ya" element={<TeensYA />} />
            <Route path="/categories/kids" element={<Childrens />} />
          </Route>
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
