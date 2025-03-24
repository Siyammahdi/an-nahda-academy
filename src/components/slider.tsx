"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  return (
    <div className="w-screen relative overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false, // Prevent infinite looping
          skipSnaps: false,
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="flex py-4">
          {items.map((item, index) => {
            const isBlank = !item.id; // Check if it's a blank card
            const nonBlankItems = items.filter((item) => item.id); // Filter only real items
            const adjustedIndex = nonBlankItems.findIndex((i) => i.id === item.id); // Get actual index
            
            // Ensure blank cards don’t interfere with active state calculation
            const isActive = !isBlank && (adjustedIndex === currentIndex || adjustedIndex === (currentIndex + 1) % nonBlankItems.length);

            return (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/5 px-4">
                <div
                  className={`relative h-[550px] w-full max-w-[350px] mx-auto rounded-lg transition-all duration-500 transform 
                    ${isBlank ? "opacity-0 scale-100" : isActive ? "scale-100 opacity-100" : "scale-90 opacity-50 blur-sm"}`}
                >
                  {!isBlank && (
                    <div className="relative rounded-[33px] overflow-hidden h-full w-full">
                      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent z-10"></div>
                      <Image
                        src={item.image || ""}
                        alt={item.title || ""}
                        className="object-cover w-full h-full hover:scale-110 transition-all duration-1000 select-none"
                        fill
                        sizes="(max-width: 768px) 50vw, 300px"
                        draggable="false"
                        priority={index < 4}
                      />
                      <div className="absolute bottom-5 left-5 text-violet-950 font-semibold text-2xl z-20 select-none">
                        {item.category}
                      </div>
                    </div>
                  )}
                </div>
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
  { id: 1, category: "Enroll Now!", title: "Course 1", price: 52.85, originalPrice: 55.80, sold: "142/456", image: "/course_poster/learing_arabic.png", rating: 3, discount: 6, isNew: false },
  { id: 2, category: "Buy Now!", title: "Course 2", price: 48.85, originalPrice: 52.80, sold: "122/233", image: "/course_poster/fiqhun_nisa.png", rating: 1, discount: 8, isNew: false },
  { id: 3, category: "Enroll Now!", title: "Course 5", price: 23.85, originalPrice: 25.80, sold: "141/160", image: "/course_poster/parenting.png", rating: 1, discount: 8, isNew: true },
  { id: 4, category: "Enroll Now!", title: "Course 3", price: 17.85, originalPrice: 19.80, sold: "327/500", image: "/course_poster/husnul_khuluk.png", rating: 0, discount: 10, isNew: false },
  { id: 5, category: "Buy Now!", title: "Course 4", price: 23.85, originalPrice: 25.80, sold: "141/160", image: "/course_poster/aleema.png", rating: 1, discount: 8, isNew: true },
  {}, // Blank card at end
];

export default Slider;
