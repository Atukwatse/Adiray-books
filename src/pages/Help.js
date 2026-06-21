import React, { useState, useEffect } from 'react';
import Contact from './Contact';

const Help = () => {
  useEffect(() => {
    document.title = "Help & Support Center | Adiray Books";
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <Contact />;
  }

  const categories = [
    { id: 'all', label: 'All Topics', icon: 'fa-th-large' },
    { id: 'orders', label: 'Orders & Shipping', icon: 'fa-shopping-bag' },
    { id: 'account', label: 'Account', icon: 'fa-user' },
    { id: 'payments', label: 'Payments', icon: 'fa-credit-card' },
    { id: 'returns', label: 'Returns & Refunds', icon: 'fa-undo' },
    { id: 'books', label: 'Books & Reading', icon: 'fa-book' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'orders',
      question: 'How do I track my order?',
      answer: 'You can track your order by visiting the "My Orders" page in your account. Click on the order you want to track, and you will see the current status and tracking information. You can also click the "Track Order" button to get real-time updates.'
    },
    {
      id: 2,
      category: 'orders',
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business day delivery. International shipping may take 10-15 business days depending on the destination.'
    },
    {
      id: 3,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on "Forgot Password" on the login page. Enter your email address, and we will send you a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      id: 4,
      category: 'account',
      question: 'How can I update my profile information?',
      answer: 'Go to "My Profile" in your account settings. You can update your personal information, address, phone number, and other details. Don\'t forget to save your changes!'
    },
    {
      id: 5,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely through our encrypted payment system.'
    },
    {
      id: 6,
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Yes! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers. All transactions are processed through secure, PCI-compliant payment gateways.'
    },
    {
      id: 7,
      category: 'returns',
      question: 'What is your return policy?',
      answer: <>We offer a <a href="/refund-policy" className="text-amber-600 font-bold hover:underline">2-day return policy</a> for most items. Books must be in original condition with no damage or markings. Please contact us at info@adiraybooks.com to initiate a return.</>
    },
    {
      id: 8,
      category: 'returns',
      question: 'How long do refunds take to process?',
      answer: 'Once we receive your returned item, refunds are typically processed within 3-5 business days. The time it takes for the refund to appear in your account depends on your bank or payment provider, usually 5-10 business days.'
    },
    {
      id: 9,
      category: 'books',
      question: 'Can I download books for offline reading?',
      answer: 'Yes! Many of our books are available for download. Look for the "Download" button on the book details page. Downloaded books can be read through our mobile app without an internet connection.'
    },
    {
      id: 10,
      category: 'books',
      question: 'How do I save my reading progress?',
      answer: 'Your reading progress is automatically saved when you read through our website or mobile app. You can also manually bookmark pages and add notes for future reference.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">


      {/* Quick Help Cards */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-center ${
                  activeCategory === category.id
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-200 bg-white hover:border-amber-300 hover:bg-amber-50'
                }`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  activeCategory === category.id ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-600'
                }`}>
                  <i className={`fas ${category.icon} text-sm sm:text-lg`}></i>
                </div>
                <p className={`font-semibold text-xs sm:text-sm ${
                  activeCategory === category.id ? 'text-amber-900' : 'text-gray-700'
                }`}>
                  {category.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-amber-900">
                Frequently Asked Questions
                {activeCategory !== 'all' && (
                  <span className="text-amber-600 text-sm sm:text-base font-normal ml-2">
                    - {categories.find(c => c.id === activeCategory)?.label}
                  </span>
                )}
              </h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {filteredFaqs.length} questions found
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredFaqs.length === 0 ? (
                <div className="p-6 sm:p-8 text-center">
                  <i className="fas fa-search text-4xl sm:text-5xl text-gray-300 mb-4"></i>
                  <p className="text-gray-600 text-sm sm:text-base">No questions found matching your search.</p>
                  <button
                    onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
                    className="mt-4 text-amber-600 font-semibold hover:text-amber-700 text-sm sm:text-base"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                filteredFaqs.map(faq => (
                  <div key={faq.id} className="p-4 sm:p-6 lg:p-8">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4 group-hover:text-amber-600 transition-colors">
                        {faq.question}
                      </span>
                      <i className={`fas fa-chevron-down text-amber-600 transform transition-transform flex-shrink-0 text-sm sm:text-base ${
                        expandedFaq === faq.id ? 'rotate-180' : ''
                      }`}></i>
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3 sm:mb-4">Still Need Help?</h2>
            <p className="text-gray-600 text-sm sm:text-base">Our support team is here to assist you</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-amber-200 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="fas fa-phone text-amber-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Available Mon-Fri, 9am-6pm</p>
              <a href="tel:+256744219162" className="text-amber-600 font-semibold hover:text-amber-700 text-sm sm:text-base">
                +254 744 219 162
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-amber-200 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="fas fa-envelope text-amber-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">We respond within 24 hours</p>
              <a href="mailto:support@adiraybooks.com" className="text-amber-600 font-semibold hover:text-amber-700 text-sm sm:text-base">
                support@adiraybooks.com
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-amber-200 text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="fas fa-comments text-amber-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Chat with our team in real-time</p>
              <button className="text-amber-600 font-semibold hover:text-amber-700 text-sm sm:text-base">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3 sm:mb-4">Additional Resources</h2>
            <p className="text-gray-600 text-sm sm:text-base">Explore more ways to get the most out of Adiray Books</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <a href="#" className="group p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors">
              <i className="fas fa-video text-amber-600 text-2xl sm:text-3xl mb-2 sm:mb-3"></i>
              <h3 className="font-bold text-amber-900 mb-1 sm:mb-2 text-sm sm:text-base">Video Tutorials</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Learn how to use our platform with step-by-step videos</p>
            </a>

            <a href="#" className="group p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors">
              <i className="fas fa-book text-amber-600 text-2xl sm:text-3xl mb-2 sm:mb-3"></i>
              <h3 className="font-bold text-amber-900 mb-1 sm:mb-2 text-sm sm:text-base">User Guide</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Comprehensive documentation for all features</p>
            </a>

            <a href="#" className="group p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors">
              <i className="fas fa-users text-amber-600 text-2xl sm:text-3xl mb-2 sm:mb-3"></i>
              <h3 className="font-bold text-amber-900 mb-1 sm:mb-2 text-sm sm:text-base">Community Forum</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Connect with other readers and share recommendations</p>
            </a>

            <a href="#" className="group p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors">
              <i className="fas fa-newspaper text-amber-600 text-2xl sm:text-3xl mb-2 sm:mb-3"></i>
              <h3 className="font-bold text-amber-900 mb-1 sm:mb-2 text-sm sm:text-base">Blog & News</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Stay updated with the latest news and reading tips</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
