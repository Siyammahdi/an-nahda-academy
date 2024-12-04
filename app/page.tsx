import Arrengements from "./homepage/sections/Arrengements";
 import Banner from "./homepage/sections/Banner";
import Courses from "./homepage/sections/Courses";
import Discussions from "./homepage/sections/Discussions";
import Publications from "./homepage/sections/Publications";
import StudentComments from "./homepage/sections/StudentComments";

export default function Home() {
  return (
    <div>
      <Banner />
      <Arrengements />
      <Courses/>
      <Discussions/>
      <Publications/>
      <StudentComments/>
    </div>
  );
}
