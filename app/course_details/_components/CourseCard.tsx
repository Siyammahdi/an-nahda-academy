"use client"
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaRegClock, FaRegHeart } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { TbTimeDuration10, TbWorld } from "react-icons/tb";
import PaymentDetailsModal from "./PaymentDetailsModal";

interface CourseCardProps {
  data:array
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  data 
}) => {
   const [isEnrolButtonClicked, setIsEnrolButtonClicked] = useState(false)
    const handleEnrolButtonOpen = () => {
      
      return setIsEnrolButtonClicked(true)
    }
    const handleEnrolButtonClose = () => {
      return setIsEnrolButtonClicked(false)
    }

    console.log(data)
    const startingTime=data[6]?.startingTime;
    const courseDuration=data[5]?.courseDuration;
    const ageRequirement=data[4]?.ageRequirement;
    const courseLanguage=data[3]?.courseLanguage;
  return (
    <div>
      <div className="p-5 rounded-[48px] border border-zinc-100 shadow-lg">
        <div className=" flex flex-col items-start gap-4">
          <div className='w-full flex flex-row  justify-between'>
            <div className='flex flex-row items-center gap-2'>
              <Button size="sm" radius="full" className="bg-purple-200 text-purple-600 text-xs">
                About Course
              </Button>
              <Button size="sm" radius="full" className="bg-green-200 text-green-600 text-xs">
                Message Us
              </Button>
            </div>
            <div className='w-[30px] h-[30px] rounded-full flex flex-col items-center justify-center border'>
              <FaRegHeart className='text-red-500' />
            </div>
          </div>
          <b className='text-xl'></b>

          <div className="flex flex-col items-start gap-3">
            <div className='flex flex-nowrap items-center gap-2'>
              <SlCalender /><span className='break-words'>{startingTime}</span>
            </div>
            <div className='flex flex-nowrap items-center gap-2'>
              <FaRegClock /><span className='break-words'>{courseDuration}</span>
            </div>
            <div className='flex flex-nowrap items-center gap-2'>
              <TbTimeDuration10 /><span className='break-words'>{ageRequirement}</span>
            </div>
            <div className='flex flex-nowrap items-center gap-2'>
              <TbWorld /><span className='break-words'>{courseLanguage}</span>
            </div>

          </div>
          <span className='text-purple-600'>+20 Classes</span>
          <div className='w-full'>
            <Button onClick={handleEnrolButtonOpen} radius="full" className="w-full bg-purple-600 text-white ">
              Course Fee 9000Tk.
            </Button>
          </div>
        </div>

      </div>
      <div className="my-10 bg-white rounded-full flexBetween p-5 border border-zinc-100 shadow-lg">
        <div>
          Free 1st class
        </div>
        <div className='w-[30px] h-[30px] rounded-full flex flex-col items-center justify-center border'>
          <FaRegHeart className='text-red-500' />
        </div>
      </div>
       {isEnrolButtonClicked && <PaymentDetailsModal   isOpen={isEnrolButtonClicked} onClose={handleEnrolButtonClose} />}
    </div>
  );
}


export default CourseCard;