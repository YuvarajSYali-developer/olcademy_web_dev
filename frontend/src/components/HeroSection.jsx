import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import './HeroSection.css';

// Custom shader material for fluid distortion
const FluidMaterial = shaderMaterial(
  {
    time: 0,
    mouse: new THREE.Vector2(0, 0),
    resolution: new THREE.Vector2(1, 1),
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
    varying vec2 vUv;
    
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
      
      float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 + time) * 0.5 + 0.5;
      
      vec3 finalColor = mix(color1, color2, noise);
      finalColor = mix(finalColor, color3, sin(time + uv.y * 5.0) * 0.5 + 0.5);
      
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
extend({ FluidMaterial });

function FluidPlane({ mouse }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.elapsedTime;
      materialRef.current.mouse = mouse;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <fluidMaterial ref={materialRef} />
    </mesh>
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

  return (
    <section className="hero-section" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Discover Your Signature Scent
          </h1>
          <p className="hero-subtitle">
            Explore our curated collection of luxury fragrances from the world's most prestigious brands
          </p>
          <button className="hero-cta">
            Shop Now
          </button>
        </div>
      </div>
      
      <div className="hero-canvas">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          style={{ background: 'transparent' }}
        >
          <FluidPlane mouse={mouse} />
        </Canvas>
      </div>
      
      <div className="hero-overlay"></div>
    </section>
  );
};

export default HeroSection;
