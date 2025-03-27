"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";

type ItemType = {
  id?: number;
  category?: string;
  title?: string;
  price?: number;
  originalPrice?: number;
  sold?: string;
  image?: string;
  rating?: number;
  discount?: number;
  isNew?: boolean;
};

const Slider = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [visibleRange, setVisibleRange] = useState<number[]>([]);

  // Ensure hydration issues don't affect rendering
  useEffect(() => {
    setImagesLoaded(true);
  }, []);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Initial check for mobile
      setIsMobile(window.innerWidth < 768);
      
      // Update on resize
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      
      // Calculate visible range based on screen size and current index
      const nonBlankItems = items.filter(item => item.id);
      const nonBlankIndices = nonBlankItems.map((_, i) => i);
      
      if (isMobile) {
        // For mobile, only the current item is fully visible
        setVisibleRange([selectedIndex]);
      } else {
        // For desktop, determine which items should be active based on viewport width
        const visibleCount = window.innerWidth < 1280 ? 2 : 3;
        const startIdx = Math.max(0, selectedIndex - Math.floor(visibleCount / 2));
        const endIdx = Math.min(nonBlankIndices.length - 1, startIdx + visibleCount - 1);
        
        const range = [];
        for (let i = startIdx; i <= endIdx; i++) {
          range.push(i);
        }
        setVisibleRange(range);
      }
    };

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    // Initial call to set the range
    handleSelect();

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api, isMobile]);

  // Filter out blank cards for mobile view
  const displayItems = isMobile 
    ? items.filter(item => item.id) // Only real items for mobile
    : items; // All items including blanks for desktop

  // Don't render anything during SSR to prevent hydration mismatch
  if (!imagesLoaded && typeof window === 'undefined') {
    return <div className="w-screen h-[320px] md:h-[550px]"></div>;
  }

  // Get real items (non-blank)
  const realItems = items.filter(item => item.id);

  // Function to check if an item should be active
  const isItemActive = (itemId: number | undefined) => {
    if (!itemId) return false;
    
    const itemIndex = realItems.findIndex(item => item.id === itemId);
    return visibleRange.includes(itemIndex);
  };

  return (
    <div className="w-screen relative overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{
          align: isMobile ? "start" : "center",
          loop: false,
          skipSnaps: false,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className={`flex py-4 ${isMobile ? 'pl-2 gap-2' : 'gap-4'}`}>
          {displayItems.map((item, index) => {
            // Check if it's a blank card
            const isBlank = !item.id;
            
            // Check if this item should be active
            const isActive = isItemActive(item.id);

            return (
              <CarouselItem 
                key={index} 
                className={`${isMobile ? 'basis-[70%]' : 'basis-1/2 md:basis-1/3 lg:basis-1/5'} ${isMobile ? 'px-2' : 'px-3'} transition-all duration-500`}
              >
                {!isBlank ? (
                  <Link 
                    href={`/course_details/${item.id}`}
                    className="block cursor-pointer"
                    aria-label={`View details of ${item.title || 'course'}`}
                  >
                    <div
                      className={`relative h-[320px] md:h-[550px] w-full max-w-[220px] md:max-w-[350px] mx-auto rounded-lg transition-all duration-500 transform ${
                        isMobile 
                          ? 'scale-100 opacity-100 hover:scale-[1.02]' // Subtle hover effect for mobile
                          : isActive 
                            ? "scale-100 opacity-100 z-20 hover:scale-[1.03]" 
                            : "scale-90 opacity-40 blur-[1px] hover:blur-none hover:opacity-70"
                      }`}
                    >
                      <div className="relative rounded-3xl md:rounded-[33px] overflow-hidden h-full w-full group">
                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-10"></div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-violet-900/0 group-hover:bg-violet-900/10 transition-all duration-300 z-10"></div>
                        
                        <Image
                          src={item.image || ""}
                          alt={item.title || ""}
                          className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500 select-none"
                          fill
                          sizes="(max-width: 640px) 80vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 20vw"
                          draggable="false"
                          priority={true}
                        />
                        <div className="absolute bottom-0 left-0 w-full p-5 z-20">
                          <div className={`font-semibold text-xl md:text-2xl select-none ${
                            isActive 
                              ? "text-violet-950 dark:text-violet-200"
                              : "text-violet-800 dark:text-violet-300"
                          }`}>
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div
                    className="relative h-[320px] md:h-[550px] w-full max-w-[220px] md:max-w-[350px] mx-auto rounded-lg opacity-0"
                  ></div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

// Adding blank items at the beginning and end to prevent empty space issue
const items: ItemType[] = [
  {}, // Blank card at start
  {}, // Blank card at start
  {}, // Blank card at start
  { id: 1, category: "Enroll Now!", title: "Course 1", price: 52.85, originalPrice: 55.80, sold: "142/456", image: "/course_poster/learning_arabic.png", rating: 3, discount: 6, isNew: false },
  { id: 2, category: "Enroll Now!", title: "Course 3", price: 17.85, originalPrice: 19.80, sold: "327/500", image: "/course_poster/husnul_khuluk.png", rating: 0, discount: 10, isNew: false },
  { id: 3, category: "Buy Now!", title: "Course 2", price: 48.85, originalPrice: 52.80, sold: "122/233", image: "/course_poster/fiqhun_nisa.png", rating: 1, discount: 8, isNew: false },
  { id: 4, category: "Buy Now!", title: "Course 4", price: 23.85, originalPrice: 25.80, sold: "141/160", image: "/course_poster/aleema.png", rating: 1, discount: 8, isNew: true },
  { id: 5, category: "Enroll Now!", title: "Course 5", price: 23.85, originalPrice: 25.80, sold: "141/160", image: "/course_poster/parenting.png", rating: 1, discount: 8, isNew: true },
  {}, // Blank card at end
];

export default Slider;
