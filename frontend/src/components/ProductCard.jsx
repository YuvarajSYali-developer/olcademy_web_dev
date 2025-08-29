import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { _id, name, brand, shortDescription, price, images, category, featured } = product;
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleQuickView = (e) => {
    e.preventDefault();
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const addToCart = (e) => {
    e.preventDefault();
    // Add to cart logic here
    alert(`Added ${name} to cart!`);
  };

  const addToWishlist = (e) => {
    e.preventDefault();
    // Add to wishlist logic here
    alert(`Added ${name} to wishlist!`);
  };

  if (viewMode === 'list') {
    return (
      <div className="product-card list-view">
        <div className="product-image-container">
          <img 
            src={images[0]} 
            alt={name} 
            className="product-image"
            loading="lazy"
          />
          {featured && <div className="featured-badge">⭐ Featured</div>}
        </div>
        
        <div className="product-info">
          <div className="product-header">
            <div className="product-brand">{brand}</div>
            <h3 className="product-name">
              <Link to={`/product/${_id}`}>{name}</Link>
            </h3>
            <div className="product-category">{category}</div>
          </div>
          
          <p className="product-description">{shortDescription}</p>
          
          <div className="product-meta">
            <div className="product-price">${price}</div>
            <div className="product-actions">
              <button onClick={addToCart} className="add-to-cart-btn">
                Add to Cart
              </button>
              <button onClick={addToWishlist} className="wishlist-btn">♡</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="product-card grid-view">
        <div className="product-image-container">
          <img 
            src={images[0]} 
            alt={name} 
            className="product-image"
            loading="lazy"
          />
          {featured && <div className="featured-badge">⭐ Featured</div>}
          <div className="product-overlay">
            <button onClick={handleQuickView} className="quick-view-btn">
              Quick View
            </button>
            <button onClick={addToCart} className="add-to-cart-overlay-btn">
              Add to Cart
            </button>
          </div>
        </div>
        
        <div className="product-info">
          <div className="product-brand">{brand}</div>
          <h3 className="product-name">
            <Link to={`/product/${_id}`}>{name}</Link>
          </h3>
          <p className="product-description">{shortDescription}</p>
          
          <div className="product-meta">
            <span className="product-category">{category}</span>
            <span className="product-price">${price}</span>
          </div>
          
          <div className="product-actions">
            <button onClick={addToCart} className="add-to-cart-btn">Add to Cart</button>
            <button onClick={addToWishlist} className="wishlist-btn">♡</button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <div className="quick-view-modal" onClick={closeQuickView}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeQuickView}>×</button>
            
            <div className="modal-body">
              <div className="modal-images">
                <img 
                  src={images[currentImageIndex]} 
                  alt={name} 
                  className="modal-main-image"
                />
                {images.length > 1 && (
                  <>
                    <button className="image-nav prev" onClick={prevImage}>‹</button>
                    <button className="image-nav next" onClick={nextImage}>›</button>
                    <div className="image-thumbnails">
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${name} ${index + 1}`}
                          className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="modal-info">
                <h2 className="modal-title">{name}</h2>
                <div className="modal-brand">{brand}</div>
                <div className="modal-price">${price}</div>
                <p className="modal-description">{shortDescription}</p>
                
                <div className="modal-actions">
                  <button onClick={addToCart} className="modal-add-to-cart">
                    Add to Cart
                  </button>
                  <button onClick={addToWishlist} className="modal-wishlist">
                    ♡ Add to Wishlist
                  </button>
                </div>
                
                <Link to={`/product/${_id}`} className="view-full-details">
                  View Full Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
