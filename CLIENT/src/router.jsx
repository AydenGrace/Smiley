import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage";
import {rootLoader} from "./loaders/rootLoader";
import Privacy from "./pages/Privacy";
import Legals from "./pages/Legals";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";

export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <App />,
        loader: rootLoader,
        children: [
          {
            path: "/",
            element: <Homepage />,
          },
          {
            path: "/privacy",
            element: <Privacy />,
          },
          {
            path: "/legals",
            element: <Legals />,
          },
          {
            path: "/terms",
            element: <Terms />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
        ],
      },
    ],
  },
]);
