import Axios from './Axios';
import { AxiosError } from 'axios';

// Types
export interface CourseDto {
  _id: string;
  title: string;
  description: string;
  courseName: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

// Admin Courses API services
export const AdminCoursesAPI = {
  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await Axios.get<{ success: boolean; count: number; data: CourseDto[] }>('/admin/courses');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to get courses' };
    }
  },
  
  // Get a course by id
  getCourse: async (courseId: string) => {
    try {
      const response = await Axios.get<{ success: boolean; data: CourseDto }>(`/admin/courses/${courseId}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to get course' };
    }
  },
  
  // Create a new course
  createCourse: async (courseData: { 
    title: string; 
    description: string; 
    courseName: string;
    imagePath?: string;
  }) => {
    try {
      const response = await Axios.post<{ success: boolean; data: CourseDto }>('/admin/courses', courseData);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to create course' };
    }
  },
  
  // Update a course
  updateCourse: async (
    courseId: string, 
    courseData: {
      title?: string;
      description?: string;
      courseName?: string;
      imagePath?: string;
    }
  ) => {
    try {
      const response = await Axios.put<{ success: boolean; data: CourseDto }>(
        `/admin/courses/${courseId}`, 
        courseData
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to update course' };
    }
  },
  
  // Delete a course
  deleteCourse: async (courseId: string) => {
    try {
      const response = await Axios.delete<{ success: boolean; message: string }>(`/admin/courses/${courseId}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to delete course' };
    }
  },
}; 