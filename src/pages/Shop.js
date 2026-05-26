import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart, useWishlist, useBooks } from '../context/AppContext';
import useDebounce from '../hooks/useDebounce';
import BookCard from '../components/BookCard';

const Shop = () => {
  useEffect(() => {
    document.title = "Browse Masterpieces & Best Sellers | Adiray Books";
  }, []);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { books: dynamicBooks } = useBooks();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debounce the search input by 300ms
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [searchParams]);



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
    setBooks(dynamicBooks);
    setFilteredBooks(dynamicBooks);
    setLoading(false);
  }, [dynamicBooks]);

  useEffect(() => {
    // Filter books based on search, category, and price
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
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
  }, [books, debouncedSearchTerm, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (book) => {
    addToCart(book);
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
                <div key={book.id}>
                  <BookCard book={book} onAddToCart={handleAddToCart} />
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
