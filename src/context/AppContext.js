import React, { createContext, useContext, useState, useEffect } from 'react';

import defaultBooksCatalog from '../../data/books.json';
import defaultUsers from '../../data/users.json';
import defaultWishlist from '../../data/wishlist.json';
import defaultOrders from '../../data/orders.json';
import {
  apiRequest,
  clearAuthTokens,
  fromBackendBook,
  fromBackendOrder,
  fromBackendUser,
  fromBackendWishlistItem,
  setAuthTokens,
  toBackendBook,
  toBackendOrder,
  toBackendRole,
  toBackendUser,
  unpackList
} from '../utils/api';

const AuthContext = createContext(null);
const CartContext = createContext(null);
const WishlistContext = createContext(null);
const OrdersContext = createContext(null);
const BooksContext = createContext(null);
const UsersContext = createContext(null);

const readCached = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (_error) {
    return fallback;
  }
};

const writeCached = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getNextNumericId = (items) => {
  const ids = items.map(item => Number(item.id)).filter(Number.isFinite);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
};

export const AppProvider = ({ children }) => {
  const [books, setBooks] = useState(() => readCached('adiray_books', defaultBooksCatalog));
  const [users, setUsers] = useState(() => readCached('adiray_users', defaultUsers));
  const [wishlist, setWishlist] = useState(() => readCached('adiray_wishlist', defaultWishlist));
  const [orders, setOrders] = useState(() => readCached('adiray_orders', defaultOrders));
  const [cart, setCart] = useState(() => readCached('adiray_cart', []));
  const [user, setUser] = useState(() => readCached('userData', null));
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('authToken')));
  const [apiStatus, setApiStatus] = useState('idle');

  const markApiOnline = () => setApiStatus('online');
  const markApiOffline = () => setApiStatus(prev => prev === 'online' ? prev : 'offline');

  useEffect(() => writeCached('adiray_books', books), [books]);
  useEffect(() => writeCached('adiray_users', users), [users]);
  useEffect(() => writeCached('adiray_wishlist', wishlist), [wishlist]);
  useEffect(() => writeCached('adiray_orders', orders), [orders]);
  useEffect(() => writeCached('adiray_cart', cart), [cart]);

  const loadBooks = async () => {
    try {
      const payload = await apiRequest('/books/');
      setBooks(unpackList(payload).map(fromBackendBook));
      markApiOnline();
    } catch (error) {
      console.warn('Using cached books because backend books API is unavailable.', error);
      markApiOffline();
    }
  };

  const loadUsers = async () => {
    try {
      const payload = await apiRequest('/auth/users/');
      setUsers(unpackList(payload).map(fromBackendUser));
      markApiOnline();
    } catch (error) {
      console.warn('Using cached users because backend users API is unavailable.', error);
      markApiOffline();
    }
  };

  const loadOrders = async () => {
    try {
      const payload = await apiRequest('/orders/');
      setOrders(unpackList(payload).map(fromBackendOrder));
      markApiOnline();
    } catch (error) {
      console.warn('Using cached orders because backend orders API is unavailable.', error);
      markApiOffline();
    }
  };

  const loadWishlist = async () => {
    try {
      const payload = await apiRequest('/wishlist/');
      setWishlist(unpackList(payload).map(fromBackendWishlistItem));
      markApiOnline();
    } catch (error) {
      console.warn('Using cached wishlist because backend wishlist API is unavailable.', error);
      markApiOffline();
    }
  };

  const loadProfile = async () => {
    try {
      const profile = fromBackendUser(await apiRequest('/auth/profile/'));
      localStorage.setItem('userData', JSON.stringify(profile));
      setUser(profile);
      setIsAuthenticated(true);
      markApiOnline();
      return profile;
    } catch (error) {
      console.warn('Using cached profile because backend profile API is unavailable.', error);
      markApiOffline();
      return null;
    }
  };

  const loadProtectedData = async () => {
    await Promise.all([loadOrders(), loadWishlist(), loadUsers()]);
  };

  useEffect(() => {
    loadBooks();

    if (localStorage.getItem('authToken')) {
      loadProfile().then(() => loadProtectedData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBook = async (newBook) => {
    const fallbackBook = {
      ...newBook,
      id: getNextNumericId(books),
      rating: parseFloat(newBook.rating) || 4.5,
      reviews: parseInt(newBook.reviews) || 0,
      inStock: newBook.inStock !== false
    };

    setBooks(prev => [fallbackBook, ...prev]);

    try {
      const saved = fromBackendBook(await apiRequest('/books/', {
        method: 'POST',
        body: toBackendBook(newBook)
      }));
      setBooks(prev => [saved, ...prev.filter(book => book.id !== fallbackBook.id)]);
      markApiOnline();
      return saved;
    } catch (error) {
      console.warn('Book saved locally because backend create failed.', error);
      markApiOffline();
      return fallbackBook;
    }
  };

  const updateBook = async (updatedBook) => {
    const previousBooks = books;
    setBooks(prev => prev.map(book => book.id === updatedBook.id ? { ...book, ...updatedBook } : book));

    try {
      const saved = fromBackendBook(await apiRequest(`/books/${updatedBook.id}/`, {
        method: 'PATCH',
        body: toBackendBook(updatedBook)
      }));
      setBooks(prev => prev.map(book => book.id === saved.id ? saved : book));
      markApiOnline();
      return saved;
    } catch (error) {
      console.warn('Book updated locally because backend update failed.', error);
      setBooks(previousBooks.map(book => book.id === updatedBook.id ? { ...book, ...updatedBook } : book));
      markApiOffline();
      return updatedBook;
    }
  };

  const deleteBook = async (bookId) => {
    const previousBooks = books;
    setBooks(prev => prev.filter(book => book.id !== bookId));

    try {
      await apiRequest(`/books/${bookId}/`, { method: 'DELETE' });
      markApiOnline();
    } catch (error) {
      console.warn('Book deleted locally because backend delete failed.', error);
      setBooks(previousBooks.filter(book => book.id !== bookId));
      markApiOffline();
    }
  };

  const addUser = async (userData) => {
    const localUser = {
      ...userData,
      id: String(getNextNumericId(users)),
      role: userData.role || 'Customer',
      ordersCount: 0,
      totalSpent: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [...prev, localUser]);

    try {
      const saved = fromBackendUser(await apiRequest('/auth/users/', {
        method: 'POST',
        body: toBackendUser(userData)
      }));
      setUsers(prev => [...prev.filter(profile => profile.id !== localUser.id), saved]);
      markApiOnline();
      return saved;
    } catch (error) {
      console.warn('User saved locally because backend create failed.', error);
      markApiOffline();
      return localUser;
    }
  };

  const updateUserRole = async (userId, newRole) => {
    setUsers(prev => prev.map(profile => profile.id === userId ? { ...profile, role: newRole } : profile));

    try {
      const saved = fromBackendUser(await apiRequest(`/auth/users/${userId}/`, {
        method: 'PATCH',
        body: { role: toBackendRole(newRole) }
      }));
      setUsers(prev => prev.map(profile => profile.id === userId ? saved : profile));
      markApiOnline();
    } catch (error) {
      console.warn('User role changed locally because backend update failed.', error);
      markApiOffline();
    }
  };

  const deleteUser = async (userId) => {
    setUsers(prev => prev.filter(profile => profile.id !== userId));

    try {
      await apiRequest(`/auth/users/${userId}/`, { method: 'DELETE' });
      markApiOnline();
    } catch (error) {
      console.warn('User deleted locally because backend delete failed.', error);
      markApiOffline();
    }
  };

  const login = async (email, password) => {
    try {
      const tokens = await apiRequest('/auth/login/', {
        method: 'POST',
        body: { email, password }
      });
      setAuthTokens(tokens);
      const profile = await loadProfile();
      await loadProtectedData();
      return profile;
    } catch (error) {
      if (error.status) throw error;

      const existingUser = users.find(profile => profile.email.toLowerCase() === email.toLowerCase());

      const fallbackUser = existingUser || {
        firstName: email.split('@')[0],
        lastName: 'User',
        email,
        id: '99',
        role: 'Customer'
      };

      localStorage.setItem('authToken', 'offline-dev-token');
      localStorage.setItem('userData', JSON.stringify(fallbackUser));
      setUser(fallbackUser);
      setIsAuthenticated(true);
      markApiOffline();
      return fallbackUser;
    }
  };

  const register = async (userData) => {
    try {
      await apiRequest('/auth/register/', {
        method: 'POST',
        body: {
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          password: userData.password || 'AdirayBooks123!'
        }
      });
      return login(userData.email, userData.password || 'AdirayBooks123!');
    } catch (error) {
      if (error.status) throw error;
      const addedUser = await addUser({ ...userData, role: 'Customer' });
      localStorage.setItem('authToken', 'offline-dev-token');
      localStorage.setItem('userData', JSON.stringify(addedUser));
      setUser(addedUser);
      setIsAuthenticated(true);
      markApiOffline();
      return addedUser;
    }
  };

  const loginWithGoogle = async (googleProfile) => {
    if (!googleProfile || !googleProfile.email) {
      throw new Error('Google account did not provide an email address.');
    }

    try {
      const response = await apiRequest('/auth/google/', {
        method: 'POST',
        body: {
          email: googleProfile.email,
          first_name: googleProfile.firstName || googleProfile.email.split('@')[0],
          last_name: googleProfile.lastName || 'User',
          picture: googleProfile.picture,
          google_id: googleProfile.googleId
        }
      });
      setAuthTokens(response);
      const profile = fromBackendUser(response.user);
      localStorage.setItem('userData', JSON.stringify(profile));
      setUser({ ...profile, picture: googleProfile.picture, provider: 'google' });
      setIsAuthenticated(true);
      await loadProtectedData();
      markApiOnline();
      return profile;
    } catch (error) {
      if (error.status) throw error;

      const fallbackUser = users.find(profile => profile.email.toLowerCase() === googleProfile.email.toLowerCase()) || {
        id: String(getNextNumericId(users)),
        firstName: googleProfile.firstName || googleProfile.email.split('@')[0],
        lastName: googleProfile.lastName || 'User',
        email: googleProfile.email,
        role: 'Customer',
        picture: googleProfile.picture,
        provider: 'google'
      };

      localStorage.setItem('authToken', 'offline-google-token');
      localStorage.setItem('userData', JSON.stringify(fallbackUser));
      setUser(fallbackUser);
      setIsAuthenticated(true);
      setUsers(prev => prev.some(profile => profile.email === fallbackUser.email) ? prev : [...prev, fallbackUser]);
      markApiOffline();
      return fallbackUser;
    }
  };

  const logout = () => {
    clearAuthTokens();
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
    setOrders(defaultOrders);
    setWishlist(defaultWishlist);
  };

  const updateProfile = async (profileData) => {
    const nextUser = {
      ...user,
      ...profileData
    };
    setUser(nextUser);
    localStorage.setItem('userData', JSON.stringify(nextUser));

    try {
      const saved = fromBackendUser(await apiRequest('/auth/profile/', {
        method: 'PATCH',
        body: {
          email: nextUser.email,
          first_name: nextUser.firstName,
          last_name: nextUser.lastName
        }
      }));
      setUser(saved);
      localStorage.setItem('userData', JSON.stringify(saved));
      markApiOnline();
      return saved;
    } catch (error) {
      console.warn('Profile updated locally because backend profile update failed.', error);
      markApiOffline();
      return nextUser;
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    const response = await apiRequest('/auth/change-password/', {
      method: 'POST',
      body: {
        old_password: oldPassword,
        new_password: newPassword
      }
    });
    markApiOnline();
    return response;
  };

  const deleteAccount = async () => {
    try {
      await apiRequest('/auth/profile/', { method: 'DELETE' });
      markApiOnline();
    } finally {
      logout();
    }
  };

  const addToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === book.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
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

  const clearCart = () => setCart([]);

  const addToWishlist = async (book) => {
    if (wishlist.some(item => item.id === book.id)) return book;

    const localItem = { ...book, dateAdded: new Date().toISOString().split('T')[0] };
    setWishlist(prev => [...prev, localItem]);

    if (!isAuthenticated) return localItem;

    try {
      const saved = fromBackendWishlistItem(await apiRequest('/wishlist/', {
        method: 'POST',
        body: { book_id: book.id }
      }));
      setWishlist(prev => prev.map(item => item.id === book.id ? saved : item));
      markApiOnline();
      return saved;
    } catch (error) {
      console.warn('Wishlist item saved locally because backend create failed.', error);
      markApiOffline();
      return localItem;
    }
  };

  const removeFromWishlist = async (bookId) => {
    const item = wishlist.find(entry => entry.id === bookId);
    setWishlist(prev => prev.filter(entry => entry.id !== bookId));

    if (!isAuthenticated || !item?.wishlistItemId) return;

    try {
      await apiRequest(`/wishlist/${item.wishlistItemId}/`, { method: 'DELETE' });
      markApiOnline();
    } catch (error) {
      console.warn('Wishlist item removed locally because backend delete failed.', error);
      markApiOffline();
    }
  };

  const isInWishlist = (bookId) => wishlist.some(item => item.id === bookId);

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
      if (item.inStock !== false) addToCart(item);
      removeFromWishlist(item.id);
    });
  };

  const addOrder = async (order) => {
    const localOrder = {
      ...order,
      customerName: user ? `${user.firstName} ${user.lastName}` : 'Guest Customer',
      customerEmail: user ? user.email : 'guest@example.com'
    };

    setOrders(prev => [localOrder, ...prev]);

    if (!isAuthenticated) return localOrder;

    try {
      const saved = fromBackendOrder(await apiRequest('/orders/', {
        method: 'POST',
        body: toBackendOrder(order)
      }));
      setOrders(prev => [saved, ...prev.filter(item => item.id !== localOrder.id)]);
      await loadUsers();
      markApiOnline();
      return saved;
    } catch (error) {
      console.warn('Order saved locally because backend create failed.', error);
      markApiOffline();
      return localOrder;
    }
  };

  const cancelOrder = async (orderId) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: 'cancelled' } : order));

    try {
      await apiRequest(`/orders/${orderId}/cancel/`, { method: 'POST' });
      markApiOnline();
    } catch (error) {
      console.warn('Order cancelled locally because backend cancel failed.', error);
      markApiOffline();
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order));

    try {
      const saved = fromBackendOrder(await apiRequest(`/orders/${orderId}/`, {
        method: 'PATCH',
        body: { status: newStatus }
      }));
      setOrders(prev => prev.map(order => order.id === orderId ? saved : order));
      markApiOnline();
    } catch (error) {
      console.warn('Order status updated locally because backend update failed.', error);
      markApiOffline();
    }
  };

  const updateOrderTracking = async (orderId, trackingNumber) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, trackingNumber } : order));

    try {
      const saved = fromBackendOrder(await apiRequest(`/orders/${orderId}/`, {
        method: 'PATCH',
        body: { tracking_number: trackingNumber }
      }));
      setOrders(prev => prev.map(order => order.id === orderId ? saved : order));
      markApiOnline();
    } catch (error) {
      console.warn('Order tracking updated locally because backend update failed.', error);
      markApiOffline();
    }
  };

  const deleteOrder = async (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));

    try {
      await apiRequest(`/orders/${orderId}/`, { method: 'DELETE' });
      markApiOnline();
    } catch (error) {
      console.warn('Order deleted locally because backend delete failed.', error);
      markApiOffline();
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, apiStatus, login, register, loginWithGoogle, logout, loadProfile, updateProfile, changePassword, deleteAccount }}>
      <BooksContext.Provider value={{ books, addBook, updateBook, deleteBook, refreshBooks: loadBooks }}>
        <UsersContext.Provider value={{ users, addUser, updateUserRole, deleteUser, refreshUsers: loadUsers }}>
          <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
            <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, moveWishlistToCart, refreshWishlist: loadWishlist }}>
              <OrdersContext.Provider value={{ orders, addOrder, cancelOrder, updateOrderStatus, updateOrderTracking, deleteOrder, refreshOrders: loadOrders }}>
                {children}
              </OrdersContext.Provider>
            </WishlistContext.Provider>
          </CartContext.Provider>
        </UsersContext.Provider>
      </BooksContext.Provider>
    </AuthContext.Provider>
  );
};

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
