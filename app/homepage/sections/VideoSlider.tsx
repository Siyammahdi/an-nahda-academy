"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

const sliders = [
    { title: 'Video 1', url: "https://www.youtube.com/embed/HVAnIPej18M" },
    { title: 'Video 2', url: "https://www.youtube.com/embed/SgnmSO9d7y0" },
    { title: 'Video 3', url: "https://www.youtube.com/embed/cr2b3PnPYJs" },
    { title: 'Video 4', url: "https://www.youtube.com/embed/-_gmfXcgLg0" },
    { title: 'Video 5', url: "https://www.youtube.com/embed/Mfa_kkW46WI" },
    { title: 'Video 6', url: "https://www.youtube.com/embed/SuETPDX52Cc" },
];

export default function BeautifulSlider() {
    const openVideo = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <div>
            <div>
                <div
                    className="absolute inset-x-0 justify-center w-32 ml-auto rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 h-42 left-0 lg:w-[600px] lg:h-[400px] blur-3xl">
                </div>
                <div
                    className="absolute inset-x-0 justify-center w-32 ml-auto rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 h-42 right-[0px] top-64 lg:w-[400px] lg:h-[300px] blur-3xl">
                </div>
            </div>
            <h2 className="lg:text-5xl text-3xl text-blue-950 dark:text-white font-semibold max-w-7xl mx-auto">জীবনমূখী ভিডিওসমূহ</h2>
            <div className="relative z-30 flex items-center justify-center my-20 w-screen overflow-hidden">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 10,
                        stretch: 120,
                        depth: 200,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination]}
                    className="w-screen"
                >
                    {sliders.map((slide, index) => (
                        <SwiperSlide key={index} className="relative rounded-xl overflow-hidden max-w-sm md:max-w-md lg:max-w-lg">
                            <div className="w-full h-[250px] md:h-[500px] rounded-xl shadow-lg">
                                <iframe
                                    src={slide.url}
                                    title={slide.title}
                                    className="w-full h-full rounded-xl pointer-events-none"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg z-20">
                                {slide.title}
                            </div> */}
                            <div className="absolute bottom-4 right-4">
                                <button
                                    onClick={() => openVideo(slide.url)}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition">
                                    Open Video
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
