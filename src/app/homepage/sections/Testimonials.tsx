"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import ASSETS from "@/lib/assets";
// import Image from "next/image";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export const Testimonials: React.FC = () => {
   const [currentIndex, setCurrentIndex] = useState(0);
   // const [isHovered, setIsHovered] = useState(false);

   const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
   };

   const handleNext = () => {
      setCurrentIndex((prevIndex) =>
         prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
   };

   return (
      <div className="relative z-20 my-20 lg:mx-0 mx-5">
           {/* <div className='absolute top-[50%] right-[-25%] overflow-hidden rotate-180 transform -translate-y-1/2 -z-50 opacity-70'>
                <Image 
                   src={ASSETS.elements.sideWave} 
                   alt='Wave decoration' 
                   height={1200} 
                   width={1200} 
                />
            </div> */}
          <h2 className="lg:text-5xl text-3xl text-blue-950 dark:text-white font-semibold mb-10 relative z-10">
          শিক্ষার্থীদের মন্তব্য</h2>
          <div className="bg-blue-100/40 backdrop-blur-md dark:bg-white/5 rounded-[38px] w-full lg:h-[500px] p-3 lg:p-10 flex lg:flex-row flex-col justify-center gap-10 lg:gap-0 lg:justify-between relative z-10">
         {/* Blurry Black Backdrop */}
         
         <div className="flex-1 flex flex-col justify-between gap-5 lg:gap-0">
            <div className="relative lg:w-2/3 w-full lg:h-[350px] h-[450px] border rounded-[30px] overflow-hidden flex flex-col items-center justify-center">
               {slides.map((slide, index) => (
                  <div
                     key={slide.id}
                     className={`absolute inset-0 border transition-opacity duration-1000 ${
                       index === currentIndex ? "opacity-100" : "opacity-0"
                     }`}
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
                           <p className="">{slide?.text}</p>
                        </div>
                     </div>
                  </div>
               ))}

               {/* Pagination Dots */}

            </div>
            <div className="w-full flex space-x-2">
               {slides.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => setCurrentIndex(index)}
                     className={`w-3 h-3 rounded-full cursor-pointer ${
                       index === currentIndex ? "bg-primary" : "bg-white"
                     }`}
                     aria-label={`Go to slide ${index + 1}`} // Improves screen reader accessibility
                  />
               ))}
            </div>
         </div>


         <div className="flex flex-col lg:justify-end items-end">
            {/* Navigation Buttons */}

            <div>
               <button
                  onClick={handlePrev}
                  className="bg-white text-black w-10 h-10 rounded-full transition-all duration-300 mr-4"
               >
                  <FaChevronLeft className="m-auto" />
               </button>
               <button
                  onClick={handleNext}
                  className="bg-white text-black w-10 h-10 rounded-full transition-all duration-300"
               >
                  <FaChevronRight className="m-auto" />
               </button>
            </div>
         </div>
      </div>
      </div>
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


