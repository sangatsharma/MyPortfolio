import SmoothScroll from "../components/SmoothScroll";
import Cursor from "../components/Cursor";
import Nav from "../components/Nav";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import Achievements from "../sections/Achievements";
import Contact from "../sections/Contact";

const HomePage: React.FC = () => {
  return (
    <SmoothScroll>
      {/* Cinematic backdrop layers (fixed, behind everything) */}
      <div className="bg-cinematic" aria-hidden />
      <div className="bg-grain" aria-hidden />

      <Cursor />
      <Nav />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </SmoothScroll>
  );
};

export default HomePage;
