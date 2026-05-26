import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero';
import FilterSidebar from '../components/FilterSidebar';
import BookGrid from '../components/BookGrid';

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

  return (
    <>
      <Hero />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block">
              <FilterSidebar
                genres={genres}
                selectedGenres={selectedGenres}
                maxPrice={maxPrice}
                sortBy={sortBy}
                onGenreChange={handleGenreChange}
                onPriceChange={setMaxPrice}
                onSortChange={setSortBy}
              />
            </div>
            <div className="flex-1">
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
                <BookGrid books={filteredBooks} onAddToCart={addToCart} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
