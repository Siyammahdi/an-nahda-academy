
import { title } from '@/components/primitives';
import { Button } from '@nextui-org/button';
import React from 'react';
import { FaAudioDescription, FaBook, FaClock, FaFaceSmile, FaHandshake, FaLanguage, FaPenNib, FaUtensils, FaVideo } from 'react-icons/fa6';


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
        <div>
            <h2 className="text-5xl font-semibold text-center">Our Arrengements</h2>
            <div>
                <div className="flex justify-center items-center my-20 ">
                    <div className="grid grid-cols-3 gap-8 p-10 bg-black/5 dark:bg-white/5 rounded-[65px] shadow-lg">
                        {buttonData.map((button, index) => (
                            <Button
                                key={index}
                                variant='ghost'
                                size='md'
                                color='secondary'
                                className="flex flex-col items-start justify-evenly rounded-[40px] text-violet-950 dark:text-violet-400 border-violet-950 dark:border-violet-400 border-3 h-36 w-36 hover:scale-105 transition-transform text-center"
                            >
                                <span className="text-3xl mb-2">{button.icon}</span>
                                <p className="text-xs text-start font-medium text-wrap">{button.label}</p>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Arrengements;