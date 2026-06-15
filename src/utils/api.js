const API_BASE_URL = (
  typeof window !== 'undefined' && window.ADIRAY_API_BASE_URL
) || 'http://localhost:8000/api';

const TOKEN_KEYS = {
  access: 'authToken',
  refresh: 'refreshToken'
};

export const getAccessToken = () => localStorage.getItem(TOKEN_KEYS.access);

export const setAuthTokens = ({ access, refresh }) => {
  if (access) localStorage.setItem(TOKEN_KEYS.access, access);
  if (refresh) localStorage.setItem(TOKEN_KEYS.refresh, refresh);
};

export const clearAuthTokens = () => {
  localStorage.removeItem(TOKEN_KEYS.access);
  localStorage.removeItem(TOKEN_KEYS.refresh);
};

const buildUrl = (path) => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const apiRequest = async (path, options = {}) => {
  const token = getAccessToken();
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(buildUrl(path), {
    ...options,
    headers,
    body: options.body && !(options.body instanceof FormData)
      ? JSON.stringify(options.body)
      : options.body
  });

  if (response.status === 204) return null;

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = data?.detail || data?.message || data?.error || 'API request failed';
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const unpackList = (payload) => Array.isArray(payload) ? payload : (payload?.results || []);

export const toBackendBook = (book) => ({
  title: book.title,
  author: book.author,
  price: Number(book.price || 0).toFixed(2),
  original_price: book.originalPrice ? Number(book.originalPrice).toFixed(2) : null,
  category: book.category || book.genre || 'fiction',
  rating: Number(book.rating || 0).toFixed(1),
  reviews: parseInt(book.reviews || 0, 10),
  in_stock: book.inStock !== false,
  cover: book.cover || '',
  cover_color: book.coverColor || '',
  description: book.description || '',
  publisher: book.publisher || '',
  published_date: book.publishedDate || '',
  pages: book.pages ? parseInt(book.pages, 10) : null,
  isbn: book.isbn || `978-${Date.now()}`,
  featured: book.featured === true
});

export const fromBackendBook = (book) => ({
  id: book.id,
  title: book.title,
  author: book.author,
  price: Number(book.price || 0),
  originalPrice: Number(book.original_price || book.price || 0),
  category: book.category,
  genre: book.category,
  rating: Number(book.rating || 0),
  reviews: Number(book.reviews || 0),
  inStock: book.in_stock !== false,
  cover: book.cover || '',
  coverColor: book.cover_color || 'from-charcoal to-black',
  description: book.description || '',
  publisher: book.publisher || '',
  publishedDate: book.published_date || '',
  pages: book.pages || 0,
  isbn: book.isbn || '',
  featured: book.featured === true,
  createdAt: book.created_at
});

export const fromBackendUser = (profile) => ({
  id: String(profile.id),
  firstName: profile.first_name || profile.firstName || '',
  lastName: profile.last_name || profile.lastName || '',
  email: profile.email,
  role: toFrontendRole(profile.role || 'customer'),
  ordersCount: profile.orders_count || profile.ordersCount || 0,
  totalSpent: Number(profile.total_spent || profile.totalSpent || 0),
  joinedDate: profile.joined_date || profile.joinedDate
});

export const toBackendRole = (role) => String(role || 'customer').toLowerCase();

export const toFrontendRole = (role) => {
  const normalized = String(role || 'customer').toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

export const toBackendUser = (profile) => ({
  email: profile.email,
  first_name: profile.firstName,
  last_name: profile.lastName,
  role: toBackendRole(profile.role || 'Customer'),
  password: profile.password || 'AdirayBooks123!'
});

export const fromBackendOrder = (order) => ({
  id: String(order.id),
  date: order.created_at ? order.created_at.split('T')[0] : order.date,
  status: order.status,
  total: Number(order.total || 0),
  items: (order.items || []).map(item => ({
    id: item.book || item.id,
    orderItemId: item.id,
    title: item.title,
    author: item.author,
    price: Number(item.price || 0),
    quantity: Number(item.quantity || 1),
    coverColor: item.cover_color || item.coverColor || 'from-charcoal to-black'
  })),
  shippingAddress: order.shipping_address || order.shippingAddress || '',
  trackingNumber: order.tracking_number || order.trackingNumber || '',
  estimatedDelivery: order.estimated_delivery || order.estimatedDelivery || '',
  customerName: order.customer_name || order.customerName || '',
  customerEmail: order.customer_email || order.customerEmail || ''
});

export const toBackendOrder = (order) => ({
  shipping_address: order.shippingAddress,
  tracking_number: order.trackingNumber || '',
  estimated_delivery: order.estimatedDelivery || null,
  items: (order.items || []).map(item => ({
    book: item.id,
    title: item.title,
    author: item.author,
    price: Number(item.price || 0).toFixed(2),
    quantity: item.quantity || 1
  }))
});

export const fromBackendWishlistItem = (item) => ({
  ...fromBackendBook(item.book),
  wishlistItemId: item.id,
  dateAdded: item.added_at ? item.added_at.split('T')[0] : new Date().toISOString().split('T')[0]
});
