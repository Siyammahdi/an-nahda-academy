"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle } from "lucide-react";
import CheckoutForm, { CheckoutFormData } from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

const PublicCheckoutPage = () => {
  const router = useRouter();
  const { cartItems, calculateSubtotal, calculateTotal, discount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);

  // Set mounted to true after component mounts to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard/checkout');
    }
  }, [isAuthenticated, router]);

  // Generate order ID
  useEffect(() => {
    if (mounted) {
      const randomId = Math.floor(10000 + Math.random() * 90000);
      setOrderId(`AN-${randomId}`);
    }
  }, [mounted]);

  // Calculate totals
  const subtotal = calculateSubtotal();
  const total = calculateTotal();
  const taxes = (subtotal - discount) * 0.05; // 5% tax

  // Return to cart
  const returnToCart = () => {
    router.push('/cart');
  };

  // Handle form submission
  const handleSubmit = (data: CheckoutFormData) => {
    // Form validation
    if (!data.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!data.email.trim() || !data.email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (!data.phoneNumber.trim() || data.phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    if (!data.transactionId.trim()) {
      toast.error("Please enter the transaction ID");
      return;
    }
    
    // Store form data for success page
    setFormData(data);
    
    // Process payment
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Clear cart after successful checkout
      setTimeout(() => {
        clearCart();
      }, 500);
    }, 2000);
  };

  // If component hasn't mounted yet, show loading state
  if (!mounted) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">Loading checkout details...</p>
        </div>
      </div>
    );
  }

  // If success page should be shown
  if (showSuccess && formData) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="rounded-full bg-green-100 p-6 dark:bg-green-900/20">
            <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Order Successful!</h1>
          <p className="mt-2 text-center text-muted-foreground">
            Your order #{orderId} has been placed successfully.
          </p>
          <div className="mt-8 space-y-4 bg-muted/40 p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between">
              <span className="font-medium">Payment Method:</span>
              <span className="capitalize">{formData.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Transaction ID:</span>
              <span>{formData.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount Paid:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <p className="mt-6 text-muted-foreground text-center">
            A confirmation email has been sent to {formData.email}. We'll also send you an update when your enrollment is processed.
          </p>
          <div className="mt-8 space-x-4">
            <Button onClick={() => router.push('/login')}>
              Login to Access Your Courses
            </Button>
            <Button variant="outline" onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">
            Your cart is empty. Please add items to your cart before proceeding to checkout.
          </p>
        </div>
        <Button onClick={() => router.push('/courses')}>
          Browse Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your purchase by providing payment information
          </p>
        </div>
        <Button variant="ghost" onClick={returnToCart}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Checkout Form Section */}
        <div>
          <CheckoutForm 
            orderId={orderId}
            total={total}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isAuthenticated={false}
          />
        </div>

        {/* Order Summary Section */}
        <div>
          <OrderSummary
            orderId={orderId}
            cartItems={cartItems}
            subtotal={subtotal}
            discount={discount}
            taxes={taxes}
            total={total}
            note="After completing your payment, please enter the transaction ID to verify your payment. Your enrollment will be processed within 24 hours after verification."
          />
        </div>
      </div>
    </div>
  );
};

export default PublicCheckoutPage; 