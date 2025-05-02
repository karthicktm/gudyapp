'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CakeCustomizer() {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(45);
  const [activeTab, setActiveTab] = useState(0); // Shape selected by default
  const [selectedOption, setSelectedOption] = useState<number | null>(null); // No option selected by default
  
  // Refs for the scrollable containers
  const toolsContainerRef = useRef<HTMLDivElement>(null);
  const optionsContainerRef = useRef<HTMLDivElement>(null);
  
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
    const optionsElement = optionsContainerRef.current;
    
    if (toolsElement) {
      const wheelListener = (event: WheelEvent) => handleWheel(event, toolsElement);
      toolsElement.addEventListener('wheel', wheelListener, { passive: false });
      
      return () => {
        toolsElement.removeEventListener('wheel', wheelListener);
      };
    }
    
    if (optionsElement) {
      const wheelListener = (event: WheelEvent) => handleWheel(event, optionsElement);
      optionsElement.addEventListener('wheel', wheelListener, { passive: false });
      
      return () => {
        optionsElement.removeEventListener('wheel', wheelListener);
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

  // Tool categories with names and icons
  const toolCategories = [
    { name: 'Shape', icon: '/images/shape-icon.svg' },
    { name: 'Levels', icon: '/images/levels-icon.svg' },
    { name: 'Flavour', icon: '/images/flavour-icon.svg' },
    { name: 'Fill', icon: '/images/fill-icon.svg' },
    { name: 'Frosting', icon: '/images/frosting-icon.svg' },
  ];

  // Options for each tool category
  const categoryOptions = [
    // Shape options
    [
      '/images/Round.svg',
      '/images/Square.svg',
      '/images/Heart.svg',
      '/images/Polygon.svg',
      '/images/add-icon.svg',
    ],
    // Levels options
    [
      '/images/level-1.svg',
      '/images/level-2.svg',
      '/images/level-3.svg',
      '/images/level-custom.svg',
    ],
    // Flavour options
    [
      '/images/vanilla.svg',
      '/images/chocolate.svg',
      '/images/strawberry.svg',
      '/images/red-velvet.svg',
      '/images/carrot.svg',
    ],
    // Fill options
    [
      '/images/cream.svg',
      '/images/custard.svg',
      '/images/jam.svg',
      '/images/chocolate-fill.svg',
    ],
    // Frosting options
    [
      '/images/buttercream.svg',
      '/images/fondant.svg',
      '/images/ganache.svg',
      '/images/whipped-cream.svg',
    ],
  ];

  // Size constants for SVGs and containers
  const TOOL_ICON_SIZE = 60;
  const OPTION_ICON_SIZE = 25;
  const OPTION_CONTAINER_SIZE = 40;

  // Handle tab selection and reset selected option
  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
    setSelectedOption(null); // Clear selection when changing tabs
  };

  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  // Get current options based on active tab
  const currentOptions = categoryOptions[activeTab] || [];
  
  // Get canvas placeholder text based on active tab
  const getCanvasPlaceholderText = () => {
    switch (activeTab) {
      case 0:
        return "Select a shape";
      case 1:
        return "Select cake levels";
      case 2:
        return "Choose a flavor";
      case 3:
        return "Select filling";
      case 4:
        return "Choose frosting";
      default:
        return "Select an option below";
    }
  };
  
  // Canvas rendering based on selections
  const renderCanvas = () => {
    if (selectedOption === null) {
      // Return placeholder text when no option is selected
      return (
        <span style={{
          color: '#999999',
          fontSize: '16px'
        }}>
          {getCanvasPlaceholderText()}
        </span>
      );
    }
    
    // Render different shapes based on the activeTab and selectedOption
    if (activeTab === 0) { // Shapes tab
      switch (selectedOption) {
        case 0: // Round
          return (
            <div style={{
              width: '300px',
              height: '200px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end', // Align to bottom
              paddingBottom: '10px'
            }}>
              {/* Round cake rendered with proper ellipses and straight sides */}
              <svg width="280" height="180" viewBox="0 0 280 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top ellipse */}
                <ellipse cx="140" cy="40" rx="120" ry="35" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" fill="none"/>
                
                {/* Sides - vertical lines */}
                <line x1="20" y1="40" x2="20" y2="140" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
                <line x1="260" y1="40" x2="260" y2="140" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
                
                {/* Bottom ellipse */}
                <ellipse cx="140" cy="140" rx="120" ry="35" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" fill="none"/>
              </svg>
            </div>
          );
        case 1: // Square
          return (
            <div style={{
              width: '280px',
              height: '180px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end', // Align to bottom
              paddingBottom: '10px'
            }}>
              <svg width="260" height="170" viewBox="0 0 260 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top rectangle */}
                <rect x="30" y="20" width="200" height="30" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" fill="none"/>
                
                {/* Sides - vertical lines */}
                <line x1="30" y1="50" x2="30" y2="120" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
                <line x1="230" y1="50" x2="230" y2="120" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
                
                {/* Bottom rectangle */}
                <rect x="30" y="120" width="200" height="30" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" fill="none"/>
              </svg>
            </div>
          );
        case 2: // Heart
          return (
            <div style={{
              width: '280px',
              height: '180px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end', // Align to bottom
              paddingBottom: '10px'
            }}>
              <svg width="260" height="170" viewBox="0 0 260 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top heart shape */}
                <path d="M130 40C130 40 150 15 180 15C210 15 230 35 230 60C230 85 180 110 130 130C80 110 30 85 30 60C30 35 50 15 80 15C110 15 130 40 130 40Z" 
                  stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" fill="none"/>
                
                {/* Sides - vertical lines */}
                <line x1="30" y1="60" x2="30" y2="110" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
                <line x1="230" y1="60" x2="230" y2="110" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
                
                {/* Bottom heart shape */}
                <path d="M130 150C130 150 150 125 180 125C210 125 230 145 230 110C230 135 180 110 130 130C80 110 30 135 30 110C30 145 50 125 80 125C110 125 130 150 130 150Z" 
                  stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" fill="none"/>
              </svg>
            </div>
          );
        case 3: // Polygon
          return (
            <div style={{
              width: '280px',
              height: '180px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end', // Align to bottom
              paddingBottom: '10px'
            }}>
              <svg width="260" height="170" viewBox="0 0 260 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top polygon */}
                <polygon points="130,20 230,50 180,90 80,90 30,50" 
                  stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" fill="none"/>
                
                {/* Sides - vertical lines */}
                <line x1="30" y1="50" x2="30" y2="120" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
                <line x1="80" y1="90" x2="80" y2="140" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
                <line x1="180" y1="90" x2="180" y2="140" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
                <line x1="230" y1="50" x2="230" y2="120" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
                
                {/* Bottom polygon */}
                <polygon points="130,170 230,120 180,140 80,140 30,120" 
                  stroke="#333" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" fill="none"/>
              </svg>
            </div>
          );
        default:
          return (
            <span style={{
              color: '#999999',
              fontSize: '16px'
            }}>
              Custom shape
            </span>
          );
      }
    } else {
      // Return a message for other tabs (you can expand this to show visualizations for other options)
      return (
        <span style={{
          color: '#333',
          fontSize: '16px'
        }}>
          {getCanvasPlaceholderText()}
        </span>
      );
    }
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
        {toolCategories.map((tool, index) => (
          <div
            key={index}
            onClick={() => handleTabChange(index)}
            style={{
              cursor: 'pointer',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              backgroundColor: activeTab === index ? '#758AFD' : 'transparent',
              borderRadius: '8px',
            }}
          >
            <Image 
              src={tool.icon} 
              alt={`${tool.name} icon`} 
              width={TOOL_ICON_SIZE} 
              height={TOOL_ICON_SIZE}
            />
          </div>
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

        {/* Canvas Area */}
        <div style={{
          flex: 1,
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'flex-end', // Align content to bottom
          justifyContent: 'center',
          margin: '0 0 12px 0',
          paddingBottom: '20px', // Add padding at the bottom
          minHeight: '390px', // Increased height for more space
          maxHeight: '450px', // Add a max height to prevent overflow
          border: selectedOption !== null ? 'none' : '2px dashed #CCCCCC',
        }}>
          {renderCanvas()}
        </div>

        {/* Dynamic Options Based on Active Tab */}
        <div 
          ref={optionsContainerRef}
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
          onMouseDown={(e) => handleMouseDown(e, optionsContainerRef)}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {currentOptions.map((iconPath, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(index)}
              style={{
                cursor: 'pointer',
                width: `${OPTION_CONTAINER_SIZE}px`,
                height: `${OPTION_CONTAINER_SIZE}px`,
                flexShrink: 0,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: selectedOption === index ? '2px solid #925EF8' : '1px solid #E5E7EB'
              }}
            >
              <Image 
                src={iconPath} 
                alt={`Option ${index + 1}`} 
                width={OPTION_ICON_SIZE} 
                height={OPTION_ICON_SIZE}
              />
              
              {/* Purple corner decorations for selected option */}
              {selectedOption === index && (
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