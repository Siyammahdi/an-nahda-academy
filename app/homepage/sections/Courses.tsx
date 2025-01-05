"use client";

import { title } from '@/components/primitives';
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { FaArrowRight, FaRegClock, FaRegHeart } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { TbTimeDuration10, TbWorld } from "react-icons/tb";
import Link from 'next/link';

type ReusableButtonProps = {
   labelTop?: string;
   labelMiddle: string | number;
   labelBottom?: string;
   variant?: any;
   className?: string;
   onClick?: () => void;
};

const ReusableButton: React.FC<ReusableButtonProps> = ({
   labelTop,
   labelMiddle,
   labelBottom,
   variant = "bordered",
   className = "",
   onClick,
}) => {
   return (
      <Button
         variant={variant}
         className={` text-violet-950 dark:text-violet-400 border-violet-950/30 hover:border-violet-700 hover:bg-purple-200 dark:border-violet-400 border-3 flex flex-col justify-center items-center rounded-[35.51] h-32 w-32 hover:scale-105 transition-transform text-center ${className}`}
         onClick={onClick}
      >
         {labelTop && <span className="text-sm font-medium text-stone-500/70">{labelTop}</span>}
         <span className="text-3xl mb-2 text-violet-950 font-bold">{labelMiddle}</span>
         {labelBottom && <span className="text-sm font-medium text-stone-500/70">{labelBottom}</span>}
      </Button>
   );
};

const Courses: React.FC = () => {


   return (
      <div>
         <div className="flex md:flex-row flex-col gap-4 items-center justify-center md:items-end md:justify-between mb-20">
            <h1 className={title()}>See Courses</h1>
            <Link href="/courses">
               <Button radius="full" className="bg-blue-500 text-white">
                  See All... <FaArrowRight />
               </Button>
            </Link>
         </div>

         {/* Date and Course Type Buttons */}
         <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:items-end lg:justify-between mb-10">
            <div className="flex flex-row items-start justify-center gap-2">
               <ReusableButton labelTop="Year" labelMiddle={2024} labelBottom="A.F" />
               <ReusableButton labelTop="Month" labelMiddle={12} labelBottom="December" />
               <ReusableButton labelTop="Day" labelMiddle={4} labelBottom="Wednesday" />
            </div>
            <div className="flex flex-row items-start justify-center gap-2">
               <ReusableButton labelMiddle="Free" labelBottom="Courses" />
               <ReusableButton labelMiddle="Paid" labelBottom="Courses" />
               <ReusableButton labelMiddle="All" labelBottom="Courses" />
            </div>
         </div>
         {/* Courses List */}
         <div className="gap-5 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 my-10">
            {list.map((item, index) => (
               <Card className="bg-opacity-40 backdrop-blur-md rounded-3xl" shadow="sm" key={index}>
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
                  <CardFooter className="flex flex-col items-start gap-4">
                     <div className="w-full flex flex-row justify-between">
                        <div className="flex flex-row items-center gap-2">
                           <Button size="sm" radius="full" className="bg-purple-200 text-purple-600 text-[10px] h-6">
                              About Course
                           </Button>
                           <Link href="https://www.facebook.com/messages/t/103915368128673">
                              <Button size="sm" radius="full" className="bg-green-200 text-green-600 text-[10px] h-6">
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
                     <span className={`text-purple-600 ${item.classes ? "block" : "hidden"}`}>{item.classes}</span>
                     <div className="w-full">
                        <Button radius="full" className="w-full bg-purple-600 text-white">
                           Fee {item.price}
                        </Button>
                     </div>
                  </CardFooter>
               </Card>
            ))}
         </div>
      </div>
   );
};



const list = [
   {
      title: "Learning Arabic Course",
      language: "Bangla,Arabic",
      age: "10+",
      time: "9+ months (Live Class)",
      start: 'After Enrollemnt',
      img: "/course_poster/learning-arabic.svg",
      price: "650 Tk. monthly",
      classes: "Flexible class schedule"
   },
   {
      title: "Fiqhun-Nisa",
      language: "Bangla,Arabic",
      age: "10+",
      time: "18+ hours (Live + Recorded)",
      start: 'After Enrollemnt',
      img: "/course_poster/fiqhun-nisa.svg",
      price: "1050 Tk.",
      classes: "20+ Classes"
   },
   {
      title: "Alima Course ",
      language: "Bangla,Arabic",
      age: "12+",
      time: "3 Years (Live Class)",
      start: 'After Enrollemnt',
      img: "/course_poster/alima.svg",
      price: "550 Tk. monthly",
      classes: "Flexible class schedule"
   },
   {
      title: "Parenting Course",
      language: "Bangla,Arabic",
      age: "18+",
      time: "Total 4 years (Live Class)",
      start: 'After Enrollemnt',
      img: "/course_poster/parenting.svg",
      price: "2050 Tk.",
      classes: "20+ Classes"
   },
];



export default Courses;
