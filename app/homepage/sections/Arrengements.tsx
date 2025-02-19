"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import React, { useState } from "react";
import wave from "@/public/elements/side-wave.png";
import icon1 from "@/public/icons/Icon-01.svg";
import icon2 from "@/public/icons/Icon-02.svg";
import icon3 from "@/public/icons/Icon-03.svg";
import icon4 from "@/public/icons/Icon-04.svg";
import icon5 from "@/public/icons/Icon-05.svg";
import icon6 from "@/public/icons/Icon-06.svg";
import icon7 from "@/public/icons/Icon-07.svg";
import icon8 from "@/public/icons/Icon-08.svg";
import icon9 from "@/public/icons/Icon-09.svg";
import whiteIcon1 from "@/public/icon-white/Icon-01.svg";
import whiteIcon2 from "@/public/icon-white/Icon-02.svg";
import whiteIcon3 from "@/public/icon-white/Icon-03.svg";
import whiteIcon4 from "@/public/icon-white/Icon-04.svg";
import whiteIcon5 from "@/public/icon-white/Icon-05.svg";
import whiteIcon6 from "@/public/icon-white/Icon-06.svg";
import whiteIcon7 from "@/public/icon-white/Icon-07.svg";
import whiteIcon8 from "@/public/icon-white/Icon-08.svg";
import whiteIcon9 from "@/public/icon-white/Icon-09.svg";

const buttonData = [
  { label: "আরবি ভাষা শিক্ষা", icon: icon1, hoverIcon: whiteIcon1 },
  { label: "চরিত্র গঠনমূলক শিক্ষা", icon: icon2, hoverIcon: whiteIcon2 },
  { label: "টাইম ম্যানেজমেন্ট", icon: icon3, hoverIcon: whiteIcon3 },
  { label: "ভিডিও জীবনোন্নয়নমূলক", icon: icon4, hoverIcon: whiteIcon4 },
  { label: "অবশ্য শিক্ষনীয় দ্বীনি জ্ঞান", icon: icon5, hoverIcon: whiteIcon5 },
  { label: "কুরআন শিক্ষা", icon: icon6, hoverIcon: whiteIcon6 },
  { label: "আলিম কোর্স", icon: icon7, hoverIcon: whiteIcon7 },
  { label: "সীরাত থেকে শিক্ষা", icon: icon8, hoverIcon: whiteIcon8 },
  { label: "প্যারেন্টিং কোর্স", icon: icon9, hoverIcon: whiteIcon9 },
];

const staticSvg = `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  `<svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 63C5 48.8013 5.00425 38.3535 6.08052 30.3483C7.14905 22.4007 9.24115 17.1609 13.201 13.201C17.1609 9.24115 22.4007 7.14905 30.3483 6.08052C38.3535 5.00425 48.8013 5 63 5H77C91.1987 5 101.646 5.00425 109.652 6.08052C117.599 7.14905 122.839 9.24115 126.799 13.201C130.759 17.1609 132.851 22.4007 133.919 30.3483C134.996 38.3535 135 48.8013 135 63V77C135 91.1987 134.996 101.646 133.919 109.652C132.851 117.599 130.759 122.839 126.799 126.799C122.839 130.759 117.599 132.851 109.652 133.919C101.646 134.996 91.1987 135 77 135H63C48.8013 135 38.3535 134.996 30.3483 133.919C22.4007 132.851 17.1609 130.759 13.201 126.799C9.24115 122.839 7.14905 117.599 6.08052 109.652C5.00425 101.646 5 91.1987 5 77V63Z"
    stroke="#7c6a9c" stroke-width="4"></path>
  </svg>`
)}")`;

const hoverSvg = `url("data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
  `<svg width="140" height="140" viewBox="0 0 140 140" fill="#8b5cf6" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 63C5 48.8013 5.00425 38.3535 6.08052 30.3483C7.14905 22.4007 9.24115 17.1609 13.201 13.201C17.1609 9.24115 22.4007 7.14905 30.3483 6.08052C38.3535 5.00425 48.8013 5 63 5H77C91.1987 5 101.646 5.00425 109.652 6.08052C117.599 7.14905 122.839 9.24115 126.799 13.201C130.759 17.1609 132.851 22.4007 133.919 30.3483C134.996 38.3535 135 48.8013 135 63V77C135 91.1987 134.996 101.646 133.919 109.652C132.851 117.599 130.759 122.839 126.799 126.799C122.839 130.759 117.599 132.851 109.652 133.919C101.646 134.996 91.1987 135 77 135H63C48.8013 135 38.3535 134.996 30.3483 133.919C22.4007 132.851 17.1609 130.759 13.201 126.799C9.24115 122.839 7.14905 117.599 6.08052 109.652C5.00425 101.646 5 91.1987 5 77V63Z"
    stroke="white" stroke-width="4"></path>
  </svg>`
)}")`;


const Arrengements = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      <div className="absolute top-[70%] left-[10%] transform -translate-x-1/2 -translate-y-1/2">
        <Image src={wave} alt="wave" height={1200} width={1200} />
      </div>
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center text-blue-950 dark:text-white">
        আমাদের আয়োজনগুলো
      </h2>
      <div className="flex justify-center items-center my-20">
        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-8 p-5 lg:p-10 bg-black/5 backdrop-blur-md dark:bg-white/5 rounded-[38px] lg:rounded-[46.80px]">
          {buttonData.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              size="md"
              className="flex flex-col items-start p-2 lg:p-4 justify-evenly rounded-[20px] md:rounded-[30px] hover:text-white lg:rounded-[40px] text-violet-950 dark:text-violet-400 border-none h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 hover:scale-105 transition-transform text-center"
              style={{
                backgroundImage: hoveredIndex === index ? hoverSvg : staticSvg,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="text-xl w-1/3 md:w-full md:text-2xl lg:text-3xl mb-2">
                <Image
                  src={hoveredIndex === index ? button.hoverIcon : button.icon}
                  alt={button.label}
                  height={36}
                  width={36}
                />
              </span>
              <p className="text-[8px] md:text-[10px] lg:text-xs text-start ml-1 md:ml-0 font-medium text-wrap leading-tight md:leading-loose">
                {button.label}
              </p>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arrengements;

