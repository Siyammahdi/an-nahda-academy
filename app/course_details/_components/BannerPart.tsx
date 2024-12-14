"use client"
import { Avatar, } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
const BannerPart: React.FC = () => {
   return (
      <div className="bg-stone-100 h-[350px]  flex flex-col items-start justify-center">
         <div className="alignCenter ">

            <h1 className="text-4xl font-bold mb-3">Arabic Learning </h1>
            <h1 className="text-xs text-stone-600 mb-3">Specialized program for learning arabic language from the beginner level to advance</h1>
            <div className="flex flex-row items-center gap-3">
               <Avatar showFallback src="https://images.unsplash.com/broken" />
               <h1>Instructors: Saad Afnan +more...</h1>
            </div>

            <button className="my-3 px-10 py-3 rounded-sm text-white bg-stone-700" color="primary">Enroll Today</button>
            <h1 className="text-xs">800+ already enrolled</h1>

         </div>

      </div>
   );
};

export default BannerPart;