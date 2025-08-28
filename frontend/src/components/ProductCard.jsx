import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { _id, name, brand, shortDescription, price, images, category } = product;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={images[0]} 
          alt={name} 
          className="product-image"
          loading="lazy"
        />
        <div className="product-overlay">
          <button className="quick-view-btn">Quick View</button>
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
          <button className="add-to-cart-btn">Add to Cart</button>
          <button className="wishlist-btn">♡</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
