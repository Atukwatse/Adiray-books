import React, { useState } from 'react';

const FilterSidebar = ({ 
  genres, 
  selectedGenres, 
  maxPrice, 
  sortBy, 
  onGenreChange, 
  onPriceChange, 
  onSortChange,
  isMobile = false,
  onClose = null
}) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating === selectedRating ? 0 : rating);
  };

  const renderStars = (rating, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && handleRatingClick(star)}
            className={`text-xl transition-colors duration-200 ${
              interactive ? 'cursor-pointer hover:text-yellow-400' : 'cursor-default'
            }`}
          >
            <i className={`fas fa-star ${
              star <= rating ? 'text-gold' : 'text-gray-300'
            }`}></i>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${
      !isMobile ? 'z-10 transition-all duration-300' : ''
    }`}>
      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-charcoal">Filters</h3>
          <button
            onClick={onClose}
            className="text-charcoal hover:text-gold transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
      )}

      {/* Genre Filter */}
      <div className="mb-8">
        <h3 className="text-xs font-black text-charcoal mb-5 uppercase tracking-[0.2em] flex items-center">
          <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
          Genre
        </h3>
        <ul className="space-y-2.5">
          {genres.map((genre) => (
            <li key={genre.id}>
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => onGenreChange(genre.id)}
                  className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold focus:ring-2"
                />
                <span className="ml-3 text-sm text-gray-600 group-hover:text-gold transition-colors duration-200 font-medium">
                  {genre.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Type / Format Filter (Placeholder) */}
      <div className="mb-8">
        <h3 className="text-xs font-black text-charcoal mb-5 uppercase tracking-[0.2em] flex items-center">
          <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
          Format
        </h3>
        <ul className="space-y-2.5">
          {['Paperback', 'Hardcover', 'E-Book', 'Audiobook'].map((type) => (
            <li key={type}>
              <label className="flex items-center cursor-pointer group opacity-60">
                <input
                  type="checkbox"
                  disabled
                  className="w-4 h-4 text-gray-300 border-gray-300 rounded cursor-not-allowed"
                />
                <span className="ml-3 text-sm text-gray-600 font-medium">{type}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Feature Filter */}
      <div className="mb-8">
        <h3 className="text-xs font-black text-charcoal mb-5 uppercase tracking-[0.2em] flex items-center">
          <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
          Features
        </h3>
        <ul className="space-y-2.5">
          <li>
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={sortBy === 'featured'}
                onChange={() => onSortChange(sortBy === 'featured' ? 'newest' : 'featured')}
                className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold focus:ring-2"
              />
              <span className="ml-3 text-sm text-gray-600 group-hover:text-gold transition-colors duration-200 font-medium">Featured Items</span>
            </label>
          </li>
          <li>
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold focus:ring-2"
              />
              <span className="ml-3 text-sm text-gray-600 group-hover:text-gold transition-colors duration-200 font-medium">Search In Stock</span>
            </label>
          </li>
        </ul>
      </div>

      {/* Rating Filter */}
      <div className="mb-8">
        <h3 className="text-xs font-black text-charcoal mb-5 uppercase tracking-[0.2em] flex items-center">
          <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></span>
          Rating
        </h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center justify-between group cursor-pointer" onClick={() => handleRatingClick(rating)}>
              <span className={`text-xs ${selectedRating === rating ? 'text-gold font-bold' : 'text-gray-500'} group-hover:text-gold transition-colors`}>
                {rating} Stars & Up
              </span>
              {renderStars(rating, true)}
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="text-lg font-bold text-charcoal mb-4">SORT BY</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="title">Title: A-Z</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Clear Filters Button for Mobile */}
      {isMobile && (
        <button
          onClick={() => {
            // Clear all filters
            genres.forEach(genre => {
              if (selectedGenres.includes(genre.id)) {
                onGenreChange(genre.id);
              }
            });
            onPriceChange(100);
            onSortChange('featured');
            setSelectedRating(0);
            onClose();
          }}
          className="w-full mt-6 bg-gray-200 text-charcoal px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
