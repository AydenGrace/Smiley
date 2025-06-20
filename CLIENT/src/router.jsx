import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage";
import {rootLoader} from "./loaders/rootLoader";

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
        ],
      },
    ],
  },
]);
