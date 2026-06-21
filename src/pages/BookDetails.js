import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart, useWishlist, useBooks } from '../context/AppContext';
import StarRating from '../components/StarRating';
import BookCard from '../components/BookCard';
import { getBookCover, handleBookCoverError } from '../utils/coverGenerator';
import { PROJECT_PHONE, PROJECT_PHONE_CLEAN, WHATSAPP_CONFIG } from '../utils/constants';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { books } = useBooks();

  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {
    // Find the book from our master dataset
    const matchedBook = books.find(b => b.id === parseInt(id));
    if (matchedBook) {
      setBook(matchedBook);
      setQuantity(1);
      setIsAddedToCart(false);
      document.title = `${matchedBook.title} by ${matchedBook.author} | Adiray Books`;

      // Filter similar books of same genre
      const filtered = books.filter(b => b.category === matchedBook.category && b.id !== matchedBook.id);
      setSimilarBooks(filtered.slice(0, 4));
    } else {
      // Fallback redirect if book not found
      navigate('/shop');
    }
  }, [id, navigate, books]);

  if (!book) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(WHATSAPP_CONFIG.defaultMessage(book.title, book.author));

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-8 flex items-center space-x-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold transition-colors">Books</Link>
          <span>/</span>
          <span className="text-charcoal font-semibold">{book.category}</span>
        </div>

        {/* Product Panel */}
        <div className="flex flex-col lg:flex-row gap-16 mb-16">
          {/* Left Column: Image/Cover */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[2/3] shadow-2xl flex items-center justify-center border border-gray-100 hover:scale-[1.01] transition-transform duration-300 rounded-2xl overflow-hidden bg-slate-50">
              <img
                src={getBookCover(book)}
                alt={book.title}
                className="w-full h-full object-cover"
                onError={handleBookCoverError}
              />
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <span className="text-xs text-gold font-bold tracking-widest uppercase mb-2">
              {book.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal mb-4 uppercase leading-tight">
              {book.title}
            </h1>
            <p className="text-lg text-gray-500 font-light tracking-wide mb-6">
              by <span className="text-charcoal font-semibold">{book.author}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-4 pb-6 border-b border-gray-100 mb-6">
              <StarRating rating={book.rating} />
              <span className="text-sm text-gray-500">
                ({book.reviews} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-4 mb-8">
              <span className="text-3xl font-bold text-charcoal">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice > book.price && (
                <span className="text-lg text-gray-400 line-through font-light">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
              {book.originalPrice > book.price && (
                <span className="text-xs bg-gold text-charcoal px-2.5 py-1 font-bold tracking-wider uppercase">
                  Save ${(book.originalPrice - book.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description Short */}
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              {book.description}
            </p>

            {/* Add to Cart & Wishlist */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex flex-1 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-14 font-bold uppercase tracking-widest transition-all duration-300 rounded-full flex items-center justify-center space-x-3 shadow-md hover:shadow-lg active:scale-[0.98] ${
                    isAddedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-gold text-white hover:bg-orange-700 shadow-orange-900/10'
                  }`}
                >
                  <i className={`fas ${isAddedToCart ? 'fa-check' : 'fa-shopping-cart'} text-lg`}></i>
                  <span>{isAddedToCart ? 'Added!' : 'Add to Cart'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(book)}
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-sm border ${
                    isInWishlist(book.id)
                      ? 'bg-red-50 text-red-500 border-red-100'
                      : 'bg-white text-gray-400 border-gray-100 hover:bg-red-50 hover:text-red-400 hover:border-red-100'
                  }`}
                  aria-label={isInWishlist(book.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <i className={`${isInWishlist(book.id) ? 'fas' : 'far'} fa-heart text-2xl`}></i>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <a
                href={`tel:${PROJECT_PHONE}`}
                className="h-12 border border-gray-200 hover:border-gold hover:bg-[#FFFDF7] text-charcoal flex items-center justify-center gap-3 font-semibold uppercase tracking-widest text-xs transition-colors"
              >
                <i className="fas fa-phone text-xl text-gold"></i>
                <span>Call Seller</span>
              </a>
              <a
                href={`https://wa.me/${PROJECT_PHONE_CLEAN}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="h-12 border border-gray-200 hover:border-green-600 hover:bg-green-50 text-charcoal flex items-center justify-center gap-3 font-semibold uppercase tracking-widest text-xs transition-colors"
              >
                <i className="fab fa-whatsapp text-2xl text-green-600"></i>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Means of Delivery */}
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-sm font-bold text-charcoal uppercase tracking-widest mb-4 font-serif">Means of Delivery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:border-gold transition-colors">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-gold flex-shrink-0">
                    <i className="fas fa-motorcycle"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">Home Delivery</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Juba Area • $2.00 • Same Day</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:border-gold transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <i className="fas fa-truck-fast"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">State Delivery</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Outside Juba • $10.00 • 2-4 Days</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:border-gold transition-colors">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                    <i className="fas fa-store"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">Store Pickup</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide">Juba Town • Free • Immediate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specs Panel */}
        <div className="mb-20">
          <div className="border-b border-gray-100 flex space-x-8 mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm font-semibold uppercase tracking-widest border-b-2 transition-all ${
                activeTab === 'description'
                  ? 'border-gold text-charcoal'
                  : 'border-transparent text-gray-400 hover:text-charcoal'
              }`}
            >
              Full Description
            </button>
            
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm font-semibold uppercase tracking-widest border-b-2 transition-all ${
                activeTab === 'specs'
                  ? 'border-gold text-charcoal'
                  : 'border-transparent text-gray-400 hover:text-charcoal'
              }`}
            >
              Product Details
            </button>
          </div>

          <div className="text-gray-600 font-light leading-relaxed max-w-4xl">
            {activeTab === 'description' ? (
              <div className="space-y-4">
                <p>{book.description}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 border border-gray-100 p-6 bg-gray-50 max-w-2xl text-sm">
                <span className="font-semibold text-charcoal">Publisher</span>
                <span>{book.publisher}</span>
                
                <span className="font-semibold text-charcoal">Publication Date</span>
                <span>{book.publishedDate}</span>
                
                <span className="font-semibold text-charcoal">Page Count</span>
                <span>{book.pages} pages</span>
                
                <span className="font-semibold text-charcoal">ISBN</span>
                <span className="font-mono">{book.isbn}</span>

                <span className="font-semibold text-charcoal">Genre Category</span>
                <span className="uppercase tracking-widest text-xs font-semibold text-gold">{book.category}</span>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Books Section */}
        {similarBooks.length > 0 && (
          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-3xl font-bold font-serif text-charcoal mb-10 text-center uppercase tracking-tight">
              Related Masterpieces
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarBooks.map(item => (
                <div key={item.id}>
                  <BookCard book={item} onAddToCart={() => addToCart(item)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
