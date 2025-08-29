const mongoose = require('mongoose');
const Product = require('./models/Product');
const Review = require('./models/Review');

// Enhanced data with exotic perfumes and better descriptions
const productsData = {
  "products": [
    {
      "name": "Chanel No. 5",
      "brand": "Chanel",
      "shortDescription": "Timeless floral fragrance with aldehydic bouquet",
      "description": "Chanel No. 5 is a classic aldehyde floral fragrance that has captivated women for generations. This timeless scent opens with bright aldehydes and citrus notes, followed by a rich floral heart of jasmine, rose, and ylang-ylang. The base notes of sandalwood, vanilla, and vetiver create a sophisticated and enduring finish that embodies elegance and luxury. A true masterpiece that has stood the test of time, representing the pinnacle of French perfumery.",
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
      "name": "Dior Sauvage",
      "brand": "Dior",
      "shortDescription": "Fresh and powerful woody fragrance for men",
      "description": "Dior Sauvage is a radically fresh composition that captures the essence of wide-open spaces. Inspired by twilight in the desert, this fragrance combines the coolness of Calabrian bergamot with the heat of Sichuan pepper. The heart reveals woody notes of ambergris and the base unfolds with warm vanilla and patchouli for a masculine and sophisticated scent. Perfect for the modern man who seeks adventure and refinement in equal measure.",
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
      "name": "Tom Ford Black Orchid",
      "brand": "Tom Ford",
      "shortDescription": "Luxurious and mysterious unisex fragrance",
      "description": "Tom Ford Black Orchid is a luxurious and sensual fragrance that captivates with its mysterious allure. This unisex scent opens with rich dark chocolate, black truffle, and ylang-ylang, creating an intoxicating first impression. The heart reveals exotic black orchid, spicy black pepper, and lotus wood, while the base unfolds with warm patchouli, vanilla, and incense for an unforgettable signature scent. A bold choice for those who dare to be different.",
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
      "name": "Versace Bright Crystal",
      "brand": "Versace",
      "shortDescription": "Light and fruity fragrance with floral notes",
      "description": "Versace Bright Crystal is a luminous and fresh fragrance that embodies the Versace woman's confidence and femininity. This delightful scent opens with iced accord, yuzu, and pomegranate, creating a sparkling and energetic introduction. The heart blooms with peony, magnolia, and lotus flower, while the base settles into warm musk, mahogany, and amber for a radiant and uplifting experience. Perfect for everyday wear and special occasions alike.",
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
      "name": "Armani Code",
      "brand": "Giorgio Armani",
      "shortDescription": "Sophisticated oriental fragrance for men",
      "description": "Armani Code is a sophisticated and seductive fragrance that represents the modern man's elegance and charisma. This oriental woody scent opens with fresh bergamot and lemon, followed by a spicy heart of star anise, olive blossom, and guaiac wood. The base reveals warm tonka bean, vanilla, and leather, creating a magnetic and memorable signature that speaks to refined masculinity. Ideal for evening wear and romantic encounters.",
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
    },
    {
      "name": "Jo Malone Wood Sage & Sea Salt",
      "brand": "Jo Malone London",
      "shortDescription": "Fresh coastal breeze with woody undertones",
      "description": "Jo Malone Wood Sage & Sea Salt captures the essence of a windswept British coastline. This unisex fragrance opens with fresh ambrette seeds and sea salt, creating an immediate sense of freedom and space. The heart reveals mineral notes and sea spray, while the base unfolds with warm red cedarwood and sage for a grounding, earthy finish. A perfect everyday scent that evokes memories of coastal walks and ocean breezes.",
      "price": 140,
      "sizes": ["30ml", "100ml"],
      "category": "unisex",
      "inStock": true,
      "featured": false,
      "images": [
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400",
        "https://images.unsplash.com/photo-1582582494567-0ac5bcb98013?w=400",
        "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400"
      ],
      "fragranceNotes": {
        "top": ["Ambrette Seeds", "Sea Salt"],
        "middle": ["Mineral Notes", "Sea Spray"],
        "base": ["Red Cedarwood", "Sage"]
      }
    },
    {
      "name": "Yves Saint Laurent Black Opium",
      "brand": "Yves Saint Laurent",
      "shortDescription": "Addictive gourmand fragrance with coffee notes",
      "description": "Yves Saint Laurent Black Opium is an addictive gourmand fragrance that combines the intensity of black coffee with the sweetness of vanilla. This bold scent opens with pink pepper and orange blossom, creating an energetic and vibrant introduction. The heart reveals coffee, jasmine, and licorice, while the base unfolds with vanilla, patchouli, and cashmere wood for a warm and sensual finish. A fragrance that's impossible to resist.",
      "price": 130,
      "sizes": ["30ml", "50ml", "90ml"],
      "category": "women",
      "inStock": true,
      "featured": false,
      "images": [
        "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
        "https://images.unsplash.com/photo-1594736797933-d0f317ba4d12?w=400",
        "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400"
      ],
      "fragranceNotes": {
        "top": ["Pink Pepper", "Orange Blossom"],
        "middle": ["Coffee", "Jasmine", "Licorice"],
        "base": ["Vanilla", "Patchouli", "Cashmere Wood"]
      }
    },
    {
      "name": "Bleu de Chanel",
      "brand": "Chanel",
      "shortDescription": "Sophisticated woody aromatic for the modern man",
      "description": "Bleu de Chanel is a sophisticated woody aromatic fragrance that embodies the essence of modern masculinity. This refined scent opens with fresh citrus notes of lemon and mint, followed by a spicy heart of pink pepper and ginger. The base reveals warm woody notes of sandalwood, cedar, and amber for a lasting and memorable finish. A versatile fragrance that transitions seamlessly from day to evening wear.",
      "price": 135,
      "sizes": ["50ml", "100ml", "150ml"],
      "category": "men",
      "inStock": true,
      "featured": false,
      "images": [
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
        "https://images.unsplash.com/photo-1565713043848-d6dbcac12f62?w=400",
        "https://images.unsplash.com/photo-1586041828080-ddac8b528b63?w=400"
      ],
      "fragranceNotes": {
        "top": ["Lemon", "Mint", "Bergamot"],
        "middle": ["Pink Pepper", "Ginger", "Iris"],
        "base": ["Sandalwood", "Cedar", "Amber"]
      }
    }
  ],
  "reviews": [
    {
      "productId": null, // Will be set after products are created
      "userName": "Sarah Johnson",
      "userEmail": "sarah.j@email.com",
      "rating": 5,
      "comment": "Absolutely love this classic fragrance! It's elegant, sophisticated, and gets compliments every time I wear it. The longevity is excellent and the scent evolves beautifully throughout the day. A true investment piece that never goes out of style.",
      "createdAt": "2025-08-20"
    },
    {
      "productId": null,
      "userName": "Emma Williams",
      "userEmail": "emma.w@email.com", 
      "rating": 4,
      "comment": "Chanel No. 5 is truly timeless. While it's a bit strong for daily wear, it's perfect for special occasions. The quality is outstanding as expected from Chanel. The aldehydic opening is distinctive and memorable.",
      "createdAt": "2025-08-18"
    },
    {
      "productId": null,
      "userName": "Michael Chen",
      "userEmail": "michael.c@email.com",
      "rating": 5,
      "comment": "Dior Sauvage is my go-to fragrance! Fresh, masculine, and versatile. Works great for both office and evening wear. The bergamot opening is fantastic and it dries down to a nice woody base. Highly recommended for any man's collection.",
      "createdAt": "2025-08-22"
    },
    {
      "productId": null,
      "userName": "David Miller",
      "userEmail": "david.m@email.com",
      "rating": 4,
      "comment": "Great scent with good projection and longevity. The bergamot opening is fantastic and it dries down to a nice woody base. Will definitely repurchase. Perfect for everyday wear.",
      "createdAt": "2025-08-19"
    },
    {
      "productId": null,
      "userName": "Alex Thompson",
      "userEmail": "alex.t@email.com",
      "rating": 5,
      "comment": "Black Orchid is absolutely stunning! It's bold, mysterious, and unique. Not for everyone, but if you like rich, complex fragrances, this is a masterpiece. The chocolate and truffle notes are incredible.",
      "createdAt": "2025-08-21"
    },
    {
      "productId": null,
      "userName": "Jessica Davis",
      "userEmail": "jessica.d@email.com",
      "rating": 4,
      "comment": "Bright Crystal is perfect for summer! Light, fresh, and feminine without being too sweet. Great for daily wear and the bottle is gorgeous too. The peony and magnolia notes are beautiful.",
      "createdAt": "2025-08-17"
    },
    {
      "productId": null,
      "userName": "Ryan Martinez",
      "userEmail": "ryan.m@email.com",
      "rating": 5,
      "comment": "Armani Code is sophisticated and classy. Perfect for date nights and special occasions. The vanilla and tonka bean in the dry down is incredible. Great longevity and sillage.",
      "createdAt": "2025-08-23"
    },
    {
      "productId": null,
      "userName": "Sophie Anderson",
      "userEmail": "sophie.a@email.com",
      "rating": 5,
      "comment": "Wood Sage & Sea Salt is my absolute favorite! It's so fresh and natural, perfect for everyday wear. The sea salt note is incredibly realistic and the cedarwood base is warm and comforting.",
      "createdAt": "2025-08-24"
    },
    {
      "productId": null,
      "userName": "Isabella Rodriguez",
      "userEmail": "isabella.r@email.com",
      "rating": 4,
      "comment": "Black Opium is addictive indeed! The coffee note is unique and the vanilla makes it sweet but not overwhelming. Great for evening wear and special occasions. The bottle is stunning too.",
      "createdAt": "2025-08-25"
    },
    {
      "productId": null,
      "userName": "James Wilson",
      "userEmail": "james.w@email.com",
      "rating": 5,
      "comment": "Bleu de Chanel is the perfect gentleman's fragrance. Sophisticated, versatile, and always appropriate. The citrus opening is fresh and the woody base is warm and masculine. Excellent quality from Chanel.",
      "createdAt": "2025-08-26"
    }
  ]
};

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding process...');
    
    // Connect to MongoDB
    console.log('🔌 Attempting to connect to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/perfume_shop');
    console.log('✅ Connected to MongoDB successfully!');
    console.log('📊 Database: perfume_shop');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert products
    console.log('📦 Inserting products...');
    const products = await Product.insertMany(productsData.products);
    console.log(`✅ Inserted ${products.length} products successfully`);

    // Update reviews with product IDs
    console.log('💬 Preparing reviews with product IDs...');
    const reviewsWithProductIds = productsData.reviews.map((review, index) => ({
      ...review,
      productId: products[index % products.length]._id,
      createdAt: new Date(review.createdAt)
    }));

    // Insert reviews
    console.log('📝 Inserting reviews...');
    const reviews = await Review.insertMany(reviewsWithProductIds);
    console.log(`✅ Inserted ${reviews.length} reviews successfully`);

    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Summary: ${products.length} products, ${reviews.length} reviews`);
    console.log('🚀 You can now start your application!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Make sure MongoDB is running on your system');
      console.log('2. Check if MongoDB is running on port 27017');
      console.log('3. Try running: mongod (in a separate terminal)');
      console.log('4. Or use MongoDB Atlas cloud database');
    }
    
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, closing database connection...');
  try {
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    process.exit(1);
  }
});

seedDatabase();
