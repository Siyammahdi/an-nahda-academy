"use client"
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
const BannerPart: React.FC = () => {
   return (
      <div className=" glass2 h-[440px] rounded-[100px] flexBetween">
         <div className="px-20 flex-1">

            <div className='flex flex-row items-center gap-2'>
               <Button size="sm" radius="full" className="bg-purple-200 border border-purple-600 text-purple-600 text-xs">
                  Enrolled 800+
               </Button>
               <Button size="sm" radius="full" className="bg-green-200 border border-green-600 text-green-600 text-xs">
                  Instructors
               </Button>
            </div>
            <h1 className=" md:text-4xl text-3xl text-blue-950 font-extrabold my-5">Learning Arabic Course
            </h1>

            <div className="flex gap-4">
               <div className=''>
                  <Button radius="full" className="w-fit bg-purple-600 px-10 text-white ">
                     Course Fee 1000Tk.
                  </Button>
               </div>
               <div className='w-[40px] h-[40px] rounded-full bg-white flex flex-col items-center justify-center border'>
                  <FaRegHeart className='text-red-500' />
               </div>
            </div>
         </div>
         <div className=" flex justify-end p-5">
            <Image className=" rounded-[80px]" alt="banner-image" src='/course_poster/parenting.png' height={400} width={400} />
         </div>

      </div>
   );
};

export default BannerPart;