"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminCoursesAPI } from '@/api/admin.courses.api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Loader2, Plus, Save, X, Info, AlertCircle, Upload, EyeIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Feature schema
const featureSchema = z.record(z.string().min(1, "Feature name is required"), z.string().min(1, "Feature description is required"));

// Schedule item schema 
const scheduleItemSchema = z.record(z.string().min(1, "Schedule item name is required"), z.string().min(1, "Schedule item value is required"));

// Course form schema
const courseFormSchema = z.object({
  courseName: z.string().min(3, { message: "Course name must be at least 3 characters" }),
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  imagePath: z.string().min(1, { message: "Image path is required" }),
  introduction: z.array(z.string().min(10, { message: "Introduction paragraph must be at least 10 characters" }))
    .min(1, { message: "At least one introduction paragraph is required" }),
  courseHighlights: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    features: z.array(featureSchema).min(1, { message: "At least one feature is required" })
  }),
  courseDetails: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    schedule: z.array(scheduleItemSchema).min(1, { message: "At least one schedule item is required" }),
    platform: z.string().min(1, { message: "Platform is required" }),
    fees: z.object({
      courseFee: z.string().min(1, { message: "Course fee is required" }),
      scholarships: z.string().min(1, { message: "Scholarship info is required" })
    })
  }),
  callToAction: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    encouragement: z.string().min(1, { message: "Encouragement text is required" })
  })
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

const defaultValues: CourseFormValues = {
  courseName: "",
  title: "",
  description: "",
  imagePath: "/poster_square/new_course.png",
  introduction: [""],
  courseHighlights: {
    title: "Why Choose Our Course?",
    description: "Key features that make this course exceptional:",
    features: [{ "Live Sessions": "All classes are live and interactive, ensuring students can ask questions in real-time." }]
  },
  courseDetails: {
    title: "Course Details:",
    schedule: [
      { "Class Schedule": "Three days a week—Saturday, Monday, and Wednesday." },
      { "courseDuration": "3 months" },
      { "courseLanguage": "Bangla, Arabic" },
      { "ageRequirement": "12+" }
    ],
    platform: "Classes are conducted via live audio sessions on Zoom.",
    fees: {
      courseFee: "550 Tk. monthly",
      scholarships: "Available for eligible students"
    }
  },
  callToAction: {
    title: "Enroll Today:",
    description: "Don't miss this opportunity to embark on a journey of a lifetime.",
    encouragement: "Take the first step towards mastering this subject and transforming your life with this program."
  }
};

export default function NewCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [showPreview, setShowPreview] = useState(false);
  const [featureKeys, setFeatureKeys] = useState<string[]>(["Live Sessions"]);
  const [scheduleKeys, setScheduleKeys] = useState<string[]>(["Class Schedule", "courseDuration", "courseLanguage", "ageRequirement"]);
  const [introCount, setIntroCount] = useState(1);

  // Initialize form
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues,
    mode: "onChange"
  });

  // Watch form values for preview
  const formValues = form.watch();

  // Handle form submission
  const onSubmit = async (data: CourseFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Submit to API
      const response = await AdminCoursesAPI.createCourse(data);
      
      toast.success("Course created successfully!");
      
      // Redirect to courses page after successful creation
      setTimeout(() => {
        router.push('/admin/courses');
      }, 1500);
    } catch (error: any) {
      console.error('Error creating course:', error);
      toast.error(error.message || 'Failed to create course');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add new introduction paragraph
  const addIntroParagraph = () => {
    const currentIntros = form.getValues().introduction;
    form.setValue('introduction', [...currentIntros, '']);
    setIntroCount(prev => prev + 1);
  };

  // Remove introduction paragraph
  const removeIntroParagraph = (index: number) => {
    const currentIntros = form.getValues().introduction;
    if (currentIntros.length > 1) {
      form.setValue(
        'introduction', 
        currentIntros.filter((_, i) => i !== index)
      );
      setIntroCount(prev => prev - 1);
    }
  };

  // Add new feature
  const addFeature = () => {
    const currentFeatures = form.getValues().courseHighlights.features;
    const newKey = `Feature ${currentFeatures.length + 1}`;
    form.setValue('courseHighlights.features', [...currentFeatures, { [newKey]: "" }]);
    setFeatureKeys([...featureKeys, newKey]);
  };

  // Remove feature
  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues().courseHighlights.features;
    if (currentFeatures.length > 1) {
      form.setValue(
        'courseHighlights.features', 
        currentFeatures.filter((_, i) => i !== index)
      );
      setFeatureKeys(featureKeys.filter((_, i) => i !== index));
    }
  };

  // Add new schedule item
  const addScheduleItem = () => {
    const currentSchedule = form.getValues().courseDetails.schedule;
    const newKey = `scheduleItem${currentSchedule.length + 1}`;
    form.setValue('courseDetails.schedule', [...currentSchedule, { [newKey]: "" }]);
    setScheduleKeys([...scheduleKeys, newKey]);
  };

  // Remove schedule item
  const removeScheduleItem = (index: number) => {
    const currentSchedule = form.getValues().courseDetails.schedule;
    if (currentSchedule.length > 1) {
      form.setValue(
        'courseDetails.schedule', 
        currentSchedule.filter((_, i) => i !== index)
      );
      setScheduleKeys(scheduleKeys.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create New Course</h1>
          <p className="text-sm text-muted-foreground">
            Add a new course to the An-Nahda Academy platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowPreview(!showPreview)}
          >
            <EyeIcon className="mr-2 h-4 w-4" />
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className={`grid ${showPreview ? "grid-cols-1 lg:grid-cols-2 gap-6" : "grid-cols-1"}`}>
        {/* Form Section */}
        <Card className="shadow-sm overflow-hidden">
          <CardHeader className="space-y-1 bg-muted/40">
            <CardTitle>Course Information</CardTitle>
            <CardDescription>
              Fill out all required fields to create a comprehensive course profile
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b px-6">
                <TabsList className="w-full justify-start gap-4 h-14">
                  <TabsTrigger 
                    value="basic" 
                    className={`${activeTab === "basic" ? "border-b-2 border-primary rounded-none" : ""}`}
                  >
                    Basic Info
                  </TabsTrigger>
                  <TabsTrigger 
                    value="introduction" 
                    className={`${activeTab === "introduction" ? "border-b-2 border-primary rounded-none" : ""}`}
                  >
                    Introduction
                  </TabsTrigger>
                  <TabsTrigger 
                    value="highlights" 
                    className={`${activeTab === "highlights" ? "border-b-2 border-primary rounded-none" : ""}`}
                  >
                    Highlights
                  </TabsTrigger>
                  <TabsTrigger 
                    value="details" 
                    className={`${activeTab === "details" ? "border-b-2 border-primary rounded-none" : ""}`}
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="cta" 
                    className={`${activeTab === "cta" ? "border-b-2 border-primary rounded-none" : ""}`}
                  >
                    Call-to-Action
                  </TabsTrigger>
                </TabsList>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-6">
                  {/* Basic Info Tab Content */}
                  <TabsContent value="basic" className="m-0 space-y-4">
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        Start by entering the essential information about your course.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="courseName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Course Name*</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Learning Arabic Course" {...field} />
                              </FormControl>
                              <FormDescription>
                                The short name displayed in course listings
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title*</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Learn Language of Qur'an and Hadith" {...field} />
                              </FormControl>
                              <FormDescription>
                                A longer, descriptive title for the course
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="imagePath"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image Path*</FormLabel>
                              <div className="flex gap-2">
                                <FormControl>
                                  <Input placeholder="/poster_square/course_image.png" {...field} />
                                </FormControl>
                                <Button type="button" variant="outline" size="icon" className="shrink-0">
                                  <Upload className="h-4 w-4" />
                                </Button>
                              </div>
                              <FormDescription>
                                Path to the course image in the public folder
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description*</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Provide a brief overview of the course..." 
                                  className="min-h-[180px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                A concise but compelling summary that engages students
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Introduction Tab Content */}
                  <TabsContent value="introduction" className="m-0 space-y-4">
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        Add paragraphs to introduce your course to students. This section should be engaging and motivational.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Introduction Paragraphs</h3>
                        <Button type="button" variant="outline" size="sm" onClick={addIntroParagraph}>
                          <Plus className="h-4 w-4 mr-1" /> Add Paragraph
                        </Button>
                      </div>

                      {Array.from({ length: introCount }).map((_, index) => (
                        <div key={`intro-${index}`} className="flex gap-2">
                          <FormField
                            control={form.control}
                            name={`introduction.${index}`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel className="flex items-center gap-2">
                                  Paragraph {index + 1}
                                  {index === 0 && <Badge className="text-xs">Required</Badge>}
                                </FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder={`Introduction paragraph ${index + 1}`} 
                                    className="resize-y"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {introCount > 1 && (
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="icon" 
                              className="mt-8 shrink-0"
                              onClick={() => removeIntroParagraph(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Course Highlights Tab Content */}
                  <TabsContent value="highlights" className="m-0 space-y-4">
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        Describe the key features and benefits that make your course stand out.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="courseHighlights.title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Title*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Why Choose Our Course?" {...field} />
                            </FormControl>
                            <FormDescription>
                              A title for the course highlights section
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="courseHighlights.description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Description*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Key features that make this course exceptional" {...field} />
                            </FormControl>
                            <FormDescription>
                              A brief introduction to the features section
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Course Features</h3>
                        <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                          <Plus className="h-4 w-4 mr-1" /> Add Feature
                        </Button>
                      </div>
                      
                      {featureKeys.map((key, index) => (
                        <div key={`feature-${index}`} className="border p-4 rounded-md bg-muted/20">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            <div className="md:col-span-1">
                              <Label htmlFor={`feature-key-${index}`}>Feature Name*</Label>
                              <Input 
                                id={`feature-key-${index}`}
                                placeholder="Feature name" 
                                value={key}
                                onChange={(e) => {
                                  const newKeys = [...featureKeys];
                                  newKeys[index] = e.target.value;
                                  setFeatureKeys(newKeys);
                                  
                                  // Update the form value
                                  const currentFeatures = form.getValues().courseHighlights.features;
                                  const oldValue = Object.values(currentFeatures[index])[0];
                                  form.setValue(
                                    'courseHighlights.features',
                                    currentFeatures.map((f, i) => i === index ? { [e.target.value]: oldValue } : f)
                                  );
                                }}
                                className="mt-1"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                E.g., Live Sessions, Expert Guidance
                              </p>
                            </div>
                            
                            <div className="md:col-span-2">
                              <div className="flex items-end gap-2">
                                <div className="flex-1">
                                  <Label htmlFor={`feature-value-${index}`}>Feature Description*</Label>
                                  <Textarea 
                                    id={`feature-value-${index}`}
                                    placeholder="Describe this feature in detail"
                                    value={Object.values(form.getValues().courseHighlights.features[index])[0] as string}
                                    onChange={(e) => {
                                      const currentFeatures = form.getValues().courseHighlights.features;
                                      form.setValue(
                                        'courseHighlights.features',
                                        currentFeatures.map((f, i) => i === index ? { [key]: e.target.value } : f)
                                      );
                                    }}
                                    className="mt-1"
                                  />
                                </div>
                                
                                {form.getValues().courseHighlights.features.length > 1 && (
                                  <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="icon"
                                    onClick={() => removeFeature(index)}
                                    className="shrink-0 mb-1 h-9 w-9"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Course Details Tab Content */}
                  <TabsContent value="details" className="m-0 space-y-6">
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        Provide practical information about your course schedule, platform, and fees.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="courseDetails.title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Section Title*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Course Details" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="courseDetails.platform"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Platform*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Classes are conducted via live audio sessions on Zoom" {...field} />
                            </FormControl>
                            <FormDescription>
                              Specify how the course will be delivered
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Schedule Information</h3>
                        <Button type="button" variant="outline" size="sm" onClick={addScheduleItem}>
                          <Plus className="h-4 w-4 mr-1" /> Add Schedule Item
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {scheduleKeys.map((key, index) => (
                          <div key={`schedule-${index}`} className="border p-4 rounded-md bg-muted/20">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <Label htmlFor={`schedule-key-${index}`}>Item Name*</Label>
                                {form.getValues().courseDetails.schedule.length > 1 && (
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => removeScheduleItem(index)}
                                    className="h-6 w-6"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                              
                              <Input 
                                id={`schedule-key-${index}`}
                                placeholder="e.g., courseDuration, Class Schedule" 
                                value={key}
                                onChange={(e) => {
                                  const newKeys = [...scheduleKeys];
                                  newKeys[index] = e.target.value;
                                  setScheduleKeys(newKeys);
                                  
                                  // Update the form value
                                  const currentSchedule = form.getValues().courseDetails.schedule;
                                  const oldValue = Object.values(currentSchedule[index])[0];
                                  form.setValue(
                                    'courseDetails.schedule',
                                    currentSchedule.map((s, i) => i === index ? { [e.target.value]: oldValue } : s)
                                  );
                                }}
                              />
                              
                              <Label htmlFor={`schedule-value-${index}`}>Value*</Label>
                              <Input 
                                id={`schedule-value-${index}`}
                                placeholder="e.g., 3 months, Three days a week"
                                value={Object.values(form.getValues().courseDetails.schedule[index])[0] as string}
                                onChange={(e) => {
                                  const currentSchedule = form.getValues().courseDetails.schedule;
                                  form.setValue(
                                    'courseDetails.schedule',
                                    currentSchedule.map((s, i) => i === index ? { [key]: e.target.value } : s)
                                  );
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Fees Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="courseDetails.fees.courseFee"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Course Fee*</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 550 Tk. monthly" {...field} />
                              </FormControl>
                              <FormDescription>
                                The price of the course
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="courseDetails.fees.scholarships"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Scholarships*</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Available for eligible students" {...field} />
                              </FormControl>
                              <FormDescription>
                                Information about financial assistance
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Call to Action Tab Content */}
                  <TabsContent value="cta" className="m-0 space-y-4">
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        Create a compelling call-to-action to encourage students to enroll in your course.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="callToAction.title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CTA Title*</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Enroll Today:" {...field} />
                            </FormControl>
                            <FormDescription>
                              A short, action-oriented title
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="callToAction.description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CTA Description*</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g., Don't miss this opportunity to embark on a journey of a lifetime." 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Explain why students should take action now
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="callToAction.encouragement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Encouragement Text*</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g., Take the first step towards mastering this subject and transforming your life with this program." 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              A final motivational message to inspire enrollment
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-8 p-4 bg-violet-50 rounded-md">
                      <h3 className="font-medium text-violet-700 mb-2">Course Creation Almost Complete!</h3>
                      <p className="text-sm text-violet-600">
                        Review all tabs to ensure your course information is accurate and complete before submitting.
                      </p>
                    </div>
                  </TabsContent>

                  {/* Submit buttons */}
                  <div className="flex justify-between pt-6 border-t mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Create Course
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        </Card>

        {/* Preview section (conditional) */}
        {showPreview && (
          <Card className="shadow-sm">
            <CardHeader className="border-b bg-muted/40">
              <CardTitle className="flex items-center gap-2">
                <EyeIcon className="h-5 w-5" /> 
                Course Preview
              </CardTitle>
              <CardDescription>
                Preview how your course will appear to students
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 overflow-auto max-h-[700px]">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="aspect-video relative bg-muted rounded-md flex items-center justify-center">
                    {formValues.imagePath ? (
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-2">Course Image:</p>
                        <Badge variant="outline" className="bg-muted/80">
                          {formValues.imagePath}
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Upload className="h-10 w-10 mx-auto mb-2 opacity-30" />
                        <p>No image path specified</p>
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-2xl font-bold text-violet-900">
                    {formValues.title || "Course Title"}
                  </h1>
                  
                  <h2 className="text-lg font-medium text-muted-foreground">
                    {formValues.courseName || "Course Name"}
                  </h2>
                  
                  <p className="text-sm">
                    {formValues.description || "Course description will appear here..."}
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Introduction</h3>
                  {formValues.introduction && formValues.introduction.length > 0 ? (
                    <div className="space-y-3">
                      {formValues.introduction.map((paragraph, index) => (
                        <p key={index} className="text-sm">
                          {paragraph || "Introduction paragraph..."}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No introduction added yet</p>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{formValues.courseHighlights.title || "Course Highlights"}</h3>
                  <p className="text-sm">{formValues.courseHighlights.description || "Highlights description"}</p>
                  
                  {formValues.courseHighlights.features && formValues.courseHighlights.features.length > 0 ? (
                    <ul className="space-y-3">
                      {formValues.courseHighlights.features.map((feature, index) => {
                        const key = Object.keys(feature)[0];
                        const value = feature[key];
                        return (
                          <li key={index} className="grid grid-cols-12 gap-3 text-sm">
                            <div className="col-span-4 font-medium text-violet-800">{key || "Feature name"}</div>
                            <div className="col-span-8">{value || "Feature description"}</div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No features added yet</p>
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{formValues.courseDetails.title || "Course Details"}</h3>
                  
                  {formValues.courseDetails.schedule && formValues.courseDetails.schedule.length > 0 ? (
                    <ul className="space-y-2">
                      {formValues.courseDetails.schedule.map((item, index) => {
                        const key = Object.keys(item)[0];
                        const value = item[key];
                        return (
                          <li key={index} className="grid grid-cols-12 gap-3 text-sm">
                            <div className="col-span-4 font-medium text-violet-800">{key || "Schedule item"}</div>
                            <div className="col-span-8">{value || "Schedule value"}</div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No schedule items added yet</p>
                  )}
                  
                  <p className="text-sm font-medium mt-4">Platform:</p>
                  <p className="text-sm">{formValues.courseDetails.platform || "Platform information"}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4 bg-muted/30 p-4 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-violet-800">Course Fee:</p>
                      <p className="text-sm">{formValues.courseDetails.fees.courseFee || "Fee information"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-violet-800">Scholarships:</p>
                      <p className="text-sm">{formValues.courseDetails.fees.scholarships || "Scholarship information"}</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4 bg-violet-50 p-4 rounded-md">
                  <h3 className="text-lg font-semibold text-violet-900">{formValues.callToAction.title || "Call to Action"}</h3>
                  <p className="text-sm">{formValues.callToAction.description || "Description"}</p>
                  <p className="text-sm italic mt-2 text-violet-700">{formValues.callToAction.encouragement || "Encouragement message"}</p>
                  <Button className="mt-2 bg-violet-600 hover:bg-violet-700">Enroll Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 