'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CakeCustomizer() {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(45);
  const [activeTab, setActiveTab] = useState(0); // Shape selected by default
  const [selectedShape, setSelectedShape] = useState(0); // First shape selected by default
  
  // Refs for the scrollable containers
  const toolsContainerRef = useRef<HTMLDivElement>(null);
  const shapesContainerRef = useRef<HTMLDivElement>(null);
  
  // State for tracking device size
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // State for drag scrolling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeContainer, setActiveContainer] = useState<HTMLDivElement | null>(null);
  
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
  
  // Setup mouse wheel scrolling for horizontal containers
  useEffect(() => {
    const handleWheel = (event: WheelEvent, element: HTMLDivElement) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        element.scrollLeft += event.deltaY;
      }
    };
    
    const toolsElement = toolsContainerRef.current;
    const shapesElement = shapesContainerRef.current;
    
    if (toolsElement) {
      const wheelListener = (event: WheelEvent) => handleWheel(event, toolsElement);
      toolsElement.addEventListener('wheel', wheelListener, { passive: false });
      
      return () => {
        toolsElement.removeEventListener('wheel', wheelListener);
      };
    }
    
    if (shapesElement) {
      const wheelListener = (event: WheelEvent) => handleWheel(event, shapesElement);
      shapesElement.addEventListener('wheel', wheelListener, { passive: false });
      
      return () => {
        shapesElement.removeEventListener('wheel', wheelListener);
      };
    }
  }, []);
  
  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    
    setIsDragging(true);
    setActiveContainer(ref.current);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
    
    document.body.style.userSelect = 'none'; // Prevent text selection during drag
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveContainer(null);
    document.body.style.userSelect = ''; // Re-enable text selection
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !activeContainer) return;
    
    const x = e.pageX - activeContainer.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    activeContainer.scrollLeft = scrollLeft - walk;
  };
  
  // Add event listeners to document for mouse up (to end drag even outside element)
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setActiveContainer(null);
        document.body.style.userSelect = '';
      }
    };
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !activeContainer) return;
      
      const x = e.pageX - activeContainer.offsetLeft;
      const walk = (x - startX) * 2;
      activeContainer.scrollLeft = scrollLeft - walk;
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, activeContainer, scrollLeft, startX]);

  // Tool categories with just icons
  const toolCategories = [
    '/images/shape-icon.svg',
    '/images/levels-icon.svg',
    '/images/flavour-icon.svg',
    '/images/fill-icon.svg',
    '/images/frosting-icon.svg',
  ];

  // Shape options with just images
  const shapeOptions = [
    '/images/Round.svg',
    '/images/Square.svg',
    '/images/Heart.svg',
    '/images/Polygon.svg',
    '/images/add-icon.svg',
  ];

  // Size constants for SVGs and containers
  const TOOL_ICON_SIZE = 60;
  const SHAPE_ICON_SIZE = 25;
  const SHAPE_CONTAINER_SIZE = 40;

  // Handle tab selection
  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  // Handle shape selection
  const handleShapeSelect = (shapeIndex: number) => {
    setSelectedShape(shapeIndex);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div style={{ 
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: isMobile ? '0' : '8px',
        borderTopRightRadius: isMobile ? '0' : '8px',
        backgroundColor: '#FF69B1'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Image 
              src="/images/location.svg" 
              alt="Location" 
              width={20} 
              height={20}
            />
            <span style={{ 
              fontFamily: 'Hanken Grotesk',
              fontWeight: '500', 
              fontSize: '16px'
            }}>
              Kampili
            </span>
          </div>
          <Image 
            src="/images/dropdown.svg" 
            alt="Dropdown" 
            width={16} 
            height={16}
          />
        </div>

        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          overflow: 'hidden'
        }}>
          <Image 
            src="/images/avatar.svg" 
            alt="Profile" 
            width={36} 
            height={36}
          />
        </div>
      </div>

      {/* Tool Categories - Just the icons in a scrollable container with reduced padding */}
      <div 
        ref={toolsContainerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '12px', // Reduced gap between tools
          padding: '8px', // Reduced padding (was 16px)
          backgroundColor: 'white',
          WebkitOverflowScrolling: 'touch',
          cursor: isDragging ? 'grabbing' : 'grab'
        }} 
        className="hide-scrollbar scrollable-row"
        onMouseDown={(e) => handleMouseDown(e, toolsContainerRef)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {toolCategories.map((iconPath, index) => (
          <Image 
            key={index}
            src={iconPath} 
            alt="Tool icon" 
            width={TOOL_ICON_SIZE} 
            height={TOOL_ICON_SIZE}
            onClick={() => handleTabChange(index)}
            style={{
              cursor: 'pointer',
              backgroundColor: activeTab === index ? '#758AFD' : 'transparent',
              borderRadius: '8px',
              padding: '6px', // Reduced padding (was 8px)
              flexShrink: 0
            }}
          />
        ))}
      </div>

      {/* Controls and Canvas */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
        padding: '0 12px'
      }}>
        {/* Controls Row - Moved up by reducing margin */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '12px',
          margin: '6px 0' // Reduced from 12px to 6px
        }}>
          <Image 
            src="/images/LeftArrow.svg" 
            alt="Undo" 
            width={15} 
            height={15}
            style={{ cursor: 'pointer' }}
          />
          <Image 
            src="/images/RightArrow.svg" 
            alt="Redo" 
            width={15} 
            height={15}
            style={{ cursor: 'pointer' }}
          />
          <Image 
            src="/images/AI_icon.svg" 
            alt="Tools" 
            width={15} 
            height={15}
            style={{ cursor: 'pointer' }}
          />
        </div>

        {/* Canvas Area - Increased height */}
        <div style={{
          flex: 1,
          border: '2px dashed #CCCCCC',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 0 12px 0', // Reduced bottom margin (was 16px)
          minHeight: '330px' // Increased height (was 300px)
        }}>
          <span style={{
            color: '#999999',
            fontSize: '16px'
          }}>
            Click on a shape
          </span>
        </div>

        {/* Shape Options - Reduced top margin */}
        <div 
          ref={shapesContainerRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            overflowX: 'auto',
            gap: '16px',
            margin: '0 0 16px 0', // Reduced margin (was 24px)
            padding: '0 12px',
            WebkitOverflowScrolling: 'touch',
            cursor: isDragging ? 'grabbing' : 'grab'
          }} 
          className="hide-scrollbar scrollable-row"
          onMouseDown={(e) => handleMouseDown(e, shapesContainerRef)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {shapeOptions.map((iconPath, index) => (
            <div
              key={index}
              onClick={() => handleShapeSelect(index)}
              style={{
                cursor: 'pointer',
                width: `${SHAPE_CONTAINER_SIZE}px`,
                height: `${SHAPE_CONTAINER_SIZE}px`,
                flexShrink: 0,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: selectedShape === index ? '2px solid #925EF8' : '1px solid #E5E7EB'
              }}
            >
              <Image 
                src={iconPath} 
                alt="Shape option" 
                width={SHAPE_ICON_SIZE} 
                height={SHAPE_ICON_SIZE}
              />
              
              {/* Purple corner decorations for selected shape */}
              {selectedShape === index && (
                <>
                  {/* Top-left corner */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '12px',
                    height: '12px',
                    borderTopLeftRadius: '12px',
                    borderTop: '2px solid #925EF8',
                    borderLeft: '2px solid #925EF8'
                  }}></div>
                  
                  {/* Top-right corner */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '12px',
                    height: '12px',
                    borderTopRightRadius: '12px',
                    borderTop: '2px solid #925EF8',
                    borderRight: '2px solid #925EF8'
                  }}></div>
                  
                  {/* Bottom-left corner */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '12px',
                    height: '12px',
                    borderBottomLeftRadius: '12px',
                    borderBottom: '2px solid #925EF8',
                    borderLeft: '2px solid #925EF8'
                  }}></div>
                  
                  {/* Bottom-right corner */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '12px',
                    height: '12px',
                    borderBottomRightRadius: '12px',
                    borderBottom: '2px solid #925EF8',
                    borderRight: '2px solid #925EF8'
                  }}></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price Bar */}
      <div style={{
        backgroundColor: '#3D89E0',
        padding: '16px',
        borderBottomLeftRadius: isMobile ? '0' : '8px',
        borderBottomRightRadius: isMobile ? '0' : '8px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '18px',
          fontWeight: '500'
        }}>
          Total price
        </span>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '80px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '2px'
          }}>
            <div style={{
              width: '40%',
              height: '100%',
              backgroundColor: 'white',
              borderRadius: '2px'
            }}></div>
          </div>
          
          <span style={{
            fontSize: '18px',
            fontWeight: '500'
          }}>
            {totalPrice}€
          </span>
        </div>
      </div>
    </div>
  );
}