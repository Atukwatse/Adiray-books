import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/AppContext';

// Helper to convert completely uppercase strings to Title Case with minor words handled
const toTitleCase = (str) => {
  if (!str) return '';
  const minorWords = ['and', 'or', 'but', 'a', 'an', 'the', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'per', 'to', 'is'];
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index > 0 && minorWords.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

// Helper to format the author field nicely
const formatAuthor = (author) => {
  if (!author) return '';
  const cleanAuthor = author.replace(/^by\s+/i, '');
  return toTitleCase(cleanAuthor);
};

const BookCard = ({
  book,
  onAddToCart,
  showCheckbox = false,
  isChecked = false,
  onCheckboxChange = () => {},
  showRemove = false,
  onRemove = () => {},
  showWishlistToggle = true,
  showDateAdded = false,
  dateAdded = null
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    onAddToCart(book);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleAddToWishlist = () => {
    toggleWishlist(book);
  };

  const getGenreLabel = (genre) => {
    const activeGenre = genre || book.category || 'general';
    return toTitleCase(activeGenre);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i key={`full-${i}`} className="fas fa-star text-amber-400 text-sm"></i>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fas fa-star-half-alt text-amber-400 text-sm"></i>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating || 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="far fa-star text-amber-400 text-sm"></i>
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
      
      {/* Checkbox (Wishlist Select) */}
      {showCheckbox && (
        <div className="absolute top-3 left-3 z-20">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onCheckboxChange}
            className="w-5 h-5 text-charcoal border-gray-300 rounded focus:ring-charcoal shadow-sm cursor-pointer"
          />
        </div>
      )}

      {/* Remove Button (Wishlist Remove) */}
      {showRemove && (
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-sm rounded-full text-slate-600 hover:text-red-500"
        >
          <i className="fas fa-times text-sm"></i>
        </button>
      )}

      {/* Book Cover Area */}
      <div className="relative w-full h-56 bg-slate-50 flex-shrink-0 overflow-hidden">
        <Link to={`/book/${book.id}`} className="block w-full h-full">
          {book.cover ? (
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover hover:opacity-95 transition-opacity"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${book.coverColor || 'from-purple-500 to-pink-500'} flex items-center justify-center p-4`} />
          )}
        </Link>
        
        {/* Out of Stock Overlay */}
        {!book.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 pointer-events-none">
            <span className="text-white font-bold tracking-widest uppercase text-xs bg-black/60 px-3 py-1 rounded">
              Out of Stock
            </span>
          </div>
        )}

        {/* Featured Badge (if no checkbox) */}
        {!showCheckbox && book.featured && (
          <div className="absolute top-3 left-3 bg-[#b35900] text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm">
            Featured
          </div>
        )}
        
        {/* Genre / Category Badge */}
        <div className="absolute bottom-3 right-3 bg-white text-slate-700 text-xs font-semibold px-2.5 py-1 rounded shadow-sm pointer-events-none">
          {getGenreLabel(book.genre)}
        </div>
      </div>

      {/* Book Details Info */}
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/book/${book.id}`} className="hover:underline">
          <h3 className="font-serif font-bold text-lg text-slate-800 mb-1 line-clamp-1 hover:text-[#b35900] transition-colors">
            {toTitleCase(book.title)}
          </h3>
        </Link>
        
        <p className="text-slate-500 text-sm mb-3">
          by {formatAuthor(book.author)}
        </p>
        
        {/* Rating Stars & Count */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center space-x-0.5">
            {renderStars(book.rating)}
          </div>
          <span className="text-slate-500 text-xs font-light">
            ({book.reviews || 0})
          </span>
        </div>
        
        {/* Price Row */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold text-[#b35900]">
            ${book.price.toFixed(2)}
          </span>
          {book.originalPrice > book.price && (
            <span className="text-sm text-slate-400 line-through">
              ${book.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="text-slate-600 text-sm font-light mb-4 line-clamp-2 leading-relaxed">
          {book.description || 'A beautiful story.'}
        </p>

        {/* Date Added (Wishlist context) */}
        {showDateAdded && dateAdded && (
          <p className="text-[10px] text-slate-400 mb-4 tracking-wide uppercase font-medium">
            Added on {new Date(dateAdded).toLocaleDateString()}
          </p>
        )}
        
        {/* Actions Button Bar */}
        <div className="flex items-center space-x-2 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={!book.inStock}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              isAdded 
                ? 'bg-green-600 text-white border-green-600' 
                : !book.inStock 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-[#b35900] hover:bg-[#9c4d00] text-white shadow-sm hover:shadow'
            }`}
          >
            {isAdded ? (
              <span>Added</span>
            ) : !book.inStock ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <i className="fas fa-shopping-cart text-xs"></i>
                <span>Add to Cart</span>
              </>
            )}
          </button>
          
          {showWishlistToggle && (
            <button
              onClick={handleAddToWishlist}
              className={`w-10 h-10 flex items-center justify-center border rounded-lg transition-colors flex-shrink-0 ${
                isInWishlist(book.id)
                  ? 'border-red-200 text-red-500 bg-red-50 hover:bg-red-150'
                  : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600 bg-white'
              }`}
            >
              <i className={`${isInWishlist(book.id) ? 'fas' : 'far'} fa-heart text-base`}></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
