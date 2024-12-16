"use client"
import { Avatar, } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa6";
const BannerPart: React.FC = () => {
   return (
      <div className=" glass2 h-[350px] rounded-full flexBetween">
         <div className="p-5 flex-1">

            <div className='flex flex-row items-center gap-2'>
               <Button size="sm" radius="full" className="bg-purple-200 border border-purple-600 text-purple-600 text-xs">
                  Enrolled 800+
               </Button>
               <Button size="sm" radius="full" className="bg-green-200 border border-green-600 text-green-600 text-xs">
                  Instructors
               </Button>
            </div>
            <h1 className=" md:text-4xl text-3xl text-blue-950 font-extrabold my-5">Parenting Course </h1>

            <div className="flex flexStart">
            <div className='w-[70%]'>
               <Button radius="full" className="w-full bg-purple-600  text-white ">
                  Course Fee 1000Tk.
               </Button>
            </div><div className='w-[40px] h-[40px] rounded-full bg-white flex flex-col items-center justify-center border'>
               <FaRegHeart className='text-red-500' />
            </div>
            </div>
         </div>
         <div className="rounded-full flex-1 border p-5">
            <Image className="rounded-2xl" alt="banner-image" src='/parenting2.png' height={350} width={400} style={{ width: '100%', height: '300px' }} />
         </div>

      </div>
   );
};

export default BannerPart;