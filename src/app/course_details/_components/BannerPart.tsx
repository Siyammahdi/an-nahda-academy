"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import PaymentDetailsModal from "./PaymentDetailsModal";


interface BannerPartProps {
   courseName: string;
   courseFee: string;
   imagePath: string;
}



const BannerPart: React.FC<BannerPartProps> = ({ courseName, courseFee, imagePath }) => {

   const [isEnrolButtonClicked, setIsEnrolButtonClicked] = useState(false);

   const handleEnrolButtonOpen = () => setIsEnrolButtonClicked(true);
   const handleEnrolButtonClose = () => setIsEnrolButtonClicked(false);

   return (
      <div className=" bg-blue-100/40 backdrop-blur-md dark:bg-white/5 lg:h-[440px] rounded-2xl lg:rounded-[100px] flex md:flex-row flex-col-reverse items-center lg:justify-between justify-center">
         <div className=" md:px-20 md:py-0 py-10 flex-1 ">

            <div className='flex flex-row items-center gap-2 mx-2'>
               <Button size="sm" className="bg-purple-200 border border-purple-600 text-purple-600 text-xs rounded-full">
                  Enrolled 800+
               </Button>
               <Button size="sm" className="bg-green-200 border border-green-600 text-green-600 text-xs rounded-full">
                  Instructors
               </Button>
            </div>
            <h1 className=" md:text-4xl text-3xl text-blue-950 font-extrabold my-5 mx-2">{courseName}</h1>

            <div className="flex gap-4">
               <div className=''>
                  <Button onClick={handleEnrolButtonOpen} className="w-fit bg-purple-600 px-10 text-white rounded-full">
                     Course Fee {courseFee}.
                  </Button>
               </div>
               <div className='w-[40px] h-[40px] rounded-full bg-white flex flex-col items-center justify-center border'>
                  <FaRegHeart className='text-red-500' />
               </div>
            </div>
         </div>
         <div className="flex-1 flex justify-end  p-5">
            <Image className="rounded-2xl lg:rounded-[80px]" alt="banner-image" src={imagePath} height={400} width={400} />
         </div>
         {isEnrolButtonClicked && (
            <PaymentDetailsModal isOpen={isEnrolButtonClicked} onClose={handleEnrolButtonClose} />
         )}
      </div>
   );
};

export default BannerPart;