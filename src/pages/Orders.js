import React, { useState } from 'react';

const Orders = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample order data
  const orders = [
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

  const filters = [
    { value: 'all', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-amber-100 text-amber-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return 'fa-clock';
      case 'shipped':
        return 'fa-truck';
      case 'delivered':
        return 'fa-check-circle';
      case 'cancelled':
        return 'fa-times-circle';
      default:
        return 'fa-question-circle';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => 
                           item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.author.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesFilter && matchesSearch;
  });

  const handleTrackOrder = (trackingNumber) => {
    if (trackingNumber) {
      console.log('Tracking order:', trackingNumber);
      // Track order logic would go here
    }
  };

  const handleReorder = (order) => {
    console.log('Reordering:', order.id);
    // Reorder logic would go here
  };

  const handleCancelOrder = (orderId) => {
    console.log('Cancelling order:', orderId);
    // Cancel order logic would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-amber-700 to-orange-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">My Orders</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Track and manage your book orders
            </p>
          </div>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-amber-200">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {filters.map(filter => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search orders by ID, book title, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-shopping-bag text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'You haven\'t placed any orders yet'}
              </p>
              {!searchTerm && (
                <a href="/shop" className="inline-block bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors">
                  Start Shopping
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-200">
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 md:mt-0">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          <i className={`fas ${getStatusIcon(order.status)} mr-2`}></i>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <span className="text-lg font-bold text-amber-700">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map(item => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <div className={`w-16 h-20 bg-gradient-to-br ${item.coverColor} rounded-lg flex-shrink-0`}></div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-600">by {item.author}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-amber-700 font-semibold">${item.price}</span>
                              <span className="text-gray-500 mx-2">×</span>
                              <span className="text-gray-600">Qty: {item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                          <p className="text-sm text-gray-600">{order.shippingAddress}</p>
                          
                          {order.trackingNumber && (
                            <div className="mt-3">
                              <h4 className="font-semibold text-gray-900 mb-2">Tracking Information</h4>
                              <p className="text-sm text-gray-600">Tracking #: {order.trackingNumber}</p>
                              <p className="text-sm text-gray-600">
                                Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => handleTrackOrder(order.trackingNumber)}
                            disabled={!order.trackingNumber}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                              order.trackingNumber
                                ? 'bg-amber-700 text-white hover:bg-amber-800'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            <i className="fas fa-truck mr-2"></i>
                            Track Order
                          </button>
                          
                          {order.status === 'delivered' && (
                            <button
                              onClick={() => handleReorder(order)}
                              className="px-4 py-2 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition-colors"
                            >
                              <i className="fas fa-redo mr-2"></i>
                              Reorder
                            </button>
                          )}
                          
                          {order.status === 'processing' && (
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                            >
                              <i className="fas fa-times mr-2"></i>
                              Cancel Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Need Help With Your Orders?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our customer service team is here to assist you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-phone text-amber-700 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Get immediate assistance</p>
              <a href="tel:+15551234567" className="text-amber-700 font-semibold hover:text-amber-800">
                +1 (555) 123-4567
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-envelope text-amber-700 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
              <a href="mailto:support@adiraybooks.com" className="text-amber-700 font-semibold hover:text-amber-800">
                support@adiraybooks.com
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-comments text-amber-700 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our team</p>
              <button className="text-amber-700 font-semibold hover:text-amber-800">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Orders;
