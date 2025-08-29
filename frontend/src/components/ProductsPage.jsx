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
      shortDescription: "Timeless floral fragrance with aldehydic bouquet, featuring notes of ylang-ylang, jasmine, and vanilla.",
      longDescription: "Chanel No. 5 is perhaps the most famous fragrance in the world. This exquisite perfume features top notes of ylang-ylang and neroli, a floral heart of jasmine and rose, and a warm base of vanilla and sandalwood. A true classic that has stood the test of time.",
      price: 150,
      rating: 4.8,
      reviews: 1245,
      inStock: true,
      images: [
        "/PICTURES/pexels-valeriya-965989.jpg",
        "/PICTURES/pexels-valeriya-1961791.jpg",
        "/PICTURES/pexels-valeriya-724635.jpg"
      ],
      category: "women",
      featured: true,
      sizes: ["30ml", "50ml", "100ml"],
      notes: {
        top: ["Ylang-Ylang", "Neroli", "Aldehydes"],
        heart: ["Jasmine", "Rose", "Lily of the Valley"],
        base: ["Vanilla", "Sandalwood", "Vetiver"]
      }
    },
    {
      _id: 'fallback-2',
      name: "Dior Sauvage",
      brand: "Dior",
      shortDescription: "Fresh and powerful woody fragrance with citrus and spice accords.",
      longDescription: "Dior Sauvage is a fresh, spicy, and woody fragrance that captures the spirit of wild, open spaces. With top notes of bergamot, a heart of Sichuan pepper, and a base of ambroxan, it's a modern classic that's both fresh and long-lasting.",
      price: 125,
      rating: 4.7,
      reviews: 1890,
      inStock: true,
      images: [
        "/PICTURES/pexels-valeriya-1961792.jpg",
        "/PICTURES/pexels-didsss-1190829.jpg",
        "/PICTURES/pexels-pixabay-264950.jpg"
      ],
      category: "men",
      featured: true,
      sizes: ["60ml", "100ml", "200ml"],
      notes: {
        top: ["Calabrian Bergamot", "Pepper"],
        heart: ["Lavender", "Pink Pepper", "Vetiver", "Patchouli", "Elemi"],
        base: ["Ambroxan", "Cedar"]
      }
    },
    {
      _id: 'fallback-3',
      name: "Black Orchid",
      brand: "Tom Ford",
      shortDescription: "Luxurious and mysterious unisex fragrance with dark florals and rich accords.",
      longDescription: "Tom Ford Black Orchid is a luxurious and sensual unisex fragrance that combines black truffle, ylang-ylang, and black orchid with rich chocolate, patchouli, and incense. This bold and mysterious scent is perfect for evening wear.",
      price: 180,
      rating: 4.6,
      reviews: 956,
      inStock: true,
      images: [
        "/PICTURES/pexels-valeriya-965990.jpg",
        "/PICTURES/pexels-valeriya-724635.jpg",
        "/PICTURES/pexels-mareefe-932577.jpg"
      ],
      category: "unisex",
      featured: true,
      sizes: ["50ml", "100ml"],
      notes: {
        top: ["Truffle", "Ylang-Ylang", "Bergamot", "Mandarin"],
        heart: ["Black Orchid", "Lotus Wood", "Frangipani", "Spices"],
        base: ["Patchouli", "Vanilla", "Incense", "Sandalwood", "Chocolate", "Amber", "Vetiver"]
      }
    },
    {
      _id: 'fallback-4',
      name: "Bright Crystal",
      brand: "Versace",
      shortDescription: "Light and fruity fragrance with pomegranate and peony notes.",
      longDescription: "Versace Bright Crystal is a fresh, sensual, and vibrant floral fruity fragrance. The top notes of pomegranate and yuzu blend with peony, magnolia, and lotus flower, resting on a base of amber and musk for a sparkling, luminous effect.",
      price: 95,
      rating: 4.5,
      reviews: 2345,
      inStock: true,
      images: [
        "/PICTURES/pexels-mareefe-932577.jpg",
        "/PICTURES/pexels-valeriya-1961791.jpg",
        "/PICTURES/pexels-valeriya-965989.jpg"
      ],
      category: "women",
      featured: true,
      sizes: ["30ml", "50ml", "90ml"],
      notes: {
        top: ["Yuzu", "Pomegranate"],
        heart: ["Peony", "Magnolia", "Lotus Flower"],
        base: ["Amber", "Mahogany", "Musk"]
      }
    },
    {
      _id: 'fallback-5',
      name: "Armani Code",
      brand: "Giorgio Armani",
      shortDescription: "Sophisticated oriental fragrance with lemon and olive blossom.",
      longDescription: "Armani Code is a sophisticated oriental fragrance for men that combines fresh lemon and bergamot with olive blossom and star anise. The heart reveals guaiac wood and tonka bean, while the base features leather and tobacco notes for a sensual finish.",
      price: 110,
      rating: 4.4,
      reviews: 1780,
      inStock: true,
      images: [
        "/PICTURES/pexels-pixabay-264950.jpg",
        "/PICTURES/pexels-didsss-1190829.jpg",
        "/PICTURES/pexels-valeriya-1961792.jpg"
      ],
      category: "men",
      featured: true,
      sizes: ["50ml", "100ml", "150ml"],
      notes: {
        top: ["Lemon", "Bergamot"],
        heart: ["Olive Blossom", "Star Anise"],
        base: ["Guaiac Wood", "Tobacco", "Leather", "Tonka Bean"]
      }
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
