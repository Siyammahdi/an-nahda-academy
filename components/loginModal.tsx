
"use client"

import { Image } from "@nextui-org/image";
import {
   Modal, ModalContent, ModalBody,
   Checkbox, Input, Link, Button
} from "@nextui-org/react";
import { FaLock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";

export const MailIcon = (props) => {
   return (
      <svg
         aria-hidden="true"
         fill="none"
         focusable="false"
         height="1em"
         role="presentation"
         viewBox="0 0 24 24"
         width="1em"
         {...props}
      >
         <path
            d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
            fill="currentColor"
         />
      </svg>
   );
};

export const LockIcon = (props) => {
   return (
      <svg
         aria-hidden="true"
         fill="none"
         focusable="false"
         height="1em"
         role="presentation"
         viewBox="0 0 24 24"
         width="1em"
         {...props}
      >
         <path
            d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
            fill="currentColor"
         />
         <path
            d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
            fill="currentColor"
         />
      </svg>
   );
};
export const EyeSlashFilledIcon = (props) => {
   return (
      <svg
         aria-hidden="true"
         fill="none"
         focusable="false"
         height="1em"
         role="presentation"
         viewBox="0 0 24 24"
         width="1em"
         {...props}
      >
         <path
            d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
            fill="currentColor"
         />
         <path
            d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
            fill="currentColor"
         />
         <path
            d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
            fill="currentColor"
         />
         <path
            d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
            fill="currentColor"
         />
         <path
            d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
            fill="currentColor"
         />
      </svg>
   );
};

export const EyeFilledIcon = (props) => {
   return (
      <svg
         aria-hidden="true"
         fill="none"
         focusable="false"
         height="1em"
         role="presentation"
         viewBox="0 0 24 24"
         width="1em"
         {...props}
      >
         <path
            d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
            fill="currentColor"
         />
         <path
            d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
            fill="currentColor"
         />
      </svg>
   );
};

type Inputs = {
  
   email: string;
   phone: string;
   password: string;
};

interface LoginModalProps {
   isOpen: boolean;
   onClose: () => void;
}
export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
   // const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
   const [showPassword, setShowPassword] = useState(false)
   const onSubmit: SubmitHandler<Inputs> = (data) => {
      console.log(data); // Handle the submitted data
   };

   const handleLogin = () => {
      setTimeout(onClose, 1000)

   }
   const handleRegistration = () => {
      onClose
      window.location.href = '/registration'

   }
   const [isVisible, setIsVisible] = React.useState(false);

   const toggleVisibility = () => setIsVisible(!isVisible);

   return (
      <>

         <Modal className="border-black  " isOpen={isOpen} onClose={onClose} size="5xl" placement="top-center" >
            <ModalContent>

               <>
                  {/* <ModalHeader className="flex flex-col gap-1">Login Form</ModalHeader> */}
                  <ModalBody>

                     {/* <Fade > */}
                        <div className='  flex flex-col lg:flex-row-reverse items-center justify-center'>
                           <div className='flex-1 flex flex-col items-center justify-center'>
                              <Image
                                 alt="Woman listing to music"
                                 className="object-cover"
                                 height={300}
                                 src="/logoDark.svg"
                                 width={400}
                              />
                              <h1 className="text-[#002E62] font-bold">An-Nahda Islamic Academy NIA </h1>
                           </div>
                           <div className='flex-1 flexCenter p-10'>
                              <h1 className="text-3xl text-[#002E62] font-bold">Student Login</h1>
                              <form
                                 className="w-full max-w-xs"
                                 onSubmit={handleSubmit(onSubmit)}
                              >
                                
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
                                       <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                          {!showPassword ? <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> : <FaRegEye className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                       </span>
                                    }
                                   
                                    label="Password"
                                    placeholder="Enter your password"
                                    type={showPassword ? 'text' : 'password'}
                                    variant="bordered"
                                    className="mb-5 shadow-2xl"
                                 />
                                 {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                 <div className="w-full flex flex-row items-center justify-between my-5">
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

                                    <Button type="submit" className="w-full shadow-2xl" color="danger" variant="flat">
                                       Login
                                    </Button>
                                 </div>
                              </form>


                              <span>New to this Academy? Go for <button className="text-red-600" onClick={handleRegistration} >Registration</button></span>
                           </div>
                        </div>
                     {/* </Fade> */}

                  </ModalBody>
                  {/* <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                           Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                           Sign in
                        </Button>
                     </ModalFooter> */}
               </>

            </ModalContent>
         </Modal>
      </>
   );
}
