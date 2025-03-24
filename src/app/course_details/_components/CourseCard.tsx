"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaRegClock, FaRegHeart } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { TbTimeDuration10, TbWorld } from "react-icons/tb";
import PaymentDetailsModal from "./PaymentDetailsModal";

interface Schedule {
  startingTime?: string;
  courseDuration?: string;
  ageRequirement?: string;
  courseLanguage?: string;
}

interface Fees {
  courseFee?: string;
}

interface CourseData {
  schedule: Schedule[];
  fees: Fees;
}

interface CourseCardProps {
  data: CourseData;
}

const CourseCard: React.FC<CourseCardProps> = ({ data }) => {
  const [isEnrolButtonClicked, setIsEnrolButtonClicked] = useState(false);

  const handleEnrolButtonOpen = () => setIsEnrolButtonClicked(true);
  const handleEnrolButtonClose = () => setIsEnrolButtonClicked(false);

  const startingTime = data.schedule?.[6]?.startingTime || "Not specified";
  const courseDuration = data.schedule?.[5]?.courseDuration || "Not specified";
  const ageRequirement = data.schedule?.[4]?.ageRequirement || "Not specified";
  const courseLanguage = data.schedule?.[3]?.courseLanguage || "Not specified";
  const courseFee = data.fees?.courseFee || "Course Fee Not Specified";

  return (
    <div>
      <div className="p-5 rounded-[48px] border border-zinc-100 shadow-lg">
        <div className="flex flex-col items-start gap-4">
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <Button size="sm" className="rounded-full bg-purple-200 text-purple-600 text-xs">
                About Course
              </Button>
              <Button size="sm" className="rounded-full bg-green-200 text-green-600 text-xs">
                Message Us
              </Button>
            </div>
            <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center border">
              <FaRegHeart className="text-red-500" />
            </div>
          </div>
          <b className="text-xl">Course Details</b>

          <div className="flex flex-col items-start gap-3">
            <div className="flex flex-nowrap items-center gap-2">
              <SlCalender />
              <span>{startingTime}</span>
            </div>
            <div className="flex flex-nowrap items-center gap-2">
              <FaRegClock />
              <span>{courseDuration}</span>
            </div>
            <div className="flex flex-nowrap items-center gap-2">
              <TbTimeDuration10 />
              <span>{ageRequirement}</span>
            </div>
            <div className="flex flex-nowrap items-center gap-2">
              <TbWorld />
              <span>{courseLanguage}</span>
            </div>
          </div>
          <span className="text-purple-600">+20 Classes</span>
          <div className="w-full">
            <Button
              onClick={handleEnrolButtonOpen}
              className="w-full rounded-full bg-purple-600 text-white"
            >
              {courseFee}
            </Button>
          </div>
        </div>
      </div>
      <div className="my-10 bg-white rounded-full flex justify-between items-center p-5 border border-zinc-100 shadow-lg">
        <div>Free 1st class</div>
        <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center border">
          <FaRegHeart className="text-red-500" />
        </div>
      </div>
      {isEnrolButtonClicked && (
        <PaymentDetailsModal isOpen={isEnrolButtonClicked} onClose={handleEnrolButtonClose} />
      )}
    </div>
  );
};

export default CourseCard;
