"use client"

import Image from "next/image";
import BannerPart from "./_components/BannerPart";
import Details from "./_components/Details";
import { FaRegClock, FaRegStar, FaStar } from "react-icons/fa6";
import { TbNotebook } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { GrCertificate } from "react-icons/gr";
import CourseCard from "./_components/CourseCard";
import OtherCourses from "./_components/OtherCourses";


const CourseDetails: React.FC = () => {
   return (
      <div className="" >
         <div>
            <h1 className="text-center md:text-4xl text-3xl font-bold text-pink-700 my-10">Course Details</h1>
         </div>
         <BannerPart />
         <div className="flex flex-row items-start justify-center  mb-10">
            <div className="p-5 w-[70%]">
            <Details />
            </div>
           
            <div className="p-5 w-[30%]">
               <CourseCard/>
            </div>

         </div>
         <div>
            <OtherCourses/>
         </div>

      </div>
   );
};

export default CourseDetails;
