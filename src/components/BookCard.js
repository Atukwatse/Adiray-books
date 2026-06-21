import React from 'react';
import { Link } from 'react-router-dom';
import { useCart, useWishlist } from '../context/AppContext';
import { toTitleCase, formatAuthor, getBookCover, handleBookCoverError } from '../utils/coverGenerator';

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
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { cart, addToCart, updateCartQuantity, removeFromCart } = useCart();
  const cartItem = cart.find(item => item.id === book.id);
  const cartQuantity = cartItem?.quantity || 0;
  const sellerPhone = '+256744219162';
  const whatsappMessage = encodeURIComponent(`Hi Adiray Books, I want to buy "${book.title}" by ${book.author}.`);

  const handleAddToCart = () => {
    if (!book.inStock) return;

    if (onAddToCart) {
      onAddToCart(book);
    } else {
      addToCart(book);
    }
  };

  const handleDecreaseCartQuantity = () => {
    if (cartQuantity <= 1) {
      removeFromCart(book.id);
      return;
    }

    updateCartQuantity(book.id, cartQuantity - 1);
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
        <i key={`full-${i}`} className="fas fa-star text-gold text-sm"></i>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fas fa-star-half-alt text-gold text-sm"></i>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating || 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="far fa-star text-gold text-sm"></i>
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
          <img
            src={getBookCover(book)}
            alt={book.title}
            className="w-full h-full object-cover hover:opacity-95 transition-opacity"
            loading="lazy"
            onError={handleBookCoverError}
          />
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
          <div className="absolute top-3 left-3 bg-gold text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm">
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
        {/* Content Link */}
        <Link to={`/book/${book.id}`} className="flex flex-col flex-grow group">
          <h3 className="font-serif font-bold text-lg text-slate-800 mb-1 line-clamp-1 group-hover:text-gold transition-colors">
            {toTitleCase(book.title)}
          </h3>
          
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
            <span className="text-xl font-bold text-gold">
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
        </Link>

        {/* Date Added (Wishlist context) */}
        {showDateAdded && dateAdded && (
          <p className="text-[10px] text-slate-400 mb-4 tracking-wide uppercase font-medium">
            Added on {new Date(dateAdded).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export const BookCardSkeleton = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm flex flex-col h-full relative min-h-[420px]">
      {/* Book Cover Area Placeholder */}
      <div className="relative w-full h-56 skeleton-block flex-shrink-0"></div>
      
      {/* Book Details Info Placeholder */}
      <div className="p-5 flex flex-col flex-grow space-y-4">
        {/* Title */}
        <div className="skeleton-block w-3/4 h-5 rounded"></div>
        {/* Author */}
        <div className="skeleton-block w-1/2 h-4 rounded"></div>
        {/* Rating */}
        <div className="skeleton-block w-1/3 h-3 rounded"></div>
        {/* Price */}
        <div className="skeleton-block w-1/4 h-6 rounded mt-2"></div>
        {/* Description lines */}
        <div className="space-y-2 mt-2 flex-grow">
          <div className="skeleton-block w-full h-3 rounded"></div>
          <div className="skeleton-block w-5/6 h-3 rounded"></div>
        </div>
        {/* Actions Button Bar */}
        <div className="flex items-center space-x-2 mt-auto pt-4">
          <div className="skeleton-block flex-grow h-10 rounded-lg"></div>
          <div className="skeleton-block w-10 h-10 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
