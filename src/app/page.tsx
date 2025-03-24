"use client"

import Arrengements from "./homepage/sections/Arrengements";
import Banner from "./homepage/sections/Banner";
import PopularCourses from "./homepage/sections/PopularCourses";
import { Testimonials } from "./homepage/sections/Testimonials";
import Slider from "@/components/slider";
import VideoSlider from "./homepage/sections/VideoSlider";

export default function Home() {
  return (
    <div>
      <div className="absolute mt-32">
        <Slider />
      </div>
      <div className="lg:mx-0">
        <div>
          <div className="space-y-48 max-w-7xl mx-auto px-5 lg:px-0 mb-20 ">
            <Banner />
            <Arrengements />
          </div>
          <div>
            <PopularCourses />
          </div>
          <div className="space-y-48 max-w-7xl mx-auto mb-20 ">
            <Testimonials />
          </div>
        </div>
        <VideoSlider />
      </div>
    </div>
  );
}
