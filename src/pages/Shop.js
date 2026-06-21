import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart, useWishlist, useBooks } from '../context/AppContext';
import useDebounce from '../hooks/useDebounce';
import BookCard, { BookCardSkeleton } from '../components/BookCard';

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
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
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

  // Reset pagination batch count when search, category, or sorting filters update
  useEffect(() => {
    setVisibleCount(8);
  }, [debouncedSearchTerm, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (book) => {
    addToCart(book);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Simulate server side query latency
    setTimeout(() => {
      setVisibleCount(prev => prev + 4);
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Shop Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          


          {/* Books Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <BookCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2 font-serif">No books found</h3>
              <p className="text-gray-500 font-light tracking-wide">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.slice(0, visibleCount).map(book => (
                  <div key={book.id}>
                    <BookCard book={book} onAddToCart={handleAddToCart} />
                  </div>
                ))}
                {isLoadingMore && (
                  <>
                    <BookCardSkeleton />
                    <BookCardSkeleton />
                    <BookCardSkeleton />
                    <BookCardSkeleton />
                  </>
                )}
              </div>

              {/* Load More Button System */}
              <div className="flex flex-col items-center justify-center mt-12 mb-4">
                {visibleCount < filteredBooks.length ? (
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="btn-primary py-3.5 px-10 text-xs sm:text-sm tracking-widest uppercase font-semibold transition-all hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                  >
                    {isLoadingMore ? (
                      <span className="flex items-center justify-center">
                        <i className="fas fa-spinner animate-spin mr-2"></i>
                        Loading...
                      </span>
                    ) : (
                      'Load More'
                    )}
                  </button>
                ) : filteredBooks.length > 0 ? (
                  <p className="text-gray-500 font-light italic tracking-wider text-sm">
                    You've viewed all products.
                  </p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
