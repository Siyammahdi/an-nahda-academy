"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Pagination, Scrollbar } from "swiper/modules";

interface Course {
   _id: string;
   title: string;
   courseName: string;
   imagePath: string;
   startingTime: string;
   price: string;
}

const Courses: React.FC = () => {
   const [courses, setCourses] = useState<Course[]>([]);
   const [cart, setCart] = useState<Course[]>([]); // 🛒 Cart state
   const router = useRouter();

   // ✅ Fetch data from backend
   useEffect(() => {
      const fetchCourses = async () => {
         try {
            const response = await fetch(
               "https://an-nahda-backend.vercel.app/api/courses"
            );
            const data = await response.json();
            setCourses(data);
         } catch (error) {
            console.error("Failed to fetch courses:", error);
         }
      };
      fetchCourses();
   }, []);

   console.log(courses[0]);

   // 🛒 Handle Add to Cart
   const handleAddToCart = (course: Course) => {
      if (cart.find((item) => item._id === course._id)) {
         alert("This course is already in the cart!");
      } else {
         setCart((prevCart) => [...prevCart, course]);
      }
   };

   return (
      <div className="mb-40">
         <h1 className="text-center md:text-4xl text-3xl font-bold text-pink-700 my-10">
            All Courses
         </h1>

         {/* 🛒 Cart Section */}
         {/* <div className="bg-white p-5 rounded-xl shadow-lg mb-10">
            <h2 className="text-2xl font-semibold mb-4">🛒 Cart ({cart.length} items)</h2>
            {cart.length === 0 ? (
               <p className="text-gray-500">No courses added to the cart yet.</p>
            ) : (
               <ul className="space-y-2">
                  {cart.map((course) => (
                     <li
                        key={course._id}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                     >
                        <span>{course.courseName}</span>
                        <span className="font-semibold text-blue-600">Tk. {course.price}</span>
                     </li>
                  ))}
               </ul>
            )}
         </div> */}

         <Swiper
            modules={[FreeMode, Pagination, Scrollbar]}
            centeredSlides={true}
            spaceBetween={20}
            slidesPerView={1.4}
            freeMode={true}
            scrollbar={{ hide: true }}
            breakpoints={{
               640: { slidesPerView: 1 },
               768: { slidesPerView: 2 },
               1024: { slidesPerView: 4 },
            }}
            pagination={{ clickable: true }}
            className="px-5"
         >
            {courses.map((course) => (
               <SwiperSlide key={course._id}>
                  <div className="relative z-20 md:w-fit space-y-3 rounded-[36px] bg-white p-4 shadow-lg my-10 dark:bg-[#18181B]">
                     <div className="relative flex h-48 w-full justify-center lg:h-[260px]">
                        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                           <svg
                              width={30}
                              className="cursor-pointer fill-transparent stroke-white stroke-2 hover:fill-red-500 hover:stroke-red-500"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
                           </svg>
                           <button className="rounded-xl bg-[#0095FF] px-3 py-1 font-medium text-white duration-200 hover:bg-[#0095FF]/90">
                              30% off
                           </button>
                        </div>
                        <Image
                           width={400}
                           height={400}
                           alt="course"
                           className="rounded-3xl bg-black/40 object-cover"
                           src={course.imagePath}
                        />
                     </div>
                     <div className="space-y-2 font-semibold">
                        <h6 className="text-sm md:text-base lg:text-lg">{course.courseName}</h6>
                        <p className="text-xs font-semibold text-gray-400 md:text-sm">
                           {course.startingTime}
                        </p>
                        {/* <p className="">Tk. {course.courseDetails.fees.courseFee}</p> */}
                     </div>
                     <div className="flex flex-row items-center justify-between gap-6 text-sm md:text-base">
                        <button
                           onClick={() => router.push(`/course_details/${course._id}`)}
                           className="rounded-full text-xs md:text-sm bg-[#49B2FF] px-4 py-2 font-semibold text-white duration-300 hover:scale-105 hover:bg-sky-600"
                        >
                           View Details
                        </button>
                        <button
                           onClick={() => handleAddToCart(course)} // 🛒 Add to Cart functionality
                           className="rounded-full text-xs md:text-sm bg-gray-400 px-4 py-2 font-semibold text-white duration-300 hover:scale-95 hover:bg-gray-600"
                        >
                           Add to Cart
                        </button>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
      </div>
   );
};

export default Courses;
