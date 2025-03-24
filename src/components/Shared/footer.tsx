"use client"

// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram, FaTelegramPlane, FaTwitter, FaYoutube } from "react-icons/fa";
import grad1 from "@/../public/grad/gradiant1.png";

const Footer = () => {
    return (
        <div className="relative overflow-hidden text-white bg-gradient-to-r from-purple-950 via-sky-950 to-indigo-950">
            <div className="flex justify-center">
                <Image className="absolute z-10 -top-40" src={grad1} alt="gradiant" height={1000} width={1000} />
            </div>
            <div className="w-full py-16 px-6">
                {/* Top Sections */}
                <div className="relative z-20 max-w-screen-xl mx-auto flex flex-wrap justify-between gap-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full lg:w-2/3 gap-10">
                        {/* Column 1 */}
                        <div>
                            <h4 className="text-lg font-semibold mb-8">আন নাহদা</h4>
                            <ul className="space-y-3 text-sm">
                                <li>আন নাহদা পরিচিতি</li>
                                <li>ইতিহাস</li>
                                <li>যোগাযোগের নীতি</li>
                                <li>গোপনীয়তার নীতি</li>
                                <li>মিডিয়া সংবাদ</li>
                                <li>জরুরি তথ্য</li>
                            </ul>
                        </div>

                        {/* Column 2 */} 
                        <div>
                            <h4 className="text-lg font-semibold mb-8">বাংলা সংস্কৃতি</h4>
                            <ul className="space-y-3 text-sm">
                                <li>বাংলা পত্রিকা</li>
                                <li>আলোচনার রঙ্গ</li>
                                <li>ভিডিও</li>
                                <li>ব্লগ</li>
                            </ul>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h4 className="text-lg font-semibold mb-8">যোগাযোগ</h4>
                            <ul className="space-y-3 text-sm">
                                <li>যোগাযোগের ফোন: +৮৮০ ১২৩৪ ৫৬৭৮৯</li>
                                <li>ইমেল: media@annahda.com</li>
                                <li>ফ্যাক্স: +৮৮০ ১৭১৭২১৫০৭০</li>
                            </ul>
                        </div>

                        {/* Column 4 */}
                        <div>
                            <h4 className="text-lg font-semibold mb-8">প্রতিষ্ঠানসমূহ</h4>
                            <ul className="space-y-3 text-sm">
                                <li>বাংলাদেশ অফিস</li>
                                <li>ঢাকা বিভাগ</li>
                                <li>২৩৫০ প্রধান সড়ক</li>
                                <li>অফিস সময়: ৯টা - ৫টা</li>
                            </ul>
                        </div>
                    </div>
                    {/* Column 5 */}
                    <div className="w-full lg:w-auto">
                        <h4 className="text-lg font-semibold mb-4">আমাদের সংবাদপত্রে সদস্য হোন</h4>
                        <div className="flex items-center mt-4">
                            <input
                                type="email"
                                placeholder="এখানে ইমেল লিখুন"
                                className="w-full lg:w-auto p-3 text-black rounded-l-lg"
                            />
                            <button className="bg-indigo-500 px-4 py-3 rounded-r-lg text-sm font-semibold hover:bg-indigo-400 transition">
                                সাবমিট
                            </button>
                        </div>
                        <p className="text-xs mt-3 text-gray-300">
                            এটি আপনার ব্যক্তিগত তথ্য সম্পূর্ণ গোপন রাখবে।
                        </p>
                        <div className="flex justify-center lg:justify-start space-x-8 mt-10">
                            <Link href="#" className="text-white hover:text-gray-400">
                                <FaTelegramPlane size={28} />
                            </Link>
                            <Link href="#" className="text-white hover:text-gray-400">
                                <FaInstagram size={28} />
                            </Link>
                            <Link href="#" className="text-white hover:text-gray-400">
                                <FaYoutube size={28} />
                            </Link>
                            <Link href="#" className="text-white hover:text-gray-400">
                                <FaFacebook size={28} />
                            </Link>
                            <Link href="#" className="text-white hover:text-gray-400">
                                <FaTwitter size={28} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-20 pt-6">
                    <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-4 text-sm text-center sm:text-left">
                        <p>কপিরাইট © ২০২৪ আন বাতা। সকল অধিকার সংরক্ষিত।</p>
                        <p>ভর্তি পলিসি</p>
                        <p>টার্মস এন্ড কন্ডিশন</p>
                        <p>প্রাইভেসি পলিসি</p>
                        <p>ফিডব্যাক</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
