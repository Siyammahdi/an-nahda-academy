import React, { ReactNode } from "react";

interface CourseDetailsLayoutProps {
  children: ReactNode;
}

const CourseDetailsLayout: React.FC<CourseDetailsLayoutProps> = ({ children }) => {
  return (
    <div className="h-fit mb-5">
      {children}
    </div>
  );
};

export default CourseDetailsLayout;
