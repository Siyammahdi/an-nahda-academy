"use client"
import { Separator } from '@/components/ui/separator';
import React from 'react';
import {
   Dialog,
   DialogContent,
} from "@/components/ui/dialog";
import Image from 'next/image';
import Link from 'next/link';

interface EnrollModalProps {
   isOpen: boolean;
   onClose: () => void;
}
export default function PaymentDetailsModal({ isOpen, onClose }: EnrollModalProps) {
   return (
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
         <DialogContent className=" sm:max-w-[90%] md:max-w-[80%] lg:max-w-[75%]">
            <div className="h-fit-content">
               <div className="flex flex-col items-start justify-start gap-3 p-8 w-full">
                  <p className='text-xl font-bold'>ইনরোল ইন্সট্রাকশন</p>
                  <Separator className="w-full" />
                  <div className="w-full flex lg:flex-row flex-col items-center justify-between ">
                     <div className='flex-1'>
                        <ul className='list-disc ml-5'>
                           <li>আপনার কোর্স ফি বিকাশ একাউন্টে পাঠান। বিকাশ পার্সোনাল: 01701063280</li>
                           <li>ফি পাঠানোর পর, আমাদের ফেসবুক <Link className='font-semibold text-red-500' href={'https://www.facebook.com/AnNahdaAcademy'}>An-Nahda</Link> মেসেঞ্জারে যোগাযোগ করুন </li>
                           <li>বিকাশ লেনদেন আইডি এবং স্ক্রিনশট প্রদান করুন</li>
                           <li>অতিরিক্ত সাহায্যের জন্য হেল্পলাইনে যোগাযোগ করুন। সকাল ১০টা থেকে রাত ৮টা পর্যন্ত হেল্পলাইন পরিষেবা পাওয়া যাবে। মোবাইল: +880 1912-232838 হোয়াটসঅ্যাপ: +880 1912-232838</li>
                        </ul>
                     </div>
                     <div className='flex-1 w-full flex flex-row gap-4 p-5'>
                      <Image src='/bkash_QR.jpg' width={200} height={200} alt="bkash_QR" />
                      <Image src='/text.jpg' width={200} height={200} alt="text" />
                     </div>
                  </div>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   );
};

