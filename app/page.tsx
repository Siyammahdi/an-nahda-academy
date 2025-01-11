
import Slider from "@/components/slider";
import Arrengements from "./homepage/sections/Arrengements";
import Banner from "./homepage/sections/Banner";
import Courses from "./homepage/sections/Courses";
import Discussions from "./homepage/sections/Discussions";
// import Publications from "./homepage/sections/Publications";
import StudentComments from "./homepage/sections/StudentComments";
import { Testimonials } from "./homepage/sections/Testimonials";


export default function Home() {
  return (
    <div>
      <div className="absolute mt-32">
        <Slider />
      </div>
      <div className="space-y-48 max-w-7xl mx-auto mb-20">
        <Banner />
        <Arrengements />
        <Courses />
        <Discussions />
        <Testimonials/>
      </div>
    </div>
  );
}
