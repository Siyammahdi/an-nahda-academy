"use client"

import { title } from '@/components/primitives';
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegClock, FaRegHeart } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { TbTimeDuration10, TbWorld } from "react-icons/tb";
import { useState, useEffect } from "react";
import { getCourses, Course } from "@/lib/api";
import { useParams } from "next/navigation";

const OtherCourses: React.FC = () => {
   const { id } = useParams() as { id: string };
   const [courses, setCourses] = useState<Course[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   // Fetch courses from backend
   useEffect(() => {
      const fetchCourses = async () => {
         try {
            setLoading(true);
            setError(null);
            const backendCourses = await getCourses();
            // Filter out the current course and show others
            const otherCourses = backendCourses.filter(course => course._id !== id);
            setCourses(otherCourses);
         } catch (error) {
            console.error('Error fetching courses:', error);
            setError('Failed to load other courses. Please try again later.');
         } finally {
            setLoading(false);
         }
      };

      fetchCourses();
   }, [id]);

   // Transform backend courses to display format
   const transformCourseForDisplay = (course: Course) => {
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
      };
   };

   if (loading) {
      return (
         <div>
            <h1 className={title()}>Other Courses</h1>
            <div className="flex items-center justify-center py-20">
               <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <p className="text-lg text-gray-600">Loading other courses...</p>
               </div>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div>
            <h1 className={title()}>Other Courses</h1>
            <div className="flex items-center justify-center py-20">
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
         </div>
      );
   }

   if (courses.length === 0) {
      return (
         <div>
            <h1 className={title()}>Other Courses</h1>
            <div className="text-center py-20">
               <p className="text-lg text-gray-600">No other courses available at the moment.</p>
            </div>
         </div>
      );
   }

   const displayCourses = courses.map(transformCourseForDisplay);

   return (
      <div>
         <h1 className={title()}>Other Courses</h1>

         <div className="gap-5 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 my-10">
            {displayCourses.map((item, index) => (
               <Card className='bg-opacity-40 backdrop-blur-md rounded-3xl' key={index}>
                  <div className="relative w-full h-[300px]">
                     <Image
                        fill
                        alt={item.title}
                        className="object-cover"
                        src={item.img}
                     />
                  </div>
                  <CardFooter className="flex flex-col items-start gap-4">
                     <div className='w-full flex flex-row justify-between'>
                        <div className='flex flex-row items-center gap-2'>
                           <Button size="sm" variant="outline" className="bg-purple-200 text-purple-600 text-xs h-8 rounded-full">
                              About Course
                           </Button>
                           <Button size="sm" variant="outline" className="bg-green-200 text-green-600 text-xs h-8 rounded-full">
                              Message Us
                           </Button>
                        </div>
                        <div className='w-[30px] h-[30px] rounded-full flex flex-col items-center justify-center border'>
                           <FaRegHeart className='text-red-500' />
                        </div>
                     </div>
                     <b className='text-xl'>{item.title}</b>

                     <div>
                        <div className='flex flex-nowrap items-center gap-2'>
                           <SlCalender /><span className='break-words'>{item.start}</span>
                        </div>
                        <div className='flex flex-nowrap items-center gap-2'>
                           <FaRegClock /><span className='break-words'>{item.time}</span>
                        </div>
                        <div className='flex flex-nowrap items-center gap-2'>
                           <TbTimeDuration10 /><span className='break-words'>{item.age}</span>
                        </div>
                        <div className='flex flex-nowrap items-center gap-2'>
                           <TbWorld /><span className='break-words'>{item.language}</span>
                        </div>
                     </div>
                     <span className='text-purple-600'>+{item.classes} Classes</span>
                     <div className='w-full'>
                        <Button className="w-full bg-purple-600 text-white rounded-full">
                           Course Fee {item.price}
                        </Button>
                     </div>
                  </CardFooter>
               </Card>
            ))}
         </div>
      </div>
   );
};

export default OtherCourses;
