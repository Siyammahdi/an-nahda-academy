"use client"
import { title } from '@/components/primitives';

const Discussions: React.FC = () => {
   return (

     <div className='my-20'>
      <h2 className={title()}>Discussions & Life Enhancing  Video</h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 my-10'>
         <div >
            <iframe style={{ width: '100%' , height: '350px', borderRadius:'20px' }}
               src="https://youtu.be/oN428nn6dG0?si=P2NXpHhxoFStXynQ">
            </iframe>
         </div>
         <div >
         <iframe style={{ width: '100%' , height: '350px', borderRadius:'20px' }}
               src="https://youtu.be/oN428nn6dG0?si=P2NXpHhxoFStXynQ">
            </iframe>
         </div>
         <div >
         <iframe style={{ width: '100%' , height: '350px', borderRadius:'20px' }}
               src="https://youtu.be/oN428nn6dG0?si=P2NXpHhxoFStXynQ">
            </iframe>
         </div>
         <div >
         <iframe style={{ width: '100%' , height: '350px', borderRadius:'20px' }}
               src="https://youtu.be/oN428nn6dG0?si=P2NXpHhxoFStXynQ">
            </iframe>
         </div>
      </div>
     </div>


   );
};

export default Discussions;