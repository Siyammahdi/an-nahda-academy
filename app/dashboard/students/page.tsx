"use client"
import React from 'react'
import { Divider } from "@nextui-org/react";
import StudentCards from './_components/Cards';


function StudentDashboard() {
   return (
      <div >
        <StudentCards />
        <Divider />

      </div>
   )
}

export default StudentDashboard