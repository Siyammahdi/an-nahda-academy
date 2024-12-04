import Arrengements from "./homepage/sections/Arrengements";
 import Banner from "./homepage/sections/Banner";
import Courses from "./homepage/sections/Courses";
import Discussions from "./homepage/sections/Discussions";

export default function Home() {
  return (
    <div>
      <Banner />
      <Arrengements />
      <Courses/>
      <Discussions/>
    </div>
  );
}
