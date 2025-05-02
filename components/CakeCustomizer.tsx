'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CakeCustomizer() {
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(45);
  const [activeTab, setActiveTab] = useState('Shape');
  
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

  // Tools categories
  const toolCategories = [
    { name: 'Shape', icon: '/images/shape-icon.svg', color: '#6979F8' },
    { name: 'Levels', icon: '/images/levels-icon.svg', color: '#FFFFFF' },
    { name: 'Flavour', icon: '/images/flavour-icon.svg', color: '#FFFFFF' },
    { name: 'Fill', icon: '/images/fill-icon.svg', color: '#FFFFFF' },
    { name: 'Frosting', icon: '/images/frosting-icon.svg', color: '#FFFFFF' },
  ];

  // Shape options
  const shapeOptions = [
    { color: '#FF70A6', type: 'circle' },
    { color: '#5B9DF1', type: 'square' },
    { color: '#FF7D58', type: 'heart' },
    { color: '#B6C649', type: 'oval' },
    { color: '#FFFFFF', type: 'custom' },
  ];

  // Handle tab selection
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div style={{ 
        backgroundColor: '#FF69B1', 
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: isMobile ? '0' : '8px',
        borderTopRightRadius: isMobile ? '0' : '8px'
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
              src="/images/location-icon.svg" 
              alt="Location" 
              width={20} 
              height={20}
            />
            <span style={{ 
              fontWeight: '500', 
              fontSize: '16px'
            }}>
              Kampili
            </span>
          </div>
          <Image 
            src="/images/dropdown-icon.svg" 
            alt="Dropdown" 
            width={16} 
            height={16}
          />
        </div>

        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#CCCCCC',
          overflow: 'hidden'
        }}>
          <Image 
            src="/images/profile-photo.png" 
            alt="Profile" 
            width={36} 
            height={36}
          />
        </div>
      </div>

      {/* Tool Categories */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '8px',
        padding: '12px',
        backgroundColor: '#F7F7F7'
      }} className="hide-scrollbar">
        {toolCategories.map((category, index) => (
          <div 
            key={index}
            onClick={() => handleTabChange(category.name)}
            style={{
              minWidth: '70px',
              height: '70px',
              backgroundColor: activeTab === category.name ? category.color : 'white',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              padding: '8px',
              color: activeTab === category.name && category.name === 'Shape' ? 'white' : '#333333'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Image 
                src={category.icon} 
                alt={`${category.name} icon`} 
                width={24} 
                height={24}
              />
            </div>
            <span style={{
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {category.name}
            </span>
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
        {/* Controls Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '8px',
          margin: '12px 0'
        }}>
          <button style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '4px'
          }}>
            <Image 
              src="/images/undo-icon.svg" 
              alt="Undo" 
              width={24} 
              height={24}
            />
          </button>
          <button style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '4px'
          }}>
            <Image 
              src="/images/redo-icon.svg" 
              alt="Redo" 
              width={24} 
              height={24}
            />
          </button>
          <button style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '4px'
          }}>
            <Image 
              src="/images/tools-icon.svg" 
              alt="Tools" 
              width={24} 
              height={24}
            />
          </button>
        </div>

        {/* Canvas Area */}
        <div style={{
          flex: 1,
          border: '2px dashed #CCCCCC',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 0 16px 0',
          minHeight: '300px'
        }}>
          <span style={{
            color: '#999999',
            fontSize: '16px'
          }}>
            Click on a shape
          </span>
        </div>

        {/* Shape Options */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '8px',
          margin: '0 0 24px 0',
          padding: '0 12px'
        }}>
          {shapeOptions.map((shape, index) => (
            <div
              key={index}
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'white',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
            >
              {shape.type === 'circle' && (
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: shape.color
                }}></div>
              )}
              {shape.type === 'square' && (
                <div style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: shape.color
                }}></div>
              )}
              {shape.type === 'heart' && (
                <div style={{
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image 
                    src="/images/heart-icon.svg" 
                    alt="Heart" 
                    width={30} 
                    height={30}
                    style={{ color: shape.color }}
                  />
                </div>
              )}
              {shape.type === 'oval' && (
                <div style={{
                  width: '36px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: shape.color
                }}></div>
              )}
              {shape.type === 'custom' && (
                <div style={{
                  fontSize: '24px'
                }}>+</div>
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