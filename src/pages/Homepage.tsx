import * as React from "react";
import Navbar from "../components/Navbar";
import Intro from "../components/Hero";
import CursorFollower from "../components/Cursorfollower";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  return (
    <div className="flex flex-col text-center md:text-left">
      <CursorFollower />
      <Navbar />
      <main className="mx-auto px-4 text-center md:text-left lg:px-[20%] mt-10 md:mt-20  scroll-m-8">
        <Intro />
      </main>
      <div className="h-screen">
        About me
      </div>
      <div className="h-screen">
        About me
      </div>
    </div>
  );
};

export default HomePage;
