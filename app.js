// Product and review data
const productsData = {
  "products": [
    {
      "id": 1,
      "name": "Chanel No. 5",
      "brand": "Chanel",
      "shortDescription": "Timeless floral fragrance with aldehydic bouquet",
      "description": "Chanel No. 5 is a classic aldehyde floral fragrance that has captivated women for generations. This timeless scent opens with bright aldehydes and citrus notes, followed by a rich floral heart of jasmine, rose, and ylang-ylang. The base notes of sandalwood, vanilla, and vetiver create a sophisticated and enduring finish that embodies elegance and luxury.",
      "price": 150,
      "sizes": ["30ml", "50ml", "100ml"],
      "category": "women",
      "inStock": true,
      "featured": true,
      "images": [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=400",
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400"
      ],
      "fragranceNotes": {
        "top": ["Aldehydes", "Bergamot", "Lemon"],
        "middle": ["Jasmine", "Rose", "Ylang-ylang"],
        "base": ["Sandalwood", "Vanilla", "Vetiver"]
      }
    },
    {
      "id": 2,
      "name": "Dior Sauvage",
      "brand": "Dior",
      "shortDescription": "Fresh and powerful woody fragrance for men",
      "description": "Dior Sauvage is a radically fresh composition that captures the essence of wide-open spaces. Inspired by twilight in the desert, this fragrance combines the coolness of Calabrian bergamot with the heat of Sichuan pepper. The heart reveals woody notes of ambergris and the base unfolds with warm vanilla and patchouli for a masculine and sophisticated scent.",
      "price": 125,
      "sizes": ["30ml", "60ml", "100ml"],
      "category": "men",
      "inStock": true,
      "featured": true,
      "images": [
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
        "https://images.unsplash.com/photo-1565713043848-d6dbcac12f62?w=400",
        "https://images.unsplash.com/photo-1586041828080-ddac8b528b63?w=400"
      ],
      "fragranceNotes": {
        "top": ["Bergamot", "Pink Pepper", "Sichuan Pepper"],
        "middle": ["Lavender", "Star Anise", "Nutmeg"],
        "base": ["Ambergris", "Vanilla", "Patchouli"]
      }
    },
    {
      "id": 3,
      "name": "Tom Ford Black Orchid",
      "brand": "Tom Ford",
      "shortDescription": "Luxurious and mysterious unisex fragrance",
      "description": "Tom Ford Black Orchid is a luxurious and sensual fragrance that captivates with its mysterious allure. This unisex scent opens with rich dark chocolate, black truffle, and ylang-ylang, creating an intoxicating first impression. The heart reveals exotic black orchid, spicy black pepper, and lotus wood, while the base unfolds with warm patchouli, vanilla, and incense for an unforgettable signature scent.",
      "price": 180,
      "sizes": ["30ml", "50ml", "100ml"],
      "category": "unisex",
      "inStock": true,
      "featured": true,
      "images": [
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
        "https://images.unsplash.com/photo-1594736797933-d0f317ba4d12?w=400",
        "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400"
      ],
      "fragranceNotes": {
        "top": ["Black Truffle", "Ylang-ylang", "Dark Chocolate"],
        "middle": ["Black Orchid", "Black Pepper", "Lotus Wood"],
        "base": ["Patchouli", "Vanilla", "Incense"]
      }
    },
    {
      "id": 4,
      "name": "Versace Bright Crystal",
      "brand": "Versace",
      "shortDescription": "Light and fruity fragrance with floral notes",
      "description": "Versace Bright Crystal is a luminous and fresh fragrance that embodies the Versace woman's confidence and femininity. This delightful scent opens with iced accord, yuzu, and pomegranate, creating a sparkling and energetic introduction. The heart blooms with peony, magnolia, and lotus flower, while the base settles into warm musk, mahogany, and amber for a radiant and uplifting experience.",
      "price": 95,
      "sizes": ["30ml", "50ml", "90ml"],
      "category": "women",
      "inStock": true,
      "featured": true,
      "images": [
        "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400",
        "https://images.unsplash.com/photo-1582582494567-0ac5bcb98013?w=400"
      ],
      "fragranceNotes": {
        "top": ["Iced Accord", "Yuzu", "Pomegranate"],
        "middle": ["Peony", "Magnolia", "Lotus Flower"],
        "base": ["Musk", "Mahogany", "Amber"]
      }
    },
    {
      "id": 5,
      "name": "Armani Code",
      "brand": "Giorgio Armani",
      "shortDescription": "Sophisticated oriental fragrance for men",
      "description": "Armani Code is a sophisticated and seductive fragrance that represents the modern man's elegance and charisma. This oriental woody scent opens with fresh bergamot and lemon, followed by a spicy heart of star anise, olive blossom, and guaiac wood. The base reveals warm tonka bean, vanilla, and leather, creating a magnetic and memorable signature that speaks to refined masculinity.",
      "price": 110,
      "sizes": ["30ml", "50ml", "75ml", "125ml"],
      "category": "men",
      "inStock": true,
      "featured": true,
      "images": [
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400",
        "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400",
        "https://images.unsplash.com/photo-1574705710642-d0dd5c3e3d0a?w=400"
      ],
      "fragranceNotes": {
        "top": ["Bergamot", "Lemon", "Mandarin"],
        "middle": ["Star Anise", "Olive Blossom", "Guaiac Wood"],
        "base": ["Tonka Bean", "Vanilla", "Leather"]
      }
    }
  ],
  "reviews": [
    {
      "id": 1,
      "productId": 1,
      "userName": "Sarah Johnson",
      "userEmail": "sarah.j@email.com",
      "rating": 5,
      "comment": "Absolutely love this classic fragrance! It's elegant, sophisticated, and gets compliments every time I wear it. The longevity is excellent and the scent evolves beautifully throughout the day.",
      "createdAt": "2025-08-20"
    },
    {
      "id": 2,
      "productId": 1,
      "userName": "Emma Williams",
      "userEmail": "emma.w@email.com", 
      "rating": 4,
      "comment": "Chanel No. 5 is truly timeless. While it's a bit strong for daily wear, it's perfect for special occasions. The quality is outstanding as expected from Chanel.",
      "createdAt": "2025-08-18"
    },
    {
      "id": 3,
      "productId": 2,
      "userName": "Michael Chen",
      "userEmail": "michael.c@email.com",
      "rating": 5,
      "comment": "Dior Sauvage is my go-to fragrance! Fresh, masculine, and versatile. Works great for both office and evening wear. Highly recommended for any man's collection.",
      "createdAt": "2025-08-22"
    },
    {
      "id": 4,
      "productId": 2,
      "userName": "David Miller",
      "userEmail": "david.m@email.com",
      "rating": 4,
      "comment": "Great scent with good projection and longevity. The bergamot opening is fantastic and it dries down to a nice woody base. Will definitely repurchase.",
      "createdAt": "2025-08-19"
    },
    {
      "id": 5,
      "productId": 3,
      "userName": "Alex Thompson",
      "userEmail": "alex.t@email.com",
      "rating": 5,
      "comment": "Black Orchid is absolutely stunning! It's bold, mysterious, and unique. Not for everyone, but if you like rich, complex fragrances, this is a masterpiece.",
      "createdAt": "2025-08-21"
    },
    {
      "id": 6,
      "productId": 4,
      "userName": "Jessica Davis",
      "userEmail": "jessica.d@email.com",
      "rating": 4,
      "comment": "Bright Crystal is perfect for summer! Light, fresh, and feminine without being too sweet. Great for daily wear and the bottle is gorgeous too.",
      "createdAt": "2025-08-17"
    },
    {
      "id": 7,
      "productId": 5,
      "userName": "Ryan Martinez",
      "userEmail": "ryan.m@email.com",
      "rating": 5,
      "comment": "Armani Code is sophisticated and classy. Perfect for date nights and special occasions. The vanilla and tonka bean in the dry down is incredible.",
      "createdAt": "2025-08-23"
    }
  ]
};

// Global state
let currentProduct = null;
let cartItems = [];
let selectedSize = null;
let selectedRating = 0;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    loadFeaturedProducts();
    setupEventListeners();
    updateCartCount();
    initializeApp();
});

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Review form submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', handleReviewSubmission);
    }

    // Star rating interaction
    setupStarRating();

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessMessage('Thank you for subscribing to our newsletter!');
        });
    }

    // Hero CTA button
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            console.log('Hero CTA clicked');
            scrollToProducts();
        });
    }
}

// Setup star rating functionality
function setupStarRating() {
    const starRating = document.getElementById('star-rating');
    if (starRating) {
        const stars = starRating.querySelectorAll('.fas.fa-star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => setRating(index + 1));
            star.addEventListener('mouseover', () => highlightStars(index + 1));
        });
        
        starRating.addEventListener('mouseleave', () => highlightStars(selectedRating));
    }
}

// Load and display featured products
function loadFeaturedProducts() {
    console.log('Loading featured products...');
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) {
        console.error('Products grid not found');
        return;
    }

    productsGrid.innerHTML = '';
    
    const featuredProducts = productsData.products.filter(product => product.featured);
    console.log('Featured products:', featuredProducts.length);
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Add click event to entire card
    card.addEventListener('click', function(e) {
        console.log('Product card clicked:', product.id);
        showProductDetail(product.id);
    });
    
    card.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}" class="product-image">
        <div class="product-card-content">
            <h3 class="product-card-title">${product.name}</h3>
            <p class="product-card-description">${product.shortDescription}</p>
            <div class="product-card-price">$${product.price}</div>
            <button class="view-details-btn" type="button">
                View Details
            </button>
        </div>
    `;
    
    // Add specific click handler to the button
    const viewDetailsBtn = card.querySelector('.view-details-btn');
    viewDetailsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('View details button clicked:', product.id);
        showProductDetail(product.id);
    });
    
    return card;
}

// Show product detail page
function showProductDetail(productId) {
    console.log('Showing product detail for ID:', productId);
    
    const product = productsData.products.find(p => p.id === productId);
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }
    
    currentProduct = product;
    selectedSize = null;
    
    try {
        // Update page content
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-brand').textContent = product.brand;
        document.getElementById('product-price').textContent = `$${product.price}`;
        document.getElementById('product-description-text').textContent = product.description;
        document.getElementById('product-breadcrumb').textContent = product.name;
        
        // Update main image
        const mainImage = document.getElementById('main-product-image');
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
        
        // Update thumbnails
        updateProductThumbnails(product.images);
        
        // Update size options
        updateSizeOptions(product.sizes);
        
        // Update fragrance notes
        updateFragranceNotes(product.fragranceNotes);
        
        // Load reviews
        loadProductReviews(productId);
        
        // Show product page
        document.getElementById('homepage').classList.add('hidden');
        document.getElementById('product-page').classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Re-setup star rating for the product page
        setupStarRating();
        
        console.log('Product detail page shown successfully');
    } catch (error) {
        console.error('Error showing product detail:', error);
    }
}

// Update product thumbnails
function updateProductThumbnails(images) {
    const thumbnailContainer = document.getElementById('thumbnail-container');
    if (!thumbnailContainer) return;
    
    thumbnailContainer.innerHTML = '';
    
    images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `Product image ${index + 1}`;
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.addEventListener('click', () => changeMainImage(image, thumbnail));
        thumbnailContainer.appendChild(thumbnail);
    });
}

// Change main product image
function changeMainImage(imageSrc, thumbnailElement) {
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (thumbnailElement) {
        thumbnailElement.classList.add('active');
    }
}

// Update size options
function updateSizeOptions(sizes) {
    const sizeContainer = document.getElementById('size-options');
    if (!sizeContainer) return;
    
    sizeContainer.innerHTML = '';
    
    sizes.forEach(size => {
        const sizeOption = document.createElement('button');
        sizeOption.className = 'size-option';
        sizeOption.textContent = size;
        sizeOption.type = 'button';
        sizeOption.addEventListener('click', () => selectSize(size, sizeOption));
        sizeContainer.appendChild(sizeOption);
    });
}

// Select product size
function selectSize(size, element) {
    selectedSize = size;
    
    // Update active size option
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('active');
    });
    element.classList.add('active');
}

// Update fragrance notes
function updateFragranceNotes(notes) {
    const topNotes = document.getElementById('top-notes');
    const middleNotes = document.getElementById('middle-notes');
    const baseNotes = document.getElementById('base-notes');
    
    if (topNotes) topNotes.textContent = notes.top.join(', ');
    if (middleNotes) middleNotes.textContent = notes.middle.join(', ');
    if (baseNotes) baseNotes.textContent = notes.base.join(', ');
}

// Load product reviews
function loadProductReviews(productId) {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;
    
    reviewsContainer.innerHTML = '';
    
    const productReviews = productsData.reviews.filter(review => review.productId === productId);
    
    if (productReviews.length === 0) {
        reviewsContainer.innerHTML = '<p>No reviews yet. Be the first to review this product!</p>';
        return;
    }
    
    productReviews.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewsContainer.appendChild(reviewElement);
    });
}

// Create review element
function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review-item';
    
    const reviewDate = new Date(review.createdAt).toLocaleDateString();
    
    reviewDiv.innerHTML = `
        <div class="review-header">
            <div class="review-author">${review.userName}</div>
            <div class="review-date">${reviewDate}</div>
        </div>
        <div class="review-stars">
            ${Array.from({length: 5}, (_, i) => 
                `<span class="star ${i < review.rating ? 'active' : ''}"">★</span>`
            ).join('')}
        </div>
        <div class="review-comment">${review.comment}</div>
    `;
    
    return reviewDiv;
}

// Handle review form submission
function handleReviewSubmission(e) {
    e.preventDefault();
    
    if (!currentProduct) return;
    
    const name = document.getElementById('review-name').value.trim();
    const email = document.getElementById('review-email').value.trim();
    const comment = document.getElementById('review-comment').value.trim();
    
    if (!name || !email || !comment || selectedRating === 0) {
        alert('Please fill in all required fields and select a rating.');
        return;
    }
    
    // Create new review object
    const newReview = {
        id: Date.now(),
        productId: currentProduct.id,
        userName: name,
        userEmail: email,
        rating: selectedRating,
        comment: comment,
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Add review to data
    productsData.reviews.push(newReview);
    
    // Reload reviews
    loadProductReviews(currentProduct.id);
    
    // Reset form
    document.getElementById('review-form').reset();
    selectedRating = 0;
    highlightStars(0);
    
    // Show success message
    showSuccessMessage('Thank you for your review! It has been added successfully.');
}

// Set rating
function setRating(rating) {
    selectedRating = rating;
    highlightStars(rating);
}

// Highlight stars
function highlightStars(rating) {
    const stars = document.querySelectorAll('#star-rating .fas.fa-star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Show homepage
function showHomePage() {
    document.getElementById('product-page').classList.add('hidden');
    document.getElementById('homepage').classList.remove('hidden');
    window.scrollTo(0, 0);
}

// Scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add to cart functionality
function addToCart() {
    if (!currentProduct) return;
    
    if (!selectedSize) {
        alert('Please select a size before adding to cart.');
        return;
    }
    
    const cartItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        brand: currentProduct.brand,
        price: currentProduct.price,
        size: selectedSize,
        image: currentProduct.images[0],
        quantity: 1
    };
    
    // Check if item already exists in cart
    const existingItem = cartItems.find(item => 
        item.id === cartItem.id && item.size === cartItem.size
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push(cartItem);
    }
    
    updateCartCount();
    showSuccessMessage('Product added to cart successfully!');
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Toggle share menu
function toggleShareMenu() {
    const shareMenu = document.getElementById('share-menu');
    if (shareMenu) {
        shareMenu.classList.toggle('hidden');
    }
}

// Share on Facebook
function shareOnFacebook() {
    if (!currentProduct) return;
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this amazing fragrance: ${currentProduct.name} by ${currentProduct.brand}`);
    
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    toggleShareMenu();
}

// Share on Twitter
function shareOnTwitter() {
    if (!currentProduct) return;
    
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this amazing fragrance: ${currentProduct.name} by ${currentProduct.brand} #LuxeScent #Perfume`);
    
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    toggleShareMenu();
}

// Share on WhatsApp
function shareOnWhatsApp() {
    if (!currentProduct) return;
    
    const text = encodeURIComponent(`Check out this amazing fragrance: ${currentProduct.name} by ${currentProduct.brand} - ${window.location.href}`);
    
    window.open(`https://wa.me/?text=${text}`, '_blank');
    toggleShareMenu();
}

// Copy link to clipboard
function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showSuccessMessage('Link copied to clipboard!');
        toggleShareMenu();
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showSuccessMessage('Link copied to clipboard!');
        } catch (err) {
            alert('Unable to copy link. Please copy manually: ' + window.location.href);
        }
        document.body.removeChild(textArea);
        toggleShareMenu();
    });
}

// Show success message
function showSuccessMessage(message) {
    const modal = document.getElementById('success-modal');
    const messageElement = document.getElementById('success-message');
    
    if (modal && messageElement) {
        messageElement.textContent = message;
        modal.classList.remove('hidden');
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            closeModal();
        }, 3000);
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Close share menu when clicking outside
document.addEventListener('click', function(e) {
    const shareMenu = document.getElementById('share-menu');
    const shareBtn = document.querySelector('.share-btn');
    
    if (shareMenu && !shareMenu.contains(e.target) && shareBtn && !shareBtn.contains(e.target)) {
        shareMenu.classList.add('hidden');
    }
});

// Initialize application state
function initializeApp() {
    console.log('Initializing application...');
    
    // Load any saved cart items from session (if needed)
    updateCartCount();
    
    // Set initial page state
    const homepage = document.getElementById('homepage');
    const productPage = document.getElementById('product-page');
    
    if (homepage && productPage) {
        homepage.classList.remove('hidden');
        productPage.classList.add('hidden');
    }
    
    console.log('Application initialized successfully');
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--perfume-white)';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Global functions for HTML onclick handlers
window.showHomePage = showHomePage;
window.showProductDetail = showProductDetail;
window.scrollToProducts = scrollToProducts;
window.addToCart = addToCart;
window.toggleShareMenu = toggleShareMenu;
window.shareOnFacebook = shareOnFacebook;
window.shareOnTwitter = shareOnTwitter;
window.shareOnWhatsApp = shareOnWhatsApp;
window.copyLink = copyLink;
window.closeModal = closeModal;

// ...existing code...

// --- Cinematic Hero Section Animation ---
document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...
    cinematicHeroEffects();
    scentQuizInit();
    cursorMistEffect();
    // ...existing code...
});

// Cinematic Hero: Parallax bottles + vapor mist
function cinematicHeroEffects() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    // Parallax bottle effect
    hero.addEventListener('mousemove', (e) => {
        const bottles = hero.querySelectorAll('.hero-bottle');
        bottles.forEach((bottle, i) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30 * (i + 1);
            const y = (e.clientY / window.innerHeight - 0.5) * 30 * (i + 1);
            bottle.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
        });
    });

    // Vapor mist animation (CSS only, see below)
}

// --- Glassmorphic Navbar Scroll Effect ---
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-glass');
        } else {
            navbar.classList.remove('navbar-glass');
        }
    }
});

// --- Animated Product Cards ---
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card cinematic-card';

    // ...existing code...

    card.innerHTML = `
        <div class="product-card-3d">
            <img src="${product.images[0]}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-card-content">
            <h3 class="product-card-title">${product.name}</h3>
            <p class="product-card-description">${product.shortDescription}</p>
            <div class="product-card-price">$${product.price}</div>
            <button class="view-details-btn cinematic-btn" type="button">
                View Details
            </button>
        </div>
    `;

    // 3D hover effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        card.querySelector('.product-card-3d').style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.04)`;
    });
    card.addEventListener('mouseleave', () => {
        card.querySelector('.product-card-3d').style.transform = '';
    });

    // ...existing code...
    return card;
}

// --- Scent Explorer Quiz ---
function scentQuizInit() {
    const quiz = document.getElementById('scent-quiz');
    if (!quiz) return;

    quiz.addEventListener('click', function(e) {
        if (e.target.classList.contains('scent-choice')) {
            const vibe = e.target.dataset.vibe;
            cinematicMasonryGrid(vibe);
        }
    });
}

// Rearrange product cards based on scent vibe
function cinematicMasonryGrid(vibe) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    // Animate grid rearrangement
    productsGrid.classList.add('masonry-animate');
    setTimeout(() => {
        productsGrid.classList.remove('masonry-animate');
        // Optionally filter products by vibe here
    }, 700);
}

// --- Custom Cursor Mist Effect ---
function cursorMistEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'cinematic-cursor';
    document.body.appendChild(cursor);

    window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        // Mist particles
        const mist = document.createElement('div');
        mist.className = 'cursor-mist';
        mist.style.left = `${e.clientX + Math.random()*20-10}px`;
        mist.style.top = `${e.clientY + Math.random()*20-10}px`;
        document.body.appendChild(mist);
        setTimeout(() => mist.remove(), 600);
    });
}

// ...existing code...