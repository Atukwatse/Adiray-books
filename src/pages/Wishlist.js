import React, { useState, useEffect } from 'react';
import { useWishlist, useCart } from '../context/AppContext';

const Wishlist = () => {
  useEffect(() => {
    document.title = "Your Reading Wishlist | Adiray Books";
  }, []);

  const { wishlist, removeFromWishlist, moveWishlistToCart } = useWishlist();
  const { addToCart } = useCart();

  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('dateAdded');

  const sortOptions = [
    { value: 'dateAdded', label: 'Date Added' },
    { value: 'title', label: 'Title' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-gold"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-gold"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-gold"></i>);
    }
    
    return stars;
  };

  const handleRemoveFromWishlist = (bookId) => {
    removeFromWishlist(bookId);
    setSelectedItems(prev => prev.filter(id => id !== bookId));
  };

  const handleSelectItem = (bookId) => {
    setSelectedItems(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === wishlist.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlist.map(book => book.id));
    }
  };

  const handleAddSelectedToCart = () => {
    moveWishlistToCart(selectedItems);
    setSelectedItems([]);
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    removeFromWishlist(book.id);
    setSelectedItems(prev => prev.filter(id => id !== book.id));
  };

  const handleShareWishlist = () => {
    console.log('Sharing wishlist');
    // Share logic would go here
    alert('Wishlist link copied to clipboard!');
  };

  // Sort wishlist
  const sortedWishlist = [...wishlist].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'dateAdded':
      default:
        return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
  });

  const totalValue = wishlist.reduce((sum, book) => sum + book.price, 0);
  const totalSavings = wishlist.reduce((sum, book) => sum + (book.originalPrice - book.price), 0);

  return (
    <div className="min-h-screen bg-white">


      {/* Wishlist Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Wishlist Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-light tracking-wide uppercase">Total Books</p>
                  <p className="text-2xl font-bold text-charcoal">{wishlist.length}</p>
                </div>
                <i className="fas fa-heart text-charcoal text-2xl"></i>
              </div>
            </div>
            
            <div className="bg-white p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-light tracking-wide uppercase">Total Value</p>
                  <p className="text-2xl font-bold text-charcoal">${totalValue.toFixed(2)}</p>
                </div>
                <i className="fas fa-tag text-charcoal text-2xl"></i>
              </div>
            </div>
            
            <div className="bg-white p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-light tracking-wide uppercase">Total Savings</p>
                  <p className="text-2xl font-bold text-green-600">${totalSavings.toFixed(2)}</p>
                </div>
                <i className="fas fa-piggy-bank text-green-600 text-2xl"></i>
              </div>
            </div>
            
            <div className="bg-white p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-light tracking-wide uppercase">In Stock</p>
                  <p className="text-2xl font-bold text-charcoal">
                    {wishlist.filter(book => book.inStock).length}
                  </p>
                </div>
                <i className="fas fa-check-circle text-charcoal text-2xl"></i>
              </div>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="bg-white p-6 mb-8 border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === wishlist.length && wishlist.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-charcoal border-gray-300 rounded-none focus:ring-charcoal"
                  />
                  <span className="text-gray-700 tracking-wide font-light">Select All ({selectedItems.length} selected)</span>
                </label>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleShareWishlist}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50 transition-colors tracking-widest text-xs font-semibold uppercase"
                >
                  <i className="fas fa-share-alt mr-2"></i>
                  Share
                </button>
                
                <button
                  onClick={() => setSelectedItems(wishlist.map(book => book.id))}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-none hover:bg-gray-50 transition-colors tracking-widest text-xs font-semibold uppercase"
                >
                  <i className="fas fa-check-square mr-2"></i>
                  Select All
                </button>
                
                <button
                  onClick={handleAddSelectedToCart}
                  disabled={selectedItems.length === 0}
                  className={`px-4 py-2 tracking-widest text-xs font-semibold uppercase transition-all duration-300 border ${
                    selectedItems.length > 0
                      ? 'bg-charcoal text-white border-charcoal hover:bg-black'
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  }`}
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Add Selected ({selectedItems.length})
                </button>
              </div>
            </div>
          </div>

          {/* Wishlist Items */}
          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-heart text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-700 mb-2 font-serif">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6 font-light tracking-wide">Start adding books you're interested in!</p>
              <a href="/shop" className="inline-block bg-white text-charcoal border border-charcoal px-6 py-3 font-semibold uppercase tracking-widest text-sm hover:bg-charcoal hover:text-white transition-all">
                Browse Books
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedWishlist.map(book => (
                <div key={book.id} className="bg-white border border-gray-100 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-lg relative">
                  {/* Selection Checkbox */}
                  <div className="absolute top-2 left-2 z-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(book.id)}
                      onChange={() => handleSelectItem(book.id)}
                      className="w-5 h-5 text-charcoal border-gray-300 rounded-none focus:ring-charcoal shadow-sm"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveFromWishlist(book.id)}
                    className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-sm text-charcoal hover:text-red-500"
                  >
                    <i className="fas fa-times"></i>
                  </button>

                  {/* Book Cover */}
                  <div className={`h-48 bg-gradient-to-br ${book.coverColor} relative`}>
                    {!book.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold uppercase tracking-widest">Out of Stock</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 text-xs font-semibold text-charcoal uppercase tracking-widest">
                      {book.category}
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="p-5 border-t border-gray-50">
                    <h3 className="font-bold text-charcoal mb-1 line-clamp-1 font-serif">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-2 font-light tracking-wide">by {book.author}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderStars(book.rating)}
                      </div>
                      <span className="text-sm text-gray-600">({book.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100 mb-3">
                      <div>
                        <span className="text-xl font-bold text-charcoal">${book.price}</span>
                        {book.originalPrice > book.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${book.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-light">{book.description}</p>

                    {/* Date Added */}
                    <p className="text-xs text-gray-400 mb-4 font-light tracking-wide uppercase">
                      Added on {new Date(book.dateAdded).toLocaleDateString()}
                    </p>

                    {/* Actions */}
                    <div className="flex space-x-2 mt-auto">
                      <button
                        onClick={() => handleAddToCart(book)}
                        disabled={!book.inStock}
                        className={`flex-1 py-2 px-3 text-xs tracking-widest font-semibold uppercase transition-all duration-300 border ${
                          book.inStock
                            ? 'bg-white text-charcoal border-charcoal hover:bg-charcoal hover:text-white'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                      >
                        <i className="fas fa-shopping-cart mr-1"></i>
                        {book.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4 font-serif">Recommended for You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light tracking-wide">
              Based on your wishlist, you might also like these books
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white border border-gray-100 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-lg">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                <div className="p-5">
                  <h3 className="font-bold text-charcoal mb-1 font-serif">Recommended Book {i}</h3>
                  <p className="text-sm text-gray-500 mb-2 font-light tracking-wide">by Author Name</p>
                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100 mb-3">
                    <span className="text-xl font-bold text-charcoal">$24.99</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <i key={star} className="fas fa-star text-gold text-xs"></i>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-white text-charcoal border border-charcoal py-2 px-3 tracking-widest text-xs font-semibold uppercase hover:bg-charcoal hover:text-white transition-all">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
