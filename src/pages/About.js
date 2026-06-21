import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = "About Us & Our Curation Journey | Adiray Books";
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200"></div>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4">Welcome to Adiray Books</h2>
          <h1 className="text-4xl sm:text-6xl font-black text-charcoal mb-8 leading-tight">
            South Sudan's Leading <br/>
            <span className="text-amber-600">Online Bookstore!</span>
          </h1>
          <p className="text-xl text-gray-600 font-serif italic mb-8 max-w-2xl mx-auto">
            "At our bookstore, we believe that every book holds the power to inspire, educate and transform lives."
          </p>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p className="font-bold text-charcoal">
              Adiray Books aims at enhancing reading culture in South Sudan by providing good quality and affordable books.
            </p>
            <p>
              We are passionate about connecting readers of all ages with stories, ideas and knowledge that spark imagination and curiosity.
            </p>
            <p>
              From timeless classics and African Literature to modern bestsellers, our carefully selected collection is designed to create a welcoming space for booklovers.
            </p>
          </div>
          <div className="bg-amber-50 p-10 rounded-3xl border border-amber-100 relative">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-mustard rounded-full flex items-center justify-center -rotate-12 shadow-lg">
              <i className="fas fa-quote-left text-white text-2xl"></i>
            </div>
            <p className="text-2xl font-serif text-charcoal italic leading-snug">
              "More than just a bookstore, we are a community where readers can discover new worlds, share experiences and celebrate the joy of reading."
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center bg-charcoal text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 font-serif">We live for the books you can never put down</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 border border-white/10 rounded-2xl backdrop-blur-sm">
              <i className="fas fa-heart text-amber-500 text-3xl mb-4"></i>
              <p className="text-sm uppercase tracking-widest font-bold">Passion</p>
            </div>
            <div className="p-6 border border-white/10 rounded-2xl backdrop-blur-sm">
              <i className="fas fa-users text-amber-500 text-3xl mb-4"></i>
              <p className="text-sm uppercase tracking-widest font-bold">Community</p>
            </div>
            <div className="p-6 border border-white/10 rounded-2xl backdrop-blur-sm col-span-2 md:col-span-1">
              <i className="fas fa-star text-amber-500 text-3xl mb-4"></i>
              <p className="text-sm uppercase tracking-widest font-bold">Excellence</p>
            </div>
          </div>
          <a 
            href="/shop" 
            className="inline-block px-10 py-5 bg-mustard hover:bg-amber-600 text-charcoal font-black rounded-full transition-all transform hover:scale-105 shadow-2xl uppercase tracking-tighter"
          >
            Shop with us today and get lost in the pages
          </a>
        </div>
      </section>

      {/* Origin Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto border-t border-gray-100 pt-20">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-black text-amber-600 mb-2">10k+</div>
              <p className="text-charcoal font-bold p-2 uppercase tracking-widest text-xs">Carefully Selected Titles</p>
            </div>
            <div>
              <div className="text-5xl font-black text-amber-600 mb-2">2020</div>
              <p className="text-charcoal font-bold p-2 uppercase tracking-widest text-xs">Established in South Sudan</p>
            </div>
            <div>
              <div className="text-5xl font-black text-amber-600 mb-2">4.9/5</div>
              <p className="text-charcoal font-bold p-2 uppercase tracking-widest text-xs">Reader Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
