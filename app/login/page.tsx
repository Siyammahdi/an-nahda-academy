"use client"
import { Image } from "@nextui-org/image";
import { Checkbox, Input, Link, Button } from "@nextui-org/react";
import { FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
const Login: React.FC = () => {
   return (
      <div className=' flex  flex-col items-center justify-center '>

         <Fade className="w-full  ">
            <div className='w-[80%] mx-auto shadow-lg border rounded-xl border-black lg:h-[550px] glass flex flex-col lg:flex-row-reverse items-center justify-center'>
               <div className='flex-1 flex flex-col items-center justify-center'>
                  <Image
                     alt="Woman listing to music"
                     className="object-cover"
                     height={400}
                     src="/logoDark.svg"
                     width={400}
                  />
                  <h1 className="text-[#002E62] font-bold">An-Nahda Islamic Academy NIA </h1>
               </div>
               <div className='flex-1 flexCenter p-10'>
                  <h1 className="text-3xl text-[#002E62] font-bold">Student Login</h1>
                  <div className="w-full">
                     
                     <Input

                        endContent={
                           <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                        className="mb-5 shadow-2xl"
                        
                     />
                     <Input
                        endContent={
                           <FaLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        variant="bordered"
                        className="mb-5 shadow-2xl"
                     />
                  </div>
                  <div className="w-full flex flex-row items-center justify-between ">
                     <Checkbox
                        classNames={{
                           label: "text-small ",
                        }}
                     >
                        Remember me
                     </Checkbox>
                     <Link color="primary" href="#" size="sm">
                        Forgot password?
                     </Link>


                  </div>
                  <div className="w-full">

                     <Button className="w-full shadow-2xl" color="danger" variant="flat">
                        Login
                     </Button>
                  </div>
                  <span>New to this Academy? Go for <Link className="text-red-600" href="/registration">Registration</Link></span>
               </div>
            </div>
         </Fade>
      </div>
   );
};

export default Login;