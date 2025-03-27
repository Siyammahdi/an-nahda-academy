"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Form validation schema
const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { 
    message: "Password must be at least 6 characters" 
  }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 
    { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }
  ),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  handleLoginOpen: () => void
}

export default function RegistrationModal({ isOpen, onClose, handleLoginOpen }: RegistrationModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register: registerUser, isLoading } = useAuth()
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null)

  // Check for returnUrl when modal opens
  useEffect(() => {
    if (isOpen) {
      const returnUrl = sessionStorage.getItem("returnUrl");
      if (returnUrl && returnUrl.includes('checkout')) {
        setRedirectMessage("You'll be redirected to checkout after registration");
      } else {
        setRedirectMessage(null);
      }
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      // Combine first and last name
      const name = `${data.firstName} ${data.lastName}`
      
      // Use register function from auth context
      await registerUser({
        name,
        email: data.email,
        password: data.password,
      })
      
      // Reset form after successful registration
      reset()
      onClose()
      
      // Show success message
      toast.success("Registration successful")
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed"
      toast.error(errorMessage)
    }
  }

  const handleSocialSignup = async (provider: string) => {
    try {
      toast.info(`${provider} signup is not implemented yet`)
      // Here you would implement your social sign up logic
      // Example: await signUpWithProvider(provider)
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : `${provider} signup failed`
      toast.error(errorMessage)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      reset()
      onClose()
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">Create an Account</DialogTitle>
          <DialogDescription className="text-center">
            Enter your information to create your account
            {redirectMessage && (
              <div className="mt-2 text-sm font-medium text-purple-600 bg-purple-50 dark:bg-purple-950/30 p-2 rounded-md">
                {redirectMessage}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Saad"
                {...register("firstName")}
                className={errors.firstName ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Afnan"
                {...register("lastName")}
                className={errors.lastName ? "border-red-500" : ""}
                disabled={isLoading}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-[50%] transform -translate-y-[50%] text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 mt-2"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        
        <div className="relative mt-2">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="flex gap-2 mt-2">
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialSignup("Google")}
            disabled={isLoading}
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialSignup("GitHub")}
            disabled={isLoading}
          >
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-0 mt-4">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <button 
              type="button"
              onClick={() => {
                reset()
                onClose()
                handleLoginOpen()
              }}
              className="text-purple-600 hover:underline font-medium"
              disabled={isLoading}
            >
              Sign in
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
