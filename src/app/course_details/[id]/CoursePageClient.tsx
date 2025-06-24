// app/course_details/[id]/CoursePageClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BannerPart from '../_components/BannerPart';
import CourseCard from '../_components/CourseCard';
import { getCourseById, Course } from '@/lib/api';

const CoursePageClient = () => {
  const { id } = useParams() as { id: string };
  const [data, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        const courseData = await getCourseById(id);
        setCourse(courseData);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Failed to load course data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Course not found</p>
        </div>
      </div>
    );
  }

  // Find the course duration from the schedule data
  const findCourseDuration = () => {
    const durationItem = data.courseDetails.schedule.find(item => Object.keys(item)[0] === "courseDuration");
    return durationItem ? Object.values(durationItem)[0] : "Flexible Schedule";
  };

  return (
    <div className="space-y-6">
      <BannerPart
        courseName={data.courseName}
        courseFee={data.courseDetails.fees.courseFee}
        imagePath={data.imagePath}
        courseId={data._id}
        courseDescription={data.description}
        courseDuration={findCourseDuration()}
      />
      <div className='w-full flex md:flex-row flex-col gap-20 items-center'>
        <div className='md:w-4/5 w-full'>
          <h1 className="font-bold">{data.title}</h1>
          <p className='my-4 text-justify'>{data.description}</p>
          <div className="space-y-4">
            {data.introduction.map((intro, index) => (
              <p key={index} className="text-justify">{intro}</p>
            ))}
          </div>
        </div>
        <div className='md:w-2/5 w-full'>
          <CourseCard 
            data={data.courseDetails} 
            courseId={data._id}
            courseName={data.courseName}
            imagePath={data.imagePath}
          />
        </div>
      </div>

      <section>
        <h2 className="font-bold mb-4">{data.courseHighlights?.title}</h2>
        <p className="text-justify">{data.courseHighlights?.description}</p>
        <ul className="list-disc text-sm my-6 pl-5 space-y-2">
          {data.courseHighlights?.features.map((feature, index) => {
            const key = Object.keys(feature)[0];
            const value = feature[key];
            return (
              <li key={index}>
                <span className="font-medium">{key}:</span> {value}
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="font-bold">{data.courseDetails?.title}</h2>
        <ul className="list-disc pl-5 space-y-2 my-4">
          {data.courseDetails?.schedule.map((schedule, index) => {
            const key = Object.keys(schedule)[0];
            const value = schedule[key];
            return (
              <li key={index}>
                <span className="font-medium">{key}:</span> {value}
              </li>
            );
          })}
        </ul>
        <p>
          <span className="font-medium">Platform:</span> {data.courseDetails?.platform}
        </p>
        <p>
          <span className="font-medium">Course Fee:</span> {data.courseDetails?.fees.courseFee}
        </p>
        <p>
          <span className="font-medium">Scholarships:</span> {data.courseDetails?.fees.scholarships}
        </p>
      </section>

      <section>
        <h2 className="font-bold mb-4">{data.callToAction?.title}</h2>
        <p className="text-justify">{data.callToAction?.description}</p>
        <p className="text-justify font-semibold">{data.callToAction?.encouragement}</p>
      </section>
    </div>
  );
};

export default CoursePageClient;
