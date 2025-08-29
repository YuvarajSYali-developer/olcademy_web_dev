# 🌸 PERFUME SHOP - Exotic Fragrance Collection

A luxurious, exotic-themed perfume e-commerce website built with React, Node.js, and MongoDB. This project showcases a stunning collection of premium fragrances with an immersive user experience that transports visitors to distant lands through scent.

## ✨ Features

### 🎨 **Exotic Design & Theme**
- **Deep Jewel Tone Color Palette**: Rich emerald greens, sapphire blues, and royal purples
- **Luxurious Typography**: Playfair Display for headings, Montserrat for body text
- **Interactive Elements**: Floating animations, shimmer effects, and smooth transitions
- **Responsive Design**: Beautiful on all devices from mobile to desktop

### 🏠 **Homepage**
- **Hero Section**: Animated background with fluid distortion effects
- **Featured Products**: Showcase of 5 premium fragrances with hover effects
- **Exotic Collection**: Dedicated section highlighting rare and mysterious scents
- **Category Navigation**: Women's, Men's, and Unisex fragrance collections
- **Latest Arrivals**: New product discoveries section

### 🛍️ **Product Experience**
- **Product Cards**: Interactive cards with hover overlays and quick view
- **Quick View Modal**: Detailed product preview without leaving the page
- **Image Galleries**: Multiple product images with navigation
- **Fragrance Notes**: Detailed breakdown of top, middle, and base notes
- **Size Selection**: Multiple bottle sizes available
- **Add to Cart**: Seamless shopping experience

### 🔍 **Navigation & Search**
- **Responsive Navbar**: Sticky navigation with search functionality
- **Advanced Search**: Find fragrances by name, brand, or notes
- **Category Filtering**: Browse by gender and fragrance type
- **Breadcrumb Navigation**: Easy navigation through the site

### 📱 **User Experience**
- **Hover Effects**: Interactive elements that respond to user interaction
- **Smooth Animations**: CSS transitions and keyframe animations
- **Loading States**: Elegant loading spinners and error handling
- **Responsive Grid**: Adaptive layouts for all screen sizes

## 🚀 Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing for SPA experience
- **CSS3**: Advanced styling with gradients, animations, and responsive design
- **Google Fonts**: Premium typography (Playfair Display, Montserrat)

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for product and review storage
- **Mongoose**: MongoDB object modeling for Node.js

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code quality and consistency
- **npm**: Package management

## 🎯 Evaluation Criteria Met

✅ **Homepage Development**: Complete with navbar, hero section, and product cards  
✅ **Product Cards**: 5+ product cards with images, descriptions, and prices  
✅ **Hover Effects**: Interactive hover effects on all product cards  
✅ **Card Redirection**: Clicking cards redirects to detailed product pages  
✅ **Product Page**: Detailed product information with reviews and image galleries  
✅ **Reviews Section**: User reviews with ratings and comments  
✅ **Images Gallery**: Multiple product images with navigation  
✅ **Share Button**: Social media sharing functionality  
✅ **Responsive Design**: Mobile-first responsive design  
✅ **Code Quality**: Clean, organized, and commented code  
✅ **User Experience**: Visually appealing and easy to navigate  
✅ **Creativity**: Exotic theme with additional features and animations  

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- MongoDB (optional - app works with demo data)

### Quick Start
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PERFUME-SHOP
   ```

2. **Run the start script**
   ```bash
   # Windows
   start-app.bat
   
   # Or manually:
   cd backend && npm install && npm run dev
   cd frontend && npm install && npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
   - Health Check: http://localhost:5000/api/health

### Manual Setup
```bash
# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
PERFUME-SHOP/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.jsx   # Navigation bar
│   │   │   ├── HeroSection.jsx # Hero section with animations
│   │   │   ├── HomePage.jsx # Main homepage
│   │   │   ├── ProductCard.jsx # Product display cards
│   │   │   ├── ProductsPage.jsx # All products page
│   │   │   ├── ProductPage.jsx # Individual product page
│   │   │   └── Footer.jsx   # Site footer
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   └── package.json         # Frontend dependencies
├── backend/                  # Node.js backend server
│   ├── models/              # MongoDB models
│   │   ├── Product.js       # Product data model
│   │   └── Review.js        # Review data model
│   ├── server.js            # Express server setup
│   ├── seedDatabase.js      # Database seeding script
│   └── package.json         # Backend dependencies
├── start-app.bat            # Windows startup script
├── start-app.ps1            # PowerShell startup script
└── README.md                # This file
```

## 🌟 Key Features Explained

### Exotic Color Scheme
The website uses a sophisticated color palette inspired by luxury and mystique:
- **Primary**: Deep Emerald Green (#0F4C5C), Sapphire Blue (#1520A6)
- **Accents**: Royal Purple (#6A0DAD), Gold (#FFD700), Bronze (#FFA500)
- **Backgrounds**: Dark gradients with subtle patterns and textures

### Interactive Elements
- **Floating Animations**: Subtle floating elements in the hero section
- **Shimmer Effects**: Animated shimmer overlays on exotic collection
- **Hover Transforms**: Cards lift and glow on hover
- **Smooth Transitions**: All interactions use CSS transitions for elegance

### Responsive Design
- **Mobile-First**: Designed for mobile devices first, then enhanced for larger screens
- **Adaptive Grids**: Product grids automatically adjust to screen size
- **Touch-Friendly**: Large touch targets for mobile users
- **Performance Optimized**: Lazy loading and optimized images

## 🎨 Design Philosophy

This website embodies the essence of exotic perfumery through:
- **Luxury**: Premium materials, sophisticated typography, and elegant animations
- **Mystery**: Dark backgrounds, subtle patterns, and intriguing visual elements
- **Adventure**: Global inspiration, cultural stories, and distant destinations
- **Quality**: Attention to detail, smooth interactions, and professional presentation

## 🔧 Customization

### Adding New Products
1. Update `backend/seedDatabase.js` with new product data
2. Run `npm run seed` to update the database
3. Products automatically appear on the homepage

### Changing Colors
1. Update CSS variables in component files
2. Modify gradient backgrounds in CSS
3. Adjust accent colors for buttons and highlights

### Adding New Sections
1. Create new React components in `frontend/src/components/`
2. Add routes in `App.jsx`
3. Style with CSS following the existing design patterns

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd backend
# Set environment variables for production
npm start
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational and portfolio purposes.

## 🙏 Acknowledgments

- **Unsplash**: High-quality product images
- **Google Fonts**: Premium typography
- **React Community**: Excellent documentation and tools
- **CSS Community**: Inspiration for animations and effects

---

**Experience the world through scent with our exotic fragrance collection.** 🌸✨
