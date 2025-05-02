// app/cake-designer/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function CakeDesignerPage() {
  // State for tabs and canvas
  const [activeTab, setActiveTab] = useState('flavour');
  const [selectedColor, setSelectedColor] = useState('#FF69B1');
  const [price, setPrice] = useState(45);

  // State for tracking device size
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // State for drag scrolling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Refs
  const tabsRef = useRef<HTMLDivElement>(null);
  
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

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    
    setIsDragging(true);
    setStartX(e.pageX - element.offsetLeft);
    setScrollLeft(element.scrollLeft);
    
    document.body.style.userSelect = 'none'; // Prevent text selection during drag
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = ''; // Re-enable text selection
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const element = e.currentTarget;
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    element.scrollLeft = scrollLeft - walk;
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
  
  // Tabs configuration
  const tabs = [
    { id: 'flavour', name: 'Flavour' },
    { id: 'fill', name: 'Fill' },
    { id: 'frosting', name: 'Frosting' },
  ];

  return (
    <>
      {/* Pink Header */}
      <div style={{ 
        backgroundColor: '#FF69B1',
        color: 'white',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Location */}
        <div style={{ 
          fontSize: '18px',
          fontWeight: '500'
        }}>
          Kamppi
        </div>
        
        {/* User avatar */}
        <div style={{ 
          width: '36px', 
          height: '36px', 
          borderRadius: '50%', 
          backgroundColor: '#67B7E1',
        }}>
          {/* Placeholder for user icon */}
        </div>
      </div>

      {/* Tabs Container */}
      <div style={{ 
        display: 'flex',
        borderBottom: '1px solid #E5E7EB',
        padding: '8px',
      }}>
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            style={{ 
              flex: 1,
              padding: '15px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              color: tab.id === activeTab ? '#1E40AF' : '#333333',
              borderRadius: '8px',
              margin: '0 4px',
              cursor: 'pointer',
              border: '1px solid #E5E7EB',
              fontSize: '14px',
              fontWeight: '500',
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '12px',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Circle 1 - Gray */}
          <div style={{ 
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#E5E7EB',
          }}></div>
          
          {/* Circle 2 - Gray */}
          <div style={{ 
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#E5E7EB',
          }}></div>
          
          {/* Circle 3 - Orange */}
          <div style={{ 
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#FF6B4D',
          }}></div>
        </div>
      </div>

      {/* Canvas */}
      <div style={{
        borderBottom: '1px solid #E5E7EB',
        padding: '0',
        height: '240px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#9CA3AF',
        fontSize: '16px',
      }}>
        Click on a shape
      </div>

      {/* Color/Shape Selection */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          {/* Shape 1 - Pink border */}
          <div 
            style={{
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: 'white',
              border: '1px solid #FF69B1',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedColor('#FF69B1')}
          >
            {/* Placeholder for shape */}
          </div>
          
          {/* Shape 2 */}
          <div 
            style={{
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              cursor: 'pointer',
            }}
          >
            {/* Placeholder for shape */}
          </div>
          
          {/* Shape 3 */}
          <div 
            style={{
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              cursor: 'pointer',
            }}
          >
            {/* Placeholder for shape */}
          </div>
          
          {/* Shape 4 */}
          <div 
            style={{
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              cursor: 'pointer',
            }}
          >
            {/* Placeholder for shape */}
          </div>
          
          {/* Add button */}
          <div 
            style={{
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '24px', color: '#6B7280' }}>+</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          height: '4px',
          backgroundColor: '#E5E7EB',
          borderRadius: '9999px',
          width: '100%'
        }}>
          <div style={{
            height: '4px',
            width: '30%',
            backgroundColor: '#3B82F6',
            borderRadius: '9999px'
          }}></div>
        </div>
      </div>

      {/* Price Display */}
      <div style={{
        backgroundColor: '#3B82F6',
        color: 'white',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: '500',
        fontSize: '18px',
      }}>
        <div>Total price</div>
        <div>{price}€</div>
      </div>
    </>
  );
}