import * as React from "react";
import Navbar from "../components/Navbar";
import Intro from "../components/Hero";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  return (
    <div className="flex flex-col text-center md:text-left">
      <Navbar />
      <main className="mx-auto px-4 text-center md:text-left lg:px-[20%] md:mt-20">
        <Intro />
      </main>
    </div>
  );
};

export default HomePage;
