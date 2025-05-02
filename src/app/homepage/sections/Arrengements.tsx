"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ASSETS } from "@/lib/assets";

// Define paths for static assets
// const wavePath = "/elements/side-wave.png";
// const iconPaths = {
//   icon1: "/icons/Icon-01.svg",
//   icon2: "/icons/Icon-02.svg",
//   icon3: "/icons/Icon-03.svg",
//   icon4: "/icons/Icon-04.svg",
//   icon5: "/icons/Icon-05.svg",
//   icon6: "/icons/Icon-06.svg",
//   icon7: "/icons/Icon-07.svg",
//   icon8: "/icons/Icon-08.svg",
//   icon9: "/icons/Icon-09.svg",
// };

// const whiteIconPaths = {
//   whiteIcon1: "/icon-white/Icon-01.svg",
//   whiteIcon2: "/icon-white/Icon-02.svg",
//   whiteIcon3: "/icon-white/Icon-03.svg",
//   whiteIcon4: "/icon-white/Icon-04.svg",
//   whiteIcon5: "/icon-white/Icon-05.svg",
//   whiteIcon6: "/icon-white/Icon-06.svg",
//   whiteIcon7: "/icon-white/Icon-07.svg",
//   whiteIcon8: "/icon-white/Icon-08.svg",
//   whiteIcon9: "/icon-white/Icon-09.svg",
// };

// Define button data with course IDs - adding courseId for available courses
const buttonData = [
  { 
    label: "আরবি ভাষা শিক্ষা", 
    icon: ASSETS.icons.icon1, 
    hoverIcon: ASSETS.whiteIcons.icon1,
    courseId: 1 // Arabic language course is available
  },
  { 
    label: "চরিত্র গঠনমূলক শিক্ষা", 
    icon: ASSETS.icons.icon2, 
    hoverIcon: ASSETS.whiteIcons.icon2,
    courseId: 2 // Character building course (Hasanul Khuluk)
  },
  { 
    label: "টাইম ম্যানেজমেন্ট", 
    icon: ASSETS.icons.icon3, 
    hoverIcon: ASSETS.whiteIcons.icon3 
    // No courseId means coming soon
  },
  { 
    label: "ভিডিও জীবনোন্নয়নমূলক", 
    icon: ASSETS.icons.icon4, 
    hoverIcon: ASSETS.whiteIcons.icon4 
    // No courseId means coming soon
  },
  { 
    label: "অবশ্য শিক্ষনীয় দ্বীনি জ্ঞান", 
    icon: ASSETS.icons.icon5, 
    hoverIcon: ASSETS.whiteIcons.icon5,
    // No courseId means coming soon 
  },
  { 
    label: "কুরআন শিক্ষা", 
    icon: ASSETS.icons.icon6, 
    hoverIcon: ASSETS.whiteIcons.icon6 
    // No courseId means coming soon
  },
  { 
    label: "আলিম কোর্স", 
    icon: ASSETS.icons.icon7, 
    hoverIcon: ASSETS.whiteIcons.icon7,
    courseId: 4 // Alima course is available
  },
  { 
    label: "সীরাত থেকে শিক্ষা", 
    icon: ASSETS.icons.icon8, 
    hoverIcon: ASSETS.whiteIcons.icon8 
    // No courseId means coming soon
  },
  { 
    label: "প্যারেন্টিং কোর্স", 
    icon: ASSETS.icons.icon9, 
    hoverIcon: ASSETS.whiteIcons.icon9,
    courseId: 5 // Parenting course is available
  },
];

const staticSvg = `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  `<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 63C5 48.8013 5.00425 38.3535 6.08052 30.3483C7.14905 22.4007 9.24115 17.1609 13.201 13.201C17.1609 9.24115 22.4007 7.14905 30.3483 6.08052C38.3535 5.00425 48.8013 5 63 5H77C91.1987 5 101.646 5.00425 109.652 6.08052C117.599 7.14905 122.839 9.24115 126.799 13.201C130.759 17.1609 132.851 22.4007 133.919 30.3483C134.996 38.3535 135 48.8013 135 63V77C135 91.1987 134.996 101.646 133.919 109.652C132.851 117.599 130.759 122.839 126.799 126.799C122.839 130.759 117.599 132.851 109.652 133.919C101.646 134.996 91.1987 135 77 135H63C48.8013 135 38.3535 134.996 30.3483 133.919C22.4007 132.851 17.1609 130.759 13.201 126.799C9.24115 122.839 7.14905 117.599 6.08052 109.652C5.00425 101.646 5 91.1987 5 77V63Z"
    stroke="#7c6a9c" stroke-width="4"></path>
  </svg>`
)}")`;

const hoverSvg = `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  `<svg width="140" height="140" viewBox="0 0 140 140" fill="#8b5cf6" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 63C5 48.8013 5.00425 38.3535 6.08052 30.3483C7.14905 22.4007 9.24115 17.1609 13.201 13.201C17.1609 9.24115 22.4007 7.14905 30.3483 6.08052C38.3535 5.00425 48.8013 5 63 5H77C91.1987 5 101.646 5.00425 109.652 6.08052C117.599 7.14905 122.839 9.24115 126.799 13.201C130.759 17.1609 132.851 22.4007 133.919 30.3483C134.996 38.3535 135 48.8013 135 63V77C135 91.1987 134.996 101.646 133.919 109.652C132.851 117.599 130.759 122.839 126.799 126.799C122.839 130.759 117.599 132.851 109.652 133.919C101.646 134.996 91.1987 135 77 135H63C48.8013 135 38.3535 134.996 30.3483 133.919C22.4007 132.851 17.1609 130.759 13.201 126.799C9.24115 122.839 7.14905 117.599 6.08052 109.652C5.00425 101.646 5 91.1987 5 77V63Z"
    stroke="white" stroke-width="4"></path>
  </svg>`
)}")`;

const Arrengements = () => {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to handle button click
  const handleButtonClick = (button: typeof buttonData[0]) => {
    if (button.courseId) {
      // If course exists, navigate to course details
      router.push(`/course_details/${button.courseId}`);
    } else {
      // If course is coming soon, navigate to coming soon page without hash
      router.push('/coming-soon');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute select-none top-[70%] left-[10%] transform -translate-x-1/2 -translate-y-1/2">
        <Image src={ASSETS.elements.sideWave} alt="wave" height={1200} width={1200} />
      </div>
      
      <motion.h2 
        className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center text-gradient relative z-10"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        আমাদের আয়োজনগুলো
      </motion.h2>
      
      <motion.div 
        className="flex justify-center items-center my-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div 
          className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 p-5 lg:p-10 bg-black/5 backdrop-blur-md dark:bg-white/5 rounded-[38px] lg:rounded-[66.80px] relative overflow-hidden"
          variants={backgroundVariants}
        >
          {/* Background animation elements */}
          {mounted && (
            <>
              <motion.div 
                className="absolute top-0 right-0 w-40 h-40 rounded-full bg-purple-300 dark:bg-purple-800 opacity-10 blur-3xl"
                animate={{ 
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-blue-300 dark:bg-blue-800 opacity-10 blur-3xl"
                animate={{ 
                  x: [0, -30, 0],
                  y: [0, 30, 0],
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
            </>
          )}
          
          {buttonData.map((button, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleButtonClick(button)}
              className="cursor-pointer relative"
            >

              <Button
                variant="ghost"
                className={cn(
                  "flex flex-col items-start p-2 lg:p-4 justify-evenly rounded-[20px] md:rounded-[30px] hover:text-white lg:rounded-[40px] text-violet-950 border-none h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 hover:scale-105 transition-transform text-center",
                  "hover:bg-transparent"
                )}
                style={{
                  backgroundImage: hoveredIndex === index ? hoverSvg : staticSvg,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double-click issues
                  handleButtonClick(button);
                }}
              >
                <motion.span 
                  className="text-xl w-1/3 md:w-full md:text-2xl lg:text-3xl mb-2"
                  animate={hoveredIndex === index ? { rotate: [0, 10, 0, -10, 0], scale: 1.1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={hoveredIndex === index ? button.hoverIcon : button.icon}
                    alt={button.label}
                    height={36}
                    width={36}
                  />
                </motion.span>
                <motion.p 
                  className="text-[8px] md:text-[10px] lg:text-xs text-start ml-1 md:ml-0 font-medium text-wrap leading-tight md:leading-loose"
                  animate={hoveredIndex === index ? { y: [0, -3, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {button.label}
                </motion.p>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Arrengements;

