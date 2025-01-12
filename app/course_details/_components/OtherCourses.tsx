"use client"

import { title } from '@/components/primitives';
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { FaRegClock, FaRegHeart } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { TbTimeDuration10, TbWorld } from "react-icons/tb";
const OtherCourses: React.FC = () => {
   const list = [
      { title: "Learning Arabic Course", language: "Bangla,Arabic", age: "After 10 Years", time: "Total 2 Years (Recorded Class)", start: 'After Enrollemnt', img: "/learning_arabic.png", price: "550", classes: "20" },
      { title: "Tajweed Course", language: "Bangla,Arabic", age: "After 10 Years", time: "Total 10Hours (Live Class)", start: 'After Enrollemnt', img: "/learning_arabic.png", price: "1050", classes: "20" },
      { title: "Character Formation", language: "Bangla,Arabic", age: "After 10 Years", time: "Total 5 Hours (Recorded Class)", start: 'After Enrollemnt', img: "/learning_arabic.png", price: "550", classes: "20" },
      { title: "Hifz Course", language: "Bangla,Arabic", age: "After 10 Years", time: "Total 4 years (Live Class)", start: 'After Enrollemnt', img: "/learning_arabic.png", price: "1050", classes: "20" },

   ];

   return (
      <div>
         <h1 className={title()}>Other Courses</h1>






         <div className="gap-5 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 my-10">
            {list.map((item, index) => (
               <Card className='bg-opacity-40 backdrop-blur-md rounded-3xl' shadow="sm" key={index} >
                  <CardBody className="overflow-visible p-0">
                     <Image
                        shadow="sm"
                        width="100%"
                        height={300}
                        alt={item.title}
                        className="w-full object-cover rounded-none"
                        src={item.img}
                     />
                  </CardBody>
                  <CardFooter className=" flex flex-col items-start gap-4">
                     <div className='w-full flex flex-row  justify-between'>
                        <div className='flex flex-row items-center gap-2'>
                           <Button size="sm" radius="full" className="bg-purple-200 text-purple-600 text-xs">
                              About Course
                           </Button>
                           <Button size="sm" radius="full" className="bg-green-200 text-green-600 text-xs">
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
                        <Button radius="full" className="w-full bg-purple-600  text-white ">
                           Course Fee {item.price}Tk.
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
