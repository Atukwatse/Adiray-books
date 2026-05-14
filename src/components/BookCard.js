import React, { useState } from 'react';
import StarRating from './StarRating';

const BookCard = ({ book, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(book);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
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
        <img
          src={book.cover}
          alt={book.title}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        
        {/* Genre Badge */}
        <div className="absolute top-2 right-2 bg-charcoal text-white text-xs font-semibold px-2 py-1 tracking-widest uppercase">
          {getGenreLabel(book.genre)}
        </div>
      </div>

      {/* Book Info */}
      <div className="p-5 border-t border-gray-50">
        <h3 className="font-bold text-lg text-charcoal mb-1 font-serif">
          {book.title}
        </h3>
        <p className="text-gray-500 text-sm mb-3 font-light tracking-wide">
          {book.author}
        </p>
        
        {/* Rating */}
        <div className="mb-4">
          <StarRating rating={book.rating} />
        </div>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-charcoal">
            ${book.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 font-semibold text-xs tracking-widest transition-colors duration-200 border ${
              isAdded 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white text-charcoal border-charcoal hover:bg-charcoal hover:text-white'
            }`}
          >
            {isAdded ? 'ADDED' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
