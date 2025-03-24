"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import wave from "@/../public/elements/side-wave.png"
import Image from "next/image";

// Define the CommentCard component
const CommentCard: React.FC<{ avatar: string; title: string; text: string; gradient: string }> = ({ avatar, title, text, gradient }) => {
   return (
      <div className={`w-full h-[350px] flex flex-col items-start justify-start p-10 rounded-xl ${gradient}`}>
         <div className="flex flex-row items-center gap-4 mb-3">
            <Avatar className="h-12 w-12 bg-white">
              <AvatarImage src={avatar} alt={title} />
              <AvatarFallback>{title.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-white text-2xl font-bold">{title}</h2>
         </div>
         <div className="text-white overflow-y-scroll">
            <p>{text}</p>
         </div>
      </div>
   );
};

const StudentComments: React.FC = () => {
   // Define the data for the comments
   const comments = [
      {
         avatar: "/women-black.png",
         title: "Amatullah Yasmin",
         text: "আমার স্বপ্ন এই নাহদা একাডেমি একদিন অফলাইনে ও প্রতিষ্ঠিত হবে। আমাদের উস্তাজ, উস্তাজারা আমাদেরকে আমানত হিসেবে নিয়েছেন। আমাকে কেউ এইভাবে গুরুত্বের সাথে কখনো নেয়নি, কোনো একাডেমি নেয়নি। আমি এইখানে ভর্তির আগে আদব নিয়ে কখনো তেমন ভাবিনি, কেউ আমাকে আন নাহদা একাডেমির মতো শিখায়নি, আমার জন্য ফিকির করে কেউ কখনো এমন কল্যাণের নসিহা করেনি যা আমি এই একাডেমি থেকে পেয়েছি এবং পাচ্ছি। এই একাডেমিকে আমি আল্লাহর জন্য ভালোবাসি। আল্লাহ সাক্ষী আমি মিথ্যাবাদী নই। এই একাডেমিকে আল্লাহ উত্তমভাবে-আল্লাহ-আপনার জমীনে কবুল করে নিন। আমিন।",
         gradient: "bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500",
      },
      {
         avatar: "/women-black.png",
         title: "Hosneara Arifa",
         text: "আলহামদুলিল্লাহ। এই একাডেমিতে না আসলে বুঝতেই পারতাম নাহ, অনলাইনেও এতো আন্তরিকতার সাথে পড়ানো হয়। বিশেষ করে ওস্তায এক কথায় অসাধারণ। এতো পূঙ্খানুপুঙ্খ ভাবে আমাদের প্রত্যকের প্রতিটা বিষয়ে খেয়াল রাখেন সামনাসামনি ক্লাস নিয়েও হয়তো রাখা হয় না। এক পড়া একজনের যদি বুঝতে অসুবিধা হয়, বার বার বুঝায়ে দেন। আলহামদুলিল্লাহ। আল্লাহ যেন ওস্তাযগণের হায়াত ও জ্ঞান বাড়িয়ে দেন আর এই একাডেমিকে কবুল করে নেন। আমিন!",
         gradient: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
      },
      {
         avatar: "/women-black.png",
         title: "Jannat Binte Rezaul",
         text: "আলহামদুলিল্লাহ। এখানে এসে পড়লেখা যে এত্ত আনন্দ এর সাথে করা যায় এইখানে এসে শিখেছি। যা শিখছি তাই প্রাকটিক্যাল লাইফে ব্যাবহার করা শিখছি। যার ফলে সব কিছু স্মৃতিতে স্থায়ী হচ্ছে, আলহামদুলিল্লাহ। আর উস্তায আমাদের পড়ালেখার ব্যাপারে খুবই ধৈর্য সহকারে পড়ান, আলহামদুলিল্লাহ। আমাদের কার কোথায় সমস্যা তা সুন্দর করে বুঝিয়ে দিচ্ছেন তারজন্য উস্তায কে আল্লাহ উত্তম প্রতিদান দিক, আমিন!",
         gradient: "bg-gradient-to-br from-pink-800 from-10% via-pink-400 via-30% to-orange-500",
      },
      {
         avatar: "/women-black.png",
         title: "Keya Akter",
         text: "আসসালামু আলাইকুম ওয়া রহমাতুল্লাহি ওয়া বারাকাতুহ। আলহামদুলিল্লাহ,,, আমিও এই একডেমীর ছাত্রী। এটা শুধু আমার কাছে একটা একাডেমী নয় বরং আমার পরিবার হয়ে গেছে। আলহামদুলিল্লাহ আল্লাহ তায়ালা আমাকে এবং এই একাডেমির সকল বোনকে তার দ্বীনের ইলম দান করুন আমিন। আর আমাদের সম্মানিত উস্তাজ এর পরিশ্রম ও ইলমকে আরো উচ্চ মাকাম দান করুন।।। আমিন।",
         gradient: "bg-gradient-to-br from-red-800 from-10% via-red-500 via-30% to-orange-500",
      },
   ];

   return (
      <div className='relative'>
         <div className='absolute top-[70%] right-[10%] transform -translate-x-1/2 -translate-y-1/2'>
            <Image className='' src={wave} alt='saturn' height={1200} width={1200} />
         </div>
         <div
            className="absolute inset-x-0 justify-center w-32 ml-auto rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 h-42 right-60 top-64 lg:w-[600px] lg:h-[400px] blur-3xl">
         </div>
         <div
            className="absolute inset-x-0 justify-center w-32 ml-auto rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 h-42 right-[800px] top-64 lg:w-[400px] lg:h-[300px] blur-3xl">
         </div>
      </div>

   );
};

export default StudentComments;
