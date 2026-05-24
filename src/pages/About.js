import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = "About Us & Our Curation Journey | Adiray Books";
  }, []);

  return (
    <div className="min-h-screen bg-white">


      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6 font-serif">Our Mission</h2>
            <div className="flex justify-center items-center space-x-8 text-charcoal">
              <div className="text-center">
                <i className="fas fa-book-open text-3xl mb-2"></i>
                <p className="font-bold tracking-widest uppercase text-xs">Read</p>
              </div>
              <div className="text-2xl text-gray-300">•</div>
              <div className="text-center">
                <i className="fas fa-graduation-cap text-3xl mb-2"></i>
                <p className="font-bold tracking-widest uppercase text-xs">Learn</p>
              </div>
              <div className="text-2xl text-gray-300">•</div>
              <div className="text-center">
                <i className="fas fa-seedling text-3xl mb-2"></i>
                <p className="font-bold tracking-widest uppercase text-xs">Grow</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-charcoal rounded-none flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-book-open text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-4 text-center tracking-widest uppercase">Read</h3>
              <p className="text-gray-500 text-center leading-relaxed font-light">
                We believe in the transformative power of reading. Every book opens new worlds, 
                introduces fresh perspectives, and sparks the imagination. Our carefully curated 
                collection ensures that every reader finds their perfect match.
              </p>
            </div>

            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-charcoal rounded-none flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-graduation-cap text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-4 text-center tracking-widest uppercase">Learn</h3>
              <p className="text-gray-500 text-center leading-relaxed font-light">
                Knowledge is the foundation of growth. We provide educational resources, 
                academic texts, and learning materials that empower students, professionals, 
                and lifelong learners to achieve their goals.
              </p>
            </div>

            <div className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-charcoal rounded-none flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-seedling text-white text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-4 text-center tracking-widest uppercase">Grow</h3>
              <p className="text-gray-500 text-center leading-relaxed font-light">
                Personal growth begins with a single page. Our inspirational and self-help 
                collection provides the tools and wisdom needed for personal development, 
                career advancement, and spiritual enlightenment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-charcoal mb-6 font-serif">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed font-light">
                <p>
                  Founded in 2020, Adiray Books began as a small bookstore with a big vision: 
                  to create a space where knowledge meets inspiration. Our founder, Sarah Adiray, 
                  believed that books should be accessible to everyone and that reading should be 
                  a transformative experience.
                </p>
                <p>
                  What started as a modest collection of 500 books has grown into a comprehensive 
                  library of over 10,000 titles spanning every genre imaginable. From academic 
                  textbooks to inspirational novels, from children's stories to professional 
                  development guides, we've carefully curated each selection to serve our diverse 
                  community of readers.
                </p>
                <p>
                  Today, Adiray Books stands as a beacon of knowledge and learning, serving 
                  thousands of readers across the region. Our commitment to quality, affordability, 
                  and exceptional customer service remains unwavering as we continue to expand 
                  our offerings and reach new readers.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-none border border-gray-100 shadow-sm h-96 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-book-reader text-6xl text-charcoal mb-4"></i>
                  <p className="text-charcoal font-semibold tracking-widest uppercase text-sm">Est. 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6 font-serif">Our Values</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded-none flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-handshake text-charcoal text-xl"></i>
              </div>
              <h3 className="text-sm font-bold text-charcoal mb-3 tracking-widest uppercase">Integrity</h3>
              <p className="text-gray-500 font-light text-sm">We operate with honesty and transparency in all our dealings</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded-none flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-heart text-charcoal text-xl"></i>
              </div>
              <h3 className="text-sm font-bold text-charcoal mb-3 tracking-widest uppercase">Passion</h3>
              <p className="text-gray-500 font-light text-sm">We love books and are passionate about sharing that love</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded-none flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-users text-charcoal text-xl"></i>
              </div>
              <h3 className="text-sm font-bold text-charcoal mb-3 tracking-widest uppercase">Community</h3>
              <p className="text-gray-500 font-light text-sm">We build connections through shared reading experiences</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border border-gray-200 rounded-none flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-star text-charcoal text-xl"></i>
              </div>
              <h3 className="text-sm font-bold text-charcoal mb-3 tracking-widest uppercase">Excellence</h3>
              <p className="text-gray-500 font-light text-sm">We strive for excellence in everything we do</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-charcoal text-white border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif mb-2 text-white">10,000+</div>
              <p className="text-gray-400 font-light tracking-widest uppercase text-xs mt-3">Books in Collection</p>
            </div>
            <div>
              <div className="text-4xl font-serif mb-2 text-white">5,000+</div>
              <p className="text-gray-400 font-light tracking-widest uppercase text-xs mt-3">Happy Readers</p>
            </div>
            <div>
              <div className="text-4xl font-serif mb-2 text-white">50+</div>
              <p className="text-gray-400 font-light tracking-widest uppercase text-xs mt-3">Categories</p>
            </div>
            <div>
              <div className="text-4xl font-serif mb-2 text-white">4.8/5</div>
              <p className="text-gray-400 font-light tracking-widest uppercase text-xs mt-3">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6 font-serif">Meet Our Team</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light">
              The passionate people behind Adiray Books
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-none mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-user text-gray-300 text-4xl"></i>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-1 font-serif">Sarah Adiray</h3>
              <p className="text-gold font-semibold uppercase tracking-widest text-xs mb-3">Founder & CEO</p>
              <p className="text-sm text-gray-500 font-light">Leading with passion and vision</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-none mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-user text-gray-300 text-4xl"></i>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-1 font-serif">Michael Chen</h3>
              <p className="text-gold font-semibold uppercase tracking-widest text-xs mb-3">Head Curator</p>
              <p className="text-sm text-gray-500 font-light">Selecting the best books for our readers</p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-none mx-auto mb-6 flex items-center justify-center">
                <i className="fas fa-user text-gray-300 text-4xl"></i>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-1 font-serif">Emily Johnson</h3>
              <p className="text-gold font-semibold uppercase tracking-widest text-xs mb-3">Customer Experience Lead</p>
              <p className="text-sm text-gray-500 font-light">Ensuring every customer has a great experience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
