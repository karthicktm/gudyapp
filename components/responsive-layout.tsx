'use client';

import { useState, useEffect } from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveLayout({ children, className = '' }: ResponsiveLayoutProps) {
  // State for tracking device size
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Check device type on mount and window resize
  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    // Initial check
    checkDeviceSize();
    
    // Add resize listener
    window.addEventListener('resize', checkDeviceSize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDeviceSize);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: '#f5f5f5',
        padding: isMobile ? '0' : '16px',
      }}
      className={className}
    >
      <div
        style={{
          width: isMobile ? '100%' : isTablet ? '95%' : '100%',
          maxWidth: isMobile ? '100%' : isTablet ? '700px' : '380px',
          height: isMobile ? '100vh' : 'auto',
          minHeight: isMobile ? '100vh' : isTablet ? '100vh' : '100vh',
          maxHeight: isMobile ? '100vh' : 'none',
          backgroundColor: 'white',
          borderRadius: isMobile ? '0' : '8px',
          boxShadow: isMobile ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
          borderWidth: isMobile ? '0' : '1px',
          borderStyle: 'solid',
          borderColor: '#e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
      
      {/* Global styles for responsive design */}
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow-x: hidden;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollable-row {
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
        }
        
        .scrollable-row > div {
          scroll-snap-align: start;
        }
        
        @media (max-width: 767px) {
          /* Mobile styles */
          body {
            overflow: hidden;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          /* Tablet styles */
        }
        
        @media (min-width: 1024px) {
          /* Desktop styles */
        }
      `}</style>
    </div>
  );
}