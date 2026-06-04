import React, { useEffect } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { getBookCover, handleBookCoverError } from '../utils/coverGenerator';

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "Your Shopping Cart | Adiray Books";
  }, []);

  const { cart, updateCartQuantity, removeFromCart } = useOutletContext();

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const subtotal = getSubtotal();
  // Free shipping over $50, else $5.99
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% estimated tax
  const total = subtotal + shipping + tax;

  const handleProceedToCheckout = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <i className="fas fa-shopping-cart text-4xl text-gray-300"></i>
        </div>
        <h2 className="text-3xl font-bold text-charcoal mb-4 font-serif">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          Looks like you haven't added any books to your cart yet. Discover your next great read today.
        </p>
        <Link 
          to="/shop" 
          className="bg-charcoal text-white px-8 py-3 font-semibold uppercase tracking-widest hover:bg-black transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-charcoal mb-10 font-serif">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-widest">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center w-full">
                    <img
                      src={getBookCover(item)}
                      alt={item.title} 
                      className="w-20 sm:w-24 object-cover shadow-sm mr-6"
                      onError={handleBookCoverError}
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-charcoal text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{item.author}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 uppercase tracking-widest font-semibold flex items-center transition-colors"
                      >
                        <i className="fas fa-times mr-1"></i> Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-center w-full flex justify-between sm:block mt-4 sm:mt-0">
                    <span className="sm:hidden text-sm text-gray-500">Price:</span>
                    <span className="text-charcoal font-medium">${item.price.toFixed(2)}</span>
                  </div>

                  <div className="col-span-2 text-center w-full flex justify-between sm:block mt-4 sm:mt-0 items-center">
                    <span className="sm:hidden text-sm text-gray-500">Quantity:</span>
                    <div className="flex items-center justify-center border border-gray-200 rounded-sm w-24 mx-auto sm:mx-0">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-500 hover:text-charcoal hover:bg-gray-50 transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-500 hover:text-charcoal hover:bg-gray-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 text-right w-full flex justify-between sm:block mt-4 sm:mt-0">
                    <span className="sm:hidden text-sm text-gray-500">Total:</span>
                    <span className="text-charcoal font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-8 border border-gray-100 sticky top-28">
              <h2 className="text-xl font-bold text-charcoal mb-6 font-serif">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-charcoal font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gold">Free shipping on orders over $50!</p>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-charcoal font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-charcoal">Total</span>
                  <span className="text-2xl font-bold text-charcoal">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleProceedToCheckout} 
                className="w-full bg-charcoal text-white py-4 font-semibold uppercase tracking-widest hover:bg-orange-accent hover:text-white transition-colors mb-4 flex items-center justify-center border border-charcoal hover:border-orange-accent"
              >
                Proceed to Checkout <i className="fas fa-arrow-right ml-2"></i>
              </button>
              
              <Link to="/shop" className="block text-center text-sm text-charcoal hover:text-gold uppercase tracking-widest transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
