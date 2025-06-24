"use client";

import { useRouter } from "next/navigation";
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
import { parsePrice } from "@/lib/utils";
import { getCourses, Course } from "@/lib/api";

// Define course type for display
interface CourseType {
   id: string;
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
   const [courses, setCourses] = useState<CourseType[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   // Set mounted to true after first render to avoid hydration mismatch
   useEffect(() => {
      setMounted(true);
   }, []);

   // Fetch courses from backend
   useEffect(() => {
      const fetchCourses = async () => {
         try {
            setLoading(true);
            setError(null);
            const backendCourses = await getCourses();
            
            // Transform backend data to match frontend format
            const transformedCourses: CourseType[] = backendCourses.map((course) => {
               // Find course duration from schedule
               const durationItem = course.courseDetails.schedule.find(item => 
                  Object.keys(item)[0] === "courseDuration"
               );
               const duration = durationItem ? Object.values(durationItem)[0] : "Flexible Schedule";
               
               // Find starting time from schedule
               const startingTimeItem = course.courseDetails.schedule.find(item => 
                  Object.keys(item)[0] === "startingTime"
               );
               const startingTime = startingTimeItem ? Object.values(startingTimeItem)[0] : "After Enrollment";
               
               // Find age requirement from schedule
               const ageItem = course.courseDetails.schedule.find(item => 
                  Object.keys(item)[0] === "ageRequirement"
               );
               const age = ageItem ? Object.values(ageItem)[0] : "12+";
               
               // Find course language from schedule
               const languageItem = course.courseDetails.schedule.find(item => 
                  Object.keys(item)[0] === "courseLanguage"
               );
               const language = languageItem ? Object.values(languageItem)[0] : "Bangla, Arabic";

               return {
                  id: course._id,
                  title: course.courseName,
                  language: language,
                  age: age,
                  time: duration,
                  start: startingTime,
                  img: course.imagePath,
                  price: course.courseDetails.fees.courseFee,
                  classes: course.courseDetails.platform,
                  startingTime: startingTime,
               };
            });
            
            setCourses(transformedCourses);
         } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Failed to load courses. Please try again later.');
         } finally {
            setLoading(false);
         }
      };

      fetchCourses();
   }, []);

   // A safe version of isInCart that only runs on client-side
   const checkIsInCart = (id: string) => {
      if (!mounted) return false;
      return isInCart(id);
   };

   // A safe version of isFavorite that only runs on client-side
   const checkIsFavorite = (id: string) => {
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
         price: parsePrice(course.price),
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
         price: parsePrice(course.price),
         discountedPrice: null,
         image: course.img,
         duration: course.time,
      };
      
      addToCart(cartItem);
      toast.success(`${course.title} added to cart!`);
   };

   if (loading) {
      return (
         <div className="flex items-center justify-center h-screen">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
               <p className="text-lg text-gray-600">Loading courses...</p>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex items-center justify-center h-screen">
            <div className="text-center">
               <p className="text-lg text-red-600 mb-4">{error}</p>
               <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
               >
                  Try Again
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="mb-40">
         <div>
            <h1 className="text-center md:text-4xl text-3xl font-bold text-pink-700 my-10">All Courses</h1>
         </div>

         {courses.length === 0 ? (
            <div className="text-center py-12">
               <p className="text-lg text-gray-600">No courses available at the moment.</p>
            </div>
         ) : (
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
               {courses.map((item, index) => (
                  <SwiperSlide className="" key={index}>
                     <div className="relative z-20 md:w-fit space-y-3 rounded-3xl md:rounded-[36px] bg-white p-4 shadow-lg my-10">
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
                              className="rounded-2xl md:rounded-3xl bg-black/40 object-cover"
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
                              onClick={() => router.push(`/course_details/${item.id}`)}
                              className="rounded-full text-xs md:text-sm bg-violet-500 px-4 py-2 font-semibold text-white duration-300 hover:scale-105 hover:bg-[#0095FF]/90"
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
                                 className="rounded-full text-xs md:text-sm bg-gray-400 px-4 py-2 font-semibold text-white duration-300 hover:scale-105 hover:bg-[#0095FF]/90"
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
         )}
      </div>
   );
};

export default Courses;

