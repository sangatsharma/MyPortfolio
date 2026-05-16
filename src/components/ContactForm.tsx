import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useThemeContext } from "../context/ThemeContext";

// Define the type for form values
interface FormValues {
  message: string;
  name: string;
  email: string;
}

const ContactForm: React.FC = () => {
  const { isDarkMode } = useThemeContext();

  const formik = useFormik<FormValues>({
    initialValues: {
      message: "",
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required("Message is required"),
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (
      values: FormValues,
      { resetForm }: FormikHelpers<FormValues>
    ) => {
      console.log(JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  // Define base styles for input and textarea fields
  const baseInputStyles = `w-full relative  p-4 rounded-lg border focus:outline-none focus:ring-2 ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-white focus:ring-gray-400"
      : "bg-gray-100 border-gray-300 text-gray-800 focus:ring-orange-500"
  }`;

  // Define base styles for error messages
  const errorStyles = "text-red-500  text-sm pl-2";

  return (
    <div
      className={`p-4 backdrop-blur-sm text-left ${
        isDarkMode ? "bg-transparent text-white" : "bg-transparent text-white-800 "
      }  rounded-lg`}
    >
      {/* Form title */}
      <h2 className="text-2xl font-bold mt-2 py-2">Send me a message</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-2">
        <div>
          {/* Message textarea */}
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            className={`${baseInputStyles} h-28 resize-none`}
            aria-label="Enter your message"
          />
          {/* Error message for message */}
          {formik.touched.message && formik.errors.message && (
            <div className={errorStyles}>{formik.errors.message}</div>
          )}
        </div>
        <div>
          {/* Name input */}
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={baseInputStyles}
            aria-label="Enter your name"
          />
          {/* Error message for name */}
          {formik.touched.name && formik.errors.name && (
            <div className={errorStyles}>{formik.errors.name}</div>
          )}
        </div>
        <div>
          {/* Email input */}
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={baseInputStyles}
            aria-label="Enter your email address"
          />
          {/* Error message for email */}
          {formik.touched.email && formik.errors.email && (
            <div className={errorStyles}>{formik.errors.email}</div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
