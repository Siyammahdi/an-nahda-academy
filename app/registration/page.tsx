"use client";

import { Button, Divider } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

interface Inputs {
  first_name: string;
  last_name: string;
  nationality: string;
  gender: string;
  phone_number: string;
  age: number;
  email: string;
  password: string;
}

const Registration: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data); 
  };

  return (
    <div className="flex flex-col items-center justify-center mb-20">
      <div className="lg:w-[80%] w-[95%] mx-auto shadow-lg border rounded-[40px] border-black/10 h-fit-content">
        <div className="flex flex-col items-start justify-start  gap-3 p-8 w-full">
          <h1 className="text-2xl text-[#002E62] dark:text-white lg:text-left text-center font-bold py-4 ">
            Student Registration
          </h1>
          <Divider className="w-full" />
          <div className="w-full rounded-full">
            <form  className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2 text-sm">
                  <label
                    className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                    htmlFor="first_name"
                  >
                    First Name
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                    id="first_name"
                    placeholder="Enter first name"
                    {...register("first_name", { required: "First name is required" })}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs">{errors.first_name.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2 text-sm">
                  <label
                    className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                    htmlFor="last_name"
                  >
                    Last Name
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                    id="last_name"
                    placeholder="Enter last name"
                    {...register("last_name", { required: "Last name is required" })}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs">{errors.last_name.message}</p>
                  )}
                </div>

                {/* Nationality */}
                <div className="space-y-2 text-sm">
                  <label
                    className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                    htmlFor="nationality"
                  >
                    Nationality
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                    id="nationality"
                    placeholder="Enter Nationality"
                    {...register("nationality", { required: "Nationality is required" })}
                  />
                  {errors.nationality && (
                    <p className="text-red-500 text-xs">{errors.nationality.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-2 text-sm">
                  <label
                    className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                    id="gender"
                    placeholder="Enter gender"
                    {...register("gender", { required: "Gender is required" })}
                  />
                  {errors.gender && (
                    <p className="text-red-500 text-xs">{errors.gender.message}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2 text-sm">
                  <label
                    className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                    htmlFor="phone_number"
                  >
                    Phone Number
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                    id="phone_number"
                    placeholder="Enter phone number"
                    {...register("phone_number", { required: "Phone number is required" })}
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-xs">{errors.phone_number.message}</p>
                  )}
                </div>

                {/* Age */}
                <div className="space-y-2 text-sm">
                  <label
                    className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                    id="age"
                    placeholder="Enter age"
                    type="number"
                    {...register("age", { required: "Age is required" })}
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs">{errors.age.message}</p>
                  )}
                </div>

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
              <div className="flex lg:flex-row flex-col-reverse lg:items-center items-start lg:gap-0  gap-5 lg:justify-between justify-center w-full">
              <Button onClick={handleSubmit(onSubmit)} type="submit" className="text-white md:w-fit w-full bg-purple-400" radius="full">Register</Button>
              <h1 className="text-[#002E62] dark:text-white">Already have an account? <Link className="font-bold text-red-600" href='/login'>Log in</Link></h1>
              </div>

              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
