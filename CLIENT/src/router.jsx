import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage";

export const router = createBrowserRouter([
  {
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: "/",
            element: <Homepage />,
          },
        ],
      },
    ],
  },
]);
