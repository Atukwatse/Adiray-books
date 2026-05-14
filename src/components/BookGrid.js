import React from 'react';
import BookCard from './BookCard';

const BookGrid = ({ books, onAddToCart }) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-search text-6xl text-gray-400 mb-4"></i>
        <h3 className="text-2xl font-bold text-charcoal mb-2">No books found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-charcoal mb-2">
          Featured Collections
        </h2>
        <p className="text-gray-600">
          {books.length} {books.length === 1 ? 'book' : 'books'} found
        </p>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <div
            key={book.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <BookCard book={book} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
