const skills: { [key: string]: string } = {
  html5: "/images/html.svg",
  css3: "/images/css.svg",
  tailwindCss: "/images/tailwindcss.svg",
  Javascript: "/images/js.svg",
  typescript: "/images/typescript.svg",
  reactJs: "/images/reactjs.svg",
  nextJs: "/images/nextjs.svg",
  tanstackQuery: "/images/tanstackquery.svg",
  nodeJs: "/images/nodejs.svg",
  expressJs: "/images/express.svg",
  mongoDB: "/images/mongodb.svg",
  redis: "/images/redis.svg",
};

const Skills: React.FC = () => {
  return (
    <>
      <h1 className="text-xl font-bold text-center mt-6">Tech I Work With</h1>
      <div className="flex flex-wrap gap-2 justify-center p-5">
        {Object.keys(skills).map((skill, index) => (
          <div
            key={index}
            className="md:w-20 md:h-20 h-16 w-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 shadow-md"
          >
            <img
              src={skills[skill]}
              alt={skill}
              className="w-4/5 h-4/5 object-contain"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Skills;
