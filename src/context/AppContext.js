import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Separate Contexts
const AuthContext = createContext(null);
const CartContext = createContext(null);
const WishlistContext = createContext(null);
const OrdersContext = createContext(null);
const BooksContext = createContext(null);
const UsersContext = createContext(null);

// Default books catalog matching initial designs
const defaultBooksCatalog = [
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
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-blue-600 to-indigo-900",
    description: "A profound, highly relevant exploration of technology and artificial intelligence in modern society. Evelyn Reed analyzes the intersection of human intuition and deep algorithmic processes, asking the hard questions about where humanity is headed next.",
    publisher: "Adiray Tech Press",
    publishedDate: "October 2023",
    pages: 342,
    isbn: "978-3-16-148410-0",
    featured: true
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
    cover: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-purple-700 to-indigo-950",
    description: "Delve into the breathtaking advancements in quantum computing and theoretical physics. Dr. Michael Chen guides both novices and engineers through qubits, entanglement, and the futuristic applications that will redefine computing platforms forever.",
    publisher: "Scientific Horizons",
    publishedDate: "December 2023",
    pages: 412,
    isbn: "978-1-23-456789-7",
    featured: true
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
    cover: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-emerald-700 to-teal-950",
    description: "A captivating contemporary novel set in the mystery-shrouded estate of Blackwood Hall. Emma Williams weaves a beautiful, slow-burning romance and gothic detective puzzle that will keep readers spellbound until the final pages are turned.",
    publisher: "Elegant Lit Co",
    publishedDate: "May 2022",
    pages: 288,
    isbn: "978-0-12-345678-9",
    featured: false
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
    cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-amber-600 to-yellow-800",
    description: "The ultimate compendium of business strategies, leadership methods, and growth hacks. Robert Anderson distills decades of executive coaching and startup development into actionable tools to build highly effective businesses.",
    publisher: "Executive Leaders Press",
    publishedDate: "July 2023",
    pages: 376,
    isbn: "978-9-87-654321-0",
    featured: true
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
    cover: "https://upload.wikimedia.org/wikipedia/commons/e/ea/The_Meditations_of_the_Emperor_Marcus_Aurelius_Antoninus.jpg",
    coverColor: "from-stone-600 to-neutral-900",
    description: "Lisa Martinez takes readers on a sweeping journey through ancient philosophical frameworks, rediscovering core lessons of mindfulness, leadership, and emotional intelligence developed by historical leaders and thinkers.",
    publisher: "Heritage Books",
    publishedDate: "February 2023",
    pages: 320,
    isbn: "978-5-43-210987-6",
    featured: false
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
    cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-cyan-600 to-sky-900",
    description: "Transform your managerial style and employee trust relationships through modern mindfulness concepts. David Thompson integrates psychological theories and practical exercises to cultivate emotional intelligence inside professional organizations.",
    publisher: "Executive Leaders Press",
    publishedDate: "September 2023",
    pages: 294,
    isbn: "978-2-34-567890-1",
    featured: true
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
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-teal-600 to-indigo-900",
    description: "Clean architecture, logical design, and artistic aesthetics combined inside software systems. Sophie Laurent teaches programming from a perspective of creative expression, illustrating beauty inside coding paradigms and elegant software designs.",
    publisher: "Adiray Tech Press",
    publishedDate: "January 2024",
    pages: 456,
    isbn: "978-8-76-543210-9",
    featured: false
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
    cover: "https://images.unsplash.com/photo-1529753253716-c211eed9bc47?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-rose-600 to-purple-950",
    description: "A brilliant window into the intricacies of human cognition, decision systems, and habits. Dr. James Wilson simplifies academic psychological studies to provide actionable tactics that help readers master their concentration, mindfulness, and relationships.",
    publisher: "Mind & Health Press",
    publishedDate: "November 2023",
    pages: 350,
    isbn: "978-4-56-789012-3",
    featured: true
  },
  {
    id: 9,
    title: "DATA SCIENCE FUNDAMENTALS",
    author: "ROBERT KUMAR",
    price: 39.99,
    originalPrice: 49.99,
    category: "educational",
    rating: 4.9,
    reviews: 445,
    inStock: true,
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-indigo-400 to-purple-600",
    description: "Essential concepts and practical applications in data science. Learn to visualize data, build regression models, and deploy machine learning pipelines.",
    publisher: "Adiray Tech Press",
    publishedDate: "January 2023",
    pages: 480,
    isbn: "978-0-12-345001-9",
    featured: false
  },
  {
    id: 10,
    title: "ADVANCED MATHEMATICS",
    author: "DR. SARAH MITCHELL",
    price: 45.99,
    originalPrice: 59.99,
    category: "educational",
    rating: 4.7,
    reviews: 234,
    inStock: true,
    cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-blue-400 to-cyan-600",
    description: "A comprehensive guide to advanced mathematical concepts, from differential equations to complex analysis.",
    publisher: "Academic Press",
    publishedDate: "March 2023",
    pages: 512,
    isbn: "978-0-12-345002-6",
    featured: false
  },
  {
    id: 11,
    title: "THE CREATIVE MIND",
    author: "LISA ANDERSON",
    price: 22.99,
    originalPrice: 32.99,
    category: "inspirational",
    rating: 4.4,
    reviews: 298,
    inStock: true,
    cover: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-pink-400 to-red-600",
    description: "Unlock your creative potential and innovative thinking with techniques backed by cognitive neuroscience.",
    publisher: "Mind & Health Press",
    publishedDate: "August 2022",
    pages: 260,
    isbn: "978-0-12-345005-7",
    featured: false
  },
  {
    id: 12,
    title: "THE GARDEN OF SECRETS",
    author: "MARIA RODRIGUEZ",
    price: 16.99,
    originalPrice: 24.99,
    category: "novels",
    rating: 4.3,
    reviews: 178,
    inStock: true,
    cover: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-green-400 to-teal-600",
    description: "A mystery set in a historical estate, where the gardener uncovers letters that will change her family's future forever.",
    publisher: "Elegant Lit Co",
    publishedDate: "June 2021",
    pages: 340,
    isbn: "978-0-12-345007-1",
    featured: false
  },
  {
    id: 13,
    title: "LITTLE EXPLORERS",
    author: "TOM JOHNSON",
    price: 12.99,
    originalPrice: 18.99,
    category: "childrens",
    rating: 4.8,
    reviews: 523,
    inStock: true,
    cover: "https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-yellow-300 to-pink-400",
    description: "An exciting adventure book for young readers, following three brave kids on a mission to map the unknown forest.",
    publisher: "Heritage Books",
    publishedDate: "November 2022",
    pages: 120,
    isbn: "978-0-12-345010-1",
    featured: false
  },
  {
    id: 14,
    title: "DIGITAL TRANSFORMATION",
    author: "MARCUS CHEN",
    price: 29.99,
    originalPrice: 39.99,
    category: "business",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
    coverColor: "from-green-400 to-blue-600",
    description: "Navigate the digital landscape with confidence and strategic insights from the world's most successful tech companies.",
    publisher: "Executive Leaders Press",
    publishedDate: "May 2023",
    pages: 310,
    isbn: "978-0-12-345013-2",
    featured: false
  },
  {
    id: 15,
    title: "JAVASCRIPT MASTERY",
    author: "DAVID PARK",
    price: 34.99,
    originalPrice: 44.99,
    category: "technology",
    rating: 4.7,
    reviews: 567,
    inStock: true,
    cover: "https://books.google.com/books/content?id=p_T2DwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    coverColor: "from-yellow-400 to-orange-600",
    description: "A comprehensive guide to modern JavaScript, covering ESNext, async programming, design patterns, and architectural principles.",
    publisher: "Adiray Tech Press",
    publishedDate: "December 2023",
    pages: 580,
    isbn: "978-0-12-345017-0",
    featured: false
  }
];

// Default users base for dynamic management
const defaultUsers = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Customer', ordersCount: 4, totalSpent: 184.94, joinedDate: '2024-01-10' },
  { id: '2', firstName: 'Evelyn', lastName: 'Reed', email: 'evelyn@example.com', role: 'Customer', ordersCount: 1, totalSpent: 24.99, joinedDate: '2024-01-15' },
  { id: '3', firstName: 'Marcus', lastName: 'Chen', email: 'marcus@example.com', role: 'Manager', ordersCount: 12, totalSpent: 849.20, joinedDate: '2023-11-05' },
  { id: '4', firstName: 'Adiray', lastName: 'Admin', email: 'admin@adiraybooks.com', role: 'Admin', ordersCount: 0, totalSpent: 0.00, joinedDate: '2023-09-01' }
];

// Default wishlist items matching initial mock state
const defaultWishlist = [
  {
    id: 1,
    title: "The Silent Algorithm",
    author: "Evelyn Reed",
    price: 24.99,
    originalPrice: 34.99,
    category: "technology",
    rating: 4.5,
    reviews: 234,
    inStock: true,
    dateAdded: "2024-01-15",
    coverColor: "from-blue-600 to-indigo-900",
    description: "A deep dive into the world of artificial intelligence and machine learning."
  },
  {
    id: 2,
    title: "Digital Transformation",
    author: "Marcus Chen",
    price: 29.99,
    originalPrice: 39.99,
    category: "business",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    dateAdded: "2024-01-20",
    coverColor: "from-green-400 to-blue-600",
    description: "Navigate the digital landscape with confidence and strategic insight."
  }
];

const defaultOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 89.97,
    items: [
      {
        id: 1,
        title: 'The Silent Algorithm',
        author: 'Evelyn Reed',
        price: 24.99,
        quantity: 1,
        coverColor: 'from-blue-600 to-indigo-900'
      },
      {
        id: 2,
        title: 'Digital Transformation',
        author: 'Marcus Chen',
        price: 29.99,
        quantity: 1,
        coverColor: 'from-green-400 to-blue-600'
      },
      {
        id: 6,
        title: 'Mindful Leadership',
        author: 'David Thompson',
        price: 34.99,
        quantity: 1,
        coverColor: 'from-cyan-600 to-sky-900'
      }
    ],
    shippingAddress: '123 Book Street, Reading District, RD 12345',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-01-20',
    customerName: 'John Doe',
    customerEmail: 'john@example.com'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-02-03',
    status: 'processing',
    total: 54.98,
    items: [
      {
        id: 15,
        title: 'JavaScript Mastery',
        author: 'David Park',
        price: 34.99,
        quantity: 1,
        coverColor: 'from-yellow-400 to-orange-600'
      },
      {
        id: 11,
        title: 'The Creative Mind',
        author: 'Lisa Anderson',
        price: 19.99,
        quantity: 1,
        coverColor: 'from-pink-400 to-red-600'
      }
    ],
    shippingAddress: '123 Book Street, Reading District, RD 12345',
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2024-02-08',
    customerName: 'John Doe',
    customerEmail: 'john@example.com'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-02-20',
    status: 'shipped',
    total: 39.99,
    items: [
      {
        id: 9,
        title: 'Data Science Fundamentals',
        author: 'Robert Kumar',
        price: 39.99,
        quantity: 1,
        coverColor: 'from-indigo-400 to-purple-600'
      }
    ],
    shippingAddress: '456 Tech Lane, Silicon Valley, CA 94025',
    trackingNumber: 'TRK456789123',
    estimatedDelivery: '2024-02-25',
    customerName: 'Marcus Chen',
    customerEmail: 'marcus@example.com'
  }
];

export const AppProvider = ({ children }) => {
  // ==========================================
  // 1. Dynamic Books Catalog State
  // ==========================================
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('adiray_books');
    return savedBooks ? JSON.parse(savedBooks) : defaultBooksCatalog;
  });

  useEffect(() => {
    // Migration: automatically replace legacy broken Amazon cover URLs in local storage
    let migrated = false;
    const migratedBooks = books.map(book => {
      if (book.cover && book.cover.includes('amazon.com')) {
        migrated = true;
        const defaultBook = defaultBooksCatalog.find(b => b.id === book.id);
        if (defaultBook) {
          return { ...book, cover: defaultBook.cover };
        }
      }
      return book;
    });
    
    if (migrated) {
      setBooks(migratedBooks);
      localStorage.setItem('adiray_books', JSON.stringify(migratedBooks));
    } else {
      localStorage.setItem('adiray_books', JSON.stringify(books));
    }
  }, [books]);

  const addBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
      rating: parseFloat(newBook.rating) || 4.5,
      reviews: parseInt(newBook.reviews) || 0,
      inStock: newBook.inStock !== false
    };
    setBooks(prev => [bookWithId, ...prev]);
    return bookWithId;
  };

  const updateBook = (updatedBook) => {
    setBooks(prev => prev.map(b => b.id === updatedBook.id ? { ...b, ...updatedBook } : b));
  };

  const deleteBook = (bookId) => {
    setBooks(prev => prev.filter(b => b.id !== bookId));
  };

  // ==========================================
  // 2. Users / Customers Database State
  // ==========================================
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('adiray_users');
    return savedUsers ? JSON.parse(savedUsers) : defaultUsers;
  });

  useEffect(() => {
    localStorage.setItem('adiray_users', JSON.stringify(users));
  }, [users]);

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: String(users.length > 0 ? Math.max(...users.map(u => parseInt(u.id))) + 1 : 1),
      ordersCount: 0,
      totalSpent: 0.00,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUserRole = (userId, newRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  // ==========================================
  // 3. Authentication State
  // ==========================================
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find if user already exists in dynamic database
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    const userData = existingUser ? {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      id: existingUser.id,
      role: existingUser.role
    } : {
      firstName: email.split('@')[0],
      lastName: 'User',
      email: email,
      id: '99',
      role: email.toLowerCase() === 'admin@adiraybooks.com' ? 'Admin' : 'Customer'
    };

    // Auto-register user in dynamic database if they don't exist
    if (!existingUser) {
      const addedUser = addUser({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role
      });
      userData.id = addedUser.id;
    }

    localStorage.setItem('authToken', 'mock-jwt-token');
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const register = async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const addedUser = addUser({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: 'Customer'
    });

    const formattedUser = {
      firstName: addedUser.firstName,
      lastName: addedUser.lastName,
      email: addedUser.email,
      id: addedUser.id,
      role: addedUser.role
    };

    localStorage.setItem('authToken', 'mock-jwt-token');
    localStorage.setItem('userData', JSON.stringify(formattedUser));
    setUser(formattedUser);
    setIsAuthenticated(true);
    return formattedUser;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  // ==========================================
  // 4. Shopping Cart State
  // ==========================================
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('adiray_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('adiray_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  };

  const updateCartQuantity = (bookId, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart => prevCart.map(item =>
      item.id === bookId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ==========================================
  // 5. Wishlist State
  // ==========================================
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('adiray_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : defaultWishlist;
  });

  useEffect(() => {
    localStorage.setItem('adiray_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (book) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === book.id)) return prev;
      return [...prev, { ...book, dateAdded: new Date().toISOString().split('T')[0] }];
    });
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(prev => prev.filter(item => item.id !== bookId));
  };

  const isInWishlist = (bookId) => {
    return wishlist.some(item => item.id === bookId);
  };

  const toggleWishlist = (book) => {
    if (isInWishlist(book.id)) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
  };

  const moveWishlistToCart = (selectedIds) => {
    const itemsToMove = wishlist.filter(item => selectedIds.includes(item.id));
    itemsToMove.forEach(item => {
      if (item.inStock !== false) {
        addToCart(item);
      }
    });
    // Remove moved items from wishlist
    setWishlist(prev => prev.filter(item => !selectedIds.includes(item.id)));
  };

  // ==========================================
  // 6. Orders State
  // ==========================================
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('adiray_orders');
    return savedOrders ? JSON.parse(savedOrders) : defaultOrders;
  });

  useEffect(() => {
    localStorage.setItem('adiray_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      customerName: user ? `${user.firstName} ${user.lastName}` : 'Guest Customer',
      customerEmail: user ? user.email : 'guest@example.com'
    };
    setOrders(prev => [newOrder, ...prev]);

    // Update dynamic stats for the ordering user
    if (user) {
      setUsers(prevUsers => prevUsers.map(u => 
        u.id === user.id 
          ? { ...u, ordersCount: u.ordersCount + 1, totalSpent: parseFloat((u.totalSpent + order.total).toFixed(2)) }
          : u
      ));
    }
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const updateOrderTracking = (orderId, trackingNumber) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, trackingNumber } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      <BooksContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
        <UsersContext.Provider value={{ users, addUser, updateUserRole, deleteUser }}>
          <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
            <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, moveWishlistToCart }}>
              <OrdersContext.Provider value={{ orders, addOrder, cancelOrder, updateOrderStatus, updateOrderTracking, deleteOrder }}>
                {children}
              </OrdersContext.Provider>
            </WishlistContext.Provider>
          </CartContext.Provider>
        </UsersContext.Provider>
      </BooksContext.Provider>
    </AuthContext.Provider>
  );
};

// Custom Hooks for Clean Consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AppProvider');
  return context;
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) throw new Error('useBooks must be used within an AppProvider');
  return context;
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) throw new Error('useUsers must be used within an AppProvider');
  return context;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within an AppProvider');
  return context;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within an AppProvider');
  return context;
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) throw new Error('useOrders must be used within an AppProvider');
  return context;
};
