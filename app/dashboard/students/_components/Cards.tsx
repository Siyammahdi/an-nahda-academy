"use client"
import React from 'react'
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { FaAward, FaBookOpenReader, FaGraduationCap } from 'react-icons/fa6';

function StudentCards() {
   return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10'>
         <Card className="w-[300px] bg-transparent">
            <CardHeader className="flex gap-5">
               <FaBookOpenReader  className='text-3xl'/>
               <p className="text-md">Enrolled Courses</p>
            </CardHeader>
            <Divider />
            <CardBody>
               <p>0 Courses.</p>
            </CardBody>

         </Card>
         <Card className="max-w-[300px] bg-transparent">
            <CardHeader className="flex gap-5">
               <FaGraduationCap className='text-3xl'/>
               <p className="text-md">Active Courses</p>
            </CardHeader>
            <Divider />
            <CardBody>
               <p>0 Courses.</p>
            </CardBody>

         </Card>
         <Card className="max-w-[300px] bg-transparent">
            <CardHeader className="flex gap-5">
               <FaAward className='text-3xl'/>
               <p className="text-md">Complete Courses</p>
            </CardHeader>
            <Divider />
            <CardBody>
               <p>0 Courses.</p>
            </CardBody>

         </Card>

      </div>
   )
}

export default StudentCards