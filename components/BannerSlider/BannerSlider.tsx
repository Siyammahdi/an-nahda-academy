"use client"

import React, { useState } from 'react';
import { Virtual, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';
import Image from 'next/image';

export default function BannerSlider() {
  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);

  // Array with slide data including image URL and title
  const slidesData = [
    { id: 1, content: 'Enroll Now!', image: '/course_poster/learning-arabic.svg' },
    { id: 2, content: 'Buy Now!', image: '/course_poster/fiqhun-nisa.svg' },
    { id: 3, content: 'Enroll Now!', image: '/course_poster/parenting.svg' },
    { id: 4, content: 'Buy Now!', image: '/course_poster/alima.svg' },
    { id: 5, content: 'Enroll Now!', image: '/course_poster/husnul.svg' },
  ];

  return (
    <>
      <Swiper
        modules={[Virtual, Navigation]}
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        virtual
      >
        {slidesData.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="relative swiper-slide rounded-[33.76px] overflow-hidden cursor-grab"
            style={{ height: '200px' }}
          >
            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent z-10"></div>

            {/* Image for the slide */}
            <div className="absolute top-0 left-0 w-full h-full">
              <Image
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="object-cover w-full h-full hover:scale-110 transition-all duration-1000 img-solve"
                width={1000}
                height={200}
              />
            </div>

            {/* Title over the image */}
            <div className="absolute bottom-5 left-5 text-violet-950 font-semibold text-2xl z-20">{slide.content}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}






// const slidesData = [
//   { id: 1, content: 'Slide 1', image: '/course_poster/learning-arabic.svg' },
//   { id: 2, content: 'Slide 2', image: '/course_poster/fiqhun-nisa.svg' },
//   { id: 3, content: 'Slide 3', image: '/course_poster/parenting.svg' },
//   { id: 4, content: 'Slide 4', image: '/course_poster/alima.svg' },
//   { id: 5, content: 'Slide 5', image: '/course_poster/husnul.svg' },
// ];
