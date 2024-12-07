import { Github, Twitter, Dribbble, Facebook } from "lucide-react";
import ContactForm from "../components/ContactForm";
import { useThemeContext } from "../context/ThemeContext";

const ContactSection = () => {
  const { isDarkMode } = useThemeContext();
  return (
    <div className="bg-transparent  gap-2 flex flex-col md:flex-row justify-center  items-center w-full" id="contact">
      <div className="items-center justify-center flex flex-col w-full md:w-1/2">
        {/* Get in touch text */}
        <div className="text-white text-4xl mb-3 mt-2 font-bold order-1">
          Get in touch
        </div>

        {/* Grid layout for contact info */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 order-2 mx-2">
          {/* Phone Card */}
          <div
            className={`${
              isDarkMode
                ? "bg-neutral-800/80"
                : "bg-gradient-to-br from-[#a094d1] to-[#3a81ce] "
            } rounded-xl p-4 relative`}
          >
            <div className="absolute -top-5 left-6">
              <div className="bg-neutral-800/50 p-3 rounded-full">
                <div className="bg-yellow-500 p-2 rounded-full">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-100 mb-2">Phone</p>
              <p className="text-white md:text-xl text-md ">+123 45 678 90</p>
            </div>
          </div>

          {/* Email Card */}
          <div
            className={`${
              isDarkMode
                ? "bg-neutral-800/80"
                : "bg-gradient-to-br from-[#a094d1] to-[#3a81ce]"
            } rounded-xl p-4 relative`}
          >
            <div className="absolute -top-5  md:right-8 right-6">
              <div className="bg-neutral-800/50 p-3 rounded-full">
                <div className="bg-yellow-500 p-2 rounded-full">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-6 ">
              <p className="text-gray-100 mb-2">Email</p>
              <p className="text-white md:text-xl flex flex-wrap overflow-visible">
                sangatsharma2 @gmail.com
              </p>
            </div>
          </div>

          {/* Address Card */}
          <div
            className={`${
              isDarkMode
                ? "bg-neutral-800/80"
                : "bg-gradient-to-br from-[#a094d1] to-[#3a81ce]"
            } rounded-xl p-4 relative`}
          >
            <div className="absolute -top-5 left-6">
              <div className="bg-neutral-800/50 p-3 rounded-full">
                <div className="bg-yellow-500 p-2 rounded-full">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-100 mb-2">Address</p>
              <p className="text-white md:text-xl">Pokhara Nepal</p>
            </div>
          </div>

          {/* Social Media Card */}
          <div
            className={`${
              isDarkMode
                ? "bg-neutral-800/80"
                : "bg-gradient-to-br from-[#a094d1] to-[#3a81ce "
            } rounded-xl p-4 relative`}
          >
            <div className="absolute -top-5  right-6">
              <div className="bg-neutral-800/50 p-3 rounded-full">
                <div className="bg-yellow-500 p-2 rounded-full">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-100 mb-2">Follow Me</p>
              <div className="flex space-x-4">
                <Github className="w-6 h-6 text-white hover:text-yellow-500 cursor-pointer" />
                <Twitter className="w-6 h-6 text-white hover:text-yellow-500 cursor-pointer" />
                <Dribbble className="w-6 h-6 text-white hover:text-yellow-500 cursor-pointer" />
                <Facebook className="w-6 h-6 text-white hover:text-yellow-500 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-2 h-full">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactSection;
