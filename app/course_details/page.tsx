"use client"

import Image from "next/image";
import BannerPart from "./_components/BannerPart";
import Details from "./_components/Details";
import { FaRegClock, FaRegStar, FaStar } from "react-icons/fa6";
import { TbNotebook } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { GrCertificate } from "react-icons/gr";


const CourseDetails: React.FC = () => {
   return (
      <div className="glass" >
         <BannerPart />
         <div className="flex flex-row items-center justify-start alignCenter ">
            <Details />
            <div className="bg-white lg:-mt-[500px]">
               <div className="w-[350px]  border shadow-lg ">
                  {/* Card Image */}
                  <Image width={350} height={250} className="w-[350px] h-[250px]" src="/learning_arabic.png" alt="course-card" />
                  {/* Card Heading */}
                  <div className="space-y-2 p-6">
                     
                     <h2 className="font-bold md:text-2xl ">2000.00 Tk.</h2>
                     <div className="flexStart"><FaRegClock /> 2 Years</div>
                     <div className="flexStart"><TbNotebook /> 1000 classes</div>
                     <div className="flexStart"><SlCalender /> 3 days/week 1.5 hours</div>
                     <div className="flexStart"><FaRegStar /> <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                           <svg
                              key={star}
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#f2b00a" // Gold color for filled stars
                           >
                              <path
                                 d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                              />
                           </svg>
                        ))}
                     </div></div>
                     <div className="flexStart"><GrCertificate /> Certification on Course Completion</div>
                     
                      <button className="mt-5rounded-lg w-full bg-stone-700 px-6 py-2 text-[12px] font-semibold text-white hover:bg-slate-900 sm:text-sm ">Add to Cart</button>
                     
                  </div>


               </div>
            </div>

         </div>

      </div>
   );
};

export default CourseDetails;
