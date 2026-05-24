import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart, useOrders } from '../context/AppContext';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    document.title = "Secure Checkout | Adiray Books";
    // Redirect back if cart is empty
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP / Postal code is required';

    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Use MM/YY format';
    }

    if (!formData.cardCvv.trim()) {
      newErrors.cardCvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
      newErrors.cardCvv = 'CVV is invalid';
    }

    return newErrors;
  };

  const subtotal = cartTotal;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setIsProcessing(true);

      // Simulate payment network processing delay
      setTimeout(() => {
        const orderId = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const today = new Date().toISOString().split('T')[0];
        
        // Calculate estimated delivery: 5 days from now
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        const deliveryDateStr = deliveryDate.toISOString().split('T')[0];

        const newOrder = {
          id: orderId,
          date: today,
          status: 'processing',
          total: total,
          items: cart.map(item => ({
            id: item.id,
            title: item.title,
            author: item.author,
            price: item.price,
            quantity: item.quantity,
            coverColor: item.coverColor || 'from-charcoal to-black'
          })),
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}, ${formData.country}`,
          trackingNumber: `TRK${Math.floor(100000000 + Math.random() * 900000000)}`,
          estimatedDelivery: deliveryDateStr
        };

        // Add order to context and clear cart
        addOrder(newOrder);
        clearCart();
        
        setIsProcessing(false);
        navigate('/checkout/success', { state: { orderId, total, email: formData.email } });
      }, 2500);
    } else {
      setErrors(validationErrors);
      // Scroll to the first error input
      const firstErrorKey = Object.keys(validationErrors)[0];
      const errorElement = document.getElementsByName(firstErrorKey)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-white/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-gold animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold font-serif mb-2 uppercase tracking-widest text-gold">Processing Payment</h2>
          <p className="text-sm font-light text-gray-300">Securing your reading masterpieces... Please wait.</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-charcoal mb-10 font-serif text-center uppercase tracking-tight">
          Secure Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Billing Form Column */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Section 1: Customer & Shipping */}
              <div>
                <h2 className="text-xl font-bold font-serif text-charcoal pb-3 border-b border-gray-100 mb-6 uppercase tracking-wider">
                  Shipping Coordinates
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-none focus:outline-none focus:ring-1 focus:ring-charcoal ${
                        errors.firstName ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-none focus:outline-none focus:ring-1 focus:ring-charcoal ${
                        errors.lastName ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-none focus:outline-none focus:ring-1 focus:ring-charcoal ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="johndoe@example.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-none focus:outline-none focus:ring-1 focus:ring-charcoal ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="123 Book Lane, Library District"
                    />
                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-none focus:outline-none focus:ring-1 focus:ring-charcoal ${
                        errors.city ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Reading"
                    />
                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">ZIP / Postal Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-none focus:outline-none focus:ring-1 focus:ring-charcoal ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="10001"
                    />
                    {errors.zipCode && <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
              </div>

              {/* Section 2: Payment Details */}
              <div>
                <h2 className="text-xl font-bold font-serif text-charcoal pb-3 border-b border-gray-100 mb-6 uppercase tracking-wider">
                  Payment Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 border border-gray-100">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border rounded-none focus:outline-none focus:ring-1 focus:ring-charcoal ${
                        errors.cardName ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="JOHN DOE"
                    />
                    {errors.cardName && <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border rounded-none focus:outline-none focus:ring-1 focus:ring-charcoal ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="1111 2222 3333 4444"
                      maxLength={19}
                    />
                    {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border rounded-none focus:outline-none focus:ring-1 focus:ring-charcoal ${
                        errors.cardExpiry ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors.cardExpiry && <p className="text-xs text-red-500 mt-1">{errors.cardExpiry}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">CVV Code</label>
                    <input
                      type="password"
                      name="cardCvv"
                      value={formData.cardCvv}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white border rounded-none focus:outline-none focus:ring-1 focus:ring-charcoal ${
                        errors.cardCvv ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="***"
                      maxLength={4}
                    />
                    {errors.cardCvv && <p className="text-xs text-red-500 mt-1">{errors.cardCvv}</p>}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-16 bg-charcoal text-white font-semibold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors border border-charcoal flex items-center justify-center space-x-2"
              >
                <i className="fas fa-lock text-sm"></i>
                <span>Complete Order (${total.toFixed(2)})</span>
              </button>
            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:w-1/3">
            <div className="border border-gray-100 bg-gray-50 p-8 sticky top-28">
              <h3 className="text-lg font-bold font-serif text-charcoal pb-3 border-b border-gray-200 mb-6 uppercase tracking-wider">
                Checkout Summary
              </h3>

              {/* Items List */}
              <div className="divide-y divide-gray-200/60 max-h-80 overflow-y-auto mb-6 pr-2">
                {cart.map(item => (
                  <div key={item.id} className="py-4 flex space-x-4 items-center">
                    <div className="w-12 h-16 bg-gradient-to-br from-charcoal/20 to-black/20 flex-shrink-0 relative flex items-center justify-center text-white">
                      {item.cover ? (
                        <img src={item.cover} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px]">Book</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-charcoal text-sm truncate font-serif">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-charcoal">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Order Calculations */}
              <div className="space-y-4 text-sm text-gray-600 mb-6 border-t border-gray-200 pt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-charcoal font-semibold">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-charcoal font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-charcoal uppercase tracking-wider font-serif">Total</span>
                  <span className="text-2xl font-bold text-charcoal">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link to="/cart" className="block text-center text-xs font-semibold uppercase text-gray-400 hover:text-charcoal transition-colors tracking-widest">
                <i className="fas fa-arrow-left mr-2"></i> Modify Shopping Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
