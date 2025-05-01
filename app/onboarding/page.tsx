'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Onboarding screen component
export default function Onboarding() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [sprinkles, setSprinkles] = useState<React.ReactNode[]>([]);
  const [foodItems, setFoodItems] = useState<React.ReactNode[]>([]);
  const router = useRouter();
  
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

  // Screen content
  const screens = [
    {
      title: "Design your dream dish or cake in 3D",
      image: "/images/cake3d.png",
      animation: "sprinkles"
    },
    {
      title: "Choose ingredients, topping & themes",
      image: "/images/ingredients.svg", 
      animation: "food"
    },
    {
      title: "See the price & nutrition as you design",
      image: "/images/basket.png",
      animation: "none"
    }
  ];

  // Handle next button click
  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      // Navigate to dashboard after completing onboarding
      router.push('/dashboard');
    }
  };

  // Handle skip button click
  const handleSkip = () => {
    router.push('/dashboard');
  };

  // Generate sprinkles animation
  useEffect(() => {
    if (screens[currentScreen].animation === "sprinkles") {
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
        const color = getRandomSprinkleColor();
        
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
    } else {
      setSprinkles([]);
    }

    if (screens[currentScreen].animation === "food") {
      // Generate food items animation with corner placement and rotation
      const foodItemImages = [
        "/images/Fries.svg",
        "/images/Honey.svg",
        "/images/FoodIcone2.svg",
        "/images/Peach.svg"
      ];

      // Create food items in different corners
      const corners = [
        { xRange: [0, 30], yRange: [0, 30] },       // Top left
        { xRange: [70, 100], yRange: [0, 30] },     // Top right
        { xRange: [0, 30], yRange: [70, 100] },     // Bottom left
        { xRange: [70, 100], yRange: [70, 100] },   // Bottom right
      ];

      const newFoodItems = Array.from({ length: 12 }).map((_, index) => {
        // Place 3 items in each corner
        const cornerIndex = Math.floor(index / 3);
        const corner = corners[cornerIndex];
        
        // Random properties for each food item
        const size = Math.random() * 25 + 25; // 25-50px
        const left = Math.random() * (corner.xRange[1] - corner.xRange[0]) + corner.xRange[0]; // Corner-specific x position
        const top = Math.random() * (corner.yRange[1] - corner.yRange[0]) + corner.yRange[0]; // Corner-specific y position
        const rotationDuration = Math.random() * 15 + 10; // 10-25s
        const rotationDirection = index % 2 === 0 ? 'clockwise' : 'counterclockwise';
        const imageIndex = index % foodItemImages.length;
        
        return (
          <div 
            key={index}
            style={{
              position: 'absolute',
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationName: rotationDirection === 'clockwise' ? 'rotateClockwise' : 'rotateCounterclockwise',
              animationDuration: `${rotationDuration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              zIndex: 0
            }}
          >
            <Image 
              src={foodItemImages[imageIndex]}
              alt="Food item"
              width={size}
              height={size}
              style={{ objectFit: 'contain' }}
            />
          </div>
        );
      });
      
      setFoodItems(newFoodItems);
    } else {
      setFoodItems([]);
    }
  }, [currentScreen]);

  // Render progress dots
  const renderProgressDots = () => {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px 0',
        gap: '8px'
      }}>
        {screens.map((_, index) => (
          <div 
            key={index}
            style={{
              width: index === currentScreen ? '40px' : '8px',
              height: '8px',
              backgroundColor: index === currentScreen ? 'white' : 'rgba(255, 255, 255, 0.5)',
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }}
          />
        ))}
      </div>
    );
  };

  // Determine background color based on screen
  const getBgColor = () => {
    switch (currentScreen) {
      case 0:
        return '#FF69B1'; // Pink for first screen
      case 1:
        return '#FF6E1A'; // Orange for second screen
      case 2:
        return '#7B68EE'; // Purple for third screen
      default:
        return '#FF69B1';
    }
  };

  return (
    <div style={{ 
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: getBgColor(),
      position: 'relative',
      overflow: 'hidden',
      transition: 'background-color 0.5s ease',
      borderRadius: isMobile ? '0' : '8px',
    }}>
      {/* Animations Container */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {screens[currentScreen].animation === "sprinkles" && sprinkles}
        {screens[currentScreen].animation === "food" && foodItems}
      </div>
      
      {/* Content Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '20px 0',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Top section with image */}
        <div style={{ 
          flex: 1,
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          paddingTop: '40px'
        }}>
          <Image 
            src={screens[currentScreen].image}
            alt="Onboarding illustration"
            width={isTablet ? 250 : 200}
            height={isTablet ? 250 : 200}
            style={{ objectFit: 'contain', marginBottom: '20px' }}
          />
          
          {/* Progress dots in the middle */}
          {renderProgressDots()}
        </div>
        
        {/* Middle section with title */}
        <div style={{
          width: '100%',
          padding: '0 20px',
          marginBottom: '50px'
        }}>
          {/* Title - Using exact Paytone One font with larger size */}
          <h1 style={{ 
            fontFamily: "'Paytone One', sans-serif", 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: 'white', 
            textAlign: 'center', 
            lineHeight: '1.2',
            margin: 0
          }}>
            {screens[currentScreen].title}
          </h1>
        </div>
        
        {/* Bottom section with buttons */}
        <div style={{ 
          width: '100%',
          paddingBottom: '20px'
        }}>
          {/* Next Button - White background with 20px horizontal margin */}
          <div style={{ 
            margin: '0 20px 15px 20px'
          }}>
            <button 
              onClick={handleNext}
              style={{ 
                width: '100%', 
                height: '56px',
                backgroundColor: 'white', 
                color: getBgColor(), 
                fontWeight: '500', 
                padding: 0,
                borderRadius: '9999px', 
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              NEXT
            </button>
          </div>
          
          {/* Skip Button - Transparent with text in center */}
          <div style={{ 
            textAlign: 'center',
            width: '100%'
          }}>
            <button 
              onClick={handleSkip}
              style={{ 
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              SKIP
            </button>
          </div>
        </div>
      </div>
      
      {/* Define keyframes animations */}
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
        
        @keyframes rotateClockwise {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes rotateCounterclockwise {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}

// Helper function to generate random sprinkle colors
function getRandomSprinkleColor() {
  const colors = [
    '#FFFFFF', // White
    '#FFD6E0', // Light pink
    '#FFBDCE', // Medium pink
    '#FFA5BE', // Darker pink
    '#FFE8EF', // Very light pink
    '#FFEFF5', // Almost white pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}