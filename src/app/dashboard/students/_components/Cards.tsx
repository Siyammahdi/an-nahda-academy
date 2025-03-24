"use client"
import React from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaAward, FaBookOpenReader, FaGraduationCap } from 'react-icons/fa6';

function StudentCards() {
   return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10'>
         <Card className="w-[300px] bg-transparent">
            <CardHeader className="flex gap-5 pb-2">
               <FaBookOpenReader className='text-3xl'/>
               <p className="text-md">Enrolled Courses</p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
               <p>0 Courses.</p>
            </CardContent>
         </Card>
         
         <Card className="max-w-[300px] bg-transparent">
            <CardHeader className="flex gap-5 pb-2">
               <FaGraduationCap className='text-3xl'/>
               <p className="text-md">Active Courses</p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
               <p>0 Courses.</p>
            </CardContent>
         </Card>
         
         <Card className="max-w-[300px] bg-transparent">
            <CardHeader className="flex gap-5 pb-2">
               <FaAward className='text-3xl'/>
               <p className="text-md">Complete Courses</p>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
               <p>0 Courses.</p>
            </CardContent>
         </Card>
      </div>
   )
}

export default StudentCards