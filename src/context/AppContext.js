import React, { createContext, useContext, useState, useEffect } from 'react';

// Import external databases
import defaultBooksCatalog from '../../data/books.json';
import defaultUsers from '../../data/users.json';
import defaultWishlist from '../../data/wishlist.json';
import defaultOrders from '../../data/orders.json';

// Create Separate Contexts
const AuthContext = createContext(null);
const CartContext = createContext(null);
const WishlistContext = createContext(null);
const OrdersContext = createContext(null);
const BooksContext = createContext(null);
const UsersContext = createContext(null);

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

  const loginWithGoogle = async (googleProfile) => {
    if (!googleProfile || !googleProfile.email) {
      throw new Error('Google account did not provide an email address.');
    }

    const existingUser = users.find(u => u.email.toLowerCase() === googleProfile.email.toLowerCase());

    const userData = existingUser ? {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      id: existingUser.id,
      role: existingUser.role,
      picture: googleProfile.picture,
      provider: 'google'
    } : {
      firstName: googleProfile.firstName || googleProfile.email.split('@')[0],
      lastName: googleProfile.lastName || 'User',
      email: googleProfile.email,
      role: 'Customer',
      picture: googleProfile.picture,
      provider: 'google',
      googleId: googleProfile.googleId
    };

    if (!existingUser) {
      const addedUser = addUser(userData);
      userData.id = addedUser.id;
    }

    localStorage.setItem('authToken', 'google-oauth-session');
    localStorage.setItem('userData', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
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
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, loginWithGoogle, logout }}>
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
