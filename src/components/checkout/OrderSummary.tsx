"use client";

import { CartItem } from "@/contexts/CartContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  orderId: string;
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  note?: string;
  className?: string;
}

const OrderSummary = ({
  orderId,
  cartItems,
  subtotal,
  discount,
  total,
  note,
  className = ""
}: OrderSummaryProps) => {
  return (
    <Card className={`sticky top-4 ${className}`}>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>
          Order #{orderId}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-medium">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.type === 'course' ? 'Course' : 'Resource'}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">
                  {formatPrice(item.discountedPrice || item.price, '৳')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="items">
            <AccordionTrigger className="text-sm">
              View Items ({cartItems.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.title}</span>
                    <span>{formatPrice(item.discountedPrice || item.price, '৳')}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal, '৳')}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-{formatPrice(discount, '৳')}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatPrice(total, '৳')}</span>
          </div>
        </div>

        {note && (
          <div className="rounded-md bg-muted p-4 text-sm">
            <h4 className="font-medium mb-2">Important Note:</h4>
            <p className="text-muted-foreground">{note}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderSummary; 