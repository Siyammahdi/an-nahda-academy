// API service for courses
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://an-nahda-backend.vercel.app/api';

export interface Course {
  _id: string;
  courseName: string;
  imagePath: string;
  title: string;
  description: string;
  introduction: string[];
  courseHighlights: {
    title: string;
    description: string;
    features: { [key: string]: string }[];
  };
  courseDetails: {
    title: string;
    schedule: { [key: string]: string }[];
    platform: string;
    fees: {
      courseFee: string;
      scholarships: string;
    };
  };
  callToAction: {
    title: string;
    description: string;
    encouragement: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Get all courses
export const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get a single course by ID
export const getCourseById = async (id: string): Promise<Course> => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

// Create a new course (admin only)
export const createCourse = async (courseData: Partial<Course>, token: string): Promise<Course> => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Update a course (admin only)
export const updateCourse = async (id: string, courseData: Partial<Course>, token: string): Promise<Course> => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// Delete a course (admin only)
export const deleteCourse = async (id: string, token: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
}; 