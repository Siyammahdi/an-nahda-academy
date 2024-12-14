"use client"
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
export default function Details() {
   const [selected, setSelected] = React.useState("photos");
   return (
      <div className="h-[500px]">
         <div className="  ">

         <Tabs className="flex flex-col items-start " aria-label="Tabs variants" variant='underlined' selectedKey={selected} onSelectionChange={setSelected}>
            <Tab key="About" title="About" >
               <div className="px-2">

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqudfdgfdgffhfghfgdfnhda. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

               </div>
            </Tab>
            <Tab key="Objectives" title="Objectives" >

               <div className="px-2">

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

               </div>
            </Tab>
            <Tab key="Outcomes" title="Outcomes" >
               <div className="px-2">

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

               </div>
            </Tab>
            <Tab key="Testimonial" title="Testimonial" >
               <div className="px-2">

                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

               </div>
            </Tab>
         </Tabs>

      </div>
      </div >
   );
};

