import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const CategoryPage = ({ category, title, description, icon }) => {
  const { addToCart } = useOutletContext();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Sample books for each category
  const categoryBooks = {
    educational: [
      {
        id: 1,
        title: "Data Science Fundamentals",
        author: "Robert Kumar",
        price: 39.99,
        originalPrice: 49.99,
        rating: 4.9,
        reviews: 445,
        inStock: true,
        description: "Essential concepts and practical applications in data science.",
        coverColor: "from-indigo-400 to-purple-600"
      },
      {
        id: 2,
        title: "Advanced Mathematics",
        author: "Dr. Sarah Mitchell",
        price: 45.99,
        originalPrice: 59.99,
        rating: 4.7,
        reviews: 234,
        inStock: true,
        description: "Comprehensive guide to advanced mathematical concepts.",
        coverColor: "from-blue-400 to-cyan-600"
      },
      {
        id: 3,
        title: "Physics for Engineers",
        author: "Michael Chen",
        price: 34.99,
        originalPrice: 44.99,
        rating: 4.6,
        reviews: 189,
        inStock: true,
        description: "Applied physics concepts for engineering students.",
        coverColor: "from-purple-400 to-pink-600"
      }
    ],
    inspirational: [
      {
        id: 4,
        title: "The Mindful Leader",
        author: "Sarah Williams",
        price: 19.99,
        originalPrice: 27.99,
        rating: 4.6,
        reviews: 412,
        inStock: true,
        description: "Transform your leadership style through mindfulness.",
        coverColor: "from-purple-400 to-pink-600"
      },
      {
        id: 5,
        title: "The Creative Mind",
        author: "Lisa Anderson",
        price: 22.99,
        originalPrice: 32.99,
        rating: 4.4,
        reviews: 298,
        inStock: true,
        description: "Unlock your creative potential and innovative thinking.",
        coverColor: "from-pink-400 to-red-600"
      },
      {
        id: 6,
        title: "Rise Above",
        author: "James Thompson",
        price: 18.99,
        originalPrice: 26.99,
        rating: 4.8,
        reviews: 567,
        inStock: true,
        description: "Overcoming challenges and achieving your dreams.",
        coverColor: "from-yellow-400 to-orange-600"
      }
    ],
    novels: [
      {
        id: 7,
        title: "The Garden of Secrets",
        author: "Maria Rodriguez",
        price: 16.99,
        originalPrice: 24.99,
        rating: 4.3,
        reviews: 178,
        inStock: true,
        description: "A captivating tale of mystery and discovery.",
        coverColor: "from-green-400 to-teal-600"
      },
      {
        id: 8,
        title: "Midnight in Paris",
        author: "Pierre Dubois",
        price: 14.99,
        originalPrice: 21.99,
        rating: 4.5,
        reviews: 234,
        inStock: true,
        description: "A romantic story set in the heart of Paris.",
        coverColor: "from-blue-400 to-purple-600"
      },
      {
        id: 9,
        title: "The Last Chapter",
        author: "Emily Watson",
        price: 17.99,
        originalPrice: 25.99,
        rating: 4.7,
        reviews: 445,
        inStock: true,
        description: "A thrilling mystery that will keep you guessing.",
        coverColor: "from-gray-400 to-gray-600"
      }
    ],
    childrens: [
      {
        id: 10,
        title: "Little Explorers",
        author: "Tom Johnson",
        price: 12.99,
        originalPrice: 18.99,
        rating: 4.8,
        reviews: 523,
        inStock: true,
        description: "An exciting adventure for young readers.",
        coverColor: "from-yellow-300 to-pink-400"
      },
      {
        id: 11,
        title: "The Magic Tree",
        author: "Anna Lee",
        price: 11.99,
        originalPrice: 16.99,
        rating: 4.6,
        reviews: 234,
        inStock: true,
        description: "A magical journey through an enchanted forest.",
        coverColor: "from-green-300 to-blue-400"
      },
      {
        id: 12,
        title: "Happy Animals",
        author: "Sarah Brown",
        price: 10.99,
        originalPrice: 15.99,
        rating: 4.9,
        reviews: 678,
        inStock: true,
        description: "Learn about animals with colorful illustrations.",
        coverColor: "from-orange-300 to-red-400"
      }
    ],
    business: [
      {
        id: 13,
        title: "Digital Transformation",
        author: "Marcus Chen",
        price: 29.99,
        originalPrice: 39.99,
        rating: 4.8,
        reviews: 189,
        inStock: true,
        description: "Navigate the digital landscape with confidence.",
        coverColor: "from-green-400 to-blue-600"
      },
      {
        id: 14,
        title: "Leadership Excellence",
        author: "David Park",
        price: 32.99,
        originalPrice: 42.99,
        rating: 4.7,
        reviews: 298,
        inStock: true,
        description: "Essential leadership skills for modern managers.",
        coverColor: "from-blue-400 to-indigo-600"
      },
      {
        id: 15,
        title: "Startup Success",
        author: "Rachel Green",
        price: 27.99,
        originalPrice: 37.99,
        rating: 4.5,
        reviews: 167,
        inStock: true,
        description: "Build and grow your successful startup.",
        coverColor: "from-purple-400 to-pink-600"
      }
    ],
    technology: [
      {
        id: 16,
        title: "The Silent Algorithm",
        author: "Evelyn Reed",
        price: 24.99,
        originalPrice: 34.99,
        rating: 4.5,
        reviews: 234,
        inStock: true,
        description: "A deep dive into artificial intelligence.",
        coverColor: "from-blue-400 to-purple-600"
      },
      {
        id: 17,
        title: "JavaScript Mastery",
        author: "David Park",
        price: 34.99,
        originalPrice: 44.99,
        rating: 4.7,
        reviews: 567,
        inStock: true,
        description: "Complete guide to modern JavaScript development.",
        coverColor: "from-yellow-400 to-orange-600"
      },
      {
        id: 18,
        title: "Cloud Computing",
        author: "Alex Kumar",
        price: 38.99,
        originalPrice: 48.99,
        rating: 4.6,
        reviews: 345,
        inStock: true,
        description: "Master cloud technologies and architecture.",
        coverColor: "from-cyan-400 to-blue-600"
      }
    ],
    fiction: [
      {
        id: 19, title: "The Midnight Garden", author: "Emma Williams", price: 19.99, originalPrice: 24.99, rating: 4.2, reviews: 312, inStock: true, description: "A beautiful fiction story.", coverColor: "from-purple-400 to-pink-600"
      },
      {
        id: 20, title: "Echoes of Eternity", author: "James Peterson", price: 21.99, originalPrice: 29.99, rating: 4.8, reviews: 412, inStock: true, description: "An immersive fictional tale.", coverColor: "from-blue-400 to-cyan-600"
      }
    ],
    nonfiction: [
      {
        id: 21, title: "History of Time", author: "Sarah Connor", price: 25.99, originalPrice: 32.99, rating: 4.6, reviews: 156, inStock: true, description: "A detailed account of historical events.", coverColor: "from-gray-400 to-gray-600"
      },
      {
        id: 22, title: "The Human Mind", author: "Dr. Allen Walker", price: 22.99, originalPrice: 28.99, rating: 4.5, reviews: 298, inStock: true, description: "Understanding human psychology.", coverColor: "from-indigo-400 to-purple-600"
      }
    ],
    ebooks: [
      {
        id: 23, title: "Digital Marketing 101", author: "Alex Turner", price: 9.99, originalPrice: 14.99, rating: 4.3, reviews: 432, inStock: true, description: "Comprehensive ebook on digital marketing.", coverColor: "from-yellow-400 to-orange-600"
      },
      {
        id: 24, title: "Code Like a Pro", author: "Jane Smith", price: 12.99, originalPrice: 19.99, rating: 4.9, reviews: 890, inStock: true, description: "Advanced programming ebook.", coverColor: "from-green-400 to-teal-600"
      }
    ],
    audiobooks: [
      {
        id: 25, title: "The Voice Within", author: "Michael Chang", price: 14.99, originalPrice: 22.99, rating: 4.7, reviews: 210, inStock: true, description: "An inspiring audiobook journey.", coverColor: "from-red-400 to-pink-600"
      },
      {
        id: 26, title: "Listen and Learn: Spanish", author: "Maria Garcia", price: 19.99, originalPrice: 29.99, rating: 4.5, reviews: 345, inStock: true, description: "Learn Spanish through this interactive audiobook.", coverColor: "from-yellow-300 to-red-400"
      }
    ],
    "teens-ya": [
      {
        id: 27, title: "The Hidden Academy", author: "Chloe Price", price: 16.99, originalPrice: 21.99, rating: 4.6, reviews: 567, inStock: true, description: "A thrilling young adult fantasy novel.", coverColor: "from-purple-400 to-indigo-600"
      },
      {
        id: 28, title: "Summer of Secrets", author: "Liam Hunter", price: 15.99, originalPrice: 20.99, rating: 4.4, reviews: 432, inStock: true, description: "A touching teen romance story.", coverColor: "from-pink-300 to-rose-500"
      }
    ]
  };

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
      setBooks(categoryBooks[category] || []);
      setFilteredBooks(categoryBooks[category] || []);
      setLoading(false);
    }, 1000);
  }, [category]);

  useEffect(() => {
    // Filter and sort books
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
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
          return 0; // Keep original order
      }
    });

    setFilteredBooks(filtered);
  }, [books, searchTerm, sortBy]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-amber-400"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-amber-400"></i>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-amber-400"></i>);
    }
    
    return stars;
  };

  const handleAddToCart = (book) => {
    addToCart(book);
  };

  const handleAddToWishlist = (book) => {
    console.log('Added to wishlist:', book.title);
    alert(`Added "${book.title}" to wishlist!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">


      {/* Category Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Search and Sort */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-amber-200">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`Search ${title.toLowerCase()} books...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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

          {/* Books Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <div key={book.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-amber-200">
                  {/* Book Cover */}
                  <div className={`h-48 bg-gradient-to-br ${book.coverColor} relative`}>
                    <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-gray-800">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderStars(book.rating)}
                      </div>
                      <span className="text-sm text-gray-600">({book.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xl font-bold text-amber-700">${book.price}</span>
                        {book.originalPrice > book.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${book.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{book.description}</p>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(book)}
                        className="flex-1 bg-amber-700 text-white py-2 px-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors"
                      >
                        <i className="fas fa-shopping-cart mr-1"></i>
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleAddToWishlist(book)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <i className="far fa-heart text-gray-600"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Explore Other Categories</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover books in other popular categories
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.keys(categoryBooks).map(cat => (
              <a
                key={cat}
                href={`/categories/${cat}`}
                className={`group p-6 rounded-xl border-2 transition-all ${
                  cat === category 
                    ? 'border-amber-500 bg-amber-50' 
                    : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                }`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    cat === category ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-700'
                  }`}>
                    <i className={`fas ${
                      cat === 'educational' ? 'fa-graduation-cap' :
                      cat === 'inspirational' ? 'fa-heart' :
                      cat === 'novels' ? 'fa-book' :
                      cat === 'childrens' ? 'fa-child' :
                      cat === 'business' ? 'fa-briefcase' :
                      'fa-laptop-code'
                    }`}></i>
                  </div>
                  <p className={`font-semibold ${
                    cat === category ? 'text-amber-900' : 'text-gray-700'
                  }`}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
