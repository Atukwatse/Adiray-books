import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Separate Contexts
const AuthContext = createContext(null);
const CartContext = createContext(null);
const WishlistContext = createContext(null);
const OrdersContext = createContext(null);

// Default wishlist items matching initial mock state
const defaultWishlist = [
  {
    id: 1,
    title: "The Silent Algorithm",
    author: "Evelyn Reed",
    price: 24.99,
    originalPrice: 34.99,
    category: "Technology",
    rating: 4.5,
    reviews: 234,
    inStock: true,
    dateAdded: "2024-01-15",
    coverColor: "from-gray-200 to-gray-300",
    description: "A deep dive into the world of artificial intelligence and machine learning."
  },
  {
    id: 2,
    title: "Digital Transformation",
    author: "Marcus Chen",
    price: 29.99,
    originalPrice: 39.99,
    category: "Business",
    rating: 4.8,
    reviews: 189,
    inStock: true,
    dateAdded: "2024-01-20",
    coverColor: "from-gray-100 to-gray-200",
    description: "Navigate the digital landscape with confidence and strategic insight."
  },
  {
    id: 3,
    title: "The Mindful Leader",
    author: "Sarah Williams",
    price: 19.99,
    originalPrice: 27.99,
    category: "Inspirational",
    rating: 4.6,
    reviews: 412,
    inStock: false,
    dateAdded: "2024-02-01",
    coverColor: "from-gray-200 to-gray-300",
    description: "Transform your leadership style through mindfulness and emotional intelligence."
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
        coverColor: 'from-blue-400 to-purple-600'
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
        id: 3,
        title: 'The Mindful Leader',
        author: 'Sarah Williams',
        price: 34.99,
        quantity: 1,
        coverColor: 'from-purple-400 to-pink-600'
      }
    ],
    shippingAddress: '123 Book Street, Reading District, RD 12345',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-01-20'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-02-03',
    status: 'processing',
    total: 54.98,
    items: [
      {
        id: 4,
        title: 'JavaScript Mastery',
        author: 'David Park',
        price: 34.99,
        quantity: 1,
        coverColor: 'from-yellow-400 to-orange-600'
      },
      {
        id: 5,
        title: 'The Creative Mind',
        author: 'Lisa Anderson',
        price: 19.99,
        quantity: 1,
        coverColor: 'from-pink-400 to-red-600'
      }
    ],
    shippingAddress: '123 Book Street, Reading District, RD 12345',
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2024-02-08'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-02-20',
    status: 'shipped',
    total: 39.99,
    items: [
      {
        id: 6,
        title: 'Data Science Fundamentals',
        author: 'Robert Kumar',
        price: 39.99,
        quantity: 1,
        coverColor: 'from-indigo-400 to-purple-600'
      }
    ],
    shippingAddress: '123 Book Street, Reading District, RD 12345',
    trackingNumber: 'TRK456789123',
    estimatedDelivery: '2024-02-25'
  },
  {
    id: 'ORD-2024-004',
    date: '2024-03-05',
    status: 'cancelled',
    total: 29.98,
    items: [
      {
        id: 7,
        title: 'The Garden of Secrets',
        author: 'Maria Rodriguez',
        price: 16.99,
        quantity: 1,
        coverColor: 'from-green-400 to-teal-600'
      },
      {
        id: 8,
        title: 'Little Explorers',
        author: 'Tom Johnson',
        price: 12.99,
        quantity: 1,
        coverColor: 'from-yellow-300 to-pink-400'
      }
    ],
    shippingAddress: '123 Book Street, Reading District, RD 12345',
    trackingNumber: null,
    estimatedDelivery: null
  }
];

export const AppProvider = ({ children }) => {
  // ==========================================
  // 1. Authentication State
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
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      id: '1'
    };
    localStorage.setItem('authToken', 'mock-jwt-token');
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const register = async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const formattedUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      id: String(Date.now())
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
  // 2. Shopping Cart State
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
  // 3. Wishlist State
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
  // 4. Orders State
  // ==========================================
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('adiray_orders');
    return savedOrders ? JSON.parse(savedOrders) : defaultOrders;
  });

  useEffect(() => {
    localStorage.setItem('adiray_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const cancelOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, moveWishlistToCart }}>
          <OrdersContext.Provider value={{ orders, addOrder, cancelOrder }}>
            {children}
          </OrdersContext.Provider>
        </WishlistContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
};

// Custom Hooks for Clean Consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AppProvider');
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
