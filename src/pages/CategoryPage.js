import React, { useState, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useWishlist } from '../context/AppContext';
import BookCard, { BookCardSkeleton } from '../components/BookCard';

const CategoryPage = ({ category, title, description, icon }) => {
  const { addToCart } = useOutletContext();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [searchParams]);

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
        cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://covers.openlibrary.org/b/isbn/9780131495081-L.jpg",
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
        cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://covers.openlibrary.org/b/isbn/9781604919134-L.jpg",
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
        cover: "https://books.google.com/books/content?id=S3p2DwAAQBAJ&printsec=frontcover&img=1&zoom=1",
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
        cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
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
        cover: "https://books.google.com/books/content?id=p_T2DwAAQBAJ&printsec=frontcover&img=1&zoom=1",
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
        cover: "https://books.google.com/books/content?id=e7V9CwAAQBAJ&printsec=frontcover&img=1&zoom=1",
        coverColor: "from-cyan-400 to-blue-600"
      }
    ],
    fiction: [
      {
        id: 19, title: "The Midnight Garden", author: "Emma Williams", price: 19.99, originalPrice: 24.99, rating: 4.2, reviews: 312, inStock: true, description: "A beautiful fiction story.", cover: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80", coverColor: "from-purple-400 to-pink-600"
      },
      {
        id: 20, title: "Echoes of Eternity", author: "James Peterson", price: 21.99, originalPrice: 29.99, rating: 4.8, reviews: 412, inStock: true, description: "An immersive fictional tale.", cover: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=400&q=80", coverColor: "from-blue-400 to-cyan-600"
      }
    ],
    nonfiction: [
      {
        id: 21, title: "History of Time", author: "Sarah Connor", price: 25.99, originalPrice: 32.99, rating: 4.6, reviews: 156, inStock: true, description: "A detailed account of historical events.", cover: "https://upload.wikimedia.org/wikipedia/commons/c/c1/A_Brief_History_of_Time_%28Stephen_Hawking%29.jpg", coverColor: "from-gray-400 to-gray-600"
      },
      {
        id: 22, title: "The Human Mind", author: "Dr. Allen Walker", price: 22.99, originalPrice: 28.99, rating: 4.5, reviews: 298, inStock: true, description: "Understanding human psychology.", cover: "https://images.unsplash.com/photo-1557264337-e8a93017fe9f?auto=format&fit=crop&w=400&q=80", coverColor: "from-indigo-400 to-purple-600"
      }
    ],
    ebooks: [
      {
        id: 23, title: "Digital Marketing 101", author: "Alex Turner", price: 9.99, originalPrice: 14.99, rating: 4.3, reviews: 432, inStock: true, description: "Comprehensive ebook on digital marketing.", cover: "https://covers.openlibrary.org/b/isbn/9781491935620-L.jpg", coverColor: "from-yellow-400 to-orange-600"
      },
      {
        id: 24, title: "Code Like a Pro", author: "Jane Smith", price: 12.99, originalPrice: 19.99, rating: 4.9, reviews: 890, inStock: true, description: "Advanced programming ebook.", cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80", coverColor: "from-green-400 to-teal-600"
      }
    ],
    audiobooks: [
      {
        id: 25, title: "The Voice Within", author: "Michael Chang", price: 14.99, originalPrice: 22.99, rating: 4.7, reviews: 210, inStock: true, description: "An inspiring audiobook journey.", cover: "https://covers.openlibrary.org/b/isbn/9781594488894-L.jpg", coverColor: "from-red-400 to-pink-600"
      },
      {
        id: 26, title: "Listen and Learn: Spanish", author: "Maria Garcia", price: 19.99, originalPrice: 29.99, rating: 4.5, reviews: 345, inStock: true, description: "Learn Spanish through this interactive audiobook.", cover: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=400&q=80", coverColor: "from-yellow-300 to-red-400"
      }
    ],
    "teens-ya": [
      {
        id: 27, title: "The Hidden Academy", author: "Chloe Price", price: 16.99, originalPrice: 21.99, rating: 4.6, reviews: 567, inStock: true, description: "A thrilling young adult fantasy novel.", cover: "https://books.google.com/books/content?id=E_2mEAAAQBAJ&printsec=frontcover&img=1&zoom=1", coverColor: "from-purple-400 to-indigo-600"
      },
      {
        id: 28, title: "Summer of Secrets", author: "Liam Hunter", price: 15.99, originalPrice: 20.99, rating: 4.4, reviews: 432, inStock: true, description: "A touching teen romance story.", cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80", coverColor: "from-pink-300 to-rose-500"
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
    toggleWishlist(book);
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <BookCardSkeleton key={index} />
              ))}
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
                <div key={book.id}>
                  <BookCard book={book} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


    </div>
  );
};

export default CategoryPage;
