"use client";

import React, { useRef } from "react";
import "./slider.css";

const Slider: React.FC = () => {
  const slideRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll(".item");
      slideRef.current.appendChild(items[0]);
      resetAnimations(items);
    }
  };

  const handlePrev = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll(".item");
      slideRef.current.prepend(items[items.length - 1]);
      resetAnimations(items);
    }
  };

  const resetAnimations = (items: NodeListOf<Element>) => {
    items.forEach((item) => {
      const content = item.querySelector(".content") as HTMLDivElement;
      if (content) {
        content.style.animation = "none"; // Reset animation
        requestAnimationFrame(() => {
          content.style.animation = ""; // Reapply animation
        });
      }
    });
  };

  return (
    <div className="slider-container">
      <div className="slider" ref={slideRef}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`item `}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="content">
              <div className="name">{slide.name}</div>
              <div className="description">{slide.description}</div>
              <button>See More</button>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-button">
        <button className="prev" onClick={handlePrev}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="next" onClick={handleNext}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>

  );
};

export default Slider;



const slides = [
  {
    name: "Switzerland",
    description:
      "Renowned for its breathtaking Alpine scenery and precision in craftsmanship",
    image: "https://i.postimg.cc/g0W4qN2y/Switzerland.jpg",
  },
  {
    name: "Finland",
    description:
      "Known for its saunas, lakes, and a deep connection to nature",
    image: "https://i.postimg.cc/DZfgR0s8/Finland.jpg",
  },
  {
    name: "Iceland",
    description:
      "Famous for its stunning geothermal landscapes, waterfalls, and glaciers",
    image: "https://i.postimg.cc/kX2jn2HS/Iceland.jpg",
  },
  {
    name: "Australia",
    description:
      "Distinguished by its diverse ecosystems, ranging from beaches to bushland",
    image: "https://i.postimg.cc/05WWRYVx/Australia.jpg",
  },
  {
    name: "Netherlands",
    description:
      "Characterized by its iconic canals, tulip fields, and windmills",
    image: "https://i.postimg.cc/dtg5DqMx/Netherland.jpg",
  },
  {
    name: "Ireland",
    description:
      "Known for its lush green landscapes and rich cultural heritage",
    image: "https://i.postimg.cc/sDGJktB9/Ireland.jpg",
  },
]