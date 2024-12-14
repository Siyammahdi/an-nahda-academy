import { title } from '@/components/primitives';
import React from 'react';

const Discussions: React.FC = () => {
   const videos = [
      "https://www.youtube.com/embed/oN428nn6dG0",
      "https://www.youtube.com/embed/htuLhCOrbzc",
      "https://www.youtube.com/embed/epPO-Bl929U",
      "https://www.youtube.com/embed/P5W1C7TlBcI"
   ];

   return (
      <div className="">
         <h2 className={title()}>Discussions & Life Enhancing Videos</h2>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-20">
            {videos.map((video, index) => (
               <div key={index} className="overflow-hidden rounded-3xl">
                  <iframe
                     width="100%"
                     height="350"
                     src={video}
                     title={`Video ${index + 1}`}
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     className="w-full h-[350px] rounded-xl"
                  ></iframe>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Discussions;

