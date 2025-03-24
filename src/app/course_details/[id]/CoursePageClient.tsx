// app/course_details/[id]/CoursePageClient.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BannerPart from '../_components/BannerPart';
import CourseCard from '../_components/CourseCard';

interface Feature {
  [key: string]: string;
}

interface CourseData {
  id: number;
  courseName: string;
  title: string;
  description: string;
  introduction: string[];
  courseHighlights: {
    title: string;
    description: string;
    features: Feature[];
  };
  courseDetails: {
    title: string;
    schedule: { [key: string]: string }[];
    platform: string;
    fees: {
      courseFee: string;
      scholarships: string;
    };
    language: string;
    ageRequirement: string;
    duration: string;
    startingTime: string;
  };
  callToAction: {
    title: string;
    description: string;
    encouragement: string;
  };
  imagePath: string;
}

const CoursePageClient = () => {
  const { id } = useParams() as { id: string };
  const [data, setCourse] = useState<CourseData | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await fetch('/courseData.json');
        const allData: CourseData[] = await res.json();
        const foundCourse = allData.find((course) => course.id === Number(id));
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          console.error('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [id]);

  if (!data) {
    return <p className='h-screen text-3xl'>Loading...</p>;
  }

  console.log(data);

  return (
    <div className="space-y-6">
      <BannerPart
        courseName={data.courseName}
        courseFee={data.courseDetails.fees.courseFee}
        imagePath={data.imagePath}
      />
      <div className='w-full flex md:flex-row flex-col gap-20 items-center'>
        <div className='w-4/5 '>
          <h1 className="font-bold">{data.title}</h1>
          <p className='my-4 text-justify'>{data.description}</p>
          <div className="space-y-4">
            {data.introduction.map((intro, index) => (
              <p key={index} className="text-justify">{intro}</p>
            ))}
          </div>
        </div>
        <div className='md:w-2/5 w-full'>
          <CourseCard data={data.courseDetails} />
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
