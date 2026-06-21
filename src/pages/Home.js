import React, { useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FilterSidebar from '../components/FilterSidebar';
import BookCard from '../components/BookCard';

const Home = () => {
  useEffect(() => {
    document.title = "Adiray Books | Elegant & Modern Online Bookstore";
  }, []);

  const {
    filteredBooks,
    addToCart,
    genres,
    selectedGenres,
    maxPrice,
    sortBy,
    handleGenreChange,
    setMaxPrice,
    setSortBy,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useOutletContext();

  // Slice exactly 8 books for the two-row homepage grid
  const booksToDisplay = (filteredBooks || []).slice(0, 8);

  return (
    <>
      <Hero />
      <main className="py-16">
        <div className="responsive-container">
          <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
            <aside className="hidden lg:block lg:w-60 xl:w-64 lg:shrink-0 lg:sticky lg:top-[200px] lg:z-30">
              <FilterSidebar
                genres={genres}
                selectedGenres={selectedGenres}
                maxPrice={maxPrice}
                sortBy={sortBy}
                onGenreChange={handleGenreChange}
                onPriceChange={setMaxPrice}
                onSortChange={setSortBy}
              />
            </aside>
            <div className="flex-grow min-w-0">
              <div className="lg:hidden mb-10 px-4">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-full h-12 flex items-center justify-center space-x-3 bg-white border border-slate-200 rounded-full shadow-sm text-charcoal font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all active:scale-95"
                >
                  <i className="fas fa-filter text-gold"></i>
                  <span>Filter Collection</span>
                </button>
              </div>
              {isMobileMenuOpen && (
                <div className="lg:hidden mb-8">
                  <FilterSidebar
                    genres={genres}
                    selectedGenres={selectedGenres}
                    maxPrice={maxPrice}
                    sortBy={sortBy}
                    onGenreChange={handleGenreChange}
                    onPriceChange={setMaxPrice}
                    onSortChange={setSortBy}
                    isMobile={true}
                    onClose={() => setIsMobileMenuOpen(false)}
                  />
                </div>
              )}
              <div id="books-section">
                {/* Featured Collections Section */}
                <div className="mb-8 flex items-end justify-between px-4 sm:px-0">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-charcoal uppercase tracking-tighter">
                      Featured <span className="text-gold">Collections</span>
                    </h2>
                    <p className="text-gray-500 font-light text-sm sm:text-base">
                      Curated masterpieces and best sellers
                    </p>
                  </div>
                </div>

                {/* Horizontal Book Scroll Section */}
                {booksToDisplay.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <i className="fas fa-search text-6xl text-gray-400 mb-4"></i>
                    <h3 className="text-2xl font-bold text-charcoal mb-2">No books found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                  </div>
                ) : (
                  <div className="mb-16">
                    {/* Refined Carousel Layout */}
                    <div className="flex overflow-x-auto snap-x-mandatory scrollbar-hide gap-6 pb-4 md:pb-8 scroll-smooth px-1">
                      {booksToDisplay.map((book, index) => (
                        <div
                          key={book.id}
                          className="flex-shrink-0 w-[280px] xs:w-[300px] sm:w-[320px] snap-start"
                        >
                          <BookCard book={book} onAddToCart={addToCart} />
                        </div>
                      ))}
                      
                      {/* View All Card at the end */}
                      <div className="flex-shrink-0 w-40 snap-start flex items-center justify-center">
                        <Link 
                          to="/shop"
                          className="group/btn flex flex-col items-center justify-center space-y-4 text-slate-300 hover:text-gold transition-colors pr-8"
                        >
                          <div className="w-14 h-14 rounded-full border border-slate-200 group-hover/btn:border-gold flex items-center justify-center transition-all bg-white shadow-sm">
                            <i className="fas fa-arrow-right text-lg group-hover/btn:translate-x-1 transition-transform"></i>
                          </div>
                          <span className="font-bold uppercase tracking-widest text-[9px]">Explore More</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Best Sellers Section */}
                <div className="mb-8 flex items-end justify-between px-4 sm:px-0">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-black text-charcoal uppercase tracking-tighter">
                      Best <span className="text-gold">Sellers</span>
                    </h2>
                    <p className="text-gray-500 font-light text-sm sm:text-base">
                      The books everyone is talking about
                    </p>
                  </div>
                </div>

                <div className="mb-16">
                  {/* Refined Carousel Layout for Best Sellers */}
                  <div className="flex overflow-x-auto snap-x-mandatory scrollbar-hide gap-6 pb-4 md:pb-8 scroll-smooth px-1">
                    {filteredBooks.filter(b => b.rating >= 4.7).slice(0, 8).map((book, index) => (
                      <div
                        key={`bestseller-${book.id}`}
                        className="flex-shrink-0 w-[280px] xs:w-[300px] sm:w-[320px] snap-start"
                      >
                        <BookCard book={book} onAddToCart={addToCart} />
                      </div>
                    ))}
                    
                    <div className="flex-shrink-0 w-40 snap-start flex items-center justify-center">
                      <Link 
                        to="/shop?sort=rating"
                        className="group/btn flex flex-col items-center justify-center space-y-4 text-slate-300 hover:text-gold transition-colors pr-8"
                      >
                        <div className="w-14 h-14 rounded-full border border-slate-200 group-hover/btn:border-gold flex items-center justify-center transition-all bg-white shadow-sm">
                          <i className="fas fa-arrow-right text-lg group-hover/btn:translate-x-1 transition-transform"></i>
                        </div>
                        <span className="font-bold uppercase tracking-widest text-[9px]">See All</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
