"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Video, Download, Book, Bookmark, ExternalLink } from "lucide-react";
import Link from "next/link";

// Mock data for resources
const resourcesData = {
  documents: [
    {
      id: 1,
      title: "Arabic Grammar Fundamentals",
      description: "Basic grammatical structures in Arabic language",
      category: "Grammar",
      type: "PDF",
      size: "2.4 MB",
      dateAdded: "Mar 15, 2023",
      url: "#",
    },
    {
      id: 2,
      title: "Quranic Vocabulary Guide",
      description: "Common vocabulary found in the Quran with meanings",
      category: "Vocabulary",
      type: "PDF",
      size: "1.8 MB",
      dateAdded: "Feb 22, 2023",
      url: "#",
    },
    {
      id: 3,
      title: "Tajweed Rules Cheat Sheet",
      description: "Quick reference for common tajweed rules",
      category: "Tajweed",
      type: "PDF",
      size: "0.5 MB",
      dateAdded: "Apr 5, 2023",
      url: "#",
    },
  ],
  videos: [
    {
      id: 1,
      title: "Introduction to Arabic Letters",
      description: "Learn the Arabic alphabet and pronunciation",
      category: "Beginner",
      duration: "45 mins",
      instructor: "Shaikh Ahmed",
      dateAdded: "Jan 12, 2023",
      thumbnail: "https://placehold.co/400x225/e9f5fa/102030?text=Arabic+Letters",
      url: "#",
    },
    {
      id: 2,
      title: "Tajweed Pronunciation Practice",
      description: "Practical exercises for proper Quranic recitation",
      category: "Tajweed",
      duration: "30 mins",
      instructor: "Ustadh Mohammed",
      dateAdded: "Mar 3, 2023",
      thumbnail: "https://placehold.co/400x225/f5e9fa/102030?text=Tajweed+Practice",
      url: "#",
    },
  ],
  books: [
    {
      id: 1,
      title: "Foundations of Islamic Studies",
      description: "Comprehensive introduction to Islamic principles",
      author: "Dr. Abdullah Hakim",
      category: "Islamic Studies",
      pages: 324,
      dateAdded: "Feb 5, 2023",
      thumbnail: "https://placehold.co/180x250/faf5e9/102030?text=Islamic+Studies",
      url: "#",
    },
    {
      id: 2,
      title: "Arabic For Beginners",
      description: "Step-by-step guide to learning Arabic",
      author: "Prof. Aisha Rahman",
      category: "Language",
      pages: 256,
      dateAdded: "Jan 20, 2023",
      thumbnail: "https://placehold.co/180x250/e9faf5/102030?text=Arabic+Guide",
      url: "#",
    },
  ],
  websites: [
    {
      id: 1,
      title: "Quran.com",
      description: "Online Quran with translations and recitations",
      category: "Quran",
      url: "https://quran.com",
    },
    {
      id: 2,
      title: "Arabic Learning Resources",
      description: "Free tools and exercises for Arabic language learners",
      category: "Language",
      url: "https://arabic101.org",
    },
  ],
};

const LearningResourcesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Learning Resources</h1>
        <p className="text-muted-foreground">
          Access study materials, documents, videos, and external resources
        </p>
      </div>

      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="websites">Websites</TabsTrigger>
        </TabsList>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <div className="grid gap-4">
            {resourcesData.documents.map((doc) => (
              <Card key={doc.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 mt-1 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{doc.title}</CardTitle>
                        <CardDescription>{doc.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{doc.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div>Type: {doc.type}</div>
                    <div>Size: {doc.size}</div>
                    <div>Added: {doc.dateAdded}</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link className="flex items-center justify-center" href={doc.url}>
                      <Download className="mr-2 h-4 w-4 mb-1" /> Download Document
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Videos Tab */}
        <TabsContent value="videos">
          <div className="grid gap-4 md:grid-cols-2">
            {resourcesData.videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="relative aspect-video w-full bg-muted">
                  {/* Video thumbnail */}
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/50 p-3 text-white hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                      <Video className="h-8 w-8" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                    <Badge variant="outline">{video.category}</Badge>
                  </div>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div>Instructor: {video.instructor}</div>
                    <div>Duration: {video.duration}</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link className="flex items-center justify-center" href={video.url}>
                      <Video className="mr-2 h-4 w-4" /> Watch Video
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Books Tab */}
        <TabsContent value="books">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resourcesData.books.map((book) => (
              <Card key={book.id} className="overflow-hidden">
                <div className="flex p-6">
                  <div className="shrink-0 mr-4">
                    <img 
                      src={book.thumbnail} 
                      alt={book.title} 
                      className="w-20 h-28 object-cover rounded-md shadow-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                    <Badge variant="outline" className="mt-2">{book.category}</Badge>
                    <p className="text-xs mt-2">{book.pages} pages</p>
                  </div>
                </div>
                <Separator />
                <CardContent className="pt-4 pb-2">
                  <p className="text-sm">{book.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link className="flex items-center justify-center" href={book.url}>
                      <Book className="mr-2 h-4 w-4" /> Read
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Bookmark className="mr-2 h-4 w-4" /> Bookmark
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Websites Tab */}
        <TabsContent value="websites">
          <div className="grid gap-4">
            {resourcesData.websites.map((site) => (
              <Card key={site.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg flex items-center">
                      <ExternalLink className="h-5 w-5 mr-2 text-primary" />
                      {site.title}
                    </CardTitle>
                    <Badge>{site.category}</Badge>
                  </div>
                  <CardDescription>{site.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href={site.url} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningResourcesPage; 