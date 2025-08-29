import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Removed unused transition group imports
import HeroSection from './HeroSection';
import ProductCard from './ProductCard';
import ScentExplorer from './ScentExplorer';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVibe, setSelectedVibe] = useState(null);

  // Enhanced fallback data with more exotic perfumes
  const fallbackProducts = [
    {
      _id: 'fallback-1',
      name: "Chanel No. 5",
      brand: "Chanel",
      shortDescription: "Timeless floral fragrance with aldehydic bouquet",
      price: 150,
      images: [
        "/PICTURES/pexels-valeriya-965989.jpg",
        "/PICTURES/pexels-valeriya-1961791.jpg",
        "/PICTURES/pexels-valeriya-724635.jpg"
      ],
      category: "women",
      featured: true
    },
    {
      _id: 'fallback-2',
      name: "Dior Sauvage",
      brand: "Dior",
      shortDescription: "Fresh and powerful woody fragrance for men",
      price: 125,
      images: [
        "/PICTURES/pexels-valeriya-1961792.jpg",
        "/PICTURES/pexels-didsss-1190829.jpg",
        "/PICTURES/pexels-pixabay-264950.jpg"
      ],
      category: "men",
      featured: true
    },
    {
      _id: 'fallback-3',
      name: "Tom Ford Black Orchid",
      brand: "Tom Ford",
      shortDescription: "Luxurious and mysterious unisex fragrance",
      price: 180,
      images: [
        "/PICTURES/pexels-valeriya-965990.jpg",
        "/PICTURES/pexels-valeriya-724635.jpg",
        "/PICTURES/pexels-mareefe-932577.jpg"
      ],
      category: "unisex",
      featured: true
    },
    {
      _id: 'fallback-4',
      name: "Versace Bright Crystal",
      brand: "Versace",
      shortDescription: "Light and fruity fragrance with floral notes",
      price: 95,
      images: [
        "/PICTURES/pexels-mareefe-932577.jpg",
        "/PICTURES/pexels-valeriya-1961791.jpg",
        "/PICTURES/pexels-valeriya-965989.jpg"
      ],
      category: "women",
      featured: true
    },
    {
      _id: 'fallback-5',
      name: "Armani Code",
      brand: "Giorgio Armani",
      shortDescription: "Sophisticated oriental fragrance for men",
      price: 110,
      images: [
        "/PICTURES/pexels-pixabay-264950.jpg",
        "/PICTURES/pexels-didsss-1190829.jpg",
        "/PICTURES/pexels-valeriya-1961792.jpg"
      ],
      category: "men",
      featured: true
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);
  
  // Filter products when vibe changes
  useEffect(() => {
    if (!products.length) return;
    
    if (!selectedVibe) {
      setFilteredProducts(products);
      return;
    }
    
    // Filter logic based on vibe
    const filterByVibe = (vibe, mainVibe) => {
      // Map vibes to product categories and characteristics
      const vibeMap = {
        // Energetic vibes
        'energetic': product => product.category === 'men' || product.shortDescription.toLowerCase().includes('fresh'),
        'fresh': product => product.shortDescription.toLowerCase().includes('fresh') || product.shortDescription.toLowerCase().includes('citrus'),
        'sporty': product => product.category === 'men' && product.shortDescription.toLowerCase().includes('fresh'),
        'vibrant': product => product.shortDescription.toLowerCase().includes('vibrant') || product.shortDescription.toLowerCase().includes('energetic'),
        
        // Romantic vibes
        'romantic': product => product.category === 'women' || product.shortDescription.toLowerCase().includes('floral'),
        'delicate': product => product.shortDescription.toLowerCase().includes('floral') || product.shortDescription.toLowerCase().includes('light'),
        'warm': product => product.shortDescription.toLowerCase().includes('warm') || product.shortDescription.toLowerCase().includes('sweet'),
        'sweet': product => product.shortDescription.toLowerCase().includes('sweet') || product.shortDescription.toLowerCase().includes('fruity'),
        
        // Mysterious vibes
        'mysterious': product => product.category === 'unisex' || product.shortDescription.toLowerCase().includes('mysterious'),
        'intriguing': product => product.shortDescription.toLowerCase().includes('mysterious') || product.shortDescription.toLowerCase().includes('exotic'),
        'deep': product => product.shortDescription.toLowerCase().includes('deep') || product.shortDescription.toLowerCase().includes('rich'),
        'exotic': product => product.shortDescription.toLowerCase().includes('exotic') || product.shortDescription.toLowerCase().includes('spicy')
      };
      
      // Use specific vibe filter or fallback to main vibe
      const filterFn = vibeMap[vibe] || vibeMap[mainVibe] || (() => true);
      return products.filter(filterFn);
    };
    
    const filtered = filterByVibe(selectedVibe.detailedVibe, selectedVibe.mainVibe);
    setFilteredProducts(filtered.length ? filtered : products); // Fallback to all products if no matches
  }, [selectedVibe, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setProducts(data);
        setFilteredProducts(data);
      } else {
        console.warn('No products returned from backend, using fallback data');
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
      }
    } catch (err) {
      console.warn('Failed to fetch products from backend, using fallback data:', err.message);
      setProducts(fallbackProducts);
      setFilteredProducts(fallbackProducts);
      setError('Backend connection failed, showing demo products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  const featuredProducts = products.filter(product => product.featured);
  const allProducts = products.length > 0 ? products : fallbackProducts;

    const handleVibeSelect = (detailedVibe, mainVibe) => {
    if (!detailedVibe) {
      setSelectedVibe(null);
      return;
    }
    
    setSelectedVibe({
      detailedVibe,
      mainVibe
    });
    
    // Scroll to products section with animation
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      window.scrollTo({
        top: productsSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="homepage">
      <HeroSection />
      
      {error && (
        <div className="warning-banner">
          <p>⚠️ {error}</p>
          <button onClick={fetchProducts} className="retry-button">
            Try Again
          </button>
        </div>
      )}
      
      {/* Scent Explorer Quiz */}
      <section className="scent-explorer-section">
        <ScentExplorer onVibeSelect={handleVibeSelect} />
      </section>
      
      <section id="products-section" className="featured-products">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Featured Fragrances</h2>
            <p className="section-subtitle">
              {selectedVibe 
                ? `Curated ${selectedVibe.detailedVibe} fragrances for your ${selectedVibe.mainVibe} mood` 
                : 'Discover our most prestigious and luxurious fragrances from world-renowned brands'}
            </p>
          </motion.div>
          
          <div className="products-grid">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
            {(selectedVibe ? filteredProducts : featuredProducts).map((product) => (
              <motion.div
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                exit={{ opacity: 0, y: -20 }}
                layout
                className="product-item"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
            </motion.div>
          </div>
          <div className="view-all-container">
            <Link to="/products" className="view-all-button">
              Explore All Collections
            </Link>
          </div>
        </div>
      </section>

      <section className="exotic-collection">
        <div className="container">
          <h2 className="section-title">Exotic Collection</h2>
          <p className="section-subtitle">
            Journey through rare and mysterious fragrances that tell stories of distant lands
          </p>
          
          <div className="exotic-content">
            <div className="exotic-text">
              <h3>Discover the World Through Scent</h3>
              <p>
                Our exotic collection features fragrances inspired by the most captivating destinations 
                and cultures around the globe. From the spice markets of Marrakech to the cherry blossoms 
                of Kyoto, each scent is a passport to adventure and discovery.
              </p>
              <div className="exotic-features">
                <div className="feature">
                  <span className="feature-icon">🌍</span>
                  <span>Global Inspiration</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">✨</span>
                  <span>Rare Ingredients</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎭</span>
                  <span>Cultural Stories</span>
                </div>
              </div>
            </div>
            <div className="exotic-image">
              <div className="image-placeholder">
                <span className="placeholder-text">Exotic Fragrances</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">
            Find your perfect fragrance based on your style and preferences
          </p>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">👩</div>
              <h3>Women's Fragrances</h3>
              <p>Elegant and sophisticated scents that embody femininity and grace</p>
              <Link to="/products?category=women" className="category-link">
                Explore Collection →
              </Link>
            </div>
            <div className="category-card">
              <div className="category-icon">👨</div>
              <h3>Men's Fragrances</h3>
              <p>Bold and masculine aromas that define modern masculinity</p>
              <Link to="/products?category=men" className="category-link">
                Explore Collection →
              </Link>
            </div>
            <div className="category-card">
              <div className="category-icon">⚧</div>
              <h3>Unisex Fragrances</h3>
              <p>Versatile and unique scents that transcend traditional boundaries</p>
              <Link to="/products?category=unisex" className="category-link">
                Explore Collection →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="latest-products">
        <div className="container">
          <h2 className="section-title">Latest Arrivals</h2>
          <p className="section-subtitle">
            Be the first to experience our newest fragrance discoveries
          </p>
          
          <div className="products-grid">
            {allProducts.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          <div className="view-all-container">
            <Link to="/products" className="view-all-button">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
