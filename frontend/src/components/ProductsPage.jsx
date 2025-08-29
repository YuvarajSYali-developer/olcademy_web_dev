import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

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
      featured: false
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
      featured: false
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, sortBy, searchTerm]);

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

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-az':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSortBy('featured');
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      {error && (
        <div className="warning-banner">
          <p>⚠️ {error}</p>
          <button onClick={fetchProducts} className="retry-button">
            Try Again
          </button>
        </div>
      )}

      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">All Fragrances</h1>
          <p className="page-subtitle">
            Discover our complete collection of luxury perfumes and colognes
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="products-controls">
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search fragrances, brands, or notes..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button className="search-button">
                🔍
              </button>
            </div>
          </div>

          {/* Category and Sort Controls */}
          <div className="controls-section">
            {/* Category Filter */}
            <div className="category-filter">
              <label>Category:</label>
              <div className="category-buttons">
                <button
                  className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('all')}
                >
                  All
                </button>
                <button
                  className={`category-btn ${selectedCategory === 'women' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('women')}
                >
                  👩 Women
                </button>
                <button
                  className={`category-btn ${selectedCategory === 'men' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('men')}
                >
                  👨 Men
                </button>
                <button
                  className={`category-btn ${selectedCategory === 'unisex' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('unisex')}
                >
                  ⚧ Unisex
                </button>
              </div>
            </div>

            {/* Sort Options */}
            <div className="sort-options">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => handleSortChange(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A to Z</option>
                <option value="name-za">Name: Z to A</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="view-mode-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                ⊞
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                ☰
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategory !== 'all' || sortBy !== 'featured' || searchTerm) && (
            <div className="clear-filters">
              <button onClick={clearFilters} className="clear-btn">
                ✕ Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
            {selectedCategory !== 'all' && ` in ${selectedCategory} category`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          <div className={`products-container ${viewMode}`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <div className="no-products-icon">🌸</div>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button onClick={clearFilters} className="clear-btn">
              Clear All Filters
            </button>
          </div>
        )}

        {/* Back to Home */}
        <div className="back-to-home">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
