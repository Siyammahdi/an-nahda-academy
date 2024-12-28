"use client";

import { Image } from "@nextui-org/image";
import { Input, Link, Button } from "@nextui-org/react";
import {  FaRegEyeSlash } from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaRegEye, FaUserAlt } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";

type Inputs = {
   username: string;
   email: string;
   phone: string;
   password: string;
};

const Registration: React.FC = () => {
   const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
   const [showPassword,setShowPassword]=useState(false)
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log(data); // Handle the submitted data
   };

   return (
      <div className="flex flex-col items-center justify-center mb-20">
         <Fade className="w-full">
            <div className="lg:w-[80%] w-[95%] mx-auto shadow-lg border rounded-xl border-black lg:h-[550px] glass flex lg:flex-row flex-col items-center justify-center">
               <div className="flex-1 flex flex-col items-center justify-center">
                  <Image
                     alt="Woman listing to music"
                     className="object-cover"
                     height={300}
                     src="/logoDark.svg"
                     width={400}
                  />
                  <h1 className="text-[#002E62] font-bold text-lg">
                     An-Nahda Islamic Academy NIA
                  </h1>
               </div>
               <div className="flex-1 flexCenter p-10">
                  <h1 className="text-3xl text-[#002E62] font-bold">Student Registration</h1>
                  <form
                     className="w-full max-w-xs"
                     onSubmit={handleSubmit(onSubmit)}
                  >
                     <Input
                        {...register("username", { required: "Username is required" })}
                        endContent={
                           <FaUserAlt className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Username"
                        placeholder="Enter your username"
                        variant="bordered"
                        className="mb-5 shadow-2xl"
                     />
                     {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                     
                     <Input
                        {...register("email", { required: "Email is required" })}
                        endContent={
                           <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                        className="mb-5 shadow-2xl"
                     />
                     {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                     
                     <Input
                         {...register("phone", {
                           required: "Phone number is required",
                           pattern: {
                              value: /^[+]?[0-9]{7,15}$/,
                              message: "Invalid phone number",
                           },
                        })}
                        endContent={
                           <MdPhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        variant="bordered"
                        className="mb-5 shadow-2xl"
                     />
                     {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                     
                     <Input
                        {...register("password", { required: "Password is required" })}
                        
                        endContent={
                           <span className="cursor-pointer" onClick={()=>setShowPassword(!showPassword)}>
                              { !showPassword ? <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />:<FaRegEye className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                           </span>
                        }
                        // endContent={
                        //    
                        // }
                        label="Password"
                        placeholder="Enter your password"
                        type={showPassword ? 'text' :'password'}
                        variant="bordered"
                        className="mb-5 shadow-2xl"
                     />
                     {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                     <div className="w-full">
                        <Button type="submit" className="w-full shadow-2xl" color="danger" variant="flat">
                           Registration
                        </Button>
                     </div>
                  </form>
                  <span>
                     Already Registered? Go for{" "}
                     <Link className="text-red-600" href="/login">
                        Login
                     </Link>
                  </span>
               </div>
            </div>
         </Fade>
      </div>
   );
};

export default Registration;
