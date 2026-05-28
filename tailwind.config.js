/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FAF9F6', // elegant cream white
        'cream': '#FAF9F6',
        'gold': '#EEDC82', // subtle yellow
        'charcoal': '#0A0A0A', // sharp black
        'mustard': '#EEDC82',
        'light-gray': '#FAF9F6',
        'medium-gray': '#6C757D',
        'dark-gray': '#343A40'
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif']
      },
      boxShadow: {
        'light': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'heavy': '0 8px 32px rgba(0, 0, 0, 0.2)'
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.5s ease-out'
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(400px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        bounceSubtle: {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-2px)'
          }
        }
      }
    },
  },
  plugins: [],
}
