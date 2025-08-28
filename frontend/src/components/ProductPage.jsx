import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fallback product data for demo purposes
  const fallbackProduct = {
    _id: 'fallback-product',
    name: "Chanel No. 5",
    brand: "Chanel",
    shortDescription: "Timeless floral fragrance with aldehydic bouquet",
    description: "Chanel No. 5 is a classic aldehyde floral fragrance that has captivated women for generations. This timeless scent opens with bright aldehydes and citrus notes, followed by a rich floral heart of jasmine, rose, and ylang-ylang. The base notes of sandalwood, vanilla, and vetiver create a sophisticated and enduring finish that embodies elegance and luxury.",
    price: 150,
    sizes: ["30ml", "50ml", "100ml"],
    category: "women",
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"
    ],
    fragranceNotes: {
      top: ["Aldehydes", "Bergamot", "Lemon"],
      middle: ["Jasmine", "Rose", "Ylang-ylang"],
      base: ["Sandalwood", "Vanilla", "Vetiver"]
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setProduct(data);
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
    } catch (err) {
      console.warn('Failed to fetch product from backend, using fallback data:', err.message);
      setProduct(fallbackProduct);
      setError('Backend connection failed, showing demo product');
      if (fallbackProduct.sizes && fallbackProduct.sizes.length > 0) {
        setSelectedSize(fallbackProduct.sizes[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      console.warn('Failed to fetch reviews:', err);
      // Set empty reviews array if backend fails
      setReviews([]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // Add to cart logic here
    alert('Added to cart!');
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <p>{error || 'Unable to load product information'}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-page">
      {error && (
        <div className="warning-banner">
          <p>⚠️ {error}</p>
          <button onClick={fetchProduct} className="retry-button">
            Try Again
          </button>
        </div>
      )}
      
      <div className="container">
        <div className="product-layout">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name} 
                className="product-main-image"
              />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleImageChange(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-details">
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            {/* Fragrance Notes */}
            {product.fragranceNotes && (
              <div className="fragrance-notes">
                <h3>Fragrance Notes</h3>
                <div className="notes-grid">
                  <div className="note-section">
                    <h4>Top Notes</h4>
                    <div className="notes-list">
                      {product.fragranceNotes.top.map((note, index) => (
                        <span key={index} className="note-tag">{note}</span>
                      ))}
                    </div>
                  </div>
                  <div className="note-section">
                    <h4>Middle Notes</h4>
                    <div className="notes-list">
                      {product.fragranceNotes.middle.map((note, index) => (
                        <span key={index} className="note-tag">{note}</span>
                      ))}
                    </div>
                  </div>
                  <div className="note-section">
                    <h4>Base Notes</h4>
                    <div className="notes-list">
                      {product.fragranceNotes.base.map((note, index) => (
                        <span key={index} className="note-tag">{note}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="size-selection">
                <h3>Select Size</h3>
                <div className="size-options">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="purchase-section">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button 
                className="add-to-cart-button"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          {reviews.length > 0 ? (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-name">{review.userName}</div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className={`star ${index < review.rating ? 'filled' : ''}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <div className="review-date">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
