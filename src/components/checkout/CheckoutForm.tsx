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
  Info
} from "lucide-react";

interface CheckoutFormProps {
  orderId: string;
  total: number;
  onSubmit: (formData: CheckoutFormData) => void;
  isSubmitting: boolean;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phoneNumber: string;
  notes: string;
  paymentMethod: string;
  transactionId: string;
}

const CheckoutForm = ({
  orderId,
  total,
  onSubmit,
  isSubmitting
}: CheckoutFormProps) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phoneNumber: "",
    notes: "",
    paymentMethod: "bkash",
    transactionId: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Payment Instructions</span>
              </div>

              {formData.paymentMethod === 'bkash' && (
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
              )}

              {formData.paymentMethod === 'nagad' && (
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
              )}
            </div>

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
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Processing...</>
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