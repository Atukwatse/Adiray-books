import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBooks, useOrders, useUsers, useAuth } from '../context/AppContext';
import Logo from '../components/Logo';

const DEFAULT_STORE_SETTINGS = {
  storeName: 'Adiray Books',
  contactEmail: 'contact@adiraybooks.com',
  currency: 'USD',
  taxRate: 8.5,
  maintenanceMode: false,
  themeAccent: 'gold'
};

const Admin = () => {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const { orders, updateOrderStatus, updateOrderTracking, deleteOrder } = useOrders();
  const { users, addUser, updateUserRole, deleteUser } = useUsers();
  const { user } = useAuth();

  // Settings state stored in localStorage for persistence
  const [storeSettings, setStoreSettings] = useState(() => {
    const saved = localStorage.getItem('adiray_admin_settings');
    return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('adiray_admin_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  // Accent theme helper classes matching main project colors
  const accentGlow = {
    gold: 'shadow-[0_4px_20px_rgba(212,175,55,0.06)] border-amber-200',
    charcoal: 'shadow-[0_4px_20px_rgba(10,10,10,0.06)] border-gray-300',
    bronze: 'shadow-[0_4px_20px_rgba(180,83,9,0.06)] border-orange-200'
  }[storeSettings.themeAccent];

  const accentText = {
    gold: 'text-[#D4AF37]',
    charcoal: 'text-charcoal',
    bronze: 'text-orange-700'
  }[storeSettings.themeAccent];

  const accentBg = {
    gold: 'bg-charcoal text-white hover:bg-gold hover:text-charcoal focus:ring-charcoal',
    charcoal: 'bg-charcoal text-white hover:bg-gray-800 focus:ring-charcoal',
    bronze: 'bg-orange-800 text-white hover:bg-orange-750 focus:ring-orange-800'
  }[storeSettings.themeAccent];

  const accentBadge = {
    gold: 'bg-amber-50 text-[#D4AF37] border border-amber-200/50',
    charcoal: 'bg-gray-50 text-charcoal border border-gray-200',
    bronze: 'bg-orange-50 text-orange-700 border border-orange-200/50'
  }[storeSettings.themeAccent];

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    UGX: 'UGX ',
    SDG: 'SDG '
  }[storeSettings.currency];

  // System states
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, books, orders, customers, settings
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Inventory Alert: "The Mindful Leader" is low on stock', type: 'warning', time: '10m ago' },
    { id: 2, text: 'New order #ORD-2024-003 placed by Marcus Chen', type: 'success', time: '1h ago' },
    { id: 3, text: 'Customer review report: 5 stars on "Silent Algorithm"', type: 'info', time: '3h ago' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const pushNotification = (text, type = 'info') => {
    setNotifications(prev => [
      { id: Date.now(), text, type, time: 'Just now' },
      ...prev
    ]);
    showToast(text, type);
  };

  // Books State & Forms
  const [bookSearch, setBookSearch] = useState('');
  const [bookCategoryFilter, setBookCategoryFilter] = useState('all');
  const [bookStockFilter, setBookStockFilter] = useState('all');
  const [showBookModal, setShowBookModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  
  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    price: '',
    originalPrice: '',
    category: 'technology',
    coverColor: 'from-blue-600 to-indigo-900',
    rating: '4.5',
    reviews: '0',
    inStock: true,
    description: '',
    publisher: 'Adiray Library Press',
    publishedDate: '2024',
    pages: '300',
    isbn: '978-0-00-000000-0',
    featured: false,
    cover: ''
  });

  // Orders State & Forms
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Customers State & Forms
  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Customer'
  });

  // Dynamic Dashboard Calculations
  const stats = useMemo(() => {
    const totalSales = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const totalOrdersCount = orders.length;
    const booksCount = books.length;
    const customersCount = users.length;
    const avgOrderValue = totalOrdersCount > 0 ? totalSales / totalOrdersCount : 0;

    return {
      sales: totalSales,
      orders: totalOrdersCount,
      books: booksCount,
      customers: customersCount,
      avgOrder: avgOrderValue
    };
  }, [orders, books, users]);

  // dynamic SVG Area Chart calculation
  const salesChartData = useMemo(() => {
    const baseSales = stats.sales > 0 ? stats.sales / 6 : 250;
    const points = [
      { day: 'Mon', value: baseSales * 0.7 },
      { day: 'Tue', value: baseSales * 0.9 },
      { day: 'Wed', value: baseSales * 0.8 },
      { day: 'Thu', value: baseSales * 1.3 },
      { day: 'Fri', value: baseSales * 1.1 },
      { day: 'Sat', value: baseSales * 1.6 },
      { day: 'Sun', value: stats.sales > 0 ? stats.sales : baseSales * 1.4 }
    ];

    const maxVal = Math.max(...points.map(p => p.value)) * 1.2 || 500;
    
    // Draw SVG path
    let path = 'M 40,260';
    let areaPath = 'M 40,260';
    points.forEach((p, idx) => {
      const x = 40 + idx * 80;
      const y = 260 - (p.value / maxVal) * 200;
      path += ` L ${x},${y}`;
      areaPath += ` L ${x},${y}`;
    });
    areaPath += ` L ${40 + (points.length - 1) * 80},260 Z`;

    return { points, maxVal, path, areaPath };
  }, [stats.sales]);

  // dynamic SVG Bar Chart calculation
  const categoryStats = useMemo(() => {
    const counts = {};
    books.forEach(b => {
      const cat = b.category || 'other';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    const categories = Object.keys(counts).map(cat => ({
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      count: counts[cat]
    }));

    const maxCount = Math.max(...categories.map(c => c.count)) || 10;
    return { categories, maxCount };
  }, [books]);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return books.filter(b => {
      const matchesSearch = b.title.toLowerCase().includes(bookSearch.toLowerCase()) || 
        b.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
        (b.isbn && b.isbn.includes(bookSearch));
      const matchesCategory = bookCategoryFilter === 'all' || b.category === bookCategoryFilter;
      const matchesStock = bookStockFilter === 'all' || 
        (bookStockFilter === 'instock' && b.inStock) || 
        (bookStockFilter === 'outofstock' && !b.inStock);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [books, bookSearch, bookCategoryFilter, bookStockFilter]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        (o.customerName && o.customerName.toLowerCase().includes(orderSearch.toLowerCase())) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase()));
      const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      return u.firstName.toLowerCase().includes(customerSearch.toLowerCase()) ||
        u.lastName.toLowerCase().includes(customerSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(customerSearch.toLowerCase());
    });
  }, [users, customerSearch]);

  const selectedOrder = useMemo(() => {
    if (!selectedOrderDetails) return null;
    return orders.find(order => order.id === selectedOrderDetails.id) || selectedOrderDetails;
  }, [orders, selectedOrderDetails]);

  const handleClearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  // Books CRUD handlers
  const handleOpenAddBook = () => {
    setEditingBook(null);
    setBookForm({
      title: '',
      author: '',
      price: '',
      originalPrice: '',
      category: 'technology',
      coverColor: 'from-blue-600 to-indigo-900',
      rating: '4.5',
      reviews: '0',
      inStock: true,
      description: '',
      publisher: 'Adiray Library Press',
      publishedDate: '2024',
      pages: '280',
      isbn: `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      featured: false,
      cover: ''
    });
    setShowBookModal(true);
  };

  const handleOpenEditBook = (book) => {
    setEditingBook(book);
    setBookForm({
      title: book.title,
      author: book.author,
      price: String(book.price),
      originalPrice: String(book.originalPrice || book.price),
      category: book.category || 'technology',
      coverColor: book.coverColor || 'from-blue-600 to-indigo-900',
      rating: String(book.rating || '4.5'),
      reviews: String(book.reviews || '0'),
      inStock: book.inStock !== false,
      description: book.description || '',
      publisher: book.publisher || 'Adiray Tech Press',
      publishedDate: book.publishedDate || '2023',
      pages: String(book.pages || '300'),
      isbn: book.isbn || '978-0-00-000000-0',
      featured: book.featured === true,
      cover: book.cover || ''
    });
    setShowBookModal(true);
  };

  const handleSaveBook = (e) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.author || !bookForm.price) {
      alert('Please fill in the required fields (Title, Author, Price).');
      return;
    }

    const priceNum = parseFloat(bookForm.price);
    const originalPriceNum = parseFloat(bookForm.originalPrice) || priceNum;

    const getCategoryFallbackCover = (cat) => {
      const mappings = {
        technology: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
        business: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80',
        fiction: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
        history: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80',
        educational: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80',
        inspirational: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=400&q=80',
        childrens: 'https://images.unsplash.com/photo-1489065604198-8a379f7273eb?auto=format&fit=crop&w=400&q=80',
        psychology: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=400&q=80',
        novels: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80'
      };
      return mappings[cat] || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80';
    };

    const bookData = {
      title: bookForm.title.toUpperCase(),
      author: bookForm.author.toUpperCase(),
      price: priceNum,
      originalPrice: originalPriceNum,
      category: bookForm.category,
      coverColor: bookForm.coverColor,
      // Automatic values
      rating: editingBook ? editingBook.rating : (parseFloat(bookForm.rating) || 4.5),
      reviews: editingBook ? editingBook.reviews : (parseInt(bookForm.reviews) || 0),
      inStock: bookForm.inStock,
      description: bookForm.description,
      publisher: bookForm.publisher,
      publishedDate: bookForm.publishedDate,
      pages: parseInt(bookForm.pages) || 300,
      isbn: bookForm.isbn,
      featured: bookForm.featured,
      cover: bookForm.cover && bookForm.cover.trim() !== '' 
        ? bookForm.cover.trim() 
        : getCategoryFallbackCover(bookForm.category)
    };

    if (editingBook) {
      updateBook({ ...bookData, id: editingBook.id });
      pushNotification(`Book "${bookData.title}" details updated successfully`, 'info');
    } else {
      addBook(bookData);
      pushNotification(`New masterpiece "${bookData.title}" cataloged`, 'success');
    }
    setShowBookModal(false);
  };

  const handleDeleteBook = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the catalog?`)) {
      deleteBook(id);
      pushNotification(`Removed "${title}" from catalog`, 'warning');
    }
  };

  const handleOpenOrderDetails = (order) => {
    setSelectedOrderDetails(order);
  };

  const handleDeleteOrder = (order) => {
    if (window.confirm(`Delete order ${order.id} permanently?`)) {
      deleteOrder(order.id);
      if (selectedOrderDetails?.id === order.id) {
        setSelectedOrderDetails(null);
      }
      pushNotification(`Deleted transaction record ${order.id}`, 'warning');
    }
  };

  const handleUpdateOrderTracking = (orderId, trackingNumber) => {
    updateOrderTracking(orderId, trackingNumber);
    setSelectedOrderDetails(prev => prev ? { ...prev, trackingNumber } : prev);
  };

  const handleUpdateOrderStatus = (orderId, status) => {
    updateOrderStatus(orderId, status);
    setSelectedOrderDetails(prev => prev ? { ...prev, status } : prev);
    pushNotification(`Order ${orderId} moved to ${status}`, 'info');
  };

  const handleChangeUserRole = (profile, role) => {
    updateUserRole(profile.id, role);
    pushNotification(`${profile.firstName} ${profile.lastName} role changed to ${role}`, 'info');
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (!customerForm.firstName || !customerForm.lastName || !customerForm.email) {
      alert('Please complete the First Name, Last Name, and Email fields.');
      return;
    }

    addUser({
      firstName: customerForm.firstName,
      lastName: customerForm.lastName,
      email: customerForm.email,
      role: customerForm.role
    });

    pushNotification(`Created dynamic user account for ${customerForm.firstName}`, 'success');

    setShowCustomerModal(false);
  };

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to terminate ${name}'s account?`)) {
      deleteUser(id);
      pushNotification(`Deleted user profile for ${name}`, 'warning');
    }
  };

  const handleToggleMaintenanceMode = () => {
    const maintenanceMode = !storeSettings.maintenanceMode;
    setStoreSettings(prev => ({ ...prev, maintenanceMode }));
    pushNotification(`Maintenance mode ${maintenanceMode ? 'enabled' : 'disabled'}`, maintenanceMode ? 'warning' : 'success');
  };

  const handleSetAccentTheme = (themeId, themeLabel) => {
    setStoreSettings(prev => ({ ...prev, themeAccent: themeId }));
    pushNotification(`Portal accent switched to ${themeLabel}`, 'info');
  };

  const handleResetSettings = () => {
    if (window.confirm('Reset store settings to the default Adiray Books configuration?')) {
      setStoreSettings(DEFAULT_STORE_SETTINGS);
      pushNotification('Store settings reset to defaults', 'warning');
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('adiray_admin_settings', JSON.stringify(storeSettings));
    pushNotification('Store settings saved successfully', 'success');
  };

  const gradientColors = [
    { value: 'from-blue-600 to-indigo-900', label: 'Classic Cobalt' },
    { value: 'from-purple-700 to-indigo-950', label: 'Quantum Purple' },
    { value: 'from-emerald-700 to-teal-950', label: 'Emerald Deep' },
    { value: 'from-amber-600 to-yellow-800', label: 'Gold Amber' },
    { value: 'from-stone-600 to-neutral-900', label: 'Neutral Slate' },
    { value: 'from-cyan-600 to-sky-900', label: 'Aqua Marine' },
    { value: 'from-teal-600 to-indigo-900', label: 'Teal Indigo' },
    { value: 'from-rose-600 to-purple-950', label: 'Burgundy Velvet' }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-charcoal font-sans flex relative overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 1. Sidebar Navigation - Responsive Drawer */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white flex flex-col justify-between py-6 transition-transform duration-300 transform lg:relative lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo Brand matching Header.js */}
          <div className="px-5 mb-10 flex items-center">
            <Logo variant="horizontal" theme="light" className="h-9 w-auto" />
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-pie' },
              { id: 'books', label: 'Books Catalog', icon: 'fas fa-book' },
              { id: 'orders', label: 'Orders Feed', icon: 'fas fa-shopping-bag' },
              { id: 'customers', label: 'Users Base', icon: 'fas fa-users' },
              { id: 'settings', label: 'Store Settings', icon: 'fas fa-cog' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-semibold tracking-wide rounded-none transition-all border-l-4 ${
                    isActive 
                      ? 'bg-gray-50 border-charcoal text-charcoal shadow-sm' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-charcoal'
                  }`}
                >
                  <i className={`${tab.icon} w-5 ${isActive ? accentText : 'text-gray-400'}`}></i>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Back to Storefront Link */}
        <div className="px-4">
          <Link
            to="/"
            className="w-full flex items-center justify-center space-x-2 bg-white border border-charcoal text-charcoal hover:bg-charcoal hover:text-white py-2.5 rounded-none text-xs font-bold tracking-wider transition-colors uppercase duration-300"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Main Bookstore</span>
          </Link>
        </div>
      </aside>

      {/* 2. Main content container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        
        {/* Top Header */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 sm:px-8 z-10 shrink-0">
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-charcoal bg-gray-50 border border-gray-200 rounded-none transition-all active:scale-95"
            >
              <i className="fas fa-bars text-lg"></i>
            </button>

            <h2 className="text-sm sm:text-lg font-bold font-serif text-charcoal uppercase tracking-wide truncate max-w-[150px] sm:max-w-none">
              {activeTab === 'dashboard' ? 'Overview Statistics' : 
               activeTab === 'books' ? 'Store Books Inventory' :
               activeTab === 'orders' ? 'Transactions & Shipments' :
               activeTab === 'customers' ? 'User & Customer Control' : 
               'Store Configuration'}
            </h2>
            {storeSettings.maintenanceMode && (
              <span className="bg-red-100 border border-red-200 text-red-700 text-[9px] px-2 py-0.5 font-bold uppercase rounded tracking-widest animate-pulse">
                Maintenance
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* System Status Ticker - Hidden on smaller screens */}
            <div className="hidden xl:flex items-center space-x-2 text-[10px] text-gray-500 tracking-wider uppercase font-bold bg-gray-50 px-3 py-1 rounded border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Sync Status: Active</span>
            </div>

            {/* Notification Drawer Button */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(true)}
                className="w-9 h-9 rounded-none bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors relative"
                title="Open notifications"
              >
                <i className="far fa-bell text-sm"></i>
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                )}
              </button>
            </div>

            {/* User Profile Badge */}
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
              <div className="w-8 h-8 rounded-none flex items-center justify-center text-xs font-extrabold uppercase bg-charcoal text-white shadow">
                {user ? user.firstName.charAt(0) : 'A'}
              </div>
              <div className="hidden sm:block">
                <span className="block text-xs font-bold text-charcoal">{user ? `${user.firstName} ${user.lastName}` : 'Adiray Administrator'}</span>
                <span className="block text-[10px] text-gray-400 font-mono tracking-wider">{user ? user.role : 'Superadmin'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. Sub-pages contents viewports */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#F8F9FA]">

          {/* ========================================================== */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ========================================================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Grid 4 Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: 'Store Sales Revenue', val: `${currencySymbol}${stats.sales.toFixed(2)}`, icon: 'fas fa-dollar-sign', trend: '+14.2% mtd', iconColor: 'text-[#D4AF37]', border: 'border-amber-100' },
                  { label: 'Dynamic Orders Placed', val: stats.orders, icon: 'fas fa-shopping-bag', trend: '+8.4% weekly', iconColor: 'text-charcoal', border: 'border-gray-200' },
                  { label: 'Cataloged Books', val: stats.books, icon: 'fas fa-book', trend: 'Live catalog list', iconColor: 'text-[#D4AF37]', border: 'border-amber-100' },
                  { label: 'Active Users Base', val: stats.customers, icon: 'fas fa-users', trend: '4 profiles configured', iconColor: 'text-charcoal', border: 'border-gray-200' }
                ].map((card, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-white border p-6 rounded-none flex justify-between items-start transition-all duration-300 hover:shadow-md ${card.border}`}
                  >
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest">{card.label}</span>
                      <span className="block text-3xl font-extrabold text-charcoal mt-2 font-serif">{card.val}</span>
                      <span className="block text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-wide">{card.trend}</span>
                    </div>
                    <div className="w-10 h-10 rounded-none bg-gray-50 flex items-center justify-center border border-gray-100 text-sm">
                      <i className={`${card.icon} ${card.iconColor}`}></i>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid Area Chart & Bar Chart */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* SVG Area Chart: Sales curves */}
                <div className={`xl:col-span-2 bg-white border p-6 rounded-none order-2 xl:order-1 ${accentGlow}`}>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider font-serif">Dynamic Sales Volume Trend</h3>
                      <p className="text-xs text-gray-500 font-light mt-0.5">Mock transactions curves calibrated dynamically based on order volume</p>
                    </div>
                    <span className={`text-xs font-bold font-mono tracking-widest ${accentBadge} px-2.5 py-0.5 rounded-none`}>
                      Last 7 Days
                    </span>
                  </div>

                  {/* SVG Render */}
                  <div className="relative h-64 w-full flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 540 280">
                      {/* Grid Lines */}
                      <line x1="40" y1="60" x2="520" y2="60" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="3" />
                      <line x1="40" y1="126" x2="520" y2="126" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="3" />
                      <line x1="40" y1="193" x2="520" y2="193" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="3" />
                      <line x1="40" y1="260" x2="520" y2="260" stroke="#9CA3AF" strokeWidth="1" />

                      {/* Area Fill */}
                      <path 
                        d={salesChartData.areaPath} 
                        fill="url(#areaGrad-gold)"
                      />

                      {/* Line Curve */}
                      <path 
                        d={salesChartData.path} 
                        fill="none" 
                        stroke="url(#lineGrad-gold)" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Points Overlay */}
                      {salesChartData.points.map((p, idx) => {
                        const x = 40 + idx * 80;
                        const y = 260 - (p.value / salesChartData.maxVal) * 200;
                        return (
                          <g key={idx} className="group cursor-pointer">
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="5" 
                              className="fill-white stroke-2 stroke-[#D4AF37] transition-all group-hover:r-7" 
                            />
                            {/* Hover tooltip widget */}
                            <rect 
                              x={x - 30} 
                              y={y - 35} 
                              width="60" 
                              height="22" 
                              rx="2" 
                              className="fill-charcoal stroke stroke-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" 
                              strokeWidth="0.5"
                            />
                            <text 
                              x={x} 
                              y={y - 20} 
                              textAnchor="middle" 
                              className="fill-white text-[9px] font-bold font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            >
                              ${p.value.toFixed(0)}
                            </text>
                            
                            {/* X-axis labels */}
                            <text x={x} y="278" textAnchor="middle" className="fill-gray-500 text-[10px] font-semibold">{p.day}</text>
                          </g>
                        );
                      })}

                      {/* Y-axis Labels */}
                      <text x="30" y="65" textAnchor="end" className="fill-gray-500 text-[9px] font-mono">${(salesChartData.maxVal * 0.97).toFixed(0)}</text>
                      <text x="30" y="130" textAnchor="end" className="fill-gray-500 text-[9px] font-mono">${(salesChartData.maxVal * 0.65).toFixed(0)}</text>
                      <text x="30" y="197" textAnchor="end" className="fill-gray-500 text-[9px] font-mono">${(salesChartData.maxVal * 0.33).toFixed(0)}</text>
                      <text x="30" y="263" textAnchor="end" className="fill-gray-500 text-[9px] font-mono">$0</text>

                      {/* Gradients Definitions */}
                      <defs>
                        <linearGradient id="areaGrad-gold" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#EEDC82" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#EEDC82" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="lineGrad-gold" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#D4AF37" />
                          <stop offset="100%" stopColor="#0A0A0A" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* SVG Bar Chart: Category distribution */}
                <div className="bg-white border border-gray-200 p-6 rounded-none order-1 xl:order-2">
                  <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-6 font-serif">Inventory by Category</h3>
                  
                  <div className="space-y-4">
                    {categoryStats.categories.length === 0 ? (
                      <p className="text-xs text-gray-500 py-6 text-center">No categories mapped yet.</p>
                    ) : (
                      categoryStats.categories.map((c, idx) => {
                        const percent = (c.count / categoryStats.maxCount) * 100;
                        return (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold text-gray-700">{c.name}</span>
                              <span className="font-mono text-gray-400">{c.count} items</span>
                            </div>
                            <div className="h-2 w-full bg-gray-50 border border-gray-200 rounded-none overflow-hidden">
                              <div 
                                className="h-full rounded-none transition-all duration-1000 bg-charcoal"
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Grid Recent Orders & Activity logs */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Recent Orders table */}
                <div className="xl:col-span-2 bg-white border border-gray-200 p-6 rounded-none overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider font-serif">Recent Orders</h3>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className={`text-xs font-bold uppercase ${accentText}`}
                    >
                      Manage Feed
                    </button>
                  </div>

                  <div className="overflow-x-auto -mx-6 px-6">
                    <table className="w-full text-left text-[11px] sm:text-xs text-charcoal divide-y divide-gray-200 min-w-[500px]">
                      <thead>
                        <tr className="text-gray-400 uppercase tracking-widest font-bold">
                          <th className="pb-3 px-1">ID</th>
                          <th className="pb-3 text-center">Customer</th>
                          <th className="pb-3 hidden sm:table-cell">Date</th>
                          <th className="pb-3">Total</th>
                          <th className="pb-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {orders.slice(0, 4).map((o, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                            <td className="py-3.5 px-1 font-mono font-bold text-gray-500 group-hover:text-charcoal transition-colors">#{o.id.slice(-4)}</td>
                            <td className="py-3.5 font-semibold text-charcoal text-center">{o.customerName}</td>
                            <td className="py-3.5 font-light text-gray-500 hidden sm:table-cell">{o.date}</td>
                            <td className="py-3.5 font-bold font-mono text-charcoal">${o.total.toFixed(0)}</td>
                            <td className="py-3.5 text-right">
                              <button
                                onClick={() => handleOpenOrderDetails(o)}
                                className={`px-2.5 py-0.5 rounded-none text-[10px] font-bold uppercase ${
                                  o.status === 'delivered' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' :
                                  o.status === 'processing' ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100' :
                                  o.status === 'shipped' ? 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100' :
                                  'bg-red-50 text-red-800 border border-red-200 hover:bg-red-100'
                                }`}
                                title="Open order details"
                              >
                                {o.status}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Activity log feed */}
                <div className="bg-white border border-gray-200 p-6 rounded-none">
                  <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider mb-6 font-serif">Recent Activity</h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: 'fas fa-shopping-cart', desc: 'Guest customer created an empty checkout basket', time: '5m ago', color: 'text-gray-500 bg-gray-100' },
                      { icon: 'fas fa-user-plus', desc: 'Manual registration completed for Dr. Walker', time: '20m ago', color: `${accentText} ${accentBadge}` },
                      { icon: 'fas fa-edit', desc: 'Evelyn Reed edited book title "Art of Code"', time: '1h ago', color: 'text-amber-700 bg-amber-50' },
                      { icon: 'fas fa-trash', desc: 'System purged transient guest cart sessions', time: '5h ago', color: 'text-red-750 bg-red-50' }
                    ].map((act, idx) => (
                      <div key={idx} className="flex space-x-3 items-start text-xs text-gray-500">
                        <div className={`w-8 h-8 rounded-none shrink-0 flex items-center justify-center ${act.color}`}>
                          <i className={act.icon}></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-charcoal font-light truncate leading-tight">{act.desc}</p>
                          <span className="text-[10px] text-gray-400 mt-1 block font-mono">{act.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 2: BOOKS CATALOG (CRUD) */}
          {/* ========================================================== */}
          {activeTab === 'books' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Filter controls bar */}
              <div className="bg-white border border-gray-200 p-5 rounded-none flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Search field */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search by Title, Author, or ISBN..."
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-none px-4 py-2.5 pl-10 text-sm text-charcoal placeholder-gray-400 outline-none focus:border-charcoal transition-colors"
                  />
                  <i className="fas fa-search absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                </div>

                {/* Dropdowns filters */}
                <div className="flex flex-wrap w-full md:w-auto items-center gap-3">
                  <select
                    value={bookCategoryFilter}
                    onChange={(e) => setBookCategoryFilter(e.target.value)}
                    className="bg-white border border-gray-300 rounded-none px-3 py-2.5 text-xs font-semibold text-gray-600 outline-none focus:border-charcoal"
                  >
                    <option value="all">All Categories</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="fiction">Fiction</option>
                    <option value="history">History</option>
                    <option value="educational">Educational</option>
                    <option value="inspirational">Inspirational</option>
                    <option value="childrens">Children's</option>
                    <option value="psychology">Psychology</option>
                  </select>

                  <select
                    value={bookStockFilter}
                    onChange={(e) => setBookStockFilter(e.target.value)}
                    className="bg-white border border-gray-300 rounded-none px-3 py-2.5 text-xs font-semibold text-gray-600 outline-none focus:border-charcoal"
                  >
                    <option value="all">All Stock Status</option>
                    <option value="instock">In Stock</option>
                    <option value="outofstock">Out of Stock</option>
                  </select>

                  <button
                    onClick={handleOpenAddBook}
                    className={`flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-white px-4 py-2.5 rounded-none shadow-sm ${accentBg}`}
                  >
                    <i className="fas fa-plus"></i>
                    <span>Catalog Book</span>
                  </button>
                </div>
              </div>

              {/* Books Inventory Grid */}
              <div className="bg-white border border-gray-200 rounded-none overflow-hidden">
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <table className="w-full text-left text-xs text-charcoal divide-y divide-gray-200 min-w-[700px]">
                    <thead>
                      <tr className="text-gray-400 uppercase tracking-widest font-bold">
                        <th className="p-4">Cover</th>
                        <th className="p-4">Book Details</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Rating</th>
                        <th className="p-4">Stock Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredBooks.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="p-8 text-center text-gray-400 font-light">No matching cataloged books found.</td>
                        </tr>
                      ) : (
                        filteredBooks.map(b => (
                          <tr key={b.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="p-4">
                              <div className={`w-9 h-12 bg-gradient-to-br ${b.coverColor || 'from-gray-700 to-gray-900'} rounded-none border border-white/10 shadow-sm flex items-center justify-center overflow-hidden relative`}>
                                {b.cover ? (
                                  <img src={b.cover} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <>
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-black/20"></div>
                                    <span className="text-[6px] text-white uppercase text-center font-serif leading-none font-extrabold line-clamp-2 p-1">
                                      {b.title}
                                    </span>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="block font-bold text-charcoal group-hover:text-gold transition-colors uppercase font-serif tracking-tight text-sm leading-tight">{b.title}</span>
                              <span className="block text-xs text-gray-400 font-light mt-0.5 uppercase tracking-wider">by {b.author}</span>
                              <span className="block text-[10px] text-gray-400 font-mono mt-1">ISBN: {b.isbn || 'N/A'}</span>
                            </td>
                            <td className="p-4">
                              <span className="uppercase text-[10px] font-bold tracking-widest text-charcoal bg-gray-50 border border-gray-150 px-2.5 py-0.5 rounded-none">
                                {b.category}
                              </span>
                            </td>
                            <td className="p-4 font-bold font-mono text-charcoal">
                              <span className="text-sm">${b.price.toFixed(2)}</span>
                              {b.originalPrice > b.price && (
                                <span className="block text-[10px] text-gray-400 line-through font-light mt-0.5">
                                  ${b.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </td>
                            <td className="p-4 font-bold font-mono">
                              <span className="text-amber-500 font-bold"><i className="fas fa-star mr-1"></i>{b.rating}</span>
                              <span className="block text-[10px] text-gray-400 font-light mt-0.5">({b.reviews} reviews)</span>
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded-none text-[10px] font-bold uppercase ${
                                b.inStock 
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                                  : 'bg-red-50 text-red-800 border border-red-200'
                              }`}>
                                {b.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end items-center space-x-2">
                                <button
                                  onClick={() => handleOpenEditBook(b)}
                                  className="w-8 h-8 rounded-none bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-500 hover:text-charcoal transition-colors"
                                  title="Edit Book Details"
                                >
                                  <i className="far fa-edit text-xs"></i>
                                </button>
                                <button
                                  onClick={() => handleDeleteBook(b.id, b.title)}
                                  className="w-8 h-8 rounded-none bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                                  title="Delete Book"
                                >
                                  <i className="far fa-trash-alt text-xs"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 3: ORDERS MANAGEMENT */}
          {/* ========================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Order filter header */}
              <div className="bg-white border border-gray-200 p-5 rounded-none flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Search */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search by ID, Name, or Email..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-none px-4 py-2.5 pl-10 text-sm text-charcoal placeholder-gray-400 outline-none focus:border-charcoal transition-colors"
                  />
                  <i className="fas fa-search absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="bg-white border border-gray-300 rounded-none px-3 py-2.5 text-xs font-semibold text-gray-600 outline-none focus:border-charcoal w-full md:w-auto"
                  >
                    <option value="all">All Order Statuses</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Orders datagrid */}
              <div className="bg-white border border-gray-200 rounded-none overflow-hidden">
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <table className="w-full text-left text-xs text-charcoal divide-y divide-gray-200 min-w-[800px]">
                    <thead>
                      <tr className="text-gray-400 uppercase tracking-widest font-bold">
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Date Placed</th>
                        <th className="p-4">Est. Delivery</th>
                        <th className="p-4">Price total</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="p-8 text-center text-gray-400 font-light">No transaction records match search.</td>
                        </tr>
                      ) : (
                        filteredOrders.map(o => (
                          <tr key={o.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="p-4 font-mono font-bold text-gray-500 group-hover:text-charcoal transition-colors">{o.id}</td>
                            <td className="p-4">
                              <span className="block font-bold text-charcoal">{o.customerName}</span>
                              <span className="block text-[10px] text-gray-400 mt-0.5">{o.customerEmail}</span>
                            </td>
                            <td className="p-4 font-light text-gray-500">{o.date}</td>
                            <td className="p-4 font-light font-mono text-gray-500">{o.estimatedDelivery || 'N/A'}</td>
                            <td className="p-4 font-bold font-mono text-charcoal text-sm">${o.total.toFixed(2)}</td>
                            <td className="p-4">
                              <span className={`px-2.5 py-0.5 rounded-none text-[10px] font-bold uppercase ${
                                o.status === 'delivered' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                                o.status === 'processing' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                                o.status === 'shipped' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                                'bg-red-50 text-red-800 border border-red-200'
                              }`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end items-center space-x-2">
                                <button
                                  onClick={() => handleOpenOrderDetails(o)}
                                  className="px-3 py-1.5 rounded-none bg-white border border-charcoal hover:bg-charcoal hover:text-white text-charcoal font-bold uppercase tracking-wider text-[10px] transition-all duration-300"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => handleDeleteOrder(o)}
                                  className="w-8 h-8 rounded-none bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                                  title="Delete record"
                                >
                                  <i className="far fa-trash-alt text-xs"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 4: USERS / CUSTOMERS */}
          {/* ========================================================== */}
          {activeTab === 'customers' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Filter and controls header */}
              <div className="bg-white border border-gray-200 p-5 rounded-none flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Search */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search by Name or Email..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-none px-4 py-2.5 pl-10 text-sm text-charcoal placeholder-gray-400 outline-none focus:border-charcoal transition-colors"
                  />
                  <i className="fas fa-search absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs"></i>
                </div>

                <button
                  onClick={() => {
                    setCustomerForm({ firstName: '', lastName: '', email: '', role: 'Customer' });
                    setShowCustomerModal(true);
                  }}
                  className={`flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-white px-4 py-2.5 rounded-none shadow-sm ${accentBg}`}
                >
                  <i className="fas fa-user-plus"></i>
                  <span>Register User</span>
                </button>
              </div>

              {/* Users catalog */}
              <div className="bg-white border border-gray-200 rounded-none overflow-hidden">
                <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                  <table className="w-full text-left text-xs text-charcoal divide-y divide-gray-200 min-w-[900px]">
                    <thead>
                      <tr className="text-gray-400 uppercase tracking-widest font-bold">
                        <th className="p-4">Initials</th>
                        <th className="p-4">Full Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Joined Date</th>
                        <th className="p-4">Dynamic Role</th>
                        <th className="p-4 font-mono text-center">Orders Placed</th>
                        <th className="p-4 font-mono">Spent total</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredUsers.map(u => (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="p-4">
                            <div className="w-8 h-8 rounded-none border border-gray-200 flex items-center justify-center text-[10px] font-bold text-charcoal bg-gray-50">
                              {u.firstName.charAt(0)}{u.lastName.charAt(0)}
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-charcoal group-hover:text-gold transition-colors">{u.firstName} {u.lastName}</td>
                          <td className="p-4 text-gray-500 font-mono">{u.email}</td>
                          <td className="p-4 text-gray-400 font-light">{u.joinedDate || '2024-01-01'}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-none text-[10px] font-bold uppercase ${
                              u.role === 'Admin' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                              u.role === 'Manager' ? 'bg-gray-100 text-gray-700 border border-gray-300' :
                              'bg-gray-50 text-gray-400 border border-gray-200'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold text-gray-500 text-center">{u.ordersCount || 0}</td>
                          <td className="p-4 font-mono font-bold text-charcoal">${(u.totalSpent || 0.00).toFixed(2)}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end items-center space-x-2">
                              <select
                                value={u.role}
                                onChange={(e) => handleChangeUserRole(u, e.target.value)}
                                disabled={u.email === 'admin@adiraybooks.com'}
                                className={`bg-white border border-gray-200 rounded px-2 py-1 text-[10px] outline-none focus:border-charcoal ${
                                  u.email === 'admin@adiraybooks.com' ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500'
                                }`}
                              >
                                <option value="Customer">Customer</option>
                                <option value="Manager">Manager</option>
                                <option value="Admin">Admin</option>
                              </select>
                              <button
                                onClick={() => handleDeleteUser(u.id, `${u.firstName} ${u.lastName}`)}
                                disabled={u.email === 'admin@adiraybooks.com'}
                                className={`w-7 h-7 rounded-none border flex items-center justify-center transition-colors ${
                                  u.email === 'admin@adiraybooks.com'
                                    ? 'bg-transparent border-gray-100 text-gray-300 cursor-not-allowed'
                                    : 'bg-white border-gray-200 hover:bg-red-50 hover:border-red-200 text-gray-400 hover:text-red-500'
                                }`}
                                title="Delete user"
                              >
                                <i className="far fa-trash-alt text-xs"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 5: SETTINGS & LIVE STYLERS */}
          {/* ========================================================== */}
          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
              
              {/* Core Store stats form */}
              <div className="bg-white border border-gray-200 p-6 rounded-none space-y-6">
                <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider pb-3 border-b border-gray-100 font-serif">
                  Shop Information
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Business Name</label>
                      <input
                        type="text"
                        value={storeSettings.storeName}
                        onChange={(e) => setStoreSettings(prev => ({ ...prev, storeName: e.target.value }))}
                        className="w-full bg-white border border-gray-300 rounded-none px-4 py-2.5 text-sm text-charcoal outline-none focus:border-charcoal"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Email</label>
                      <input
                        type="email"
                        value={storeSettings.contactEmail}
                        onChange={(e) => setStoreSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                        className="w-full bg-white border border-gray-300 rounded-none px-4 py-2.5 text-sm text-charcoal outline-none focus:border-charcoal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Default Currency</label>
                      <select
                        value={storeSettings.currency}
                        onChange={(e) => setStoreSettings(prev => ({ ...prev, currency: e.target.value }))}
                        className="w-full bg-white border border-gray-300 rounded-none px-4 py-2.5 text-sm text-[#000] outline-none focus:border-charcoal"
                      >
                        <option value="USD">US Dollar ($ USD)</option>
                        <option value="EUR">Euro (€ EUR)</option>
                        <option value="GBP">British Pound (£ GBP)</option>
                        <option value="UGX">Uganda Shilling (UGX)</option>
                        <option value="SDG">Sudanese Pound (SDG)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Calculated Sales Tax (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={storeSettings.taxRate}
                        onChange={(e) => setStoreSettings(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-white border border-gray-300 rounded-none px-4 py-2.5 text-sm text-charcoal outline-none focus:border-charcoal font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-center bg-gray-50 p-4 rounded-none border border-gray-200">
                    <div>
                      <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">Maintenance Outage Mode</h4>
                      <p className="text-[10px] text-gray-400 mt-1">Locks storefront access and alerts users to backend operations</p>
                    </div>
                    <button
                      onClick={handleToggleMaintenanceMode}
                      className={`w-12 h-6 rounded-full p-1 transition-colors ${storeSettings.maintenanceMode ? 'bg-red-600' : 'bg-gray-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${storeSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Accent themes layout picker */}
              <div className="bg-white border border-gray-200 p-6 rounded-none space-y-6">
                <h3 className="text-sm font-bold text-charcoal uppercase tracking-wider pb-3 border-b border-gray-100 font-serif">
                  Workspace Customization
                </h3>

                <div className="space-y-4">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Portal Accent Palette</label>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'gold', label: 'Gold Amber', border: 'border-amber-500 bg-amber-50 text-[#D4AF37]' },
                      { id: 'charcoal', label: 'Sharp Black', border: 'border-charcoal bg-gray-50 text-charcoal' },
                      { id: 'bronze', label: 'Bronze Orange', border: 'border-orange-500 bg-orange-50 text-orange-700' }
                    ].map(theme => {
                      const isSelected = storeSettings.themeAccent === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => handleSetAccentTheme(theme.id, theme.label)}
                          className={`p-4 rounded-none border text-center font-bold tracking-wide transition-all ${
                            isSelected 
                              ? theme.border + ' shadow-sm border-2' 
                              : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300'
                          }`}
                        >
                          <span className="block text-xs uppercase">{theme.label}</span>
                          <span className="block text-[8px] font-light mt-1 font-mono">{isSelected ? 'Active Accent' : 'Switch accent'}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-none text-xs leading-relaxed text-gray-500 font-light">
                    <h4 className="font-bold text-charcoal uppercase tracking-wide mb-1 text-[10px] font-serif">Theme Integration Note</h4>
                    Setting a highlights accent color directly adjusts the system glowing badges, border highlights, interactive SVG line slopes, progress status meters, and context buttons inside this Admin Portal.
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={handleResetSettings}
                      className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider rounded-none text-gray-600 transition-colors"
                    >
                      Reset Defaults
                    </button>
                    <button
                      onClick={handleSaveSettings}
                      className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-none shadow-sm ${accentBg}`}
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================== */}
      {/* FULLSCREEN NOTIFICATION CENTER */}
      {/* ========================================================== */}
      {showNotifications && (
        <div className="fixed inset-0 bg-[#F8F9FA] z-50 flex flex-col animate-fadeIn">
          <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 md:px-10 shrink-0">
            <div className="flex items-center space-x-4 min-w-0">
              <div className="w-10 h-10 rounded-none bg-charcoal text-white flex items-center justify-center shrink-0">
                <i className="far fa-bell text-sm"></i>
              </div>
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-bold font-serif uppercase tracking-widest text-charcoal truncate">
                  Notification Center
                </h3>
                <span className="block text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                  {notifications.length} active admin alert{notifications.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleClearNotifications}
                disabled={notifications.length === 0}
                className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider rounded-none transition-colors ${
                  notifications.length === 0
                    ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                }`}
              >
                Clear All
              </button>
              <button
                onClick={() => setShowNotifications(false)}
                className="w-10 h-10 rounded-none bg-white border border-gray-300 hover:bg-charcoal hover:text-white flex items-center justify-center text-gray-600 transition-colors"
                title="Close notifications"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Total Alerts', value: notifications.length, icon: 'far fa-bell', classes: 'border-gray-200 text-charcoal bg-white' },
                  { label: 'Warnings', value: notifications.filter(n => n.type === 'warning').length, icon: 'fas fa-exclamation-triangle', classes: 'border-amber-200 text-amber-700 bg-amber-50' },
                  { label: 'Updates', value: notifications.filter(n => n.type !== 'warning').length, icon: 'fas fa-check-circle', classes: 'border-emerald-200 text-emerald-700 bg-emerald-50' }
                ].map(item => (
                  <div key={item.label} className={`border rounded-none p-5 flex items-center justify-between ${item.classes}`}>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest opacity-70">{item.label}</span>
                      <span className="block text-3xl font-extrabold font-serif mt-1">{item.value}</span>
                    </div>
                    <i className={`${item.icon} text-lg opacity-70`}></i>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-none overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-charcoal uppercase tracking-widest font-serif">Syslog Alerts</h4>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-none ${accentBadge}`}>
                    Live Feed
                  </span>
                </div>

                {notifications.length === 0 ? (
                  <div className="min-h-80 flex flex-col items-center justify-center text-center px-6">
                    <div className="w-14 h-14 rounded-none border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300 mb-4">
                      <i className="far fa-bell-slash text-lg"></i>
                    </div>
                    <p className="text-sm font-semibold text-charcoal uppercase tracking-wide">No recent system notifications.</p>
                    <span className="text-xs text-gray-400 mt-1 font-light">New admin activity will appear here.</span>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map(n => {
                      const tone = n.type === 'warning'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : n.type === 'success'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200';
                      const icon = n.type === 'warning'
                        ? 'fas fa-exclamation-triangle'
                        : n.type === 'success'
                          ? 'fas fa-check'
                          : 'fas fa-info';

                      return (
                        <article key={n.id} className="p-5 md:p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                          <div className={`w-10 h-10 rounded-none border flex items-center justify-center shrink-0 ${tone}`}>
                            <i className={`${icon} text-xs`}></i>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm md:text-base text-charcoal font-light leading-relaxed">{n.text}</p>
                            <span className="text-[10px] text-gray-400 mt-2 block font-mono uppercase tracking-wider">{n.time}</span>
                          </div>
                          <span className={`hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-none border ${tone}`}>
                            {n.type}
                          </span>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}

      {/* ========================================================== */}
      {/* DIALOG DRAWERS: BOOK CREATION / MODIFICATION */}
      {/* ========================================================== */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-none w-full max-w-4xl p-6 shadow-xl animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
              <h3 className="text-sm sm:text-base font-bold font-serif uppercase tracking-widest text-charcoal truncate pr-4">
                {editingBook ? `Edit: ${editingBook.title}` : 'Catalog New Masterpiece'}
              </h3>
              <button 
                onClick={() => setShowBookModal(false)}
                className="text-gray-400 hover:text-charcoal transition-colors"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSaveBook} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-h-[70vh] overflow-y-auto pr-2">
              
              {/* Left visual cover preview */}
              <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-none border border-gray-200 lg:sticky lg:top-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Masterpiece Preview</span>
                            {/* Visual cover card */}
                <div className={`relative w-40 h-56 bg-gradient-to-br ${bookForm.coverColor} rounded-none shadow-md flex flex-col justify-between items-center p-3 border border-white/10 text-white overflow-hidden`}>
                  {bookForm.cover && (
                    <img 
                      src={bookForm.cover} 
                      alt="Cover Preview" 
                      className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 mix-blend-overlay z-10"></div>
                  <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-r from-black/20 via-white/5 to-transparent z-10"></div>
                  
                  <span className="text-[7px] tracking-widest uppercase opacity-75 font-semibold text-center mt-2 leading-none z-20">
                    {bookForm.category}
                  </span>
                  
                  <div className="text-center z-20">
                    <h4 className="text-[11px] font-serif font-bold tracking-tight uppercase leading-tight line-clamp-3 bg-black/40 px-1 py-0.5 rounded">
                      {bookForm.title || 'NEW BOOK TITLE'}
                    </h4>
                    <div className="w-6 h-0.5 bg-yellow-400 mx-auto my-1.5"></div>
                    <p className="text-[8px] font-light tracking-wide uppercase line-clamp-1 opacity-90 bg-black/40 px-1 py-0.5 rounded">
                      {bookForm.author || 'AUTHOR NAME'}
                    </p>
                  </div>

                  <span className="text-[6px] tracking-wider opacity-60 font-mono mb-2 z-20">
                    ADIRAY LIBRARY
                  </span>
                </div>

                {/* Cover presets dropdown */}
                <div className="w-full mt-6 space-y-1.5">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider text-left">Cover Color Accent Gradient</label>
                  <select
                    value={bookForm.coverColor}
                    onChange={(e) => setBookForm(prev => ({ ...prev, coverColor: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-charcoal outline-none focus:border-charcoal"
                  >
                    {gradientColors.map((g, idx) => (
                      <option key={idx} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Middle and Right edit fields */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Book Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. THE SILENT ALGORITHM"
                    value={bookForm.title}
                    onChange={(e) => setBookForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal placeholder-gray-400 outline-none focus:border-charcoal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Author Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. EVELYN REED"
                    value={bookForm.author}
                    onChange={(e) => setBookForm(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal placeholder-gray-400 outline-none focus:border-charcoal"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="e.g. 24.99"
                      value={bookForm.price}
                      onChange={(e) => setBookForm(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal font-mono placeholder-gray-400 outline-none focus:border-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Original Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 34.99"
                      value={bookForm.originalPrice}
                      onChange={(e) => setBookForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal font-mono placeholder-gray-400 outline-none focus:border-charcoal"
                    />
                  </div>
                </div>

                {/* Rating and Reviews are now automatic based on user feedback */}

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</label>
                  <select
                    value={bookForm.category}
                    onChange={(e) => setBookForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal outline-none focus:border-charcoal"
                  >
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="fiction">Fiction</option>
                    <option value="history">History</option>
                    <option value="educational">Educational</option>
                    <option value="inspirational">Inspirational</option>
                    <option value="childrens">Children's</option>
                    <option value="psychology">Psychology</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Page Count</label>
                    <input
                      type="number"
                      value={bookForm.pages}
                      onChange={(e) => setBookForm(prev => ({ ...prev, pages: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal font-mono outline-none focus:border-charcoal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Publication Date</label>
                    <input
                      type="text"
                      placeholder="e.g. October 2023"
                      value={bookForm.publishedDate}
                      onChange={(e) => setBookForm(prev => ({ ...prev, publishedDate: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal outline-none focus:border-charcoal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">ISBN Number</label>
                  <input
                    type="text"
                    placeholder="978-3-16-148410-0"
                    value={bookForm.isbn}
                    onChange={(e) => setBookForm(prev => ({ ...prev, isbn: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal font-mono outline-none focus:border-charcoal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Publisher</label>
                  <input
                    type="text"
                    value={bookForm.publisher}
                    onChange={(e) => setBookForm(prev => ({ ...prev, publisher: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal outline-none focus:border-charcoal"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Cover Image URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. https://images.unsplash.com/photo-... or leave blank for a dynamic themed cover"
                    value={bookForm.cover}
                    onChange={(e) => setBookForm(prev => ({ ...prev, cover: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal placeholder-gray-400 outline-none focus:border-charcoal"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Book Description</label>
                  <textarea
                    rows="3"
                    placeholder="Provide a description of the book..."
                    value={bookForm.description}
                    onChange={(e) => setBookForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal placeholder-gray-400 outline-none focus:border-charcoal resize-none"
                  ></textarea>
                </div>

                <div className="sm:col-span-2 pt-2 flex items-center space-x-6">
                  <label className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookForm.inStock}
                      onChange={(e) => setBookForm(prev => ({ ...prev, inStock: e.target.checked }))}
                      className="rounded-none border-gray-300 text-charcoal focus:ring-charcoal w-4 h-4"
                    />
                    <span>Available In Stock</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs text-charcoal cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookForm.featured}
                      onChange={(e) => setBookForm(prev => ({ ...prev, featured: e.target.checked }))}
                      className="rounded-none border-gray-300 text-charcoal focus:ring-charcoal w-4 h-4"
                    />
                    <span>Flag as Store Featured</span>
                  </label>
                </div>

                {/* Action buttons */}
                <div className="sm:col-span-2 pt-4 flex justify-end space-x-3 border-t border-gray-250">
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider rounded-none text-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-none text-white shadow-sm transition-all duration-300 ${accentBg}`}
                  >
                    Save Catalog Record
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* DIALOG DRAWERS: CUSTOMER REGISTRATION */}
      {/* ========================================================== */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-none w-full max-w-md p-6 shadow-xl animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-250 mb-6">
              <h3 className="text-base font-bold font-serif uppercase tracking-widest text-charcoal">
                Register Dynamic User Account
              </h3>
              <button 
                onClick={() => setShowCustomerModal(false)}
                className="text-gray-400 hover:text-charcoal transition-colors"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">First Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert"
                  value={customerForm.firstName}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal outline-none focus:border-charcoal"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kumar"
                  value={customerForm.lastName}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal outline-none focus:border-charcoal"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. robert@example.com"
                  value={customerForm.email}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal outline-none focus:border-charcoal font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account Role</label>
                <select
                  value={customerForm.role}
                  onChange={(e) => setCustomerForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs text-charcoal outline-none focus:border-charcoal"
                >
                  <option value="Customer">Customer</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-gray-250">
                <button
                  type="button"
                  onClick={() => setShowCustomerModal(false)}
                  className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider rounded-none text-gray-500 hover:text-charcoal transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-none text-white shadow-sm transition-all duration-300 ${accentBg}`}
                >
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* DIALOG DRAWERS: ORDER DETAIL INVOICE & ACTION */}
      {/* ========================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-gray-200 rounded-none w-full max-w-2xl p-6 shadow-xl animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-250 mb-4">
              <div>
                <h3 className="text-base font-bold font-serif uppercase tracking-widest text-charcoal">
                  Invoice: {selectedOrder.id}
                </h3>
                <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">Placed on {selectedOrder.date}</span>
              </div>
              <button 
                onClick={() => setSelectedOrderDetails(null)}
                className="text-gray-400 hover:text-charcoal transition-colors"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            {/* Invoice fields breakdown */}
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              
              {/* Customer and shipping details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs bg-gray-50 p-4 border border-gray-200">
                <div>
                  <h4 className="font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Profile</h4>
                  <span className="block font-bold text-charcoal">{selectedOrder.customerName}</span>
                  <span className="block text-gray-500 mt-1 font-mono">{selectedOrder.customerEmail}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-400 uppercase tracking-wider mb-2">Shipping Destination</h4>
                  <p className="text-gray-600 font-light leading-relaxed">{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              {/* Items Purchased list */}
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Items Purchased</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2.5 bg-gray-50 border border-gray-150 text-xs">
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`w-6 h-8 bg-gradient-to-br ${item.coverColor || 'from-gray-700 to-gray-900'} rounded-none border border-white/10 shrink-0 flex items-center justify-center p-0.5 overflow-hidden`}>
                          <span className="text-[5px] text-white uppercase text-center font-serif leading-none font-bold block truncate">
                            {item.title}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="block font-bold text-charcoal uppercase font-serif truncate">{item.title}</span>
                          <span className="block text-[10px] text-gray-400 font-light mt-0.5">by {item.author}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-right shrink-0">
                        <span className="text-gray-400 font-light font-mono">{item.quantity} qty</span>
                        <span className="font-bold font-mono text-charcoal">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping settings & tracking updater */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center pt-4 border-t border-gray-250">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tracking Number</label>
                  <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="TRK000000000"
                        value={selectedOrder.trackingNumber || ''}
                        onChange={(e) => handleUpdateOrderTracking(selectedOrder.id, e.target.value)}
                        className="bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-charcoal font-mono outline-none focus:border-charcoal flex-1"
                      />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order Status</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs font-semibold text-[#000] outline-none focus:border-charcoal"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Checkout details breakdown and total */}
              <div className="flex justify-between items-center bg-gray-50 p-4 border border-gray-200 text-xs">
                <span className="font-bold text-gray-400 uppercase tracking-wider">Grand Total Billing</span>
                <span className="text-lg font-bold font-mono text-[#D4AF37]">${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Success Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[100] animate-slideUp">
          <div className={`px-6 py-4 rounded-none shadow-2xl flex items-center space-x-3 border-l-4 ${
            toast.type === 'success' ? 'bg-white border-emerald-500 text-charcoal' : 
            toast.type === 'warning' ? 'bg-white border-amber-500 text-charcoal' : 
            'bg-white border-charcoal text-charcoal'
          }`}>
            <i className={`fas ${
              toast.type === 'success' ? 'fa-check-circle text-emerald-500' : 
              toast.type === 'warning' ? 'fa-exclamation-triangle text-amber-500' : 
              'fa-info-circle text-charcoal'
            }`}></i>
            <span className="text-sm font-bold uppercase tracking-wider">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
