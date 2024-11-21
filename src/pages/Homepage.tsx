import * as React from "react";
import Navbar from "../components/Navbar";
import Intro from "../components/Hero";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  return (
    <div>
      <Navbar />
      <main className="mx-auto px-4 lg:px-[20%] mt-4">
        <Intro />
      </main>
    </div>
  );
};

export default HomePage;
