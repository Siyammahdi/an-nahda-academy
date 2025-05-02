"use client"
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Discussions: React.FC = () => {


   const sliders = [
      "https://www.youtube.com/embed/HVAnIPej18M",
      "https://www.youtube.com/embed/SgnmSO9d7y0",
      "https://www.youtube.com/embed/cr2b3PnPYJs",
      "https://www.youtube.com/embed/-_gmfXcgLg0",
      "https://www.youtube.com/embed/-_gmfXcgLg0"
   ];
   const [currentSlider, setCurrentSlider] = useState(2);
   // const sliders = [{img: "https://source.unsplash.com/600x600/?bedroom",}, {img: "https://source.unsplash.com/600x600/?room",}, {img: "https://source.unsplash.com/600x600/?livingrooms",}, {img: "https://source.unsplash.com/600x600/?livingroom",}, {img: "https://source.unsplash.com/600x600/?bedrooms",},];

   const prevSlider = () => setCurrentSlider((currentSlider) => currentSlider === 0 ? sliders.length - 1 : currentSlider - 1);
   const nextSlider = () => setCurrentSlider((currentSlider) => currentSlider === sliders.length - 1 ? 0 : currentSlider + 1);



   return (
      <div className="relative lg:mx-0 mx-5">
         <div>
            <div
               className="absolute inset-x-0 justify-center w-32 ml-auto rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 h-42 left-0  lg:w-[600px] lg:h-[400px] blur-3xl">
            </div>
            <div
               className="absolute inset-x-0 justify-center w-32 ml-auto rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 h-42 right-[0px] top-64 lg:w-[400px] lg:h-[300px] blur-3xl">
            </div>
         </div>
         <h2 className="lg:text-5xl text-3xl font-semibold text-gradient">জীবনমূখী ভিডিওসমূহ</h2>
         <div className="max-w-6xl mx-auto h-[540px] md:h-[670px] flex flex-col xl:flex-row items-center overflow-hidden gap-5 lg:gap-10 relative">
            <div className="absolute w-full h-full flex items-center justify-between z-50 px-5">
               {/* arrow left */}
               <button onClick={prevSlider} className="flex justify-center items-center bg-black dark:bg-white  rounded-full w-6 h-6 md:w-8 md:h-8">
                  <svg viewBox="0 0 1024 1024" className="w-4 h-4 md:w-6 md:h-6 icon" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path></g></svg>
               </button>
               {/* arrow right */}
               <button onClick={nextSlider} className="flex justify-center items-center bg-black dark:bg-white  rounded-full w-6 h-6 md:w-8 md:h-8">
                  <svg viewBox="0 0 1024 1024" className="w-4 h-4 md:w-6 md:h-6 icon" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="rotate(180)"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z"></path></g></svg>
               </button>
            </div>
            {/* slider container */}
            <div className="h-[540px] md:h-[670px] w-2/3 ml-auto relative ease-linear duration-300 flex items-center"
               style={{ transform: `translateX(-${currentSlider * 50}%)` }}>
               {/* sliders */}
               {sliders.map((video, index) => (

                  <Card 
                     key={index}
                     className={cn(
                        "min-w-[50%] relative duration-200 rounded-3xl overflow-hidden",
                        currentSlider === index 
                           ? "h-[350px] md:w-[500px] w-[350px] z-10" 
                           : "z-0 h-[250px] md:w-[350px] scale-95 opacity-40"
                     )}
                     style={{ perspective: "200px" }}
                  >
                     <div className="overflow-hidden rounded-3xl h-full">
                        <iframe
                           width="500"
                           height="350"
                           src={video}
                           title={`Video ${index + 1}`}
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                           className="w-full h-full rounded-xl"
                        ></iframe>
                     </div>
                  </Card>

               ))}
            </div>
         </div>
      </div>
   );
};

export default Discussions;
