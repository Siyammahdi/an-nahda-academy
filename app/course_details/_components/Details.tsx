"use client";
import React, { useState, useEffect } from "react";

interface Feature {
  [key: string]: string;
}

interface CourseData {
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
      monthlyFee: string;
      scholarships: string;
    };
  };
  callToAction: {
    title: string;
    description: string;
    encouragement: string;
  };
}

export default function Details() {
  const [data, setData] = useState<CourseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/courseData.json"); // Ensure this path points to your JSON file
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError((err as Error).message);
        console.error("Error fetching data:", err);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-5 space-y-6">
      <h1 className="font-bold">{data.title}</h1>
      <p className="">{data.description}</p>

      <div className="space-y-4">
        {data.introduction.map((intro, index) => (
          <p key={index} className="text-justify">
            {intro}
          </p>
        ))}
      </div>

      <section>
        <h2 className="font-bold mb-4">{data.courseHighlights.title}</h2>
        <p className="text-justify">{data.courseHighlights.description}</p>
        <ul className="list-disc text-sm my-6 pl-5 space-y-2">
          {data.courseHighlights.features.map((feature, index) => {
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
        <h2 className="font-bold">{data.courseDetails.title}</h2>
        <ul className="list-disc pl-5 space-y-2 my-4">
          {data.courseDetails.schedule.map((schedule, index) => {
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
          <span className="font-medium">Platform:</span> {data.courseDetails.platform}
        </p>
        <p>
          <span className="font-medium">Monthly Fee:</span> {data.courseDetails.fees.monthlyFee}
        </p>
        <p>
          <span className="font-medium">Scholarships:</span> {data.courseDetails.fees.scholarships}
        </p>
      </section>

      <section>
        <h2 className="font-bold mb-4">{data.callToAction.title}</h2>
        <p className="text-justify">{data.callToAction.description}</p>
        <p className="text-justify font-semibold">{data.callToAction.encouragement}</p>
      </section>
    </div>
  );
}
