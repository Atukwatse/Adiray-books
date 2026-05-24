import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart, useWishlist } from '../context/AppContext';
import StarRating from '../components/StarRating';

// Unified books dataset for detail retrieval
const ALL_BOOKS = [
  {
    id: 1,
    title: "THE SILENT ALGORITHM",
    author: "EVELYN REED",
    price: 24.99,
    originalPrice: 34.99,
    category: "technology",
    rating: 4.5,
    reviews: 234,
    inStock: true,
    cover: "https://picsum.photos/seed/silent-algorithm/400/600.jpg",
    coverColor: "from-blue-600 to-indigo-900",
    description: "A profound, highly relevant exploration of technology and artificial intelligence in modern society. Evelyn Reed analyzes the intersection of human intuition and deep algorithmic processes, asking the hard questions about where humanity is headed next.",
    publisher: "Adiray Tech Press",
    publishedDate: "October 2023",
    pages: 342,
    isbn: "978-3-16-148410-0"
  },
  {
    id: 2,
    title: "QUANTUM HORIZONS",
    author: "DR. MICHAEL CHEN",
    price: 29.99,
    originalPrice: 39.99,
    category: "technology",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    cover: "https://picsum.photos/seed/quantum-horizons/400/600.jpg",
    coverColor: "from-purple-700 to-indigo-950",
    description: "Delve into the breathtaking advancements in quantum computing and theoretical physics. Dr. Michael Chen guides both novices and engineers through qubits, entanglement, and the futuristic applications that will redefine computing platforms forever.",
    publisher: "Scientific Horizons",
    publishedDate: "December 2023",
    pages: 412,
    isbn: "978-1-23-456789-7"
  },
  {
    id: 3,
    title: "THE MIDNIGHT GARDEN",
    author: "EMMA WILLIAMS",
    price: 19.99,
    originalPrice: 24.99,
    category: "fiction",
    rating: 4.2,
    reviews: 312,
    inStock: true,
    cover: "https://picsum.photos/seed/midnight-garden/400/600.jpg",
    coverColor: "from-emerald-700 to-teal-950",
    description: "A captivating contemporary novel set in the mystery-shrouded estate of Blackwood Hall. Emma Williams weaves a beautiful, slow-burning romance and gothic detective puzzle that will keep readers spellbound until the final pages are turned.",
    publisher: "Elegant Lit Co",
    publishedDate: "May 2022",
    pages: 288,
    isbn: "978-0-12-345678-9"
  },
  {
    id: 4,
    title: "BUSINESS MASTERY",
    author: "ROBERT ANDERSON",
    price: 34.99,
    originalPrice: 49.99,
    category: "business",
    rating: 4.6,
    reviews: 298,
    inStock: true,
    cover: "https://picsum.photos/seed/business-mastery/400/600.jpg",
    coverColor: "from-amber-600 to-yellow-800",
    description: "The ultimate compendium of business strategies, leadership methods, and growth hacks. Robert Anderson distills decades of executive coaching and startup development into actionable tools to build highly effective businesses.",
    publisher: "Executive Leaders Press",
    publishedDate: "July 2023",
    pages: 376,
    isbn: "978-9-87-654321-0"
  },
  {
    id: 5,
    title: "ANCIENT WISDOM",
    author: "LISA MARTINEZ",
    price: 22.50,
    originalPrice: 28.99,
    category: "history",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    cover: "https://picsum.photos/seed/ancient-wisdom/400/600.jpg",
    coverColor: "from-stone-600 to-neutral-900",
    description: "Lisa Martinez takes readers on a sweeping journey through ancient philosophical frameworks, rediscovering core lessons of mindfulness, leadership, and emotional intelligence developed by historical leaders and thinkers.",
    publisher: "Heritage Books",
    publishedDate: "February 2023",
    pages: 320,
    isbn: "978-5-43-210987-6"
  },
  {
    id: 6,
    title: "MINDFUL LEADERSHIP",
    author: "DAVID THOMPSON",
    price: 27.99,
    originalPrice: 37.99,
    category: "business",
    rating: 4.7,
    reviews: 412,
    inStock: true,
    cover: "https://picsum.photos/seed/mindful-leadership/400/600.jpg",
    coverColor: "from-cyan-600 to-sky-900",
    description: "Transform your managerial style and employee trust relationships through modern mindfulness concepts. David Thompson integrates psychological theories and practical exercises to cultivate emotional intelligence inside professional organizations.",
    publisher: "Executive Leaders Press",
    publishedDate: "September 2023",
    pages: 294,
    isbn: "978-2-34-567890-1"
  },
  {
    id: 7,
    title: "ART OF CODE",
    author: "SOPHIE LAURENT",
    price: 31.99,
    originalPrice: 42.99,
    category: "technology",
    rating: 4.4,
    reviews: 212,
    inStock: true,
    cover: "https://picsum.photos/seed/art-of-code/400/600.jpg",
    coverColor: "from-teal-600 to-indigo-900",
    description: "Clean architecture, logical design, and artistic aesthetics combined inside software systems. Sophie Laurent teaches programming from a perspective of creative expression, illustrating beauty inside coding paradigms and elegant software designs.",
    publisher: "Adiray Tech Press",
    publishedDate: "January 2024",
    pages: 456,
    isbn: "978-8-76-543210-9"
  },
  {
    id: 8,
    title: "PSYCHOLOGY TODAY",
    author: "DR. JAMES WILSON",
    price: 26.99,
    originalPrice: 34.99,
    category: "psychology",
    rating: 4.5,
    reviews: 245,
    inStock: true,
    cover: "https://picsum.photos/seed/psychology-today/400/600.jpg",
    coverColor: "from-rose-600 to-purple-950",
    description: "A brilliant window into the intricacies of human cognition, decision systems, and habits. Dr. James Wilson simplifies profound psychological studies to provide actionable tactics that help readers master their concentration, mindfulness, and relationships.",
    publisher: "Mind & Health Press",
    publishedDate: "November 2023",
    pages: 350,
    isbn: "978-4-56-789012-3"
  }
];

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {
    // Find the book from our master dataset
    const matchedBook = ALL_BOOKS.find(b => b.id === parseInt(id));
    if (matchedBook) {
      setBook(matchedBook);
      setQuantity(1);
      setIsAddedToCart(false);
      document.title = `${matchedBook.title} by ${matchedBook.author} | Adiray Books`;

      // Filter similar books of same genre
      const filtered = ALL_BOOKS.filter(b => b.category === matchedBook.category && b.id !== matchedBook.id);
      setSimilarBooks(filtered.slice(0, 4));
    } else {
      // Fallback redirect if book not found
      navigate('/shop');
    }
  }, [id, navigate]);

  if (!book) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-8 flex items-center space-x-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-gold transition-colors">Books</Link>
          <span>/</span>
          <span className="text-charcoal font-semibold">{book.category}</span>
        </div>

        {/* Product Panel */}
        <div className="flex flex-col lg:flex-row gap-16 mb-16">
          {/* Left Column: Image/Cover */}
          <div className="lg:w-1/2 flex justify-center">
            <div className={`relative w-full max-w-md aspect-[2/3] bg-gradient-to-br ${book.coverColor} shadow-2xl flex items-center justify-center p-6 border border-gray-100 hover:scale-[1.01] transition-transform duration-300`}>
              <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
              
              {/* Premium Book Spine Effect */}
              <div className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-black/20 via-white/5 to-transparent"></div>
              
              <div className="text-center p-4 border border-white/20 w-full h-full flex flex-col justify-between items-center text-white z-10 backdrop-blur-[1px]">
                <div className="text-xs tracking-widest uppercase opacity-75 font-semibold mt-4">
                  {book.category}
                </div>
                
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mb-2 uppercase leading-tight drop-shadow-md">
                    {book.title}
                  </h1>
                  <div className="w-16 h-0.5 bg-gold mx-auto my-3"></div>
                  <p className="text-sm font-light tracking-wide drop-shadow-sm uppercase opacity-90">
                    by {book.author}
                  </p>
                </div>

                <div className="text-[10px] tracking-wider opacity-60 font-mono mb-4">
                  ADIRAY MODERN LIBRARY
                </div>
              </div>

              {/* Wishlist Icon Overlay */}
              <button
                onClick={() => toggleWishlist(book)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 border ${
                  isInWishlist(book.id)
                    ? 'border-red-100 text-red-500'
                    : 'border-gray-100 text-gray-400 hover:text-charcoal'
                }`}
              >
                <i className={`${isInWishlist(book.id) ? 'fas' : 'far'} fa-heart text-lg`}></i>
              </button>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <span className="text-xs text-gold font-bold tracking-widest uppercase mb-2">
              {book.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal mb-4 uppercase leading-tight">
              {book.title}
            </h1>
            <p className="text-lg text-gray-500 font-light tracking-wide mb-6">
              by <span className="text-charcoal font-semibold">{book.author}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-4 pb-6 border-b border-gray-100 mb-6">
              <StarRating rating={book.rating} />
              <span className="text-sm text-gray-500">
                ({book.reviews} customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-4 mb-8">
              <span className="text-3xl font-bold text-charcoal">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice > book.price && (
                <span className="text-lg text-gray-400 line-through font-light">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
              {book.originalPrice > book.price && (
                <span className="text-xs bg-gold text-charcoal px-2.5 py-1 font-bold tracking-wider uppercase">
                  Save ${(book.originalPrice - book.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description Short */}
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              {book.description}
            </p>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-gray-200 h-14 w-32 justify-between">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 text-gray-500 hover:text-charcoal hover:bg-gray-50 transition-colors h-full flex items-center justify-center font-bold text-lg"
                >
                  -
                </button>
                <span className="text-charcoal font-semibold text-base w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-4 py-2 text-gray-500 hover:text-charcoal hover:bg-gray-50 transition-colors h-full flex items-center justify-center font-bold text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 h-14 font-semibold uppercase tracking-widest transition-all duration-300 border flex items-center justify-center space-x-2 ${
                  isAddedToCart
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-charcoal text-white border-charcoal hover:bg-gold hover:text-charcoal'
                }`}
              >
                <i className={`fas ${isAddedToCart ? 'fa-check' : 'fa-shopping-bag'} text-sm`}></i>
                <span>{isAddedToCart ? 'Added to Cart!' : 'Add to Shopping Bag'}</span>
              </button>
            </div>

            {/* Delivery Guarantees */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100 text-sm">
              <div className="flex items-start space-x-3">
                <i className="fas fa-truck text-gold mt-1"></i>
                <div>
                  <h4 className="font-semibold text-charcoal font-serif">Free Shipping</h4>
                  <p className="text-xs text-gray-500 font-light mt-0.5">Complimentary delivery over $50</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <i className="fas fa-undo text-gold mt-1"></i>
                <div>
                  <h4 className="font-semibold text-charcoal font-serif">Easy Return Policy</h4>
                  <p className="text-xs text-gray-500 font-light mt-0.5">30-day money-back assurance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specs Panel */}
        <div className="mb-20">
          <div className="border-b border-gray-100 flex space-x-8 mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm font-semibold uppercase tracking-widest border-b-2 transition-all ${
                activeTab === 'description'
                  ? 'border-gold text-charcoal'
                  : 'border-transparent text-gray-400 hover:text-charcoal'
              }`}
            >
              Full Description
            </button>
            
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm font-semibold uppercase tracking-widest border-b-2 transition-all ${
                activeTab === 'specs'
                  ? 'border-gold text-charcoal'
                  : 'border-transparent text-gray-400 hover:text-charcoal'
              }`}
            >
              Product Details
            </button>
          </div>

          <div className="text-gray-600 font-light leading-relaxed max-w-4xl">
            {activeTab === 'description' ? (
              <div className="space-y-4">
                <p>{book.description}</p>
                <p>Curated and printed on premium acid-free cream paper, ensuring a luxury archival presence in your reading collection. Bound in clean tactile hardcover with refined aesthetic geometry designed to wow on any shelf layout.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 border border-gray-100 p-6 bg-gray-50 max-w-2xl text-sm">
                <span className="font-semibold text-charcoal">Publisher</span>
                <span>{book.publisher}</span>
                
                <span className="font-semibold text-charcoal">Publication Date</span>
                <span>{book.publishedDate}</span>
                
                <span className="font-semibold text-charcoal">Page Count</span>
                <span>{book.pages} pages</span>
                
                <span className="font-semibold text-charcoal">ISBN</span>
                <span className="font-mono">{book.isbn}</span>

                <span className="font-semibold text-charcoal">Genre Category</span>
                <span className="uppercase tracking-widest text-xs font-semibold text-gold">{book.category}</span>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Books Section */}
        {similarBooks.length > 0 && (
          <div className="border-t border-gray-100 pt-16">
            <h2 className="text-3xl font-bold font-serif text-charcoal mb-10 text-center uppercase tracking-tight">
              Related Masterpieces
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {similarBooks.map(item => (
                <div key={item.id} className="bg-white border border-gray-100 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-lg">
                  {/* cover preview */}
                  <div className={`h-48 bg-gradient-to-br ${item.coverColor} relative flex items-center justify-center text-white p-4`}>
                    <Link to={`/book/${item.id}`} className="absolute inset-0 z-10"></Link>
                    <span className="text-xs uppercase tracking-widest absolute top-2 right-2 bg-charcoal/30 px-2 py-0.5 rounded backdrop-blur-sm">
                      {item.category}
                    </span>
                    <h3 className="font-serif font-bold text-center text-sm uppercase leading-tight drop-shadow-md">
                      {item.title}
                    </h3>
                  </div>

                  <div className="p-4 border-t border-gray-50">
                    <h4 className="font-bold text-charcoal line-clamp-1 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-light mb-3">by {item.author}</p>
                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                      <span className="font-bold text-charcoal">${item.price.toFixed(2)}</span>
                      <Link
                        to={`/book/${item.id}`}
                        className="text-xs font-semibold uppercase text-gold hover:text-charcoal transition-colors tracking-wider"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
