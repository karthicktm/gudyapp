'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  // Refs for scrollable containers
  const foodCategoriesRef = useRef<HTMLDivElement>(null);
  const topArtistsRef = useRef<HTMLDivElement>(null);
  
  // State for tracking drag
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
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
  
  // Setup mouse wheel scrolling
  useEffect(() => {
    const handleWheel = (event: WheelEvent, element: HTMLDivElement) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        element.scrollLeft += event.deltaY;
      }
    };
    
    const foodCategoriesElement = foodCategoriesRef.current;
    const topArtistsElement = topArtistsRef.current;
    
    if (foodCategoriesElement) {
      const wheelListener = (event: WheelEvent) => handleWheel(event, foodCategoriesElement);
      foodCategoriesElement.addEventListener('wheel', wheelListener, { passive: false });
      
      return () => {
        foodCategoriesElement.removeEventListener('wheel', wheelListener);
      };
    }
    
    if (topArtistsElement) {
      const wheelListener = (event: WheelEvent) => handleWheel(event, topArtistsElement);
      topArtistsElement.addEventListener('wheel', wheelListener, { passive: false });
      
      return () => {
        topArtistsElement.removeEventListener('wheel', wheelListener);
      };
    }
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
    
    document.body.style.userSelect = 'none'; // Prevent text selection during drag
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = ''; // Re-enable text selection
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return;
    
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    ref.current.scrollLeft = scrollLeft - walk;
  };

  // Add event listeners to document for mouse up (to end drag even outside element)
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.userSelect = '';
      }
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      {/* Header */}
      <div style={{ 
        padding: '20px 20px 0 20px'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <h1 style={{ 
            fontFamily: "'Paytone One', sans-serif", 
            fontSize: '24px', 
            margin: 0 
          }}>
            Hello!
          </h1>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            backgroundColor: '#e0e0e0' 
          }}></div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        padding: '20px',
        paddingTop: '10px',
        paddingBottom: '80px' /* Space for bottom nav */
      }} className="hide-scrollbar">
        {/* Food Categories */}
        <div style={{ 
          marginBottom: '20px'
        }}>
          <div 
            ref={foodCategoriesRef}
            style={{ 
              display: 'flex', 
              overflowX: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              gap: '12px',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: '8px',
              cursor: isDragging ? 'grabbing' : 'grab'
            }} 
            className="hide-scrollbar scrollable-row"
            onMouseDown={(e) => handleMouseDown(e, foodCategoriesRef)}
            onMouseUp={handleMouseUp}
            onMouseMove={(e) => handleMouseMove(e, foodCategoriesRef)}
            onMouseLeave={handleMouseUp}
          >
            {['C', 'P', 'S', 'P', 'P', 'C', 'P', 'S'].map((category, index) => (
              <div key={index} style={{ 
                minWidth: '64px', 
                height: '64px', 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                flexShrink: 0
              }}>
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* Start Creating Section */}
        <div style={{ 
          marginBottom: '20px'
        }}>
          <h2 style={{ 
            fontFamily: "'Paytone One', sans-serif", 
            fontSize: '22px',
            margin: '0 0 12px 0'
          }}>
            Start creating!
          </h2>
          <div style={{ 
            height: '120px', 
            backgroundColor: '#FF69B1', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'sans-serif'
          }}>
            Rolling Pin Image
          </div>
        </div>

        {/* Challenges Section */}
        <div style={{ 
          marginBottom: '20px',
          display: 'flex',
          flexDirection: isTablet ? 'column' : 'row',
          gap: '12px'
        }}>
          {/* First Challenge Card */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div>
              <h3 style={{ 
                fontFamily: "'Paytone One', sans-serif", 
                fontSize: '14px',
                margin: '0 0 4px 0'
              }}>
                Join the challenge!
              </h3>
              <p style={{ 
                fontSize: '12px',
                color: '#6b7280',
                margin: '0 0 4px 0'
              }}>
                Spring challenge
              </p>
              <div style={{ fontSize: '20px' }}>→</div>
            </div>
          </div>

          {/* Second Challenge Card */}
          <div style={{ 
            flex: 1,
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div>
              <h3 style={{ 
                fontFamily: "'Paytone One', sans-serif", 
                fontSize: '14px',
                margin: '0 0 4px 0'
              }}>
                Join the challenge!
              </h3>
              <p style={{ 
                fontSize: '12px',
                color: '#6b7280',
                margin: '0 0 4px 0'
              }}>
                Easter challenge
              </p>
              <div style={{ fontSize: '20px' }}>→</div>
            </div>
          </div>
        </div>

        {/* Top Artists Section */}
        <div>
          <h2 style={{ 
            fontFamily: "'Paytone One', sans-serif", 
            fontSize: '22px',
            margin: '0 0 12px 0'
          }}>
            Top Artists
          </h2>
          
          <div 
            ref={topArtistsRef}
            style={{ 
              display: 'flex',
              overflowX: 'auto',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              gap: '12px',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: '8px',
              cursor: isDragging ? 'grabbing' : 'grab'
            }} 
            className="hide-scrollbar scrollable-row"
            onMouseDown={(e) => handleMouseDown(e, topArtistsRef)}
            onMouseUp={handleMouseUp}
            onMouseMove={(e) => handleMouseMove(e, topArtistsRef)}
            onMouseLeave={handleMouseUp}
          >
            {['Birthday Cake', 'Pink Cake', 'Placeholder 1', 'Placeholder 2', 'Placeholder 3', 'Placeholder 4'].map((name, index) => (
              <div key={index} style={{ 
                minWidth: isTablet ? '180px' : '140px',
                maxWidth: isTablet ? '180px' : '140px',
                backgroundColor: 'white', 
                borderRadius: '8px', 
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                flexShrink: 0
              }}>
                <div style={{ 
                  height: isTablet ? '150px' : '120px', 
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280',
                  fontSize: '12px',
                  textAlign: 'center',
                  padding: '4px'
                }}>
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '64px', 
        backgroundColor: '#FF69B1', 
        borderBottomLeftRadius: isMobile ? '0' : '8px', 
        borderBottomRightRadius: isMobile ? '0' : '8px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFFFFF" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
          </svg>
          <span style={{ color: 'white', fontSize: '12px', marginTop: '4px' }}>Home</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFFFFF" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          <span style={{ color: 'white', fontSize: '12px', marginTop: '4px' }}>Create</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFFFFF" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          <span style={{ color: 'white', fontSize: '12px', marginTop: '4px' }}>Search</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFFFFF" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
          </svg>
          <span style={{ color: 'white', fontSize: '12px', marginTop: '4px' }}>Profile</span>
        </div>
      </div>
    </>
  );
}