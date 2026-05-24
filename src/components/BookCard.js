import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/AppContext';
import StarRating from './StarRating';

const BookCard = ({ book, onAddToCart }) => {
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
    const genreMap = {
      'tech': 'BUSINESS',
      'business': 'BUSINESS',
      'fiction': 'FICTION',
      'psychology': 'PSYCHOLOGY',
      'history': 'BIOGRAPHY'
    };
    return genreMap[genre] || genre.toUpperCase();
  };

  return (
    <div className="bg-white border border-gray-100 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-lg">
      {/* Book Cover */}
      <div className="relative">
        <Link to={`/book/${book.id}`} className="block">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
            loading="lazy"
          />
        </Link>
        
        {/* Genre Badge */}
        <div className="absolute top-2 right-2 bg-charcoal text-white text-xs font-semibold px-2 py-1 tracking-widest uppercase">
          {getGenreLabel(book.genre)}
        </div>
      </div>

      {/* Book Info */}
      <div className="p-5 border-t border-gray-50">
        <Link to={`/book/${book.id}`}>
          <h3 className="font-bold text-lg text-charcoal mb-1 font-serif hover:text-gold transition-colors line-clamp-1">
            {book.title}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-3 font-light tracking-wide">
          {book.author}
        </p>
        
        {/* Rating */}
        <div className="mb-4">
          <StarRating rating={book.rating} />
        </div>
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-black">
            ${book.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAddToCart}
              className={`px-3 py-1 font-semibold text-[10px] tracking-widest transition-colors duration-200 border flex flex-col items-center justify-center leading-tight min-w-[80px] h-[34px] ${
                isAdded 
                  ? 'bg-green-500 text-white border-green-500' 
                  : 'bg-white text-charcoal border-charcoal hover:bg-charcoal hover:text-white'
              }`}
            >
              {isAdded ? (
                <span>ADDED</span>
              ) : (
                <>
                  <span>ADD TO</span>
                  <span>CART</span>
                </>
              )}
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`p-2 border transition-colors ${
                isInWishlist(book.id)
                  ? 'border-red-200 text-red-500 bg-red-50 hover:bg-red-100'
                  : 'border-gray-200 text-gray-400 hover:border-charcoal hover:text-charcoal'
              }`}
              style={{ height: '34px', width: '34px', display: 'flex', itemsCenter: 'center', justifyContent: 'center' }}
            >
              <i className={`${isInWishlist(book.id) ? 'fas' : 'far'} fa-heart`}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
