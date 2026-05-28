import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Disconnect.",
    subtitle: "Reconnect.",
    description: "Step away from the screen. Discover our curated collection of physical books designed to inspire, educate, and bring peace to your space.",
    image: "/images/hero-reading.png",
    primaryText: "Explore Collection",
    primaryLink: "/shop",
    secondaryText: "Our Philosophy",
    secondaryLink: "/about",
    accent: "bg-gold/20"
  },
  {
    id: 2,
    title: "Our Book Club",
    subtitle: "Join the Conversation.",
    description: "A celebration of friendship, self-discovery, and finding peace. Join our exclusive community to discuss this month's top literary picks.",
    image: "/images/hero-book-club.png",
    primaryText: "Join Now",
    primaryLink: "/about",
    secondaryText: "View Picks",
    secondaryLink: "/shop",
    accent: "bg-gray-100"
  },
  {
    id: 3,
    title: "Little Minds.",
    subtitle: "Big Adventures.",
    description: "Nurture creativity and imagination with our carefully selected range of beautifully illustrated children's books and learning materials.",
    image: "/images/hero-childrens.png",
    primaryText: "Shop Kids",
    primaryLink: "/shop",
    secondaryText: "Learn More",
    secondaryLink: "/about",
    accent: "bg-gold/10"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative bg-white overflow-hidden py-8 lg:py-12 group">
      {/* Slider Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 hover:bg-charcoal text-charcoal hover:text-white border border-gray-200 hover:border-charcoal flex items-center justify-center transition-all shadow-sm opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left text-xl"></i>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 hover:bg-charcoal text-charcoal hover:text-white border border-gray-200 hover:border-charcoal flex items-center justify-center transition-all shadow-sm opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right text-xl"></i>
      </button>

      {/* Slide Content */}
      <div className="hero-content-container responsive-container">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`transition-opacity duration-1000 absolute inset-0 flex items-center w-full h-full ${
                index === currentSlide ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="hero-grid">
                {/* Left Content - Typography */}
                <div className="hero-text-col">
                  <div className="space-y-6">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight font-serif">
                      {slide.title}
                      <span className="block italic font-light mt-2 text-gray-800">{slide.subtitle}</span>
                    </h1>
                    <p className="hero-desc">
                      {slide.description}
                    </p>
                  </div>

                  <div className="hero-actions">
                    <Link to={slide.primaryLink} className="bg-charcoal text-white border border-charcoal py-3 px-8 font-semibold tracking-widest text-sm uppercase hover:bg-white hover:text-charcoal transition-all text-center">
                      {slide.primaryText}
                    </Link>
                    <Link to={slide.secondaryLink} className="bg-white text-charcoal border border-gray-300 py-3 px-8 font-semibold tracking-widest text-sm uppercase hover:border-charcoal transition-all text-center">
                      {slide.secondaryText}
                    </Link>
                  </div>
                </div>

                {/* Right Content - Generated Image */}
                <div className="hero-img-col">
                  <div className="hero-img-wrapper">
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      className="hero-img"
                    />
                    {/* Decorative accents */}
                    <div className={`absolute -bottom-6 -left-6 w-32 h-32 ${slide.accent} -z-10`}></div>
                    <div className="absolute -top-6 -right-6 w-48 h-48 border border-charcoal/20 -z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 transition-all ${
              index === currentSlide ? 'bg-charcoal scale-110' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
