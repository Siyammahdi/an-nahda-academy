"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

interface LoadingScreenProps {
  finishLoading: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ finishLoading }) => {
  const [counter, setCounter] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { resolvedTheme } = useTheme();
  
  // Use the appropriate logo based on theme with a fallback
  const logoSrc = resolvedTheme === 'dark' ? "/logoLight.svg" : "/logoDark.svg";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      finishLoading();
    }, 2500); // Slightly longer loading time for a better experience

    return () => clearTimeout(timer);
  }, [finishLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 100) {
          return prevCounter + 1;
        }
        clearInterval(interval);
        return 100;
      });
    }, 24); // Slightly slower progress to match the longer loading time

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center flex-col z-50 bg-white dark:bg-gradient-to-tr dark:from-sky-950 dark:via-indigo-950 dark:to-purple-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-purple-100/5 to-transparent dark:from-transparent dark:via-purple-500/5 dark:to-transparent"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundSize: '200% 200%'
            }}
          />
        </div>
        
        {/* Background animation elements */}
        <motion.div 
          className="absolute top-20 right-20 w-72 h-72 rounded-full bg-purple-300 dark:bg-purple-900 opacity-10 blur-3xl hidden md:block"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-blue-300 dark:bg-blue-900 opacity-10 blur-3xl hidden md:block"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        {/* Mobile background elements - smaller and better positioned for small screens */}
        <motion.div 
          className="absolute top-10 right-10 w-40 h-40 rounded-full bg-purple-300 dark:bg-purple-900 opacity-10 blur-3xl md:hidden"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-blue-300 dark:bg-blue-900 opacity-10 blur-3xl md:hidden"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -15, 0],
            y: [0, 15, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />

        {/* Logo container with animation */}
        <motion.div
          className="relative w-40 h-40 md:w-48 md:h-48 mb-6 md:mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Logo animation */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-full h-full relative"
          >
            <Image 
              src={logoSrc}
              alt="An-Nahda Academy" 
              fill 
              className="object-contain"
              priority
            />
          </motion.div>
          
          {/* Pulsing ring around logo */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-violet-400 dark:border-violet-600"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
        
        {/* Loading progress bar */}
        <motion.div
          className="w-48 md:w-64 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-2 md:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600"
              initial={{ width: "0%" }}
              animate={{ width: `${counter}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">Loading...</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{counter}%</span>
          </div>
        </motion.div>

        {/* Text animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <motion.p 
            className="text-blue-950 dark:text-white text-center font-medium text-base md:text-lg"
            animate={{ 
              y: [0, -5, 0],
              scale: [1, 1.02, 1] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            Loading your learning journey...
          </motion.p>
          
          {/* Small decorative element */}
          <motion.div
            className="absolute -top-12 -right-16 opacity-75 hidden md:block"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
          </motion.div>
          
          {/* Smaller decorative element for mobile */}
          <motion.div
            className="absolute -top-8 -right-8 opacity-75 md:hidden"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
          </motion.div>
        </motion.div>

        {/* Floating particles - generate fewer particles on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                i % 3 === 0 
                  ? "bg-blue-400 dark:bg-blue-600" 
                  : i % 3 === 1
                  ? "bg-purple-400 dark:bg-purple-600"
                  : "bg-pink-400 dark:bg-pink-600"
              }`}
              style={{
                width: Math.random() * (isMobile ? 6 : 10) + 4,
                height: Math.random() * (isMobile ? 6 : 10) + 4,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                y: [0, -Math.random() * (isMobile ? 50 : 100) - 50],
                x: [0, (Math.random() - 0.5) * (isMobile ? 30 : 50)],
                opacity: [Math.random() * 0.5 + 0.2, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen; 