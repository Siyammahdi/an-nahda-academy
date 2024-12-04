"use client"
import { title } from '@/components/primitives'
import { Image } from "@nextui-org/image";
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
      <div className='my-20'>
         <h2 className={title()}>Publications</h2>
         <div className='my-20'>
            <div className="gap-2 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4">
               {list.map((item, index) => (
                  <div  key={index} >
                     
                        <Image
                           shadow="sm"
                           radius="lg"
                           width="100%"
                           alt={item.title}
                           className="w-full object-cover h-[250px]"
                           src={item.img}
                        />
                     
                     <div className="text-small justify-between bg-opacity-1 my-5">
                        <b className='text-3xl text-purple-700 '>{item.title}</b>
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