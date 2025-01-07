"use client";

import { Input, Button } from "@nextui-org/react";
import { FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const Registration: React.FC = () => {
   // const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
   // const [showPassword,setShowPassword]=useState(false)
   // const onSubmit: SubmitHandler<Inputs> = (data) => {
   //    console.log(data); // Handle the submitted data
   // };

   return (
      <div className=' flex  flex-col items-center justify-center mb-20'>
            <div className='lg:w-[80%] w-[95%] mx-auto shadow-lg border rounded-[40px] border-black/10 lg:h-[550px] flex lg:flex-row flex-col items-center justify-end'>
               
               <div className='flexCenter p-10 '>
               <h1 className="text-3xl text-[#002E62] font-bold py-4 bg-purple-500/20 w-full rounded-full text-end px-10">Student Registration</h1>
                  <div className="w-full rounded-full">
                     <Input

                        endContent={
                           <FaUserAlt className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mb-2" />
                        }
                        label="Username"
                        placeholder="Enter your username"
                        radius="full"
                        className="mb-5 "
                     />
                     <Input

                        endContent={
                           <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mb-2" />
                        }
                        label="Email"
                        placeholder="Enter your email"
                        radius="full"
                        className="mb-5"
                     />
                     <Input
                        endContent={
                           <FaLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mb-2" />
                        }
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        radius="full"
                        className="mb-5"
                     />
                  </div>
                  
                  <div className="w-full">

                     <Button className="w-full shadow-2xl" radius="full" color="danger" variant="flat">
                        Registration
                     </Button>
                  </div>
                  {/* <span>Already Registered? Go for <Link className="text-red-600" href="/login">Login</Link></span> */}
               </div>
            </div>
      </div>
   );
};

export default Registration;
