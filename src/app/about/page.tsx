"use client"

import { motion } from "framer-motion";
import Image from "next/image";



export default function DocsPage() {

  const saturnPath = "/elements/working-text.svg";

  return (
    <div className="">

      <div className="absolute z-20 w-16 lg:w-28 top-1/4 left-[150px] lg:left-[600px] transform translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{
            y: [0, 20, 0], // Moves up and down
            x: [0, -10, 10, 0], // Slightly moves left and right
          }}
          transition={{
            duration: 6, // Total duration of animation
            repeat: Infinity, // Infinite loop
            repeatType: "loop",
          }}
        >
          <Image src={saturnPath} alt="saturn" height={1020} width={1020} />
        </motion.div>
      </div>

      <Image
        src="/elements/working-desk.svg"
        alt="about"
        width={2500}
        height={2500}
        className=""
      />
    </div>
  );
}
