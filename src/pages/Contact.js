import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit it
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-charcoal text-white border-b border-gray-100">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif tracking-tight">Contact Us</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 font-light tracking-wide">
              We're here to help you find your next great read
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <div className="bg-white p-8 border border-gray-100 shadow-sm">
                <h2 className="text-3xl font-bold text-charcoal mb-6 font-serif">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-light tracking-wide">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 font-light">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-light tracking-wide">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 font-light">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-light tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-light tracking-wide">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 font-light">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-light tracking-wide">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-none focus:ring-1 focus:ring-charcoal focus:border-charcoal ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us more about how we can help you..."
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 font-light">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-charcoal text-white py-3 px-6 rounded-none font-semibold uppercase tracking-widest text-xs hover:bg-black transition-all border border-charcoal mt-4"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Store Information */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold text-charcoal mb-6 font-serif">Visit Our Store</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <i className="fas fa-map-marker-alt text-charcoal mt-1"></i>
                    <div>
                      <p className="font-semibold text-charcoal uppercase tracking-widest text-xs mb-1">Address</p>
                      <p className="text-gray-500 font-light">
                        123 Book Street<br />
                        Reading District, RD 12345<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <i className="fas fa-phone text-charcoal mt-1"></i>
                    <div>
                      <p className="font-semibold text-charcoal uppercase tracking-widest text-xs mb-1">Phone</p>
                      <p className="text-gray-500 font-light">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <i className="fas fa-envelope text-charcoal mt-1"></i>
                    <div>
                      <p className="font-semibold text-charcoal uppercase tracking-widest text-xs mb-1">Email</p>
                      <p className="text-gray-500 font-light">info@adiraybooks.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <i className="fas fa-clock text-charcoal mt-1"></i>
                    <div>
                      <p className="font-semibold text-charcoal uppercase tracking-widest text-xs mb-1">Store Hours</p>
                      <p className="text-gray-500 font-light">
                        Monday - Friday: 9:00 AM - 8:00 PM<br />
                        Saturday: 10:00 AM - 6:00 PM<br />
                        Sunday: 12:00 PM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-charcoal border border-gray-800 rounded-none p-8 text-white shadow-sm">
                <h3 className="text-2xl font-bold mb-6 font-serif">Quick Contact</h3>
                <div className="space-y-4">
                  <p className="text-gray-300 font-light tracking-wide">
                    Have a quick question? Reach out to us through any of these channels:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="tel:+15551234567"
                      className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 p-3 rounded-none transition-colors border border-gray-700"
                    >
                      <i className="fas fa-phone text-gold"></i>
                      <span className="font-light text-sm tracking-wide">Call Us</span>
                    </a>
                    
                    <a
                      href="mailto:info@adiraybooks.com"
                      className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 p-3 rounded-none transition-colors border border-gray-700"
                    >
                      <i className="fas fa-envelope text-gold"></i>
                      <span className="font-light text-sm tracking-wide">Email Us</span>
                    </a>
                    
                    <a
                      href="#"
                      className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 p-3 rounded-none transition-colors border border-gray-700"
                    >
                      <i className="fab fa-whatsapp text-gold"></i>
                      <span className="font-light text-sm tracking-wide">WhatsApp</span>
                    </a>
                    
                    <a
                      href="#"
                      className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 p-3 rounded-none transition-colors border border-gray-700"
                    >
                      <i className="fas fa-comments text-gold"></i>
                      <span className="font-light text-sm tracking-wide">Live Chat</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold text-charcoal mb-6 font-serif">Follow Us</h3>
                <p className="text-gray-500 mb-4 font-light tracking-wide">
                  Stay connected with us on social media for updates, recommendations, and special offers!
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-50 border border-gray-200 hover:border-charcoal hover:text-charcoal rounded-none flex items-center justify-center transition-colors text-gray-400"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-50 border border-gray-200 hover:border-charcoal hover:text-charcoal rounded-none flex items-center justify-center transition-colors text-gray-400"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-50 border border-gray-200 hover:border-charcoal hover:text-charcoal rounded-none flex items-center justify-center transition-colors text-gray-400"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-50 border border-gray-200 hover:border-charcoal hover:text-charcoal rounded-none flex items-center justify-center transition-colors text-gray-400"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal mb-6 font-serif">Find Us</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light tracking-wide">
              Conveniently located in the heart of Reading District
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-none h-96 flex items-center justify-center border border-gray-300">
            <div className="text-center">
              <i className="fas fa-map-marked-alt text-6xl text-charcoal mb-4"></i>
              <p className="text-charcoal font-semibold tracking-widest uppercase text-sm mb-2">Interactive Map</p>
              <p className="text-gray-500 font-light">Map integration would go here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
