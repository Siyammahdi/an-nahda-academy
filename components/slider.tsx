"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Slider = () => {
    const [activeIndices, setActiveIndices] = useState<number[]>([3]);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollX, setScrollX] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
        setScrollLeft(sliderRef.current?.scrollLeft || 0);
    };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    const handleScroll = () => {
        if (!sliderRef.current) return;

        const sliderWidth = sliderRef.current.offsetWidth;
        const cardWidth = sliderRef.current.scrollWidth / itemsWithBlanks.length;
        const scrollPos = sliderRef.current.scrollLeft;

        const rightEdge = scrollPos + sliderWidth;
        const active: number[] = [];
        for (let i = itemsWithBlanks.length - 1; i >= 0; i--) {
            const cardStart = i * cardWidth;
            const cardEnd = cardStart + cardWidth;
            if (cardEnd <= rightEdge && cardEnd > scrollPos) {
                active.unshift(i);
                if (active.length === 2) break;
            }
        }

        setActiveIndices(active);
    };
    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (slider) {
                slider.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    const blankItem = { id: "blank", title: "", image: "", price: 0, originalPrice: 0, sold: 0, rating: 0, category: "", isNew: false, discount: 0 };
    const itemsWithBlanks = [blankItem, blankItem, blankItem, ...items, blankItem];

    return (
        <div className="relative w-screen">
            <div className="flex items-center justify-between gap-4">
                <motion.div
                    className="flex overflow-x-scroll gap-6 px-10 cursor-default select-none"
                    role="button"
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    initial={{ x: 0 }}
                    animate={{ x: -scrollX }} 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {itemsWithBlanks.map((item, index) => (
                        <div
                            key={item.id || `blank-${index}`}
                            className={`flex-shrink-0 relative h-[550px] w-[350px] ${item.id === "blank" ? "" : "rounded-lg"} transition-transform duration-600 transform ${activeIndices.includes(index) ? "scale-100 opacity-100" : "scale-90 opacity-70 blur-sm"}`}
                        >
                            {item.id !== "blank" && (
                                <>
                                    <div
                                        className="relative swiper-slide rounded-[33.76px] overflow-hidden cursor-grab"
                                        style={{ height: '550px' }}
                                    >
                                        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent z-10"></div>
                                        <div className="absolute top-0 left-0 w-full h-full">
                                            <Image
                                                src={item.image}
                                                alt={`Slide ${item.id}`}
                                                className="object-cover w-full h-full hover:scale-110 transition-all duration-1000 img-solve"
                                                width={1000}
                                                height={200}
                                            />
                                        </div>
                                        <div className="absolute bottom-5 left-5 text-violet-950 font-semibold text-2xl z-20">{item.category}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const items = [
    {
        id: 1,
        category: "Bread and Juice",
        title: "All Natural Style Chicken Meatballs",
        price: 52.85,
        originalPrice: 55.80,
        sold: "142/456",
        image: "/course_poster/learning-arabic.png",
        rating: 3,
        discount: 6,
        isNew: false,
    },
    {
        id: 2,
        category: "Baking material",
        title: "Angie’s Sweet & Salty Kettle Corn",
        price: 48.85,
        originalPrice: 52.80,
        sold: "122/233",
        image: "/course_poster/fiqhun-nisa.svg",
        rating: 1,
        discount: 8,
        isNew: false,
    },
    {
        id: 3,
        category: "Baking material",
        title: "Foster Farms Takeout Crispy Classic",
        price: 17.85,
        originalPrice: 19.80,
        sold: "327/500",
        image: "/course_poster/husnul.png",
        rating: 0,
        discount: 10,
        isNew: false,
    },
    {
        id: 4,
        category: "Fresh Fruit",
        title: "Blue Almonds Lightly Salted Vegetables",
        price: 23.85,
        originalPrice: 25.80,
        sold: "141/160",
        image: "/course_poster/alima.png",
        rating: 1,
        discount: 8,
        isNew: true,
    },
    {
        id: 5,
        category: "Fresh Fruit",
        title: "Blue Almonds Lightly Salted Vegetables",
        price: 23.85,
        originalPrice: 25.80,
        sold: "141/160",
        image: "/course_poster/parenting.png",
        rating: 1,
        discount: 8,
        isNew: true,
    },
];

export default Slider;
