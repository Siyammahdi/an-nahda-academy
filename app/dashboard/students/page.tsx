"use client"
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { FaAward, FaBookOpenReader, FaGraduationCap } from 'react-icons/fa6';
import StudentCards from './_components/Cards';




// type Props = {}

function StudentDashboard() {
   return (
      <div >
        <StudentCards />
        <Divider />

      </div>
   )
}

export default StudentDashboard