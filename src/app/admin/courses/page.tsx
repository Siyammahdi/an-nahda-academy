"use client";

import React, { useEffect, useState } from 'react';
import Axios from '@/api/Axios';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Edit, Trash, Plus, Search, Loader2, Eye, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

// Course interface
interface Course {
  _id: string;
  courseName: string;
  imagePath: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    courseName: '',
    imagePath: '',
    title: '',
    description: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);
  
  // Fetch courses function
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await Axios.get('/admin/courses');
      setCourses(response.data);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching courses:', error);
        setError(error.message);
      } else {
        setError('Failed to fetch courses');
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form data
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.courseName.trim()) {
      errors.courseName = 'Course name is required';
    }
    
    if (!formData.imagePath.trim()) {
      errors.imagePath = 'Image path is required';
    }
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Open edit course dialog
  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      courseName: course.courseName,
      imagePath: course.imagePath,
      title: course.title,
      description: course.description
    });
    setFormErrors({});
    setIsEditDialogOpen(true);
  };
  
  // Open delete course dialog
  const openDeleteDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle add course
  const handleAddCourse = async () => {
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Create basic course structure
      const courseData = {
        ...formData,
        introduction: [],
        courseHighlights: {
          title: 'Course Highlights',
          description: 'Key features of this course',
          features: []
        },
        courseDetails: {
          title: 'Course Details',
          schedule: [],
          platform: 'Online',
          fees: {
            courseFee: 'Contact for details',
            scholarships: 'Available'
          }
        },
        callToAction: {
          title: 'Join Now',
          description: 'Start your learning journey today',
          encouragement: 'Unlock your potential'
        }
      };
      
      const response = await Axios.post('/admin/courses', courseData);
      
      // Update courses list
      setCourses(prev => [...prev, response.data]);
      
      // Close dialog
      setIsAddDialogOpen(false);
      
      // Show success message
      toast.success('Course created successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating course:', error);
        toast.error(error.message);
      } else {
        toast.error('Failed to create course');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle update course
  const handleUpdateCourse = async () => {
    if (!selectedCourse || !validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await Axios.put(`/admin/courses/${selectedCourse._id}`, {
        ...formData,
      });
      
      // Update courses list
      setCourses(prev => 
        prev.map(course => 
          course._id === selectedCourse._id ? response.data : course
        )
      );
      
      // Close dialog
      setIsEditDialogOpen(false);
      
      // Show success message
      toast.success('Course updated successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error updating course:', error);
        toast.error(error.message);
      } else {
        toast.error('Failed to update course');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle delete course
  const handleDeleteCourse = async () => {
    if (!selectedCourse) return;
    
    try {
      setIsSubmitting(true);
      
      await Axios.delete(`/admin/courses/${selectedCourse._id}`);
      
      // Update courses list
      setCourses(prev => 
        prev.filter(course => course._id !== selectedCourse._id)
      );
      
      // Close dialog
      setIsDeleteDialogOpen(false);
      
      // Show success message
      toast.success('Course deleted successfully');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error deleting course:', error);
        toast.error(error.message);
      } else {
        toast.error('Failed to delete course');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your academy courses and their content
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link href="/admin/courses/new">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Course
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search courses by name, title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
              <p className="text-2xl font-bold">{courses.length}</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600 opacity-80" />
          </CardContent>
        </Card>
      </div>
      
      {/* Courses Table */}
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0">
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center">
                    {searchTerm ? 'No courses match your search.' : 'No courses have been created yet.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses.map((course) => (
                  <TableRow key={course._id} className="group hover:bg-muted/50">
                    <TableCell className="font-medium">{course.courseName}</TableCell>
                    <TableCell>
                      <div className="max-w-md truncate">{course.title}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {format(new Date(course.createdAt), 'PP')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/courses/${course._id}`} passHref>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(course)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(course)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Add Course Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Course</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                placeholder="Enter course name"
              />
              {formErrors.courseName && (
                <p className="text-sm text-red-500">{formErrors.courseName}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imagePath">Image Path</Label>
              <Input
                id="imagePath"
                name="imagePath"
                value={formData.imagePath}
                onChange={handleInputChange}
                placeholder="Enter image path"
              />
              {formErrors.imagePath && (
                <p className="text-sm text-red-500">{formErrors.imagePath}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter title"
              />
              {formErrors.title && (
                <p className="text-sm text-red-500">{formErrors.title}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                rows={4}
              />
              {formErrors.description && (
                <p className="text-sm text-red-500">{formErrors.description}</p>
              )}
            </div>
          </div>
          
          <div className="pt-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
            <p>Note: Only basic course details are collected here. For comprehensive course creation with all fields, please use the dedicated course creator.</p>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCourse}
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Course'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-courseName">Course Name</Label>
              <Input
                id="edit-courseName"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                placeholder="Enter course name"
              />
              {formErrors.courseName && (
                <p className="text-sm text-red-500">{formErrors.courseName}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-imagePath">Image Path</Label>
              <Input
                id="edit-imagePath"
                name="imagePath"
                value={formData.imagePath}
                onChange={handleInputChange}
                placeholder="Enter image path"
              />
              {formErrors.imagePath && (
                <p className="text-sm text-red-500">{formErrors.imagePath}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter title"
              />
              {formErrors.title && (
                <p className="text-sm text-red-500">{formErrors.title}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                rows={4}
              />
              {formErrors.description && (
                <p className="text-sm text-red-500">{formErrors.description}</p>
              )}
            </div>
          </div>
          
          <div className="pt-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
            <p>Note: For advanced editing of all course fields, please use the dedicated course editor.</p>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateCourse}
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Course'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Course Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete Course</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="bg-red-50 p-4 rounded-md mb-4">
              <p className="text-red-800">
                Warning: This action cannot be undone. Deleting this course will remove all associated data permanently.
              </p>
            </div>
            <p>
              Are you sure you want to delete the course <strong>{selectedCourse?.courseName}</strong>?
            </p>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCourse}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Course'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 