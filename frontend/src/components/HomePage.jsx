import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import ProductCard from './ProductCard';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enhanced fallback data with more exotic perfumes
  const fallbackProducts = [
    {
      _id: 'fallback-1',
      name: "Chanel No. 5",
      brand: "Chanel",
      shortDescription: "Timeless floral fragrance with aldehydic bouquet",
      price: 150,
      images: [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400",
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"
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
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
        "https://images.unsplash.com/photo-1565713043848-d6dbcac12f62?w=400",
        "https://images.unsplash.com/photo-1586041828080-ddac8b528b63?w=400"
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
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
        "https://images.unsplash.com/photo-1594736797933-d0f317ba4d12?w=400",
        "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400"
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
        "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400",
        "https://images.unsplash.com/photo-1582582494567-0ac5bcb98013?w=400"
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
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400",
        "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400",
        "https://images.unsplash.com/photo-1574705710642-d0dd5c3e3d0a?w=400"
      ],
      category: "men",
      featured: true
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.warn('Failed to fetch products from backend, using fallback data:', err.message);
      setProducts(fallbackProducts);
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
      
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">Featured Fragrances</h2>
          <p className="section-subtitle">
            Discover our most prestigious and luxurious fragrances from world-renowned brands
          </p>
          
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
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
