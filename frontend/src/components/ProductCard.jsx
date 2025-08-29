import React, { useState, useRef, useEffect, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './ProductCard.css';

// 3D Perfume Bottle Component with Enhanced Effects
function PerfumeBottle({ texture, hovered }) {
  const meshRef = useRef();
  const capRef = useRef();
  const vaporRef = useRef();
  
  // Define bottle colors for a more reliable and elegant approach
  const bottleColors = [
    '#C01530', // Red
    '#8A2BE2', // Purple
    '#FFD700', // Gold
    '#4B0082', // Indigo
    '#00CED1'  // Turquoise
  ];
  
  // Get a color based on the texture string to ensure consistency
  const getColorFromTexture = (texturePath) => {
    if (!texturePath) return bottleColors[0];
    // Simple hash function to get consistent color from texture path
    let hash = 0;
    for (let i = 0; i < texturePath.length; i++) {
      hash = texturePath.charCodeAt(i) + ((hash << 5) - hash);
    }
    return bottleColors[Math.abs(hash) % bottleColors.length];
  };
  
  const bottleColor = getColorFromTexture(texture);
  
  // We'll use the loaded texture directly
  const [mousePosition, setMousePosition] = useState([0, 0]);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition([x, y]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animate the bottle rotation and parallax effect
  useFrame(({ clock }) => {
    if (meshRef.current && capRef.current && vaporRef.current) {
      // Base rotation
      meshRef.current.rotation.y += hovered ? 0.03 : 0.005;
      capRef.current.rotation.y = meshRef.current.rotation.y;
      
      // Parallax effect based on mouse position
      const parallaxStrength = hovered ? 0.3 : 0.1;
      meshRef.current.position.x = mousePosition[0] * parallaxStrength;
      meshRef.current.position.y = mousePosition[1] * parallaxStrength + Math.sin(clock.getElapsedTime()) * 0.05;
      capRef.current.position.x = meshRef.current.position.x;
      capRef.current.position.y = meshRef.current.position.y + 1.1;
      
      // Vapor animation
      vaporRef.current.position.x = meshRef.current.position.x;
      vaporRef.current.position.y = meshRef.current.position.y + 1.5;
      vaporRef.current.material.opacity = hovered ? 0.7 * (Math.sin(clock.getElapsedTime() * 2) * 0.5 + 0.5) : 0;
      vaporRef.current.scale.y = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <spotLight position={[0, 5, 5]} intensity={0.8} angle={0.3} penumbra={1} castShadow />
      
      {/* Bottle body */}
      <mesh ref={meshRef} position={[0, 0, 0]} scale={[0.8, 0.8, 0.8]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshPhysicalMaterial 
          metalness={0.4} 
          roughness={0.1} 
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1}
          color={hovered ? '#FFD700' : bottleColor}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Bottle cap */}
      <mesh ref={capRef} position={[0, 1.1, 0]} scale={[0.3, 0.2, 0.3]} castShadow>
        <cylinderGeometry args={[1, 0.8, 1, 32]} />
        <meshPhysicalMaterial 
          color={hovered ? '#B8860B' : '#444444'} 
          metalness={0.9} 
          roughness={0.2}
          clearcoat={0.5}
        />
      </mesh>
      
      {/* Vapor/mist effect */}
      <mesh ref={vaporRef} position={[0, 1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 2]} />
        <meshStandardMaterial 
          color={hovered ? '#E6E6FA' : '#FFFFFF'} 
          transparent={true} 
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
      <Environment preset="sunset" />
    </>
  );
}

// Enhanced Dynamic Background Component with Vapor Effect
function DynamicBackground({ hovered }) {
  const materialRef = useRef();
  const vaporParticlesRef = useRef();
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
      materialRef.current.uniforms.hovered.value = hovered ? 1.0 : 0.0;
    }
    
    // Animate vapor particles
    if (vaporParticlesRef.current) {
      vaporParticlesRef.current.rotation.z += 0.001;
      vaporParticlesRef.current.material.opacity = hovered ? 
        0.3 + Math.sin(clock.getElapsedTime()) * 0.1 : 
        0.1;
    }
  });

  // Create enhanced shader material with more dynamic effects
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      hovered: { value: 0.0 },
      resolution: { value: new THREE.Vector2(1024, 1024) }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float hovered;
      uniform vec2 resolution;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      // Improved noise function for more organic look
      float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 u = fract(p);
        u = u*u*(3.0-2.0*u);
        
        float res = mix(
          mix(dot(vec2(0.1, 0.3), u-vec2(0.0,0.0)), 
              dot(vec2(0.5, -0.2), u-vec2(1.0,0.0)), u.x),
          mix(dot(vec2(-0.3, 0.6), u-vec2(0.0,1.0)),
              dot(vec2(0.4, 0.2), u-vec2(1.0,1.0)), u.x),
          u.y);
        return res;
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Create dynamic gradient background based on fragrance type
        vec3 color1 = vec3(0.05, 0.05, 0.2); // Deep blue base
        vec3 color2 = vec3(0.8, 0.7, 0.1); // Gold accent
        vec3 color3 = vec3(0.6, 0.1, 0.3); // Purple accent
        
        // Create flowing vapor effect
        float vaporSpeed = 0.1 + hovered * 0.2;
        float vaporScale = 3.0 + hovered * 5.0;
        
        // Multiple layers of noise for more complex vapor
        float n1 = noise((uv + vec2(0.0, time * vaporSpeed)) * vaporScale);
        float n2 = noise((uv * 1.5 + vec2(time * -vaporSpeed * 0.7, 0.0)) * vaporScale);
        float n3 = noise((uv * 2.3 + vec2(sin(time * 0.1), cos(time * 0.1))) * (vaporScale * 0.5));
        
        // Combine noise layers
        float finalNoise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2);
        
        // Create swirling effect
        float swirl = sin(atan(uv.y - 0.5, uv.x - 0.5) * 5.0 + time);
        finalNoise = finalNoise * (0.8 + swirl * 0.2);
        
        // Color mixing based on hover and noise
        float mixFactor1 = finalNoise * (0.4 + hovered * 0.6);
        float mixFactor2 = (1.0 - finalNoise) * hovered * 0.5;
        
        vec3 finalColor = mix(color1, color2, mixFactor1);
        finalColor = mix(finalColor, color3, mixFactor2);
        
        // Add subtle glow at edges
        float edgeGlow = 1.0 - length(vUv - 0.5) * 1.5;
        edgeGlow = max(0.0, edgeGlow);
        finalColor += vec3(0.1, 0.05, 0.2) * edgeGlow * hovered;
        
        gl_FragColor = vec4(finalColor, 0.9);
      }
    `,
    side: THREE.BackSide,
    transparent: true
  });

  return (
    <>
      {/* Dynamic background sphere */}
      <mesh position={[0, 0, -1]}>
        <sphereGeometry args={[5, 64, 64]} />
        <primitive object={shaderMaterial} ref={materialRef} />
      </mesh>
      
      {/* Vapor particles effect */}
      <points ref={vaporParticlesRef} position={[0, 0, 0]}>
        <bufferGeometry>
          {(() => {
            const particleCount = 100;
            const positions = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);
            
            for (let i = 0; i < particleCount; i++) {
              // Random position within a sphere
              const radius = 2 + Math.random() * 2;
              const theta = Math.random() * Math.PI * 2;
              const phi = Math.acos(2 * Math.random() - 1);
              
              positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
              positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
              positions[i * 3 + 2] = radius * Math.cos(phi);
              
              sizes[i] = Math.random() * 0.1 + 0.05;
            }
            
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            
            return <primitive object={geometry} />
          })()}
        </bufferGeometry>
        <pointsMaterial 
          size={0.1} 
          color="#FFFFFF" 
          transparent 
          opacity={0.2} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </>
  );
}

const ProductCard = ({
  product: {
    _id,
    name,
    brand,
    shortDescription,
    price,
    images = [],
    category,
    featured = false,
    rating = 4.5,
    reviews = 0,
    originalPrice
  },
  viewMode = 'grid'
}) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const cardRef = useRef(null);
  
  // Format price with 2 decimal places
  const formattedPrice = price?.toFixed(2) || '0.00';
  const formattedOriginalPrice = originalPrice?.toFixed(2) || '';

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
  
  // Handle mouse enter/leave for 3D effects
  const handleMouseEnter = () => {
    setHovered(true);
  };
  
  const handleMouseLeave = () => {
    setHovered(false);
  };
  
  // Apply 3D transform effect based on mouse position
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e) => {
      if (!hovered) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      // Apply the 3D transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    
    const handleMouseLeaveReset = () => {
      // Reset transform when mouse leaves
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    };
    
    if (hovered && card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeaveReset);
    }
    
    return () => {
      // Add null check before removing event listeners
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeaveReset);
      }
    };
  }, [hovered]);

  // Render star rating
  const renderRating = () => {
    return (
      <div className="rating" style={{
        display: 'flex',
        alignItems: 'center',
        margin: '8px 0'
      }}>
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            style={{
              color: i < Math.floor(rating) ? '#ffc107' : '#e0e0e0',
              fontSize: '14px',
              marginRight: '2px'
            }}
          >
            ★
          </span>
        ))}
        <span style={{
          fontSize: '12px',
          color: '#666',
          marginLeft: '5px'
        }}>
          ({reviews} reviews)
        </span>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div 
        className={`product-card list-view ${hovered ? 'hovered' : ''}`}
        style={{
          display: 'flex',
          background: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease',
          height: '200px',
          marginBottom: '20px',
          '&:hover': {
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            transform: 'translateY(-3px)'
          }
        }}
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="product-image-container" style={{
          width: '200px',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f9f9f9',
          flexShrink: 0
        }}>
          {featured && (
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: '#8b5a2b',
              color: 'white',
              padding: '3px 8px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: '600',
              zIndex: 2,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Featured
            </div>
          )}
          
          <img 
            src={images[0] || '/placeholder-product.jpg'} 
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x300?text=Perfume+Image';
            }}
          />
          
          <div className="product-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: 1
          }}>
            <button 
              className="quick-view-btn" 
              onClick={handleQuickView}
              style={{
                background: 'rgba(255,255,255,0.9)',
                border: 'none',
                padding: '8px 15px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: '#fff',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Quick View
            </button>
          </div>
        </div>
        
        <div className="product-info" style={{
          padding: '20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div className="product-brand" style={{
              fontSize: '12px',
              color: '#8b5a2b',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '5px'
            }}>
              {brand}
            </div>
            
            <h3 className="product-name" style={{
              margin: '0 0 5px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#333'
            }}>
              <Link to={`/product/${_id}`} style={{
                color: 'inherit',
                textDecoration: 'none',
                '&:hover': {
                  color: '#8b5a2b'
                }
              }}>
                {name}
              </Link>
            </h3>
            
            <div className="product-category" style={{
              fontSize: '12px',
              color: '#666',
              marginBottom: '8px',
              textTransform: 'capitalize'
            }}>
              {category}
            </div>
            
            <p className="product-description" style={{
              margin: '10px 0',
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {shortDescription}
            </p>
            
            {renderRating()}
          </div>
          
          <div className="product-meta" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px',
            paddingTop: '15px',
            borderTop: '1px solid #eee'
          }}>
            <div className="product-price" style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#222'
            }}>
              ${formattedPrice}
              {originalPrice && (
                <span style={{
                  fontSize: '14px',
                  color: '#999',
                  textDecoration: 'line-through',
                  marginLeft: '8px',
                  fontWeight: '400'
                }}>
                  ${formattedOriginalPrice}
                </span>
              )}
            </div>
            
            <div className="product-actions" style={{
              display: 'flex',
              gap: '10px'
            }}>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(e);
                }} 
                className="add-to-cart-btn"
                style={{
                  padding: '8px 15px',
                  background: '#8b5a2b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: '#7a4d24',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Add to Cart
              </button>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsWishlisted(!isWishlisted);
                }} 
                className="wishlist-btn"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid #ddd',
                  background: isWishlisted ? '#ffebee' : 'white',
                  color: isWishlisted ? '#f44336' : '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    background: isWishlisted ? '#ffcdd2' : '#f9f9f9',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                {isWishlisted ? '♥' : '♡'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Hover styles for the card
  const cardHoverStyle = hovered ? {
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    transform: 'translateY(-5px)'
  } : {};

  return (
    <div 
      className={`product-card grid-view ${hovered ? 'hovered' : ''}`}
      style={{
        background: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        ...cardHoverStyle
      }}
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-image-container" style={{
        position: 'relative',
        width: '100%',
        paddingTop: '100%', // 1:1 aspect ratio
        backgroundColor: '#f9f9f9',
        overflow: 'hidden'
      }}>
        {featured && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: '#8b5a2b',
            color: 'white',
            padding: '3px 8px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: '600',
            zIndex: 2,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Featured
          </div>
        )}
        
        <img 
          src={images[0] || 'https://via.placeholder.com/300x300?text=Perfume+Image'} 
          alt={name}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            padding: '20px',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)'
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x300?text=Perfume+Image';
          }}
        />
        
        <div className="product-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1
        }}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleQuickView(e);
            }}
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease'
            }}
          >
            Quick View
          </button>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(e);
            }}
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>Add to Cart</span>
            <span style={{ fontSize: '14px' }}>+</span>
          </button>
        </div>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: isWishlisted ? 'rgba(255, 235, 238, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            color: isWishlisted ? '#f44336' : '#666',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
            transition: 'all 0.2s ease'
          }}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      
      <div className="product-info" style={{
        padding: '15px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="product-brand" style={{
          fontSize: '12px',
          color: '#8b5a2b',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '5px'
        }}>
          {brand}
        </div>
        
        <h3 className="product-name" style={{
          margin: '0 0 5px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#333',
          lineHeight: '1.3',
          minHeight: '40px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          <Link to={`/product/${_id}`} style={{
            color: 'inherit',
            textDecoration: 'none'
          }}>
            {name}
          </Link>
        </h3>
        
        <div className="product-category" style={{
          fontSize: '11px',
          color: '#666',
          marginBottom: '8px',
          textTransform: 'capitalize'
        }}>
          {category}
        </div>
        
        {renderRating()}
        
        <div className="product-meta" style={{
          marginTop: 'auto',
          paddingTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div className="product-price" style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#222'
          }}>
            ${formattedPrice}
            {originalPrice && (
              <span style={{
                fontSize: '12px',
                color: '#999',
                textDecoration: 'line-through',
                marginLeft: '5px',
                fontWeight: '400'
              }}>
                ${formattedOriginalPrice}
              </span>
            )}
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(e);
            }}
            style={{
              padding: '6px 12px',
              background: '#8b5a2b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>Add</span>
            <span style={{ fontSize: '14px' }}>+</span>
          </button>
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
    </div>
  );
};

export default ProductCard;
