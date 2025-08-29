import React, { useRef, useState, useEffect, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial, useTexture, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';
import './HeroSection.css';

// Custom shader material for fluid distortion and vapor effect
const VaporMaterial = shaderMaterial(
  {
    time: 0,
    mouse: new THREE.Vector2(0.5, 0.5),
    resolution: new THREE.Vector2(1, 1),
    vaporIntensity: 0.5,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;
    uniform float vaporIntensity;
    varying vec2 vUv;
    
    // Simplex noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      // First corner
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      // Permutations
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
      // Gradients: 7x7 points over a square, mapped onto an octahedron.
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      vec2 uv = vUv;
      vec2 center = mouse;
      
      // Create fluid distortion effect
      float dist = distance(uv, center);
      float wave = sin(dist * 20.0 - time * 2.0) * 0.1;
      float ripple = sin(dist * 30.0 - time * 3.0) * 0.05;
      
      // Apply distortion
      vec2 distorted = uv + vec2(wave, ripple) * 0.02;
      
      // Create gradient background
      vec3 color1 = vec3(0.1, 0.1, 0.3); // Dark blue
      vec3 color2 = vec3(0.3, 0.1, 0.4); // Purple
      vec3 color3 = vec3(0.1, 0.3, 0.4); // Teal
      
      // Create vapor effect using noise
      float vapor = snoise(vec3(uv * 3.0, time * 0.2)) * vaporIntensity;
      float vaporMask = smoothstep(0.4, 0.6, vapor);
      
      // Mix colors with noise
      float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 + time) * 0.5 + 0.5;
      vec3 finalColor = mix(color1, color2, noise);
      finalColor = mix(finalColor, color3, sin(time + uv.y * 5.0) * 0.5 + 0.5);
      
      // Add vapor effect
      finalColor = mix(finalColor, vec3(1.0, 1.0, 1.0), vaporMask * 0.3);
      
      // Add some sparkle effect
      float sparkle = sin(uv.x * 50.0 + time * 5.0) * sin(uv.y * 50.0 + time * 5.0);
      if (sparkle > 0.95) {
        finalColor += vec3(1.0, 1.0, 1.0) * 0.3;
      }
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Extend the material to work with React Three Fiber
extend({ VaporMaterial });

// Perfume bottle component
function PerfumeBottle({ position, rotation, scale, index }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Define image paths for bottle textures
  const bottleTexturePaths = [
    '/PICTURES/pexels-valeriya-965989.jpg',
    '/PICTURES/pexels-valeriya-1961791.jpg',
    '/PICTURES/pexels-valeriya-724635.jpg'
  ];
  
  // Load textures from PICTURES folder
  const texture = useTexture(bottleTexturePaths[index % bottleTexturePaths.length]);
  
  // Define fallback colors in case textures fail to load
  const bottleColors = [
    '#C01530', // Red
    '#8A2BE2', // Purple
    '#FFD700'  // Gold
  ];
  
  // Handle texture loading errors
  useEffect(() => {
    texture.onError = () => {
      console.error(`Failed to load texture: ${bottleTexturePaths[index % bottleTexturePaths.length]}`);
    };
  }, [texture, index, bottleTexturePaths]);
  
  // Animate the bottle
  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.001;
      
      // Rotation animation
      if (hovered) {
        meshRef.current.rotation.y += 0.02;
      } else {
        meshRef.current.rotation.y += 0.005;
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
        <meshStandardMaterial 
          metalness={0.9} 
          roughness={0.1} 
          envMapIntensity={1}
          map={texture}
          color={hovered ? '#FFD700' : 'white'}
        />
      </mesh>
    </Float>
  );
}

// Vapor effect component
function VaporEffect({ mouse }) {
  const materialRef = useRef();
  const vaporTexture = useTexture('/PICTURES/pexels-mareefe-932577.jpg');
  
  // Handle texture loading errors
  useEffect(() => {
    vaporTexture.onError = () => {
      console.error('Failed to load vapor texture');
    };
  }, [vaporTexture]);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.mouse = new THREE.Vector2(mouse[0], mouse[1]);
      materialRef.current.vaporIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      
      // Animate texture
      if (vaporTexture) {
        vaporTexture.offset.y = state.clock.elapsedTime * 0.05;
      }
    }
  });

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial
        ref={materialRef}
        map={vaporTexture}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// Scene setup
function HeroScene({ mouse }) {
  const { viewport } = useThree();
  const bgTexture = useTexture('/PICTURES/pexels-pixabay-264950.jpg');
  
  // Handle texture loading errors
  useEffect(() => {
    bgTexture.onError = () => {
      console.error('Failed to load background texture');
    };
  }, [bgTexture]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Background image */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial map={bgTexture} opacity={0.3} transparent />
      </mesh>
      
      {/* Background vapor effect */}
      <VaporEffect mouse={mouse} />
      
      {/* Perfume bottles */}
      <PerfumeBottle 
        position={[-1.5, 0, 0]} 
        rotation={[0, 0, 0]} 
        scale={[0.3, 0.3, 0.3]} 
        index={0}
      />
      <PerfumeBottle 
        position={[0, 0.5, 0.5]} 
        rotation={[0.2, 0.5, 0]} 
        scale={[0.4, 0.4, 0.4]} 
        index={1}
      />
      <PerfumeBottle 
        position={[1.5, -0.3, 0.2]} 
        rotation={[-0.1, -0.3, 0.1]} 
        scale={[0.35, 0.35, 0.35]} 
        index={2}
      />
      
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
    </>
  );
}

const HeroSection = () => {
  const [mouse, setMouse] = useState([0.5, 0.5]);
  const containerRef = useRef();

  const handleMouseMove = (event) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      setMouse([x, y]);
    }
  };

  // Create texture directory if it doesn't exist
  useEffect(() => {
    // This would normally be done during build, but for demo purposes
    // we're handling it here
    console.log('Setting up textures...');
  }, []);

  return (
    <section className="hero-section" ref={containerRef} onMouseMove={handleMouseMove} style={{
      backgroundImage: "url('/PICTURES/pexels-valeriya-965989.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflow: 'hidden',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: '#fff',
      textAlign: 'left',
      padding: '0 5%'
    }}>
      <div className="hero-overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
        zIndex: 1
      }}></div>
      <div className="hero-content" style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '600px',
        padding: '2rem',
        marginLeft: '5%'
      }}>
        <div className="hero-text">
          <h1 className="hero-title" style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Luxury Fragrances That Define You
          </h1>
          <p className="hero-subtitle" style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            lineHeight: '1.6',
            maxWidth: '90%',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            Indulge in our exclusive collection of premium perfumes, carefully curated from the world's most prestigious fragrance houses. Find your perfect scent today.
          </p>
          <button 
            className="hero-cta" 
            onClick={() => window.location.href = '/products'}
            style={{
              padding: '12px 30px',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#fff',
              backgroundColor: '#8b5a2b',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Explore Collection
          </button>
        </div>
      </div>
      
      <div className="hero-canvas">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            if (gl) {
              gl.setClearColor('transparent');
              // Handle context loss gracefully
              if (gl.canvas) {
                gl.canvas.addEventListener('webglcontextlost', (event) => {
                  event.preventDefault();
                  console.log('WebGL context lost. Attempting to restore...');
                });
                // Handle context restoration
                gl.canvas.addEventListener('webglcontextrestored', () => {
                  console.log('WebGL context restored.');
                });
              }
            }
          }}
        >
          <Suspense fallback={null}>
            <HeroScene mouse={mouse} />
          </Suspense>
          <ErrorBoundary>
            {/* Wrap scene in error boundary */}
          </ErrorBoundary>
        </Canvas>
      </div>
      
      <div className="hero-vapor"></div>
      <div className="hero-overlay"></div>
    </section>
  );
};

export default HeroSection;
