import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Shop = () => {
  const { addToCart } = useOutletContext();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Sample book data
  const sampleBooks = [
    {
      id: 1,
      title: "The Silent Algorithm",
      author: "Evelyn Reed",
      price: 24.99,
      originalPrice: 34.99,
      category: "technology",
      rating: 4.5,
      reviews: 234,
      inStock: true,
      featured: true,
      description: "A deep dive into the world of artificial intelligence and machine learning.",
      coverColor: "from-gray-200 to-gray-300"
    },
    {
      id: 2,
      title: "Digital Transformation",
      author: "Marcus Chen",
      price: 29.99,
      originalPrice: 39.99,
      category: "business",
      rating: 4.8,
      reviews: 189,
      inStock: true,
      featured: true,
      description: "Navigate the digital landscape with confidence and strategic insight.",
      coverColor: "from-gray-100 to-gray-200"
    },
    {
      id: 3,
      title: "The Mindful Leader",
      author: "Sarah Williams",
      price: 19.99,
      originalPrice: 27.99,
      category: "inspirational",
      rating: 4.6,
      reviews: 412,
      inStock: true,
      featured: false,
      description: "Transform your leadership style through mindfulness and emotional intelligence.",
      coverColor: "from-gray-200 to-gray-300"
    },
    {
      id: 4,
      title: "JavaScript Mastery",
      author: "David Park",
      price: 34.99,
      originalPrice: 44.99,
      category: "technology",
      rating: 4.7,
      reviews: 567,
      inStock: true,
      featured: true,
      description: "Complete guide to modern JavaScript development and best practices.",
      coverColor: "from-gray-100 to-gray-200"
    },
    {
      id: 5,
      title: "The Creative Mind",
      author: "Lisa Anderson",
      price: 22.99,
      originalPrice: 32.99,
      category: "inspirational",
      rating: 4.4,
      reviews: 298,
      inStock: false,
      featured: false,
      description: "Unlock your creative potential and innovative thinking.",
      coverColor: "from-gray-200 to-gray-300"
    },
    {
      id: 6,
      title: "Data Science Fundamentals",
      author: "Robert Kumar",
      price: 39.99,
      originalPrice: 49.99,
      category: "educational",
      rating: 4.9,
      reviews: 445,
      inStock: true,
      featured: true,
      description: "Essential concepts and practical applications in data science.",
      coverColor: "from-gray-100 to-gray-200"
    },
    {
      id: 7,
      title: "The Garden of Secrets",
      author: "Maria Rodriguez",
      price: 16.99,
      originalPrice: 24.99,
      category: "novels",
      rating: 4.3,
      reviews: 178,
      inStock: true,
      featured: false,
      description: "A captivating tale of mystery and discovery in a hidden garden.",
      coverColor: "from-gray-200 to-gray-300"
    },
    {
      id: 8,
      title: "Little Explorers",
      author: "Tom Johnson",
      price: 12.99,
      originalPrice: 18.99,
      category: "childrens",
      rating: 4.8,
      reviews: 523,
      inStock: true,
      featured: false,
      description: "An exciting adventure book for young readers with beautiful illustrations.",
      coverColor: "from-gray-100 to-gray-200"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'educational', label: 'Educational' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'novels', label: 'Novels' },
    { value: 'childrens', label: "Children's" },
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];

  useEffect(() => {
    // Simulate loading books
    setTimeout(() => {
      setBooks(sampleBooks);
      setFilteredBooks(sampleBooks);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter books based on search, category, and price
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
      const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (book) => {
    addToCart(book);
  };

  const handleAddToWishlist = (book) => {
    console.log('Added to wishlist:', book.title);
    // Add to wishlist logic would go here
  };

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

  return (
    <div className="min-h-screen bg-white">


      {/* Shop Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters and Search Bar */}
          <div className="bg-white p-6 mb-8 border border-gray-100 shadow-sm">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search books or authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-700">
              Showing <span className="font-semibold">{filteredBooks.length}</span> of{' '}
              <span className="font-semibold">{books.length}</span> books
            </p>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-none hover:bg-gray-50 transition-colors">
                <i className="fas fa-th-large mr-2"></i>Grid
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-none hover:bg-gray-50 transition-colors">
                <i className="fas fa-list mr-2"></i>List
              </button>
            </div>
          </div>

          {/* Books Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal"></div>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2 font-serif">No books found</h3>
              <p className="text-gray-500 font-light tracking-wide">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <div key={book.id} className="bg-white border border-gray-100 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-lg">
                  {/* Book Cover */}
                  <div className={`h-48 bg-gradient-to-br ${book.coverColor} relative`}>
                    {book.featured && (
                      <div className="absolute top-2 left-2 bg-charcoal text-white px-2 py-1 text-xs font-semibold uppercase tracking-widest">
                        Featured
                      </div>
                    )}
                    {!book.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold tracking-widest uppercase">Out of Stock</span>
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
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 font-light">{book.description}</p>

                    {/* Actions */}
                    <div className="flex space-x-2 mt-auto">
                      <button
                        onClick={() => handleAddToCart(book)}
                        disabled={!book.inStock}
                        className={`flex-1 py-2 px-3 text-xs tracking-widest font-semibold transition-all duration-300 border ${
                          book.inStock
                            ? 'bg-white text-charcoal border-charcoal hover:bg-charcoal hover:text-white'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                      >
                        <i className="fas fa-shopping-cart mr-1"></i>
                        {book.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                      </button>
                      <button
                        onClick={() => handleAddToWishlist(book)}
                        className="p-2 border border-gray-200 hover:border-charcoal hover:text-charcoal transition-colors text-gray-400"
                      >
                        <i className="far fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-charcoal text-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-serif">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90 font-light tracking-wide">
            Get the latest book recommendations and exclusive offers delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-none text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <button className="bg-gold text-charcoal hover:bg-white px-6 py-3 font-semibold transition-colors uppercase tracking-widest text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
