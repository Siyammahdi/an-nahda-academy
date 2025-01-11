"use client"
// import BannerPart from "./_components/BannerPart";
import Details from "./_components/Details";
// import CourseCard from "./_components/CourseCard";
import OtherCourses from "./_components/OtherCourses";


const CourseDetails: React.FC = () => {
   return (
      <div className="" >
         {/* <div
            className="absolute z-20 inset-x-0 justify-center w-32 ml-auto rounded-lg opacity-50 bg-gradient-to-r from-neutral-50 via-fuchsia-300 to-purple-500 h-42 right-32 top-64 lg:w-96 lg:h-96 blur-3xl">
         </div> */}

         <div>
            <h1 className="text-center md:text-4xl text-3xl font-bold text-pink-700 my-10">Course Details</h1>
         </div>
         {/* <BannerPart /> */}
         <div className="flex flex-row items-start justify-center  mb-10">
            <div className="p-5 w-[70%]">
               <Details />
            </div>

            <div className="p-5 w-[30%]">
               {/* <CourseCard /> */}
            </div>

         </div>
         <div>
            <OtherCourses />
         </div>

      </div>
   );
};

export default CourseDetails;
