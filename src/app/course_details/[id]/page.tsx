
// export async function generateStaticParams() {

//     return [
//       { id: '1' },
//       { id: '2' },
//       { id: '3' },
//       { id: '4' },

//     ];
//   }
  
  import CoursePageClient from './CoursePageClient';
  
  const CoursePage = () => {
    return (
      <div className="p-5 space-y-6 max-w-7xl mx-auto">
        <CoursePageClient />
      </div>
    );
  };
  
  export default CoursePage;
  