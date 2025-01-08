
"use client"


import {
   Modal, ModalContent, ModalBody,
    Button,
   Divider
} from "@nextui-org/react";

import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from "react";;
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Link from "next/link";
import RegistrationModal from "./registrationModal";


type Inputs = {

   email: string;
   // phone: string;
   password: string;
};

interface LoginModalProps {
   isOpen: boolean;
   onClose: () => void;
}
export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
   //  const { isOpen, onOpen, onOpenChange } = useDisclosure();
 const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  

  const handleModalOpen = () => {
    setIsModalOpen(true)

  }
  console.log(isModalOpen)
  const handleModalClose = () => {
    return setIsModalOpen(false)
  }
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data); 
  };

   return (
      <>

         <Modal className="border-black  " isOpen={isOpen} onClose={onClose} size="5xl" placement="top-center" >
            <ModalContent>

               <>
                  {/* <ModalHeader className="flex flex-col gap-1">Login Form</ModalHeader> */}
                  <ModalBody>

                     {/* <Fade > */}
                     <div className="flex flex-col items-start justify-start  gap-3 p-8 w-full">
                        <h1 className="text-2xl text-[#002E62] dark:text-white lg:text-left text-center font-bold py-4 ">

                           Student Login
                        </h1>
                        <Divider className="w-full" />
                        <div className="w-fit rounded-full">
                           <form className="space-y-6">
                              <div className="grid grid-cols-1  gap-4">




                                 {/* Email */}
                                 <div className="space-y-2 text-sm">
                                    <label
                                       className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                                       htmlFor="email"
                                    >
                                       Email
                                    </label>
                                    <input
                                       className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                                       id="email"
                                       placeholder="Enter your email"
                                       type="email"
                                       {...register("email", { required: "Email is required" })}
                                    />
                                    {errors.email && (
                                       <p className="text-red-500 text-xs">{errors.email.message}</p>
                                    )}
                                 </div>

                                 {/* Password */}
                                 <div className="space-y-2 text-sm relative">
                                    <label
                                       className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                                       htmlFor="password"
                                    >
                                       Password
                                    </label>
                                    <input
                                       className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                                       id="password"
                                       placeholder="Enter password"
                                       type={showPassword ? "text" : "password"}
                                       {...register("password", { required: "Password is required" })}
                                    />
                                    <button

                                       type="button"
                                       className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-500"
                                       onClick={() => setShowPassword(!showPassword)}
                                    >
                                       {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {errors.password && (
                                       <p className="text-red-500 text-xs">{errors.password.message}</p>
                                    )}
                                 </div>

                              </div>
                              <div className="flex  flex-col-reverse  items-start   gap-5  justify-center w-full">
                                 <Button onClick={handleSubmit(onSubmit)} type="submit" className="text-white md:w-fit w-full bg-purple-400" >Register</Button>
                                 <h1 className="text-[#002E62] dark:text-white">New to the Kafela? <Button variant="light" onClick={handleModalOpen} >Register</Button></h1>
                              </div>


                           </form>
                        </div>
                     </div>
                     {/* </Fade> */}

                  </ModalBody>

               </>

            </ModalContent>
         </Modal>
         {isModalOpen && <RegistrationModal isOpen={isModalOpen} onClose={handleModalClose} />}
      </>
   );
}
