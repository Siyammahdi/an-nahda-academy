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
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null)

  // Check for returnUrl when modal opens
  useEffect(() => {
    if (isOpen) {
      const returnUrl = sessionStorage.getItem("returnUrl");
      if (returnUrl && returnUrl.includes('checkout')) {
        setRedirectMessage("You'll be redirected to checkout after login");
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
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const adminCredentials = { email: "admin@example.com", password: "Admin123" };
  const userCredentials = { email: "user@example.com", password: "User123" };

  // Autofill handlers
  const autofillAdmin = () => {
    reset(adminCredentials);
  };
  const autofillUser = () => {
    reset(userCredentials);
  };

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
            {redirectMessage && (
              <div className="mt-2 text-sm font-medium text-purple-600 bg-purple-50 dark:bg-purple-950/30 p-2 rounded-md">
                {redirectMessage}
              </div>
            )}
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
              <p
                onClick={() => {}} // Will add forgot password functionality
                className="text-xs text-purple-600 hover:text-purple-700 cursor-pointer"
              >
                Forgot password?
              </p>
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
          
          {/* Autofill buttons for testing credentials */}
          <div className="flex gap-2 mb-2">
            <Button type="button" variant="outline" className="w-1/2" onClick={autofillAdmin}>
              Admin Credentials
            </Button>
            <Button type="button" variant="outline" className="w-1/2" onClick={autofillUser}>
              User Credentials
            </Button>
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
