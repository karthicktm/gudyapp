'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [sprinkles, setSprinkles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Generate sprinkles for background animation
    const newSprinkles = Array.from({ length: 50 }).map((_, index) => {
      const size = Math.random() * 8 + 4;
      const left = Math.random() * 100;
      const top = Math.random() * -100;
      const animationDuration = Math.random() * 5 + 3;
      const animationDelay = Math.random() * 5;
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
      background: '#f5f5f5',
      padding: '16px'
    }}>
      {/* Main Card Container */}
      <div style={{ 
        width: '100%', 
        maxWidth: '380px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 20px'
      }}>
        {/* Sprinkles Container */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {sprinkles}
        </div>
        
        {/* Content Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Logo Circle */}
          <div style={{ 
            width: '110px',
            height: '110px',
            borderRadius: '50%', 
            backgroundColor: '#FFC0CB', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: '40px'
          }}>
            <Image 
              src="/images/gudy-logo.svg" 
              alt="Gudy Logo" 
              width={70}
              height={70}
              style={{ objectFit: 'contain' }}
            />
          </div>
          
          {/* Title */}
          <h1 style={{ 
            fontFamily: "'Paytone One', sans-serif", 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: 'black', 
            textAlign: 'center', 
            margin: '0 0 16px 0',
            lineHeight: '1.2'
          }}>
            Gudy, your<br />cook buddy
          </h1>
          
          {/* Description */}
          <p style={{ 
            fontFamily: 'sans-serif',
            textAlign: 'center', 
            fontSize: '16px', 
            color: '#1f2937', 
            marginBottom: '50px',
            lineHeight: '1.5'
          }}>
            Design your perfect dish in 3D<br />
            Sign in to start!
          </p>
          
          {/* Buttons Container */}
          <div style={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px'
          }}>
            {/* Login Button */}
            <Link href="/auth/login" style={{ 
              display: 'block', 
              width: '100%', 
              textDecoration: 'none' 
            }}>
              <button style={{ 
                width: '100%', 
                backgroundColor: '#FF69B1', 
                color: 'white', 
                fontWeight: '500', 
                padding: '14px',
                borderRadius: '9999px', 
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer'
              }}>
                LOG IN
              </button>
            </Link>
            
            {/* Create Account Button */}
            <Link href="/auth/signup" style={{ 
              display: 'block', 
              width: '100%', 
              textDecoration: 'none' 
            }}>
              <button style={{ 
                width: '100%', 
                backgroundColor: 'white', 
                color: 'black', 
                fontWeight: '500', 
                padding: '14px',
                borderRadius: '9999px', 
                border: '1px solid #d1d5db',
                fontSize: '16px',
                cursor: 'pointer'
              }}>
                CREATE ACCOUNT
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Define keyframes animation */}
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