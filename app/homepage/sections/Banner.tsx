"use client"

import { Button } from '@nextui-org/button';
import Image from 'next/image';
import React from 'react';
import saturn from "@/public/elements/saturn.png"
import book from "@/public/elements/book.png"
import Link from 'next/link';
import { motion } from "framer-motion";

const Banner = () => {
    return (
        <div className=' relative h-[70vh] w-fit'>

            <div className=''>
                <div
                    className="absolute inset-x-0 justify-center rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 blur-2xl lg:left-96 top-16 lg:top-64 w-60 h-52 lg:w-[600px] lg:h-[400px]">
                </div>
                <div
                    className="absolute inset-x-0 justify-centerrounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 blur-2xl lg:right-0 top-64 w-52 h-44 lg:w-[400px] lg:h-[300px]">
                </div>

                <div className="absolute z-20 w-16 lg:w-28 top-3/4 left-[150px] lg:left-[400px] transform translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        className=""
                        animate={{
                            y: [0, 20, 0], // Moves up and down
                            x: [0, -10, 10, 0], // Slightly moves left and right
                        }}
                        transition={{
                            duration: 6, // Total duration of animation
                            repeat: Infinity, // Infinite loop
                            repeatType: "loop",
                        }}
                    >
                        <Image src={saturn} alt="saturn" height={120} width={120} />
                    </motion.div>
                </div>
                <div className="absolute z-20 w-16 lg:w-36 top-[20%] left-10 lg:-left-10 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0], // Rotates slightly left and right
                            y: [0, -15, 15, 0], // Moves up and down
                        }}
                        transition={{
                            duration: 8, // Longer duration for a slower effect
                            repeat: Infinity, // Infinite loop
                            repeatType: "loop",
                        }}
                    >
                        <Image src={book} alt="book" height={150} width={150} />
                    </motion.div>
                </div>

            </div>


            <div className="absolute w-[300px] lg:w-[600px] top-60 text-left">
                <div className='text-blue-950 dark:text-white'>
                    <h3 className='mb-4 text-violet-400 text-medium'>শুরু হোক জ্ঞানযাত্রা এখন থেকেই</h3>
                    <h1 className='text-2xl md:text-4xl lg:text-5xl font-semibold leading-relaxed' ><span>ইলমের আলোয় জাগরূক</span> <span>জীবনের প্রত্যয়...</span></h1>
                </div>
                <div className='space-y-4 mt-5'>
                    <Link href="/courses">
                        <Button className='rounded-full bg-violet-500 text-white border-none' variant="bordered">Explore Courses</Button>
                    </Link>
                </div>
            </div>


        </div>
    );
};

export default Banner;
