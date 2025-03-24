"use client"

import { useState } from "react"
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
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  handleModalOpen: () => void
}

export default function LoginModal({ isOpen, onClose, handleModalOpen }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // Use the login function from AuthContext
      await login({
        email: data.email,
        password: data.password
      })
      
      // Reset form after successful login
      reset()
      onClose()
      
      // Show success message
      toast.success("Login successful")
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      toast.error(errorMessage)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      toast.info(`${provider} login is not implemented yet`)
      // Here you would implement your social authentication logic
      // Example: await signInWithProvider(provider)
    } catch (error: Error | unknown) {
      const errorMessage = error instanceof Error ? error.message : `${provider} login failed`
      toast.error(errorMessage)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      reset()
      onClose()
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold">Sign In</DialogTitle>
          <DialogDescription className="text-center">
            Enter your credentials to access your account
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => {}} // Will add forgot password functionality
                className="text-xs text-purple-600 hover:text-purple-700"
              >
                Forgot password?
              </button>
            </div>
            
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
          
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
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
            onClick={() => handleSocialLogin("Google")}
            disabled={isLoading}
          >
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => handleSocialLogin("GitHub")}
            disabled={isLoading}
          >
            <FaGithub className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center sm:space-x-0 mt-4">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <button 
              type="button"
              onClick={() => {
                reset()
                onClose()
                handleModalOpen()
              }}
              className="text-purple-600 hover:underline font-medium"
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
