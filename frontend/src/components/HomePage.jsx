import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';
import ProductCard from './ProductCard';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data when backend is not available
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
            Discover our most popular and luxurious fragrances
          </p>
          
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          <div className="view-all-container">
            <Link to="/" className="view-all-button">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">👩</div>
              <h3>Women's Fragrances</h3>
              <p>Elegant and sophisticated scents</p>
            </div>
            <div className="category-card">
              <div className="category-icon">👨</div>
              <h3>Men's Fragrances</h3>
              <p>Bold and masculine aromas</p>
            </div>
            <div className="category-card">
              <div className="category-icon">⚧</div>
              <h3>Unisex Fragrances</h3>
              <p>Versatile and unique scents</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
