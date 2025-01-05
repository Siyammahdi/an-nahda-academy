"use client"
import { Card, CardFooter, Button } from "@nextui-org/react";
import { FaRegClock, FaRegHeart } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { TbTimeDuration10, TbWorld } from "react-icons/tb";

export default function CourseCard() {
  return (
    <div>
      <Card className="py-4">
        <CardFooter className=" flex flex-col items-start gap-4">
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
              <SlCalender /><span className='break-words'>Classes After Enrollment</span>
            </div>
            <div className='flex flex-nowrap items-center gap-2'>
              <FaRegClock /><span className='break-words'>total 10 hrs (pre-recorded)</span>
            </div>
            <div className='flex flex-nowrap items-center gap-2'>
              <TbTimeDuration10 /><span className='break-words'>2 Hrs-3days/week</span>
            </div>
            <div className='flex flex-nowrap items-center gap-2'>
              <TbWorld /><span className='break-words'>Bangla ,Arabic</span>
            </div>

          </div>
          <span className='text-purple-600'>+20 Classes</span>
          <div className='w-full'>
            <Button radius="full" className="w-full bg-purple-600 text-white ">
              Course Fee 9000Tk.
            </Button>
          </div>
        </CardFooter>

      </Card>
      <div className="my-10 bg-white rounded-full flexBetween p-5">
        <div>
          Free 1st class
        </div>
        <div className='w-[30px] h-[30px] rounded-full flex flex-col items-center justify-center border'>
          <FaRegHeart className='text-red-500' />
        </div>
      </div>
    </div>
  );
}
