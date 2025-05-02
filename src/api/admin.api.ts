import Axios from './Axios';
import { AxiosError } from 'axios';

// Types
export interface UserDto {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminActivityDto {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  action: string;
  details: string;
  resourceType: string;
  resourceId?: string;
  ip: string;
  timestamp: string;
}

export interface AdminSettingDto {
  _id: string;
  setting: string;
  value: string;
  description: string;
  lastUpdated: string;
  updatedBy: string;
}

export interface DashboardStatsDto {
  stats: {
    users: number;
    admins: number;
    courses: number;
  };
  recentActivities: AdminActivityDto[];
  newUsers: UserDto[];
}

export interface PaginationResult<T> {
  count: number;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
  data: T[];
}

interface ErrorResponse {
  success: boolean;
  message: string;
}

// Admin API services
export const AdminAPI = {
  // =========== Users ===========
  
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await Axios.get<{ success: boolean; count: number; data: UserDto[] }>('/admin/users');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to get users' };
    }
  },
  
  // Get a user by id
  getUser: async (userId: string) => {
    try {
      const response = await Axios.get<{ success: boolean; data: UserDto }>(`/admin/users/${userId}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to get user' };
    }
  },
  
  // Create a new user
  createUser: async (userData: { name: string; email: string; password: string; role?: string }) => {
    try {
      const response = await Axios.post<{ success: boolean; data: UserDto }>('/admin/users', userData);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to create user' };
    }
  },
  
  // Update a user
  updateUser: async (userId: string, userData: { name?: string; email?: string; role?: string }) => {
    try {
      const response = await Axios.put<{ success: boolean; data: UserDto }>(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to update user' };
    }
  },
  
  // Delete a user
  deleteUser: async (userId: string) => {
    try {
      const response = await Axios.delete<{ success: boolean; message: string }>(`/admin/users/${userId}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to delete user' };
    }
  },
  
  // =========== Dashboard ===========
  
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await Axios.get<{ success: boolean; data: DashboardStatsDto }>('/admin/dashboard');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to get dashboard stats' };
    }
  },
  
  // =========== Activity Logs ===========
  
  // Get activity logs with pagination
  getActivityLogs: async (page = 1, limit = 10) => {
    try {
      const response = await Axios.get<{ 
        success: boolean; 
        count: number;
        pagination: { page: number; limit: number; totalPages: number };
        data: AdminActivityDto[]
      }>(`/admin/activity-logs?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to get activity logs' };
    }
  },
  
  // =========== Settings ===========
  
  // Get all settings
  getSettings: async () => {
    try {
      const response = await Axios.get<{ success: boolean; data: AdminSettingDto[] }>('/admin/settings');
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to get settings' };
    }
  },
  
  // Update a setting
  updateSetting: async (
    settingName: string, 
    data: { value: string; description?: string }
  ) => {
    try {
      const response = await Axios.put<{ success: boolean; data: AdminSettingDto }>(
        `/admin/settings/${settingName}`,
        data
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { success: false, message: 'Failed to update setting' };
    }
  },
}; 