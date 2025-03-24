"use client"
import React from 'react'
import { Separator } from "@/components/ui/separator";
import StudentCards from './_components/Cards';


function StudentDashboard() {
   return (
      <div >
        <StudentCards />
        <Separator />

      </div>
   )
}

export default StudentDashboard