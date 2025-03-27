"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import ASSETS from "@/lib/assets";
// import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


export const Testimonials: React.FC = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [mounted, setMounted] = useState(false);
   const [direction, setDirection] = useState(0); // -1 for left, 1 for right

   useEffect(() => {
      setMounted(true);
      
      // Auto-advance slides
      const interval = setInterval(() => {
         handleNext();
      }, 7000);
      
      return () => clearInterval(interval);
   }, [currentIndex]);

   const handlePrev = () => {
      setDirection(-1);
      setCurrentIndex((prevIndex) =>
         prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
   };

   const handleNext = () => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
         prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
   };

   // Animation variants
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
         opacity: 1,
         transition: { 
            staggerChildren: 0.2,
            delayChildren: 0.1
         }
      }
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
         opacity: 1, 
         y: 0,
         transition: { duration: 0.6 }
      }
   };

   const titleVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: { 
         opacity: 1, 
         y: 0,
         transition: { duration: 0.6 }
      }
   };

   const slideVariants = {
      enter: (direction: number) => ({
         x: direction > 0 ? 500 : -500,
         opacity: 0,
         scale: 0.9,
      }),
      center: {
         x: 0,
         opacity: 1,
         scale: 1,
         transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 }
         }
      },
      exit: (direction: number) => ({
         x: direction > 0 ? -500 : 500,
         opacity: 0,
         scale: 0.9,
         transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 }
         }
      })
   };

   const navButtonVariants = {
      initial: { opacity: 0.7, scale: 1 },
      hover: { opacity: 1, scale: 1.1 },
      tap: { scale: 0.95 }
   };

   return (
      <motion.div 
         className="relative z-20 my-20 lg:mx-0 mx-5"
         variants={containerVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-100px" }}
      >
         {/* <div className='absolute top-[50%] right-[-25%] overflow-hidden rotate-180 transform -translate-y-1/2 -z-50 opacity-70'>
                <Image 
                   src={ASSETS.elements.sideWave} 
                   alt='Wave decoration' 
                   height={1200} 
                   width={1200} 
                />
            </div> */}
         <motion.h2 
            className="lg:text-5xl text-3xl text-blue-950 dark:text-white font-semibold mb-10 relative z-10"
            variants={titleVariants}
         >
            শিক্ষার্থীদের মন্তব্য
         </motion.h2>
         <motion.div 
            className="bg-blue-100/40 backdrop-blur-md dark:bg-white/5 rounded-[38px] w-full lg:h-[500px] p-3 lg:p-10 flex lg:flex-row flex-col justify-center gap-10 lg:gap-0 lg:justify-between relative z-10"
            variants={itemVariants}
         >
            {/* Background animation elements */}
            {mounted && (
               <>
                  <motion.div 
                     className="absolute top-20 right-20 w-32 h-32 rounded-full bg-purple-300 dark:bg-purple-900 opacity-10 blur-3xl"
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
                     className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-blue-300 dark:bg-blue-900 opacity-10 blur-3xl"
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
               </>
            )}
            
            <div className="flex-1 flex flex-col justify-between gap-5 lg:gap-0">
               <div className="relative lg:w-2/3 w-full lg:h-[350px] h-[450px] border rounded-[30px] overflow-hidden flex flex-col items-center justify-center">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                     {slides.map((slide, index) => (
                        index === currentIndex && (
                           <motion.div
                              key={slide.id}
                              className="absolute inset-0 border transition-opacity duration-1000"
                              custom={direction}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                           >
                              <div className="m-10">
                                 <div className="flex flex-row items-center lg:gap-5 gap-3 mb-3">
                                    <Avatar className="h-12 w-12 bg-white">
                                       <AvatarImage src={slide?.avatar} alt={slide?.title} />
                                       <AvatarFallback>{slide?.title?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="lg:text-2xl text-xl font-bold">{slide?.title}</h2>
                                 </div>
                                 <div className="overflow-auto">
                                    <div className="relative">
                                       <FaQuoteLeft className="text-purple-300 dark:text-purple-700 text-3xl absolute -left-2 -top-2 opacity-50" />
                                       <p className="text-[13px] md:text-base mt-5 ml-5">{slide?.text}</p>
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        )
                     ))}
                  </AnimatePresence>
               </div>
               
               <div className="w-full flex space-x-2">
                  {slides.map((_, index) => (
                     <motion.button
                        key={index}
                        onClick={() => {
                           setDirection(index > currentIndex ? 1 : -1);
                           setCurrentIndex(index);
                        }}
                        className={`w-3 h-3 rounded-full cursor-pointer ${
                          index === currentIndex ? "bg-primary" : "bg-white"
                        }`}
                        initial={{ scale: 1 }}
                        animate={index === currentIndex ? { scale: 1.3 } : { scale: 1 }}
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.2 }}
                        aria-label={`Go to slide ${index + 1}`}
                     />
                  ))}
               </div>
            </div>

            <div className="flex flex-col lg:justify-end items-end">
               {/* Navigation Buttons */}
               <div>
                  <motion.button
                     onClick={handlePrev}
                     className="bg-white text-black w-10 h-10 rounded-full transition-all duration-300 mr-4"
                     variants={navButtonVariants}
                     initial="initial"
                     whileHover="hover"
                     whileTap="tap"
                  >
                     <FaChevronLeft className="m-auto" />
                  </motion.button>
                  <motion.button
                     onClick={handleNext}
                     className="bg-white text-black w-10 h-10 rounded-full transition-all duration-300"
                     variants={navButtonVariants}
                     initial="initial"
                     whileHover="hover"
                     whileTap="tap"
                  >
                     <FaChevronRight className="m-auto" />
                  </motion.button>
               </div>
            </div>
         </motion.div>
      </motion.div>
   );
};

export const slides = [
   {
      id:1,
      avatar: "/women-black.png",
      title: "Amatullah Yasmin",
      text: "আমার স্বপ্ন এই নাহদা একাডেমি একদিন অফলাইনে ও প্রতিষ্ঠিত হবে। আমাদের উস্তাজ, উস্তাজারা আমাদেরকে আমানত হিসেবে নিয়েছেন। আমাকে কেউ এইভাবে গুরুত্বের সাথে কখনো নেয়নি, কোনো একাডেমি নেয়নি। আমি এইখানে ভর্তির আগে আদব নিয়ে কখনো তেমন ভাবিনি, কেউ আমাকে আন নাহদা একাডেমির মতো শিখায়নি, আমার জন্য ফিকির করে কেউ কখনো এমন কল্যাণের নসিহা করেনি যা আমি এই একাডেমি থেকে পেয়েছি এবং পাচ্ছি। এই একাডেমিকে আমি আল্লাহর জন্য ভালোবাসি। আল্লাহ সাক্ষী আমি মিথ্যাবাদী নই। এই একাডেমিকে আল্লাহ উত্তমভাবে-আল্লাহ-আপনার জমীনে কবুল করে নিন। আমিন।",
      gradient: "bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500",
   },
   {
      id:2,
      avatar: "/women-black.png",
      title: "Hosneara Arifa",
      text: "আলহামদুলিল্লাহ। এই একাডেমিতে না আসলে বুঝতেই পারতাম নাহ, অনলাইনেও এতো আন্তরিকতার সাথে পড়ানো হয়। বিশেষ করে ওস্তায এক কথায় অসাধারণ। এতো পূঙ্খানুপুঙ্খ ভাবে আমাদের প্রত্যকের প্রতিটা বিষয়ে খেয়াল রাখেন সামনাসামনি ক্লাস নিয়েও হয়তো রাখা হয় না। এক পড়া একজনের যদি বুঝতে অসুবিধা হয়, বার বার বুঝায়ে দেন। আলহামদুলিল্লাহ। আল্লাহ যেন ওস্তাযগণের হায়াত ও জ্ঞান বাড়িয়ে দেন আর এই একাডেমিকে কবুল করে নেন। আমিন!",
      gradient: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
   },
   {
      id:3,
      avatar: "/women-black.png",
      title: "Jannat Binte Rezaul",
      text: "আলহামদুলিল্লাহ। এখানে এসে পড়লেখা যে এত্ত আনন্দ এর সাথে করা যায় এইখানে এসে শিখেছি। যা শিখছি তাই প্রাকটিক্যাল লাইফে ব্যাবহার করা শিখছি। যার ফলে সব কিছু স্মৃতিতে স্থায়ী হচ্ছে, আলহামদুলিল্লাহ। আর উস্তায আমাদের পড়ালেখার ব্যাপারে খুবই ধৈর্য সহকারে পড়ান, আলহামদুলিল্লাহ। আমাদের কার কোথায় সমস্যা তা সুন্দর করে বুঝিয়ে দিচ্ছেন তারজন্য উস্তায কে আল্লাহ উত্তম প্রতিদান দিক, আমিন!",
      gradient: "bg-gradient-to-br from-pink-800 from-10% via-pink-400 via-30% to-orange-500",
   },
   {
      id:4,
      avatar: "/women-black.png",
      title: "Keya Akter",
      text: "আসসালামু আলাইকুম ওয়া রহমাতুল্লাহি ওয়া বারাকাতুহ। আলহামদুলিল্লাহ,,, আমিও এই একডেমীর ছাত্রী। এটা শুধু আমার কাছে একটা একাডেমী নয় বরং আমার পরিবার হয়ে গেছে। আলহামদুলিল্লাহ আল্লাহ তায়ালা আমাকে এবং এই একাডেমির সকল বোনকে তার দ্বীনের ইলম দান করুন আমিন। আর আমাদের সম্মানিত উস্তাজ এর পরিশ্রম ও ইলমকে আরো উচ্চ মাকাম দান করুন।।। আমিন।",
      gradient: "bg-gradient-to-br from-red-800 from-10% via-red-500 via-30% to-orange-500",
   },
];


