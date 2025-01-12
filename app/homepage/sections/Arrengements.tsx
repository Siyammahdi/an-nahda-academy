"use client"

import { Button } from '@nextui-org/button';
import Image from 'next/image';
import React from 'react';
import { FaAudioDescription, FaBook, FaClock, FaFaceSmile, FaHandshake, FaLanguage, FaPenNib, FaUtensils, FaVideo } from 'react-icons/fa6';
import wave from "@/public/elements/side-wave.png"


const buttonData = [
    { label: "আরবি ভাষা শিক্ষা", icon: <FaLanguage /> },
    { label: "চরিত্র গঠনমূলক শিক্ষা", icon: <FaFaceSmile /> },
    { label: "টাইম ম্যানেজমেন্ট", icon: <FaClock /> },
    { label: "ভিডিও জীবনের অনুপ্রেরণা", icon: <FaVideo /> },
    { label: "অব্যাহত শিক্ষার মূল জ্ঞান", icon: <FaPenNib /> },
    { label: "কুরআন শিক্ষা", icon: <FaBook /> },
    { label: "অডিও কোর্স", icon: <FaAudioDescription /> },
    { label: "সীরাত থেকে শিক্ষা", icon: <FaUtensils /> },
    { label: "প্যারেন্টিং কোর্স", icon: <FaHandshake /> },
];

const Arrengements = () => {
    return (
        <div className='relative'>
            <div className='absolute top-[70%] left-[10%] transform -translate-x-1/2 -translate-y-1/2'>
                <Image className='' src={wave} alt='saturn' height={1200} width={1200} />
            </div>
            <div
                className="absolute inset-x-0 justify-center w-32 ml-auto rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 h-42 right-60 top-64 lg:w-[600px] lg:h-[400px] blur-3xl">
            </div>
            <div
                className="absolute inset-x-0 justify-center w-32 ml-auto rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 h-42 right-[800px] top-64 lg:w-[400px] lg:h-[300px] blur-3xl">
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center text-blue-950 dark:text-white">আমাদের আয়োজনগুলো</h2>
            <div>
                <div className="flex justify-center items-center my-20 ">
                    <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 p-5 lg:p-10 bg-black/5 backdrop-blur-md dark:bg-white/5 rounded-[38px] lg:rounded-[46.80px]">
                        {buttonData.map((button, index) => (
                            <Button
                                key={index}
                                variant='ghost'
                                size='md'
                                color='secondary'
                                className="flex flex-col items-start p-2 lg:p-4 justify-evenly rounded-[20px] md:rounded-[30px] lg:rounded-[40px] text-violet-950 dark:text-violet-400 border-violet-950/60 hover:border-white dark:border-violet-400 border-3 hover:border-5 h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 hover:scale-105 transition-transform text-center"
                            >
                                <span className="text-xl md:text-2xl lg:text-3xl mb-2">{button.icon}</span>
                                <p className="text-[8px] md:text-[10px] lg:text-xs text-start font-medium text-wrap leading-tight md:leading-loose">{button.label}</p>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Arrengements;