"use client"
import { title } from '@/components/primitives'
import Image from "next/image";

const Publications: React.FC = () => {
   const list = [
      {
         title: "Learning Arabic is a....",
         img: "/learning_arabic.png",
         date: "4th December, 2024",
      },
      {
         title: "Hasanul Khuluq is a....",
         img: "/hasanul_khuluq.png",
         date: "30th December, 2024",
      },
      {
         title: "Learning Arabic is a....",
         img: "/learning_arabic.png",
         date: "8th December, 2024",
      },
      {
         title: "Hasanul Khuluq is a....",
         img: "/hasanul_khuluq.png",
         date: "24th December, 2024",
      },
    
   ];
   return (
      <div className=''>
         <h2 className={title()}>Publications</h2>
         <div className='my-20'>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
               {list.map((item, index) => (
                  <div key={index}>
                     <div className="relative w-full h-[250px] rounded-3xl overflow-hidden">
                        <Image
                           fill
                           alt={item.title}
                           className="object-cover"
                           src={item.img}
                        />
                     </div>
                     <div className="text-small justify-between space-y-2 bg-opacity-1 my-5">
                        <b className='text-2xl text-purple-700'>{item.title}</b>
                        <p className="text-purple-700">{item.date}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Publications;