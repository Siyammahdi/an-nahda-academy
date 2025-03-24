"use client"
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'

function My_cart() {
   return (
      <div className='w-full'>
         <Card className="w-full bg-white">
            <CardHeader className="flex-row items-center justify-between gap-5">
               <div className='flex gap-5'>
                  <div className="relative w-[100px] h-[100px]">
                     <Image
                        alt="course logo"
                        fill
                        className="object-cover rounded-sm"
                        src="/aleema (square v)-08.png"
                     />
                  </div>
                  <div>
                     <p className="text-md">Aleema Course</p>
                     <p className="text-md">Fee: 500 Tk.</p>
                     <p className="text-md">Duration:3years</p>
                     <p className="text-md">Classes:100+</p>
                  </div>
               </div>
               <Link href='/dashboard/students/my_cart/checkout'>
                  <Button className="bg-violet-950 text-white" variant="default">
                     Checkout <FaArrowRightLong className="ml-2" />
                  </Button>
               </Link>
            </CardHeader>
         </Card>
      </div>
   )
}

export default My_cart