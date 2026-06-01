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
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="btn-secondary w-full"
                >
                  <i className="fas fa-filter mr-2"></i>
                  Filters
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
                {/* Section Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-charcoal mb-2 font-serif">
                    Featured Collections
                  </h2>
                  <p className="text-gray-600 font-light">
                    Curated masterpieces and best sellers
                  </p>
                </div>

                {/* Book Grid */}
                {booksToDisplay.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="fas fa-search text-6xl text-gray-400 mb-4"></i>
                    <h3 className="text-2xl font-bold text-charcoal mb-2">No books found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search terms.</p>
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {booksToDisplay.map((book, index) => (
                        <div
                          key={book.id}
                          className="animate-fade-in-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <BookCard book={book} onAddToCart={addToCart} />
                        </div>
                      ))}
                    </div>

                    {/* Explore Full Store Button */}
                    <div className="flex justify-center mt-16">
                      <Link
                        to="/shop"
                        className="btn-primary py-4 px-10 text-xs sm:text-sm tracking-widest uppercase font-semibold transition-all hover:scale-[1.03] active:scale-95 duration-300 shadow-md hover:shadow-lg"
                      >
                        Explore Full Store
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
