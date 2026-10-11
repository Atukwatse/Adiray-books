# Adiray Books - React.js Modern Bookstore

A high-fidelity, component-based online bookstore built with React.js and Tailwind CSS, featuring a minimalist design with bold mustard yellow (#FBBF24) and deep charcoal black (#121212) color scheme.

##  Features

### Design & Architecture
- **Component-Based**: Fully modular React architecture with reusable components
- **Color Palette**: Bold Mustard Yellow (#FBBF24) and Deep Charcoal Black (#121212)
- **Typography**: Elegant serif (Playfair Display) for headings, clean sans-serif (Inter) for body
- **Responsive**: Mobile-first design with seamless tablet and desktop experiences
- **Modern Stack**: React 18, Tailwind CSS 3, Webpack 5

### Component Structure
```
src/
├── components/
│   ├── Header.js           # Sticky navigation with search & cart
│   ├── Hero.js             # Hero section with elegant typography
│   ├── BookCard.js         # Modular book display component
│   ├── BookGrid.js         # Recursive product grid mapping
│   ├── FilterSidebar.js    # Genre & price filtering
│   ├── AuthorSpotlight.js  # Featured author section
│   ├── Footer.js           # Black footer with newsletter
│   └── Notification.js     # Toast notification system
├── App.js                  # Main application with state management
├── index.js               # React entry point
└── index.css              # Tailwind CSS with custom utilities
```

### Interactive Features
- **Advanced Search**: Real-time search with overlay interface (Ctrl+/)
- **Dynamic Filtering**: Genre checkboxes and price range slider
- **Smart Sorting**: Featured, price (low/high), and alphabetical sorting
- **Shopping Cart**: State management with visual feedback
- **Responsive Navigation**: Hamburger menu for mobile devices
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Keyboard Navigation**: Full keyboard accessibility support

###  Responsive Design
- **Mobile** (< 768px): Single column, collapsible navigation, slide-out filters
- **Tablet** (768px - 1024px): Two-column grid, repositioned sidebar
- **Desktop** (> 1024px): Four-column grid, fixed sidebar, full navigation

##  Technologies Used

### Core Dependencies
- **React 18.2.0**: Modern React with hooks and concurrent features
- **Tailwind CSS 3.3.0**: Utility-first CSS framework with custom configuration

### Development Tools
- **Webpack 5.88.0**: Module bundler with development server
- **Babel**: JavaScript transpilation with React preset
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### External Resources
- **Google Fonts**: Playfair Display & Inter typography
- **Font Awesome 6.4.0**: Icon library
- **Picsum Photos**: Placeholder image service

##  Installation & Setup
### Prerequisites
- Node.js 16+ and npm installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

##  Component Architecture

### App Component (Root)
- **State Management**: Cart, filters, search, UI state
- **Data Flow**: Props drilling for component communication
- **Effects**: Search/filter/sort logic with React hooks

### Header Component
- **Sticky Navigation**: Scroll-based shadow effects
- **Search Integration**: Overlay search interface
- **Cart Counter**: Real-time cart item count
- **Mobile Menu**: Responsive hamburger navigation

### BookCard Component
- **Modular Design**: Reusable for any book data
- **Interactive States**: Hover effects and add-to-cart feedback
- **Responsive Images**: Lazy loading with proper aspect ratios

### FilterSidebar Component
- **Dual Mode**: Desktop (fixed) and Mobile (slide-out)
- **Controlled Components**: Form state managed by parent
- **Clear Filters**: Mobile-specific reset functionality

### BookGrid Component
- **Recursive Mapping**: Efficient rendering of book arrays
- **Empty State**: User-friendly no-results message
- **Animation**: Staggered fade-in animations

##  Customization

### Colors
Modify `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'mustard': '#FBBF24',
      'charcoal': '#121212',
      // Add custom colors here
    }
  }
}
```

### Typography
Update font imports in `public/index.html` and font families in Tailwind config.

### Component Styling
Custom component classes are defined in `src/index.css` using Tailwind's @layer directive:
- `.btn-primary`: Primary button style
- `.btn-secondary`: Secondary button style
- `.book-card`: Book container styling
- `.nav-link`: Navigation link with hover effect

##  State Management

### Local State (useState)
- **Cart**: Array of book objects with quantities
- **Filters**: Selected genres, price range, sort option
- **UI**: Search overlay, mobile menu, notifications

### Effects (useEffect)
- **Search/Filter Logic**: Debounced filtering and sorting
- **Scroll Effects**: Header shadow on scroll
- **Keyboard Events**: Global keyboard shortcuts

### Data Flow
```
App (State) → Props → Components → Events → App (State Update)
```

##  Development Workflow

### Component Development
1. Create component in `src/components/`
2. Import and use in `App.js`
3. Pass props for data and callbacks
4. Add responsive classes with Tailwind

### Styling Approach
- **Utility-First**: Use Tailwind classes directly
- **Component Classes**: Define reusable component styles in CSS
- **Responsive Design**: Mobile-first with Tailwind breakpoints

### State Management
- **Local State**: useState for component-specific state
- **Lifting State**: Parent components manage shared state
- **Props Drilling**: Pass data and callbacks down to children

##  Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari/Chrome

##  Performance Features

- **Code Splitting**: Webpack automatically splits bundles
- **Tree Shaking**: Unused code eliminated in production
- **Image Optimization**: Lazy loading for book covers
- **CSS Purging**: Tailwind removes unused utilities in production
- **React.memo**: Components optimized for re-rendering

##  Key Interactions

### Search System
- **Keyboard Shortcut**: Ctrl+/ opens search overlay
- **Real-time Filtering**: Instant results as you type
- **Multi-field Search**: Title, author, and genre matching

### Shopping Cart
- **Add to Cart**: Visual feedback with button state change
- **Cart Counter**: Real-time item count in header
- **Cart Total**: Calculated total with quantity support

### Filtering & Sorting
- **Genre Filter**: Multi-select checkboxes
- **Price Range**: Interactive slider with live updates
- **Sort Options**: Featured, price, and alphabetical sorting

## 🚀 Future Enhancements

- **React Router**: Multi-page navigation
- **Context API**: Global state management
- **React Query**: Server state management
- **TypeScript**: Type safety throughout
- **Testing**: Jest & React Testing Library
- **E2E Testing**: Cypress or Playwright
- **PWA**: Offline functionality and app-like experience

# 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Adiray Books** - Built with React.js and Tailwind CSS for modern web experiences.
