"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow } from 'swiper/modules';
import Image from "next/image";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Helper function to extract YouTube video ID from URL
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Video data with titles and URLs
const sliders = [
    { 
      title: 'Becoming an Avid Learner of the Quran',
      url: "https://www.youtube.com/embed/SuETPDX52Cc",
      description: "Learn how to cultivate a deep connection with the Quran through consistent study"
    },
    { 
        title: 'Is there anyone ready for Jannah!',
        url: "https://www.youtube.com/embed/PxOf2pEu_jM",
        description: "Learn effective parenting techniques based on Islamic teachings"
    },
    { 
        title: 'Principles of Islamic Character',
        url: "https://www.youtube.com/embed/-_gmfXcgLg0",
        description: "Explore the foundations of good character from an Islamic perspective"
    },
    { 
        title: 'Raising Righteous Children',
        url: "https://www.youtube.com/embed/Mfa_kkW46WI",
        description: "Learn effective parenting techniques based on Islamic teachings"
    },
    { 
      title: 'The Importance of Islamic Education',
      url: "https://www.youtube.com/embed/Ouz2L_Timu8",
      description: "Discover why Islamic education is essential for Muslims in the modern world" 
    },
    { 
      title: 'Understanding the Sunnah',
      url: "https://www.youtube.com/embed/HVAnIPej18M",
      description: "A comprehensive guide to following the Prophet's (pbuh) example"
    },
    { 
      title: 'The Journey of Faith',
      url: "https://www.youtube.com/embed/SgnmSO9d7y0",
      description: "An inspiring talk about strengthening one's connection with Allah"
    },
];

export default function VideoSlider() {
    const [openModal, setOpenModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<{ title: string, url: string } | null>(null);

    // Handle clicking on a thumbnail
    const handleThumbnailClick = (video: { title: string, url: string }) => {
        setCurrentVideo(video);
        setOpenModal(true);
    };

    // Get proper embed URL for playing in the modal
    const getEmbedUrl = (url: string) => {
        const videoId = getYouTubeId(url);
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    };

    // Get thumbnail URL for the video
    const getThumbnailUrl = (url: string) => {
        const videoId = getYouTubeId(url);
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    };

    return (
        <div className="py-16 relative">
            {/* Background gradients */}
            <div className="overflow-hidden absolute inset-0 -z-10">
                <div
                    className="absolute left-0 top-0 w-32 h-32 rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 lg:w-[600px] lg:h-[400px] blur-3xl">
                </div>
                <div
                    className="absolute hidden md:block right-0 top-64 w-32 h-32 rounded-full rotate-45 opacity-20 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 lg:w-[400px] lg:h-[300px] blur-3xl">
                </div>
            </div>

            {/* Section heading */}
            <div className="max-w-7xl mx-auto mb-10">
                <h2 className="lg:text-5xl text-3xl font-semibold text-gradient">জীবনমূখী ভিডিওসমূহ</h2>
                <p className="text-gray-500 mt-3 max-w-3xl">
                    শিক্ষা, তারবিয়া, ও জীবনযাপনের বিভিন্ন বিষয়ে আমাদের বিশেষ ভিডিও সংগ্রহ দেখুন
                </p>
            </div>

            {/* Slider component */}
            <div className="relative z-30 flex items-center justify-center my-10 w-full">
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
                    modules={[EffectCoverflow]}
                    className="w-full"
                >
                    {sliders.map((slide, index) => (
                        <SwiperSlide key={index} className="relative max-w-sm md:max-w-md lg:max-w-lg">
                            <div 
                                className="w-4/5 md:w-full mx-auto group cursor-pointer rounded-xl overflow-hidden shadow-lg"
                                onClick={() => handleThumbnailClick(slide)}
                            >
                                <div className="relative aspect-video">
                                    <Image
                                        src={getThumbnailUrl(slide.url)}
                                        alt={slide.title}
                                        fill
                                        sizes="(max-width: 640px) 80vw, (max-width: 768px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    
                                    {/* Play button overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white/90 h-16 w-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play className="h-8 w-8 text-violet-600 translate-x-0.5" fill="currentColor" />
                                        </div>
                                    </div>
                                    
                                    {/* Video title overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                        <h3 className="text-white font-medium truncate">{slide.title}</h3>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Video modal */}
            <Dialog open={openModal} onOpenChange={setOpenModal}>
                <DialogContent className="max-w-4xl p-1 sm:p-6 bg-purple-900">
                    <DialogHeader>
                        <DialogTitle className="text-white text-xl">{currentVideo?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-2">
                        <AspectRatio ratio={16 / 9}>
                            {currentVideo && (
                                <iframe
                                    src={getEmbedUrl(currentVideo.url)}
                                    title={currentVideo.title}
                                    className="w-full h-full rounded-md"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            )}
                        </AspectRatio>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
