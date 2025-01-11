
"use client"

import Image from "next/image";

const Courses: React.FC = () => {
   const list = [
      { title: "Learning Arabic Course", language: "Bangla,Arabic", age: "After 10 Years", time: "Total 2 Years (Recorded Class)", start: 'After Enrollemnt', img: "/course_poster/learning-arabic.png", price: "550", classes: "20" },
      { title: "Fiqhun nisa", language: "Bangla,Arabic", age: "After 10 Years", time: "Total 10Hours (Live Class)", start: 'After Enrollemnt', img: "/public/course_poster/fiqhun-nisa.png", price: "1050", classes: "20" },
      { title: "Character Formation", language: "Bangla,Arabic", age: "After 10 Years", time: "Total 5 Hours (Recorded Class)", start: 'After Enrollemnt', img: "/learning_arabic.png", price: "550", classes: "20" },
      { title: "Hifz Course", language: "Bangla,Arabic", age: "After 10 Years", time: "Total 4 years (Live Class)", start: 'After Enrollemnt', img: "/learning_arabic.png", price: "1050", classes: "20" },

   ];
   return (
      <div className="max-w-7xl mx-auto">
         <div>
            <h1 className="text-center md:text-4xl text-3xl font-bold text-pink-700 my-10">All Courses</h1>
         </div>
         <div className="gap-5 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 my-10">
            {list.map((item, index) => (
               <div key={index} className="w-full max-w-[340px] space-y-3 rounded-[36px] bg-white p-4 shadow-lg dark:bg-[#18181B]">
                  <div className="relative flex h-48 w-full justify-center lg:h-[260px]">
                     <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                        <div className="flex items-center">
                           <svg width={30} className="cursor-pointer fill-transparent stroke-white stroke-2 hover:fill-red-500 hover:stroke-red-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path></svg>
                        </div>
                        <button className="rounded-xl bg-[#0095FF] px-3 py-1 font-medium text-white duration-200 hover:bg-[#0095FF]/90">30% off</button>
                     </div>
                     <Image width={400} height={400} alt="course" className="rounded-3xl bg-black/40 object-cover" src={item?.img} />
                  </div>
                  <div className="space-y-2 font-semibold">
                     <h6 className="text-sm md:text-base lg:text-lg">{item?.title}</h6>
                     <p className="text-xs font-semibold text-gray-400 md:text-sm">Waterproof Sport HD Monitor for MacBook</p>
                     <p>Tk. {item?.price}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between gap-6 text-sm md:text-base">
                     <button className="rounded-full text-sm bg-[#49B2FF] px-4 py-2 font-semibold text-white duration-300 hover:scale-105 hover:bg-sky-600">View Details</button>
                     <button className="rounded-full text-sm bg-gray-400 px-4 py-2 font-semibold text-white duration-300 hover:scale-95 hover:bg-gray-600">Add to Cart</button>
                  </div>
               </div>
            ))}
         </div>

      </div>
   );
};

export default Courses;