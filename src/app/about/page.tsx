"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  GraduationCap, 
  Globe, 
  Users, 
  Heart, 
  Calendar, 
  Award, 
  Mail
} from "lucide-react";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="mx-auto py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="relative mb-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariants}
          >
            <Badge variant="outline" className="mb-4 px-4 py-1 text-sm">Welcome to An-nahda Academy</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              Empowering Minds Through Education
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              An-nahda Academy is dedicated to providing quality education to students across the globe. 
              Our purpose is to cultivate a love for learning and empower students to achieve their full potential.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full">
                <BookOpen className="mr-2 h-5 w-5" /> Explore Courses
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                <Mail className="mr-2 h-5 w-5" /> Contact Us
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {mounted && (
              <div className="relative w-full h-[400px]">
                <Image
                  src="/elements/book.png"
                  alt="Academic background"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <motion.section 
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2 } 
          }
        }}
      >
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">Our Purpose</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mission & Vision</h2>
          <Separator className="mx-auto w-24 mb-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={fadeInUpVariants}>
            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-6 w-6 mr-3 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide accessible, high-quality education that empowers students to develop critical thinking skills,
                  cultural awareness, and a strong foundation in their studies. We strive to create a supportive learning 
                  environment that respects diversity and fosters intellectual growth.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUpVariants}>
            <Card className="h-full border-2 border-primary/10 hover:border-primary/30 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-6 w-6 mr-3 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be recognized as a leading educational institution that transforms lives through learning. 
                  We envision a global community where education bridges cultural divides, advances society, 
                  and creates opportunities for all students to excel in their chosen fields.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section 
        className="mb-24 py-16  md:px-8 rounded-2xl md:bg-gradient-to-r from-muted/70 to-muted/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1 } 
          }
        }}
      >
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">What We Stand For</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
          <Separator className="mx-auto w-24 mb-6" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, title: "Community", description: "Building a supportive learning community where everyone belongs" },
            { icon: Heart, title: "Passion", description: "Inspiring a love for learning and intellectual curiosity" },
            { icon: Award, title: "Excellence", description: "Maintaining high standards in education and student support" },
            { icon: GraduationCap, title: "Growth", description: "Fostering personal and academic development for all students" }
          ].map((value, index) => (
            <motion.div key={index} variants={fadeInUpVariants}>
              <Card className="h-full border-none bg-gray-100 md:bg-background/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full mb-3">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section 
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">Our Journey</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
          <Separator className="mx-auto w-24 mb-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            {mounted && (
              <Image
                src="/elements/working-desk.svg"
                alt="Our history"
                fill
                className="object-cover"
              />
            )}
          </div>
          
          <div>
            <div className="space-y-8">
              {[
                { year: "2018", title: "Humble Beginnings", description: "An-nahda Academy was founded with a mission to provide quality education accessible to all." },
                { year: "2020", title: "Digital Expansion", description: "We expanded our offerings to include online courses, reaching students globally." },
                { year: "2022", title: "Curriculum Innovation", description: "Introduced new specialized courses and teaching methodologies to enhance learning experiences." },
                { year: "2023", title: "Community Growth", description: "Celebrated reaching over 10,000 students and expanded our teaching faculty." }
              ].map((milestone, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-20 text-center">
                    <Badge variant="secondary" className="px-2 py-1">{milestone.year}</Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Team Section */}
      <motion.section 
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2 } 
          }
        }}
      >
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">The People Behind An-nahda</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <Separator className="mx-auto w-24 mb-6" />
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Our dedicated team of educators and administrators work tirelessly to provide the best learning experience for our students.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
          {[
            {
              name: "Dr. Ahmed Rahman",
              role: "Founder & Director",
              image: "/men-black.png",
              bio: "With over 15 years of experience in education, Dr. Rahman founded An-nahda Academy with a vision to transform learning."
            },
            {
              name: "Professor Sarah Khan",
              role: "Academic Director",
              image: "/women-black.png",
              bio: "Professor Khan oversees our curriculum development and ensures the highest academic standards across all courses."
            },
            {
              name: "Mohammed Ali",
              role: "Lead Instructor",
              image: "/men-black.png",
              bio: "A passionate educator with expertise in multiple subjects, Mohammed brings creativity and innovation to the classroom."
            }
          ].map((member, index) => (
            <motion.div key={index} variants={fadeInUpVariants}>
              <Card className="h-full overflow-hidden border-none shadow-md">
                <div className="md:w-2/3 mx-auto aspect-square relative">
                  {mounted && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <CardHeader className="p-2 md:p-8">
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 md:p-8">
                  <p className="text-xs md:text-base text-muted-foreground">
                    {member.bio}
                  </p>
                </CardContent>
                <CardFooter className="p-2 md:p-8">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="mb-24 py-16 px-8 rounded-2xl bg-primary text-primary-foreground text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Learning Journey Today</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of students who have transformed their lives through education at An-nahda Academy.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" variant="secondary" className="rounded-full">
            <BookOpen className="mr-2 h-5 w-5" /> Browse Courses
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white/20 hover:bg-white/10">
            <Calendar className="mr-2 h-5 w-5" /> Schedule a Consultation
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
