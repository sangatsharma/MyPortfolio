import * as React from "react";
import { useThemeContext } from "../context/ThemeContext";

interface IAboutPageProps {}

const AboutPage: React.FunctionComponent<IAboutPageProps> = () => {
  const { isDarkMode } = useThemeContext();
  return (
    <div className="mt-2 h-auto p-2" id="">
      <section className="flex hover:scale-110 transition-all duration-200">
        <svg
          width="86"
          height="84"
          viewBox="0 0 86 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="null"
          className="svg replaced-svg"
        >
          <path
            d="M69.0582 4.99535C65.3229 5.61907 55.8542 10.8508 56.4184 19.5008M56.4184 19.5008C56.5793 21.9679 56.8094 25.1691 59.6334 27.5088C62.587 29.9561 68.4982 24.1091 56.4184 19.5008ZM56.4184 19.5008C49.582 17.0957 34.9948 15.9707 31.3373 30.7119C29.092 42.3255 34.8382 56.3213 37.9206 65.5494C30.8166 54.4724 12.9204 41.5234 3.33571 40.3222"
            stroke="#FED546"
            strokeWidth="3"
          ></path>
          <path
            d="M67.8098 9.30162L68.8675 4.76205L64.3162 3.75612L64.6426 2.35513L70.5986 3.67151L69.2144 9.61209L67.8098 9.30162Z"
            fill="#FED546"
          ></path>
          <path
            d="M26.009 78.4559C26.089 77.1822 26.6883 73.8048 28.4447 70.4841"
            stroke="#FED546"
            strokeWidth="3"
          ></path>
          <path
            d="M4.8413 78.3261C8.24607 74.6684 16.8723 66.8695 24.1393 64.9358"
            stroke="#FED546"
            strokeWidth="3"
          ></path>
          <path
            d="M55.3976 5.34016C53.6747 5.2429 50.2912 8.86138 51.3227 12.4565"
            stroke="#FED546"
            strokeWidth="3"
          ></path>
        </svg>
        <h1 className="text-2xl md:text-4xl mt-8 md:mt-0 ">A Little About Me</h1>
      </section>
      <section>
        <p
          className={`text-md md:pl-12 px-5 md:text-xl ${
            isDarkMode ? " text-[#b9bbc0]" : "text-white"
          } `}
        >
          I am a Full-Stack Developer with a year of experience creating
          engaging web applications using React, Tailwind CSS, Node.js, Express,
          and MongoDB. Based in Pokhara, Nepal, I'm passionate about making the
          complex simple and delivering clean, high-performance code. Whether
          it's building intuitive user interfaces or creating reliable backends,
          I enjoy every step of the development process. I'm excited to
          collaborate with like-minded professionals on projects that push the
          boundaries of web development.
        </p>
      </section>
      <span ></span>
    </div>
  );
};

export default AboutPage;
