import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useThemeContext } from "./context/ThemeContext.jsx";
import { useEffect } from "react";
import HomePage from "./pages/Homepage.js";
import CSRF from "./components/csrf-injector/csrf-test.js";

function App() {
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const router = createBrowserRouter([
    {
      path: "/",
      // element: <RootPageLayout />,
      errorElement: <HomePage />,
      children: [
        { path: "/", element: <HomePage /> },

        {
          path: "/test",
          element: <CSRF />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
