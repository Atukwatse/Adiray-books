import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart, useWishlist, useBooks } from '../context/AppContext';
import StarRating from '../components/StarRating';
import BookCard from '../components/BookCard';
import { getBookCover, handleBookCoverError } from '../utils/coverGenerator';



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
  const sellerPhone = '+256744219162';

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

  const whatsappMessage = encodeURIComponent(`Hi Adiray Books, I want to buy "${book.title}" by ${book.author}.`);

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

              {/* Wishlist Icon Overlay */}
              <button
                onClick={() => toggleWishlist(book)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 border z-10 ${
                  isInWishlist(book.id)
                    ? 'border-red-100 text-red-500'
                    : 'border-gray-100 text-gray-400 hover:text-charcoal'
                }`}
              >
                <i className={`${isInWishlist(book.id) ? 'fas' : 'far'} fa-heart text-lg`}></i>
              </button>
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

            {/* Quantity Selector & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-gray-200 h-14 w-32 justify-between">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 text-gray-500 hover:text-charcoal hover:bg-gray-50 transition-colors h-full flex items-center justify-center font-bold text-lg"
                >
                  -
                </button>
                <span className="text-charcoal font-semibold text-base w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-4 py-2 text-gray-500 hover:text-charcoal hover:bg-gray-50 transition-colors h-full flex items-center justify-center font-bold text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 h-14 font-semibold uppercase tracking-widest transition-all duration-300 border flex items-center justify-center space-x-2 ${
                  isAddedToCart
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-charcoal text-white border-charcoal hover:bg-gold hover:text-charcoal'
                }`}
              >
                <i className={`fas ${isAddedToCart ? 'fa-check' : 'fa-shopping-bag'} text-sm`}></i>
                <span>{isAddedToCart ? 'Added to Cart!' : 'Add to Shopping Bag'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <a
                href={`tel:${sellerPhone}`}
                className="h-12 border border-gray-200 hover:border-gold hover:bg-[#FFFDF7] text-charcoal flex items-center justify-center gap-3 font-semibold uppercase tracking-widest text-xs transition-colors"
              >
                <i className="fas fa-phone text-xl text-gold"></i>
                <span>Call Seller</span>
              </a>
              <a
                href={`https://wa.me/${sellerPhone.replace('+', '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="h-12 border border-gray-200 hover:border-green-600 hover:bg-green-50 text-charcoal flex items-center justify-center gap-3 font-semibold uppercase tracking-widest text-xs transition-colors"
              >
                <i className="fab fa-whatsapp text-2xl text-green-600"></i>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Delivery Guarantees */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100 text-sm">
              <div className="flex items-start space-x-3">
                <i className="fas fa-truck text-gold mt-1"></i>
                <div>
                  <h4 className="font-semibold text-charcoal font-serif">Free Shipping</h4>
                  <p className="text-xs text-gray-500 font-light mt-0.5">Complimentary delivery over $50</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <i className="fas fa-undo text-gold mt-1"></i>
                <div>
                  <h4 className="font-semibold text-charcoal font-serif">Easy Return Policy</h4>
                  <p className="text-xs text-gray-500 font-light mt-0.5">30-day money-back assurance</p>
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
                <p>Curated and printed on premium acid-free cream paper, ensuring a luxury archival presence in your reading collection. Bound in clean tactile hardcover with refined aesthetic geometry designed to wow on any shelf layout.</p>
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
