import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import About from "@/sections/About";
import Stack from "@/sections/Stack";
import GitHubActivity from "@/sections/GitHubActivity";
import Notes from "@/sections/Notes";
import Contact from "@/sections/Contact";

/**
 * Section order is the recruiter's reading order: proof of work first
 * (projects), then trajectory (experience), then the person, then depth.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Stack />
      <GitHubActivity />
      <Notes />
      <Contact />
    </>
  );
}
