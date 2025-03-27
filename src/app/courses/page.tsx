"use client";

import { useRouter } from "next/navigation"; // Import useRouter
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Pagination, Scrollbar } from "swiper/modules";
import { useState, useEffect } from "react";
import { useCart, CartItem } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { toast } from "sonner";

// Define course type
interface CourseType {
   id: number;
   title: string;
   language: string;
   age: string;
   time: string;
   start: string;
   img: string;
   price: string;
   classes: string;
   startingTime: string;
}

const Courses: React.FC = () => {
   const router = useRouter();
   const { addToCart, isInCart } = useCart();
   const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
   const [mounted, setMounted] = useState(false);

   // Set mounted to true after first render to avoid hydration mismatch
   useEffect(() => {
      setMounted(true);
   }, []);

   // A safe version of isInCart that only runs on client-side
   const checkIsInCart = (id: number) => {
      if (!mounted) return false;
      return isInCart(id);
   };

   // A safe version of isFavorite that only runs on client-side
   const checkIsFavorite = (id: number) => {
      if (!mounted) return false;
      return isFavorite(id);
   };

   // Handle adding to favorites
   const handleToggleFavorite = (course: CourseType) => {
      // Format the course to match CartItem type
      const cartItem: CartItem = {
         id: course.id,
         type: "course" as const,
         title: course.title,
         description: `${course.title} - ${course.language} course`,
         instructor: "An-Nahda Academy",
         price: parseFloat(course.price.split(' ')[0]),
         discountedPrice: null,
         image: course.img,
         duration: course.time,
      };
      
      if (checkIsFavorite(course.id)) {
         removeFromFavorites(course.id);
         toast.success(`${course.title} removed from favorites!`);
      } else {
         addToFavorites(cartItem);
         toast.success(`${course.title} added to favorites!`);
      }
   };

   const handleAddToCart = (course: CourseType) => {
      // Format the course to match CartItem type
      const cartItem: CartItem = {
         id: course.id,
         type: "course" as const,
         title: course.title,
         description: `${course.title} - ${course.language} course`,
         instructor: "An-Nahda Academy",
         price: parseFloat(course.price.split(' ')[0]),
         discountedPrice: null,
         image: course.img,
         duration: course.time,
      };
      
      addToCart(cartItem);
      toast.success(`${course.title} added to cart!`);
   };

   return (
      <div className="mb-40">
         <div>
            <h1 className="text-center md:text-4xl text-3xl font-bold text-pink-700 my-10">All Courses</h1>
         </div>

         <Swiper
            modules={[FreeMode, Pagination, Scrollbar]}
            centeredSlides={true}
            spaceBetween={20}
            slidesPerView={1.4}
            freeMode={true}
            scrollbar={{
               hide: true,
            }}
            breakpoints={{
               640: { slidesPerView: 1 },
               768: { slidesPerView: 2 },
               1024: { slidesPerView: 4 },
            }}
            
            pagination={{ clickable: true }}
            className="px-5"
         >
            {list.map((item, index) => (
               <SwiperSlide className="" key={index}>
                  <div className="relative z-20 md:w-fit space-y-3 rounded-[36px] bg-white p-4 shadow-lg my-10 dark:bg-[#18181B]">
                     <div className="relative flex h-48 w-full justify-center lg:h-[260px]">
                        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                           <div className="flex items-center">
                              <svg
                                 width={30}
                                 className={`cursor-pointer ${checkIsFavorite(item.id) ? 'fill-violet-500 stroke-violet-500' : 'fill-transparent stroke-white stroke-2 hover:fill-violet-500 hover:stroke-violet-500'}`}
                                 viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg"
                                 onClick={() => handleToggleFavorite(item)}
                              >
                                 <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
                              </svg>
                           </div>
                           <button className="rounded-xl bg-violet-500 px-3 py-1 font-medium text-white duration-200 hover:bg-[#0095FF]/90">
                              30% off
                           </button>
                        </div>
                        <Image
                           width={400}
                           height={400}
                           alt="course"
                           className="rounded-3xl bg-black/40 object-cover"
                           src={item?.img}
                        />
                     </div>
                     <div className="space-y-2  font-semibold">
                        <h6 className="text-sm md:text-base lg:text-lg">{item?.title}</h6>
                        <p className="text-xs font-semibold text-gray-400 md:text-sm">
                           {item?.startingTime}
                        </p>
                        <p>Tk. {item?.price}</p>
                     </div>
                     <div className="flex flex-row items-center justify-between gap-6 text-sm md:text-base">
                        <button
                           onClick={() => router.push(`/course_details/${item.id}`)} // Navigate to dynamic route
                           className="rounded-full text-xs md:text-sm bg-violet-500 px-4 py-2 font-semibold text-white duration-300 hover:scale-105 hover:bg-sky-600"
                        >
                           View Details
                        </button>
                        {mounted && checkIsInCart(item.id) ? (
                           <button 
                              className="rounded-full text-xs md:text-sm bg-gray-500 px-4 py-2 font-semibold text-white cursor-not-allowed"
                              disabled
                           >
                              In Cart
                           </button>
                        ) : (
                           <button 
                              className="rounded-full text-xs md:text-sm bg-gray-400 px-4 py-2 font-semibold text-white duration-300 hover:scale-95 hover:bg-gray-600"
                              onClick={() => handleAddToCart(item)}
                           >
                              Add to Cart
                           </button>
                        )}
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

const list = [
   {
      id: 1,
      title: "Learning Arabic Course",
      language: "Bangla,Arabic",
      age: "10+",
      time: "9+ months (Live Class)",
      start: "After Enrollment",
      img: "/course_poster/learning_arabic.png",
      price: "650 Tk. monthly",
      classes: "Flexible class schedule",
      startingTime: "Next batch starts on February 1st, 2025",
   },
   {
      id: 2,
      title: "Hasanul Khuluk",
      language: "Bangla, Arabic",
      age: "12+",
      time: "2 months",
      start: "Next batch starts on March 1st, 2025",
      img: "/course_poster/husnul_khuluk.png",
      price: "1000 Tk.",
      classes:
         "Online, combining engaging pre-recorded videos, live discussions, and assignments.",
      startingTime: "Next batch starts on March 1st, 2025",
   },
   {
      id: 3,
      title: "Fiqhun-Nisa",
      language: "Bangla,Arabic",
      age: "10+",
      time: "18+ hours (Live + Recorded)",
      start: "After Enrollment",
      img: "/course_poster/fiqhun_nisa.png",
      price: "1050 Tk.",
      classes: "20+ Classes",
      startingTime: "Next batch starts on March 15th, 2025",
   },
   {
      id: 4,
      title: "Alima Course",
      language: "Bangla,Arabic",
      age: "12+",
      time: "3 Years (Live Class)",
      start: "After Enrollment",
      img: "/course_poster/aleema.png",
      price: "550 Tk. monthly",
      classes: "Flexible class schedule",
      startingTime: "Next batch starts on April 1st, 2025",
   },
   {
      id: 5,
      title: "Parenting Course",
      language: "Bangla",
      age: "16+",
      time: "6 months (Live Class)",
      start: "After Enrollment",
      img: "/course_poster/parenting.png",
      price: "550 Tk. monthly",
      classes: "Flexible class schedule",
      startingTime: "Next batch starts on April 1st, 2025",
   },
];

export default Courses;
