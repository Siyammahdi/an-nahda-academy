"use client"

import Arrengements from "./homepage/sections/Arrengements";
import Banner from "./homepage/sections/Banner";
import PopularCourses from "./homepage/sections/PopularCourses";
import { Testimonials } from "./homepage/sections/Testimonials";
import Slider from "@/components/slider";
import VideoSlider from "./homepage/sections/VideoSlider";
import { motion } from "framer-motion";

export default function Home() {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div>
      <motion.div 
        className="absolute mt-80 md:mt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Slider />
      </motion.div>
      <div className="lg:mx-0">
        <div>
          <div className="space-y-48 max-w-7xl mx-auto lg:px-0 mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >
              <Banner />
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >
              <Arrengements />
            </motion.div>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <PopularCourses />
          </motion.div>
          
          <div className="space-y-48 max-w-7xl mx-auto mb-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
            >
              <Testimonials />
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <VideoSlider />
        </motion.div>
      </div>
    </div>
  );
}
