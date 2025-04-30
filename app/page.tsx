'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [sprinkles, setSprinkles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Generate more sprinkles to cover the entire card
    const newSprinkles = Array.from({ length: 50 }).map((_, index) => {
      // Random properties for each sprinkle
      const size = Math.random() * 8 + 4; // 4-12px
      // Distribute sprinkles across the entire width
      const left = Math.random() * 100; // 0-100%
      // Vary the starting positions so they don't all start at the top
      const top = Math.random() * -100; // Start between 0 and -100% (above the card)
      // Faster animation for more visible movement
      const animationDuration = Math.random() * 5 + 3; // 3-8s
      // Stagger the start times
      const animationDelay = Math.random() * 5; // 0-5s delay
      const color = getRandomColor();
      
      return (
        <div 
          key={index}
          style={{
            position: 'absolute',
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size/2}px`,
            backgroundColor: color,
            borderRadius: `${size/2}px`,
            opacity: '0.7',
            // Define animation directly in the style
            animationName: 'fallAnimation',
            animationDuration: `${animationDuration}s`,
            animationTimingFunction: 'linear',
            animationDelay: `${animationDelay}s`,
            animationIterationCount: 'infinite',
            transform: `rotate(${Math.random() * 360}deg)`,
            zIndex: 0
          }}
        />
      );
    });
    
    setSprinkles(newSprinkles);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh', 
      background: '#f5f5f5'
    }}>
      {/* Card Container */}
      <div style={{ 
        width: '100%', 
        maxWidth: '360px', 
        padding: '2rem 1.5rem',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden' // Contain the sprinkles within the card
      }}>
        {/* Sprinkles Container - Inside the card */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none'
        }}>
          {sprinkles}
        </div>
        
        {/* Logo Circle */}
        <div style={{ 
          width: '110px',
          height: '110px',
          borderRadius: '50%', 
          backgroundColor: '#FFC0CB', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '30px',
          position: 'relative',
          zIndex: 1 // Place above the sprinkles
        }}>
          <Image 
            src="/images/gudy-logo.svg" 
            alt="Gudy Logo" 
            width={110}
            height={110}
            style={{ 
              objectFit: 'contain'
            }}
          />
        </div>
        
        {/* Title */}
        <h1 style={{ 
          fontFamily: "'Paytone One', sans-serif", 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: 'black', 
          textAlign: 'center', 
          marginBottom: '10px',
          lineHeight: '1.2',
          position: 'relative',
          zIndex: 1 // Place above the sprinkles
        }}>
          Gudy, your<br />cook buddy
        </h1>
        
        {/* Description */}
        <p style={{ 
          fontFamily: "'Hanken Grotesk', Regular", 
          textAlign: 'center', 
          fontSize: '1rem', 
          color: '#1f2937', 
          marginBottom: '40px',
          lineHeight: '1.5',
          position: 'relative',
          zIndex: 1 // Place above the sprinkles
        }}>
          Design your perfect dish in 3D<br />
          Sign in to start!
        </p>
        
        {/* Buttons Container */}
        <div style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          position: 'relative',
          zIndex: 1 // Place above the sprinkles
        }}>
          {/* Login Button - Using Next.js Link */}
          <Link href="/login" style={{ 
            display: 'block', 
            width: '100%', 
            textDecoration: 'none' 
          }} passHref>
            <button style={{ 
              width: '100%', 
              backgroundColor: '#FF69B1', 
              color: 'white', 
              fontWeight: '500', 
              padding: '14px',
              borderRadius: '9999px', 
              border: 'none',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>
              LOG IN
            </button>
          </Link>
          
          {/* Create Account Button - Using Next.js Link */}
          <Link href="/signup" style={{ 
            display: 'block', 
            width: '100%', 
            textDecoration: 'none' 
          }} passHref>
            <button style={{ 
              width: '100%', 
              backgroundColor: 'white', 
              color: 'black', 
              fontWeight: '500', 
              padding: '14px',
              borderRadius: '9999px', 
              border: '1px solid #d1d5db',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>
              CREATE ACCOUNT
            </button>
          </Link>
        </div>
      </div>
      
      {/* Define keyframes animation separately */}
      <style jsx global>{`
        @keyframes fallAnimation {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
          }
          25% {
            transform: translateY(25vh) rotate(90deg) translateX(15px);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(-15px);
          }
          75% {
            transform: translateY(75vh) rotate(270deg) translateX(10px);
          }
          100% {
            transform: translateY(100vh) rotate(360deg) translateX(-10px);
          }
        }
      `}</style>
    </div>
  );
}

// Helper function to generate random sprinkle colors
function getRandomColor() {
  const colors = [
    '#FF6B6B', // Red
    '#FFB8B8', // Light pink
    '#FFCE96', // Light orange
    '#FFD93D', // Yellow
    '#6BCB77', // Green
    '#4D96FF', // Blue
    '#B2A4FF', // Purple
    '#FF96A6'  // Pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}