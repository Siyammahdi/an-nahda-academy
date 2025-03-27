"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.3,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    },
};

const floatingVariants = {
    initial: { y: 0 },
    float: {
        y: [0, -20, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
        }
    }
};

const pulseVariants = {
    initial: { scale: 1, opacity: 0.5 },
    pulse: {
        scale: [1, 1.05, 1],
        opacity: [0.5, 0.8, 0.5],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        }
    }
};

const spinVariants = {
    initial: { rotate: 0 },
    spin: {
        rotate: 360,
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
        }
    }
};

const ComingSoonPage = () => {
    const [email, setEmail] = useState("");
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    const [countdown, setCountdown] = useState({
        days: 30,
        hours: 14,
        minutes: 37,
        seconds: 42,
    });

    // Create a cache of star positions that won't change
    const starCache = React.useMemo(() => {
        return Array.from({ length: 100 }).map(() => ({
            size: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 3,
            duration: 2 + Math.random() * 3
        }));
    }, []);

    // Check for #notify hash in URL and scroll to form only if explicitly requested
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Only scroll if the hash is specifically set to #notify
            if (window.location.hash === '#notify' && formRef.current) {
                // Wait for animations to complete
                setTimeout(() => {
                    formRef.current?.scrollIntoView({ behavior: 'smooth' });
                    // Focus the email input field
                    const emailInput = formRef.current?.querySelector('input[type="email"]') as HTMLInputElement;
                    if (emailInput) emailInput.focus();
                }, 1000);
            }
        }
    }, []);

    // Update countdown every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !email.includes('@')) {
            toast.error("Please enter a valid email address");
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setIsEmailSubmitted(true);
            toast.success("Thank you! We'll notify you when this course launches.");
        }, 1000);
    };

    // Improved star generation with fixed positions
    const generateStars = () => {
        return starCache.map((star, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0.1 }}
                animate={{
                    opacity: [0.1, 0.6, 0.1],
                }}
                transition={{
                    duration: star.duration,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: star.delay
                }}
                style={{
                    position: "absolute",
                    width: star.size,
                    height: star.size,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    left: star.left,
                    top: star.top
                }}
            />
        ));
    };

    // Handle "Get Notified" button click
    const handleGetNotifiedClick = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
            // Focus the email input field
            const emailInput = formRef.current?.querySelector('input[type="email"]') as HTMLInputElement;
            if (emailInput) emailInput.focus();
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-violet-900 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {generateStars()}

                <motion.div
                    variants={spinVariants}
                    initial="initial"
                    animate="spin"
                    className="absolute -right-40 -top-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                />

                <motion.div
                    variants={pulseVariants}
                    initial="initial"
                    animate="pulse"
                    className="absolute -left-20 bottom-40 w-60 h-60 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
                />

                <motion.div
                    variants={pulseVariants}
                    initial="initial"
                    animate="pulse"
                    className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-yellow-500/5 to-orange-500/10 rounded-full blur-3xl"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="z-10 container mx-auto px-4 py-16 text-center"
            >
                {/* Main Content */}
                <motion.div variants={itemVariants} className="mb-3">
                    <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm">
                        Coming Soon
                    </span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                >
                    New Course<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        Coming Your Way
                    </span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg sm:text-xl text-violet-100 max-w-2xl mx-auto mb-10"
                >
                    We&apos;re working on something amazing for your learning journey.
                    Be the first to know when we launch this new course.
                </motion.p>

                {/* "Get Notified" button for easy scrolling to the form */}
                <motion.div variants={itemVariants} className="mb-12">
                    <Button
                        onClick={handleGetNotifiedClick}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 rounded-full text-lg"
                    >
                        Get Notified
                    </Button>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {Object.entries(countdown).map(([unit, value]) => (
                        <motion.div
                            key={unit}
                            whileHover={{ scale: 1.05 }}
                            className="w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-xl"
                        >
                            <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
                            <span className="text-xs text-violet-200 capitalize">{unit}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Notification Form */}
                <motion.div
                    ref={formRef}
                    id="notify"
                    variants={itemVariants}
                    className="max-w-md mx-auto scroll-mt-24"
                >
                    <AnimatePresence mode="wait">
                        {!isEmailSubmitted ? (
                            <motion.form
                                key="form"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex gap-2 mb-4"
                            >
                                <Input
                                    type="email"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                                />
                                <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
                                    Notify Me
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white"
                            >
                                <svg className="w-8 h-8 border-2 border-green-400 rounded-full text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p>Thank you! We&apos;ll notify you when we launch.</p>
                                <p className="text-xs text-violet-300">
                                    We respect your privacy and will never share your email.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>

                {/* Floating illustrations */}
                <motion.div
                    variants={floatingVariants}
                    initial="initial"
                    animate="float"
                    className="hidden md:block absolute right-20 top-1/4 w-32 h-32 opacity-70"
                >
                    <div className="w-full h-full relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-70"></div>
                    </div>
                </motion.div>

                <motion.div
                    variants={floatingVariants}
                    initial="initial"
                    animate="float"
                    transition={{ delay: 1.5 }}
                    className="hidden md:block absolute left-40 bottom-1/3 w-20 h-20 opacity-70"
                >
                    <div className="w-full h-full relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-70"></div>
                    </div>
                </motion.div>

                {/* Navigation links */}
                <motion.div variants={itemVariants} className="mt-16">
                    <Link
                        href="/"
                        className="inline-flex items-center text-violet-200 hover:text-white transition-colors"
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="mr-2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>
                </motion.div>
            </motion.main>
        </div>
    );
};

export default ComingSoonPage; 