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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DownloadCloud,
  FileText,
  FileCheck,
  Search,
  Award,
  Trash2,
  Share2,
  Filter,
  Upload,
  Eye,
  Calendar,
  Clock,
  CheckCircle,
  Info,
  Link2,
  Printer,
  MoreHorizontal,
  FileArchive,
  Mail,
  ExternalLink,
  User
} from "lucide-react";
import { 
  Select, 
  SelectContent,  
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for documents
const documentsData = [
  {
    id: 1,
    name: "Course Certificate - Arabic Foundations",
    type: "certificate",
    fileType: "PDF",
    size: "1.2 MB",
    uploadDate: "Mar 15, 2023",
    status: "verified",
    course: "Arabic Foundations",
    downloadUrl: "#",
    thumbnailUrl: "https://placehold.co/600x400/e9f5fa/102030?text=Certificate"
  },
  {
    id: 2,
    name: "Student ID Card",
    type: "id",
    fileType: "PDF",
    size: "0.8 MB",
    uploadDate: "Jan 10, 2023",
    status: "verified",
    downloadUrl: "#",
    thumbnailUrl: "https://placehold.co/600x400/f9f5ea/102030?text=ID+Card"
  },
  {
    id: 3,
    name: "Enrollment Confirmation - Islamic Studies Program",
    type: "enrollment",
    fileType: "PDF",
    size: "0.5 MB",
    uploadDate: "Feb 22, 2023",
    status: "verified",
    downloadUrl: "#",
    thumbnailUrl: "https://placehold.co/600x400/eaf9f5/102030?text=Enrollment"
  },
  {
    id: 4,
    name: "Previous Education Transcript",
    type: "transcript",
    fileType: "PDF",
    size: "2.3 MB",
    uploadDate: "Dec 05, 2022",
    status: "pending",
    downloadUrl: "#",
    thumbnailUrl: "https://placehold.co/600x400/f5eaf9/102030?text=Transcript"
  },
  {
    id: 5,
    name: "Course Certificate - Tajweed Fundamentals",
    type: "certificate",
    fileType: "PDF",
    size: "1.4 MB",
    uploadDate: "Feb 14, 2023",
    status: "verified",
    course: "Tajweed Fundamentals",
    downloadUrl: "#",
    thumbnailUrl: "https://placehold.co/600x400/e9f5fa/102030?text=Certificate"
  },
];

// Mock data for achievement certificates
const certificatesData = [
  {
    id: 1,
    name: "Arabic Foundations",
    issueDate: "Mar 15, 2023",
    instructor: "Prof. Aisha Rahman",
    grade: "A",
    duration: "12 weeks",
    downloadUrl: "#",
    shareUrl: "#",
    thumbnailUrl: "https://placehold.co/600x400/e9f5fa/102030?text=Arabic+Certificate"
  },
  {
    id: 2,
    name: "Tajweed Fundamentals",
    issueDate: "Feb 14, 2023",
    instructor: "Qari Yusuf",
    grade: "A-",
    duration: "8 weeks",
    downloadUrl: "#",
    shareUrl: "#",
    thumbnailUrl: "https://placehold.co/600x400/e9f5fa/102030?text=Tajweed+Certificate"
  },
  {
    id: 3,
    name: "Islamic Etiquette",
    issueDate: "Oct 22, 2022",
    instructor: "Shaykh Ibrahim",
    grade: "B+",
    duration: "6 weeks",
    downloadUrl: "#",
    shareUrl: "#",
    thumbnailUrl: "https://placehold.co/600x400/e9f5fa/102030?text=Etiquette+Certificate"
  },
];

// Mock data for document upload progress
const uploadProgressData = {
  totalStorage: 1024, // MB
  usedStorage: 87.4, // MB
  files: [
    { name: "uploading-file.pdf", progress: 65, size: "3.2 MB" },
  ]
};

// Define types for certificates
interface Certificate {
  id: number;
  name: string;
  issueDate: string;
  instructor: string;
  grade: string;
  duration: string;
  downloadUrl: string;
  shareUrl: string;
  thumbnailUrl: string;
}

const DocumentsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  
  // Filter documents based on search and filter
  const filteredDocuments = documentsData.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "certificates" && doc.type === "certificate") ||
                      (activeTab === "other" && doc.type !== "certificate");
    
    return matchesSearch && matchesType && matchesTab;
  });

  // Handle sharing a certificate
  const handleShareCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setShareDialogOpen(true);
  };

  // Calculate storage usage percentage
  const storageUsagePercent = (uploadProgressData.usedStorage / uploadProgressData.totalStorage) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">
          Manage your certificates, transcripts, and other important documents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Documents List - Takes up 2/3 of the grid on medium screens and up */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Your Documents</CardTitle>
                <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Upload className="h-4 w-4 mr-2" /> Upload Documents
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Document</DialogTitle>
                      <DialogDescription>
                        Upload a new document to your account. Supported formats: PDF, JPG, PNG.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="document-type">Document Type</Label>
                        <Select>
                          <SelectTrigger id="document-type">
                            <SelectValue placeholder="Select document type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="id">ID Document</SelectItem>
                            <SelectItem value="transcript">Academic Transcript</SelectItem>
                            <SelectItem value="certificate">Certificate</SelectItem>
                            <SelectItem value="enrollment">Enrollment Confirmation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="document-name">Document Name</Label>
                        <Input id="document-name" placeholder="Enter document name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="document-file">Document File</Label>
                        <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-accent transition-colors cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">Click to browse files</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            or drag and drop here
                          </p>
                          <input type="file" className="hidden" id="document-file" />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Maximum file size: 10MB
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setUploadDialogOpen(false)}>
                        Upload Document
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                Access and manage your official documents and certificates
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <Tabs 
                defaultValue="all" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All Documents</TabsTrigger>
                  <TabsTrigger value="certificates">Certificates</TabsTrigger>
                  <TabsTrigger value="other">Other Documents</TabsTrigger>
                </TabsList>
                <div className="flex flex-col sm:flex-row justify-between p-4 gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search documents..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="certificate">Certificates</SelectItem>
                      <SelectItem value="id">ID Documents</SelectItem>
                      <SelectItem value="transcript">Transcripts</SelectItem>
                      <SelectItem value="enrollment">Enrollment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border-t">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                            No documents found matching your criteria
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDocuments.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                  {doc.type === 'certificate' ? (
                                    <Award className="h-5 w-5 text-primary" />
                                  ) : doc.type === 'id' ? (
                                    <FileCheck className="h-5 w-5 text-primary" />
                                  ) : (
                                    <FileText className="h-5 w-5 text-primary" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-sm">{doc.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {doc.fileType} • {doc.size}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">
                                {doc.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">{doc.uploadDate}</TableCell>
                            <TableCell>
                              {doc.status === 'verified' ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <CheckCircle className="h-3.5 w-3.5 mr-1" /> Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                  <Clock className="h-3.5 w-3.5 mr-1" /> Pending
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem asChild>
                                    <a className="flex items-center justify-center" href={doc.downloadUrl} download>
                                      <DownloadCloud className="h-4 w-4 mr-2" /> Download
                                    </a>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" /> View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Printer className="h-4 w-4 mr-2" /> Print
                                  </DropdownMenuItem>
                                  {doc.type === 'certificate' && (
                                    <DropdownMenuItem>
                                      <Share2 className="h-4 w-4 mr-2" /> Share
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Certificates and Storage Info - Takes up 1/3 of the grid on medium screens and up */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>Achievement Certificates</span>
              </CardTitle>
              <CardDescription>
                Certificates earned for completed courses
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-4">
                {certificatesData.map((cert) => (
                  <Card key={cert.id} className="overflow-hidden">
                    <div className="aspect-[1.6/1] w-full relative">
                      <img 
                        src={cert.thumbnailUrl} 
                        alt={cert.name} 
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-white/80 text-primary">
                          {cert.grade}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-base">{cert.name}</h3>
                      <div className="mt-1 space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1.5" />
                          <span>Issued on {cert.issueDate}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-3.5 w-3.5 mr-1.5" />
                          <span>Instructor: {cert.instructor}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1.5" />
                          <span>Duration: {cert.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a className="flex items-center justify-center" href={cert.downloadUrl} download>
                          <DownloadCloud className="h-3.5 w-3.5 mr-1.5" /> Download
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleShareCertificate(cert)}
                      >
                        <Share2 className="h-3.5 w-3.5 mr-1.5" /> Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileArchive className="h-5 w-5" />
                <span>Storage</span>
              </CardTitle>
              <CardDescription>
                Document storage usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Used Space</span>
                  <span className="font-medium">{uploadProgressData.usedStorage} MB / {uploadProgressData.totalStorage} MB</span>
                </div>
                <Progress value={storageUsagePercent} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {(uploadProgressData.totalStorage - uploadProgressData.usedStorage).toFixed(1)} MB available
                </p>
              </div>

              {uploadProgressData.files.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium mb-2">Uploading</h3>
                    {uploadProgressData.files.map((file, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>{file.name}</span>
                          <span>{file.progress}%</span>
                        </div>
                        <Progress value={file.progress} className="h-1" />
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <Alert className="mt-4 border">
                <Info className="h-4 w-4" />
                <AlertTitle>Document Guidelines</AlertTitle>
                <AlertDescription className="text-xs">
                  <ul className="list-disc pl-4 space-y-1 mt-2">
                    <li>Maximum file size: 10MB per document</li>
                    <li>Supported formats: PDF, JPG, PNG</li>
                    <li>Certificates are verified within 24-48 hours</li>
                    <li>Keep your documents secure by managing access</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Share Certificate Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Certificate</DialogTitle>
            <DialogDescription>
              Share your achievement certificate with others
            </DialogDescription>
          </DialogHeader>
          {selectedCertificate && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{selectedCertificate.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Issued on {selectedCertificate.issueDate}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Direct Link</Label>
                <div className="flex">
                  <Input 
                    value={`https://an-nahda-academy.com/certificates/${selectedCertificate.id}`}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button variant="secondary" className="rounded-l-none">
                    <Link2 className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone with this link can view your certificate
                </p>
              </div>
              
              <div className="space-y-3">
                <Label>Share via</Label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" /> LinkedIn
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" /> Email
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        More options
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input type="checkbox" id="public-certificate" className="rounded border-gray-300" />
                <Label htmlFor="public-certificate" className="text-xs">
                  Make this certificate publicly searchable on An-Nahda Academy directory
                </Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShareDialogOpen(false)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentsPage; 