import React from 'react';

const AuthorSpotlight = ({ onAuthorClick }) => {
  return (
    <div className="bg-gradient-to-r from-mustard to-yellow-500 p-8 rounded-2xl mb-12 shadow-medium">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Author Image */}
        <div className="flex-shrink-0">
          <img
            src="https://picsum.photos/seed/author1/150/150.jpg"
            alt="Featured Author"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-medium"
          />
        </div>

        {/* Author Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-serif text-charcoal mb-2">
            Author of the Month
          </h2>
          <h3 className="text-xl md:text-2xl font-serif text-charcoal mb-3">
            Michelle Richardson
          </h3>
          <p className="text-charcoal text-opacity-90 mb-6 max-w-2xl leading-relaxed">
            Award-winning author of contemporary fiction and thought-provoking narratives that explore the human condition. 
            Her work has been translated into over 30 languages and has garnered international acclaim.
          </p>
          <button
            onClick={onAuthorClick}
            className="btn-secondary bg-charcoal text-white border-charcoal hover:bg-white hover:text-charcoal"
          >
            <i className="fas fa-book mr-2"></i>
            View Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorSpotlight;
