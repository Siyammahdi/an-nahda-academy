"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";

interface LoadingScreenProps {
  finishLoading: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ finishLoading }) => {
  const [counter, setCounter] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const particlesRef = useRef<HTMLDivElement>(null);
  const logoControls = useAnimationControls();
  const textControls = useAnimationControls();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Setup the animation sequence
  useEffect(() => {
    const animateElements = async () => {
      // Initial logo animation
      await logoControls.start({
        scale: [0.8, 1],
        opacity: [0, 1],
        rotateY: [40, 0],
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for modern feel
        }
      });

      // Text reveal after logo
      await textControls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut"
        }
      });
    };

    animateElements();
  }, [logoControls, textControls]);

  // Increment counter and trigger finish loading
  useEffect(() => {
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 3);
    
    let startTime: number | null = null;
    const duration = 3000; // 3 seconds total loading time
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      setCounter(Math.floor(easedProgress * 100));
      
      if (progress < 1) {
        requestId = requestAnimationFrame(animate);
      } else {
        // Finish the loading sequence
        setTimeout(() => {
          finishLoading();
        }, 200);
      }
    };
    
    let requestId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestId);
  }, [finishLoading]);

  // Generate floating particles
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const particlesContainer = particlesRef.current;
    const particleCount = isMobile ? 15 : 30;
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Randomize particle properties
      const size = Math.random() * 6 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.5 + 0.3; // Increased minimum opacity for better visibility
      
      // Apply styles with better visibility using colorful particles
      particle.className = 'absolute rounded-full';
      
      // Use different colors for particles
      const colors = [
        'bg-violet-500/30', 
        'bg-fuchsia-500/30', 
        'bg-indigo-500/30', 
        'bg-blue-500/30'
      ];
      particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);
      
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${posX}%`,
        top: `${posY}%`,
        opacity: opacity.toString(),
        animation: `floatingParticle ${duration}s infinite alternate ease-in-out ${delay}s`,
        boxShadow: '0 0 4px rgba(139, 92, 246, 0.3)'
      });
      
      particlesContainer.appendChild(particle);
    }
  }, [isMobile]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center flex-col z-50 perspective-1000"
        style={{ 
          perspective: '1000px',
          backgroundImage: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(255, 255, 255, 1) 70%)',
          boxShadow: 'inset 0 0 100px rgba(139, 92, 246, 0.1)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Add keyframes for particle animation */}
        <style jsx global>{`
          @keyframes floatingParticle {
            0% {
              transform: translateY(0) translateX(0) rotate(0deg);
            }
            100% {
              transform: translateY(-20px) translateX(10px) rotate(10deg);
            }
          }
          
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
            }
            70% {
              box-shadow: 0 0 0 20px rgba(139, 92, 246, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
            }
          }
          
          @keyframes glow {
            0%, 100% {
              filter: drop-shadow(0 0 5px rgba(139, 92, 246, 0.5));
            }
            50% {
              filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.8));
            }
          }
        `}</style>
        
        {/* This is the main content container - using relative to position children */}
        <div className="relative flex flex-col items-center justify-center h-full w-full">
          {/* Particles container */}
          <div 
            ref={particlesRef} 
            className="absolute inset-0 overflow-hidden pointer-events-none"
          />
          
          {/* Enhanced 3D Rotating circles with better visibility */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full border-2 border-violet-500/50"
              animate={{
                rotateX: [0, 360],
                rotateY: [360, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)'
              }}
            />
            <motion.div
              className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] rounded-full border-2 border-blue-500/50"
              animate={{
                rotateY: [0, 360],
                rotateX: [360, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
              }}
            />
            <motion.div
              className="absolute w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] rounded-full border-2 border-fuchsia-500/50"
              animate={{
                rotateZ: [0, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                boxShadow: '0 0 15px rgba(192, 38, 211, 0.2)'
              }}
            />
          </div>
          
          {/* Central content area with logo and text - positioned in the center of the screen */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center">
           
              {/* Brand tagline with enhanced visibility - now appears before progress bar */}
              <motion.div
                className="text-center backdrop-blur-sm max-w-xs sm:max-w-sm px-4 py-3 rounded-xl bg-violet-50/10 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: [0, 1],
                  y: [10, 0]
                }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.8
                }}
                style={{
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)'
                }}
              >
                <span 
                  className="font-medium text-sm sm:text-base text-violet-950"
                >
                  An-Nahda Academy
                </span>
                <span 
                  className="block mt-1 text-xs text-gray-700 opacity-90"
                >
                  Empowering minds through Islamic education
                </span>
              </motion.div>
            </div>
          </div>
          
          {/* Loading indicator and progress text - now at the bottom */}
          <motion.div
            className="absolute bottom-10 w-56 sm:w-64 md:w-72 flex flex-col items-center z-10"
            animate={textControls}
            initial={{ opacity: 0, y: 20 }}
          >
            {/* Progress bar with enhanced gradient effect for better visibility */}
            <div className="w-full h-1.5 sm:h-2 rounded-full overflow-hidden backdrop-blur-sm bg-gray-300/70">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${counter}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)'
                }}
              />
            </div>
            
            {/* Loading text with enhanced visibility */}
            <div className="flex w-full justify-between mt-3">
              <div className="relative overflow-hidden">
                <motion.span 
                  className="text-xs sm:text-sm font-medium text-violet-800"
                  animate={{
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  style={{
                    textShadow: '0 0 2px rgba(139, 92, 246, 0.1)'
                  }}
                >
                  {counter < 30 ? "Loading assets..." : 
                   counter < 70 ? "Initializing content..." : 
                   counter < 90 ? "Almost ready..." : 
                   "Launching..."}
                </motion.span>
              </div>
              <span 
                className="text-xs sm:text-sm font-semibold text-violet-800"
                style={{
                  textShadow: '0 0 2px rgba(139, 92, 246, 0.1)'
                }}
              >
                {counter}%
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen; 