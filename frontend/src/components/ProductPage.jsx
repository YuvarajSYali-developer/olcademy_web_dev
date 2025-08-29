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
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    userEmail: '',
    rating: 5,
    comment: ''
  });

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
      "/PICTURES/pexels-valeriya-965989.jpg",
      "/PICTURES/pexels-valeriya-1961791.jpg",
      "/PICTURES/pexels-valeriya-724635.jpg"
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
      setReviews([]);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    alert(`Added ${quantity}x ${product.name} (${selectedSize}) to cart!`);
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} by ${product.brand} - ${product.shortDescription}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareData = {
        title: product.name,
        text: `Check out ${product.name} by ${product.brand}`,
        url: window.location.href,
      };
      
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
      }
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!newReview.userName || !newReview.userEmail || !newReview.comment) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newReview,
          productId: product._id,
        }),
      });

      if (response.ok) {
        const savedReview = await response.json();
        setReviews([...reviews, savedReview]);
        setNewReview({ userName: '', userEmail: '', rating: 5, comment: '' });
        setShowReviewForm(false);
        alert('Review submitted successfully!');
      } else {
        throw new Error('Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    }
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
                src={product.images[currentImageIndex] || '/PICTURES/pexels-valeriya-965989.jpg'} 
                alt={product.name} 
                className="product-main-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/PICTURES/pexels-valeriya-965989.jpg';
                }}
              />
            </div>
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image || `/PICTURES/pexels-valeriya-${965989 + index}.jpg`}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => handleImageChange(index)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/PICTURES/pexels-valeriya-${965989 + index}.jpg`;
                  }}
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
              
              {/* Share Button */}
              <button onClick={handleShare} className="share-button">
                📤 Share Product
              </button>
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
          <div className="reviews-header">
            <h2>Customer Reviews</h2>
            <button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="add-review-btn"
            >
              {showReviewForm ? 'Cancel' : '✍️ Write a Review'}
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="review-form-container">
              <form onSubmit={handleReviewSubmit} className="review-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      value={newReview.userName}
                      onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={newReview.userEmail}
                      onChange={(e) => setNewReview({...newReview, userEmail: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Rating:</label>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= newReview.rating ? 'active' : ''}`}
                        onClick={() => setNewReview({...newReview, rating: star})}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Comment:</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    required
                    rows="4"
                  />
                </div>
                
                <button type="submit" className="submit-review-btn">
                  Submit Review
                </button>
              </form>
            </div>
          )}

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
