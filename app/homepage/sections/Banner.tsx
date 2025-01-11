"use client"

// import { subtitle, title } from '@/components/primitives';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import React from 'react';
import saturn from "@/public/elements/saturn.avif"
import book from "@/public/elements/book.png"

const Banner = () => {
    return (
        <div className=' relative h-[70vh] w-fit'>

            <div className=''>
                <div
                    className="absolute inset-x-0 justify-center w-32 ml-auto rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 h-42 left-96 top-64 lg:w-[600px] lg:h-[400px] blur-3xl">
                </div>
                <div
                    className="absolute inset-x-0 justify-center w-32 ml-auto rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 h-42 right-[0px] top-64 lg:w-[400px] lg:h-[300px] blur-3xl">
                </div>
                <div className='absolute z-40 w-28 top-3/4 left-[400px] transform translate-x-1/2 -translate-y-1/2'>
                    <Image className='' src={saturn} alt='saturn' height={120} width={120} />
                </div>
                <div className="absolute z-40 w-36 top-[20%] -left-10 transform -translate-x-1/2 -translate-y-1/2">
                    <Image className="" src={book} alt="book" height={150} width={150} />
                </div>

            </div>


            <div className="absolute w-[600px] top-60 text-left">
                <div className='text-blue-950 dark:text-white'>
                    <h3 className='mb-7 text-violet-400 text-medium'>শুরু হোক জ্ঞানযাত্রা এখন থেকেই</h3>
                    <h1 className='text-2xl md:text-4xl lg:text-5xl font-semibold leading-relaxed' ><span>ইলমের আলোয় জাগরূক</span> <span>জীবনের প্রত্যয়...</span></h1>
                </div>
                <div className='space-y-4 mt-10'>
                    <Button className='rounded-full bg-violet-500 text-white border-none' variant="bordered">Explore Courses</Button>
                </div>
            </div>


        </div>
    );
};

export default Banner;
