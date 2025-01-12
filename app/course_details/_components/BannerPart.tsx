"use client"
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";


interface BannerPartProps {
   courseName: string;
   courseFee: string;
   imagePath: string;
}



const BannerPart: React.FC<BannerPartProps> = ({ courseName, courseFee, imagePath }) => {
   return (
      <div className=" bg-blue-100/40 backdrop-blur-md dark:bg-white/5 lg:h-[440px] lg: rounded-[100px] flex md:flex-row flex-col-reverse items-center lg:justify-between justify-center">
         <div className="md:px-20 md:py-0 py-10 flex-1">

            <div className='flex flex-row items-center gap-2'>
               <Button size="sm" radius="full" className="bg-purple-200 border border-purple-600 text-purple-600 text-xs">
                  Enrolled 800+
               </Button>
               <Button size="sm" radius="full" className="bg-green-200 border border-green-600 text-green-600 text-xs">
                  Instructors
               </Button>
            </div>
            <h1 className=" md:text-4xl text-3xl text-blue-950 font-extrabold my-5">{courseName}</h1>

            <div className="flex gap-4">
            <div className=''>
               <Button radius="full" className="w-fit bg-purple-600 px-10 text-white ">
                  Course Fee {courseFee}.
               </Button>
            </div>
            <div className='w-[40px] h-[40px] rounded-full bg-white flex flex-col items-center justify-center border'>
               <FaRegHeart className='text-red-500' />
            </div>
            </div>
         </div>
         <div className="flex-1 flex justify-end  p-5">
            <Image className=" rounded-[80px]" alt="banner-image" src={imagePath} height={400} width={400}  />
         </div>

      </div>
   );
};

export default BannerPart;