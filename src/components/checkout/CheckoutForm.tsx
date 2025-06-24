"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { 
  CreditCard, 
  Info,
  Shield,
  CreditCard as CreditCardIcon
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CheckoutFormProps {
  orderId: string;
  total: number;
  onSubmit: (formData: CheckoutFormData) => void;
  isSubmitting: boolean;
  isAuthenticated?: boolean;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phoneNumber: string;
  notes: string;
  paymentMethod: string;
  transactionId: string;
  address?: string;
  city?: string;
  postCode?: string;
  country?: string;
}

const CheckoutForm = ({
  orderId,
  total,
  onSubmit,
  isSubmitting,
  isAuthenticated = false
}: CheckoutFormProps) => {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    notes: "",
    paymentMethod: "sslcommerz",
    transactionId: "",
    address: "",
    city: "Dhaka",
    postCode: "1000",
    country: "Bangladesh"
  });

  const [sslcommerzLoading, setSslcommerzLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.paymentMethod === 'sslcommerz') {
      handleSslcommerzPayment();
    } else {
      onSubmit(formData);
    }
  };

  const handleSslcommerzPayment = async () => {
    setSslcommerzLoading(true);
    
    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.phoneNumber) {
        alert('Please fill in all required fields (Name, Email, Phone)');
        return;
      }

      const paymentData = {
        orderId: orderId,
        amount: total,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phoneNumber,
        customerAddress: formData.address || 'Dhaka',
        customerCity: formData.city || 'Dhaka',
        customerPostCode: formData.postCode || '1000',
        customerCountry: formData.country || 'Bangladesh',
        items: cartItems.map(item => ({
          name: item.title,
          price: item.discountedPrice || item.price,
          quantity: 1
        }))
      };

      console.log('Initiating SSLCommerz payment:', paymentData);

      // Call SSLCommerz API
      const response = await fetch('/api/payment/sslcommerz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      console.log('Payment response status:', response.status);
      console.log('Payment response headers:', Object.fromEntries(response.headers.entries()));

      const result = await response.json();
      console.log('Payment response body:', result);

      if (result.success && result.gatewayPageURL) {
        // Redirect to SSLCommerz payment gateway
        console.log('Redirecting to payment gateway:', result.gatewayPageURL);
        window.location.href = result.gatewayPageURL;
      } else {
        // Show specific error message
        const errorMessage = result.error || result.details || result.message || 'Payment gateway error';
        console.error('Payment error:', result);
        
        if (errorMessage.includes('Backend service unavailable')) {
          alert('Payment service is temporarily unavailable. Please try again later or contact support.');
        } else {
          alert(`Payment error: ${errorMessage}`);
        }
      }

    } catch (error) {
      console.error('SSLCommerz payment error:', error);
      alert('Payment gateway error. Please try again or contact support.');
    } finally {
      setSslcommerzLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Enter your details for order processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              placeholder="Your full name" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your.email@example.com" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input 
              id="phoneNumber" 
              placeholder="Your phone number" 
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address (Optional)</Label>
            <Input 
              id="address" 
              placeholder="Your address" 
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                placeholder="City" 
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postCode">Post Code</Label>
              <Input 
                id="postCode" 
                placeholder="Post Code" 
                value={formData.postCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea 
              id="notes" 
              placeholder="Any special instructions or notes" 
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Select your preferred payment method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup 
            value={formData.paymentMethod} 
            onValueChange={handlePaymentMethodChange}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="sslcommerz" id="sslcommerz" />
              <Label htmlFor="sslcommerz" className="flex flex-1 items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-md flex items-center justify-center text-sm font-bold">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <span className="font-medium">SSLCommerz</span>
                  <p className="text-xs text-muted-foreground">Credit/Debit Cards, Mobile Banking</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="bkash" id="bkash" />
              <Label htmlFor="bkash" className="flex flex-1 items-center gap-2">
                <div className="w-10 h-10 bg-pink-600 text-white rounded-md flex items-center justify-center text-sm font-bold">
                  bKash
                </div>
                <span>bKash</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <RadioGroupItem value="nagad" id="nagad" />
              <Label htmlFor="nagad" className="flex flex-1 items-center gap-2">
                <div className="w-10 h-10 bg-orange-600 text-white rounded-md flex items-center justify-center text-sm font-bold">
                  Nagad
                </div>
                <span>Nagad</span>
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-4 space-y-4">
            {formData.paymentMethod === 'sslcommerz' && (
              <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Secure Payment Gateway</span>
                </div>
                <div className="space-y-2 text-sm text-blue-700">
                  <p>SSLCommerz provides secure payment processing with:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Credit and Debit Cards (Visa, MasterCard, American Express)</li>
                    <li>Mobile Banking (bKash, Nagad, Rocket, Upay)</li>
                    <li>Internet Banking</li>
                    <li>ATM Cards</li>
                  </ul>
                  <p className="mt-2 font-medium">You will be redirected to a secure payment page.</p>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'bkash' && (
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Payment Instructions</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p>Please send the total amount to our bKash merchant account:</p>
                  <p className="font-semibold">bKash Number: 01712-345678</p>
                  <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                    <li>Dial *247# on your phone</li>
                    <li>Select &quot;Payment&quot;</li>
                    <li>Enter the merchant number: 01712-345678</li>
                    <li>Enter the amount: {total.toFixed(2)} Tk</li>
                    <li>Enter a reference: {orderId}</li>
                    <li>Enter your PIN to confirm</li>
                  </ol>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'nagad' && (
              <div className="rounded-md bg-muted p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Payment Instructions</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p>Please send the total amount to our Nagad merchant account:</p>
                  <p className="font-semibold">Nagad Number: 01612-345678</p>
                  <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                    <li>Open your Nagad app</li>
                    <li>Select &quot;Send Money&quot;</li>
                    <li>Enter the merchant number: 01612-345678</li>
                    <li>Enter the amount: {total.toFixed(2)} Tk</li>
                    <li>Add reference: {orderId}</li>
                    <li>Confirm with your PIN</li>
                  </ol>
                </div>
              </div>
            )}

            {formData.paymentMethod !== 'sslcommerz' && (
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input 
                  id="transactionId" 
                  placeholder="Enter your transaction ID" 
                  value={formData.transactionId}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Please enter the transaction ID you received after making the payment.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            disabled={isSubmitting || sslcommerzLoading}
          >
            {isSubmitting || sslcommerzLoading ? (
              <>Processing...</>
            ) : formData.paymentMethod === 'sslcommerz' ? (
              <>
                <Shield className="mr-2 h-4 w-4" /> Proceed to Payment Gateway
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" /> Complete Payment
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutForm; 