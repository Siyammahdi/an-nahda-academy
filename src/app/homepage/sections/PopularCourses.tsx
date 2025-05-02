"use client";

import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaArrowRight, FaRegClock, FaRegHeart } from "react-icons/fa6";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { TbTimeDuration10, TbWorld } from 'react-icons/tb';
import { SlCalender } from 'react-icons/sl';
import { useState, useEffect } from 'react';

type ReusableButtonProps = {
   labelTop?: string;
   labelMiddle: string | number;
   labelBottom?: string;
   variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
   className?: string;
   onClick?: () => void;
};

// Array of month names for displaying
const monthNames = [
   "January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
];

// Array of day names
const dayNames = [
   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
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

const ReusableButton: React.FC<ReusableButtonProps> = ({
   labelTop,
   labelMiddle,
   labelBottom,
   variant = "outline",
   className = "",
   onClick,
}) => {
   const [isHovered, setIsHovered] = useState(false);

   return (
      <Button
         variant={variant}
         className={cn(
            "group flex flex-col items-center p-2 lg:p-4 justify-evenly rounded-[20px] md:rounded-[30px] hover:text-white lg:rounded-[40px] text-violet-950 dark:text-violet-400 border-none h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 hover:scale-105 transition-transform text-center",
            "hover:bg-transparent",
            className
         )}
         style={{
            backgroundImage: isHovered ? hoverSvg : staticSvg,
            backgroundSize: "cover",
            backgroundPosition: "center",
         }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onClick={onClick}
      >
         {labelTop && <span className="text-xs md:text-sm font-medium text-stone-500/70 group-hover:text-white">{labelTop}</span>}
         <span className="md:text-3xl text-xl mb-2 text-violet-950 font-bold group-hover:text-white">{labelMiddle}</span>
         {labelBottom && <span className="text-xs md:text-sm font-medium text-purple-700/70 group-hover:text-white">{labelBottom}</span>}
      </Button>
   );
};

const list = [
   {
      id: 1,
      title: "Learning Arabic",
      language: "Bangla,Arabic",
      age: "10+",
      time: "9+ months (Live Class)",
      start: "After Enrollment",
      img: "/poster_square/learning_arabic.png",
      price: "650 Tk. monthly",
      classes: "Flexible class schedule",
   },
   {
      id: 2,
      title: "Hasanul Khuluk",
      language: "Bangla, Arabic",
      age: "12+",
      time: "2 months",
      start: "Next batch (March 1st, 2025)",
      img: "/poster_square/husnul_khuluk.png",
      price: "1000 Tk.",
      classes: "Online, combining engaging pre-recorded videos, live discussions, and assignments.",
   },
   {
      id: 3,
      title: "Fiqhun-Nisa",
      language: "Bangla,Arabic",
      age: "10+",
      time: "18+ hours (Live + Recorded)",
      start: "After Enrollment",
      img: "/poster_square/fiqhun_nisa.png",
      price: "1050 Tk.",
      classes: "20+ Classes",
   },
   {
      id: 4,
      title: "Alima Course",
      language: "Bangla,Arabic",
      age: "12+",
      time: "3 Years (Live Class)",
      start: "After Enrollment",
      img: "/poster_square/aleema.png",
      price: "550 Tk. monthly",
      classes: "Flexible class schedule",
   },
   {
      id: 5,
      title: "Parenting Course",
      language: "Bangla,Arabic",
      age: "12+",
      time: "3 Years (Live Class)",
      start: "After Enrollment",
      img: "/poster_square/parenting.png",
      price: "1050 Tk.",
      classes: "Flexible class schedule",
   },
];

const PopularCourses: React.FC = () => {
   // Add state for current date
   const [currentDate, setCurrentDate] = useState(new Date());
   
   // Update the date every minute
   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentDate(new Date());
      }, 60000); // Update every minute
      
      return () => clearInterval(interval);
   }, []);
   
   // Extract date components
   const year = currentDate.getFullYear();
   const month = currentDate.getMonth(); // 0-11
   const day = currentDate.getDate(); // 1-31
   const dayOfWeek = currentDate.getDay(); // 0-6
   
   return (
      <div className='lg:mx-0'>
         <div className='max-w-7xl mx-auto'>
            <div className="flex justify-between mx-5 lg:mx-0 gap-4 items-center mb-20">
               <h1 className='lg:text-5xl text-3xl font-semibold text-gradient'>কোর্স সমূহ</h1>
               <Link href="/courses">
                  <Button className="bg-primary text-white rounded-full">
                     See All... <FaArrowRight className="ml-2" />
                  </Button>
               </Link>
            </div>
            {/* Dynamic Date Calendar */}
            <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-end lg:justify-between mb-10">
               <div className="hidden md:grid grid-cols-3 gap-2">
                  <ReusableButton 
                     labelTop="Year" 
                     labelMiddle={year} 
                     labelBottom="A.D" 
                  />
                  <ReusableButton 
                     labelTop="Month" 
                     labelMiddle={monthNames[month]} 
                     labelBottom={String(month + 1)} 
                  />
                  <ReusableButton 
                     labelTop="Day" 
                     labelMiddle={day} 
                     labelBottom={dayNames[dayOfWeek]} 
                  />
               </div>
               <div className="grid grid-cols-3 gap-2">
                  <Link href="/courses"><ReusableButton labelMiddle="Free" labelBottom="Courses" /></Link>
                  <Link href="/courses"><ReusableButton labelMiddle="Paid" labelBottom="Courses" /></Link>
                  <Link href="/courses"><ReusableButton labelMiddle="All" labelBottom="Courses" /></Link>
               </div>
            </div>
         </div>
         {/* Swiper Slider */}
         <Swiper
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
               640: { slidesPerView: 1 },
               768: { slidesPerView: 2 },
               1024: { slidesPerView: 5 },
            }}
            className="w-full "
         >
            {list.map((item) => (
               <SwiperSlide key={item.id}>
                  <Card className="h-full bg-opacity-40 backdrop-blur-md rounded-3xl mx-auto w-4/5 overflow-hidden">
                     <Image
                        width={500}
                        height={500}
                        alt={item.title}
                        className="object-cover"
                        src={item.img}
                     />

                     <CardFooter className="p-3 flex flex-col items-start gap-4">
                        <div className="w-full flex flex-row justify-between">
                           <div className="flex flex-row items-center gap-2">
                              <Link href={`course_details/${item?.id}`}>
                                 <Button size="sm" className="bg-purple-200 text-purple-600 hover:text-white text-[10px] h-6">
                                    About Course
                                 </Button>
                              </Link>
                              <Link href="https://www.facebook.com/messages/t/103915368128673">
                                 <Button size="sm" className="bg-green-200 text-green-600 hover:text-white text-[10px] h-6">
                                    Message Us
                                 </Button>
                              </Link>
                           </div>
                           <div className="w-[30px] h-[30px] rounded-full flex flex-col items-center justify-center border">
                              <FaRegHeart className="text-red-500" />
                           </div>
                        </div>
                        <b className="text-xl">{item.title}</b>

                        <div className='text-xs space-y-2'>
                           <div className="flex flex-nowrap items-center gap-2">
                              <SlCalender />
                              <span className="break-words">{item.start}</span>
                           </div>
                           <div className="flex flex-nowrap items-center gap-2">
                              <FaRegClock />
                              <span className="break-words">{item.time}</span>
                           </div>
                           <div className="flex flex-nowrap items-center gap-2">
                              <TbTimeDuration10 />
                              <span className="break-words">{item.age} Years</span>
                           </div>
                           <div className="flex flex-nowrap items-center gap-2">
                              <TbWorld />
                              <span className="break-words">{item.language}</span>
                           </div>
                        </div>
                        <span className={`text-purple-600 ${item.classes ? "block" : "hidden"}`}>{item.classes?.slice(0, 25)}...</span>
                        <div className="w-full">
                           <Link href={`course_details/${item?.id}`}>
                              <Button className="w-full rounded-full bg-purple-600 text-white">
                                 Fee {item.price}
                              </Button>
                           </Link>
                        </div>
                     </CardFooter>
                  </Card>
                  
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default PopularCourses;
