
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
            <h2 className={title()}>Our Arrengements</h2>
            <div>
                <div className="flex justify-center items-center my-20">
                    <div className="grid grid-cols-3 gap-4 p-10 bg-white bg-opacity-5 rounded-[65px] shadow-lg">
                        {buttonData.map((button, index) => (
                            <Button
                                key={index}
                                variant='bordered'
                                className="flex flex-col justify-center items-center rounded-[40px]  h-44 w-44 hover:scale-105 transition-transform text-center"
                            >
                                <span className="text-3xl mb-2">{button.icon}</span>
                                <span className="text-sm font-medium">{button.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Arrengements;