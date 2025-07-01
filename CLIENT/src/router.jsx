import {createBrowserRouter} from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage";
import {rootLoader} from "./loaders/rootLoader";
import Privacy from "./pages/Privacy";
import Legals from "./pages/Legals";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import {shopLoader} from "./loaders/shopLoader";
import Login from "./pages/Login";
import UserNotConnected from "./secure/UserNotConnected";
import UserConnected from "./secure/UserConnected";
// import Account from "./pages/Account";
// import AccountOrders from "./pages/AccountOrders";
// import AccountFavorites from "./pages/AccountFavorites";
// import AccountSettings from "./pages/AccountSettings";
import Logout from "./pages/Logout";

export const router = createBrowserRouter([
  {
    element: <App />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/logout",
        element: (
          <UserConnected>
            <Logout />
          </UserConnected>
        ),
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
      {
        path: "/shop",
        loader: shopLoader,
        element: <Shop />,
      },
      {
        path: "/login",
        element: (
          <UserNotConnected>
            <Login />
          </UserNotConnected>
        ),
      },
    ],
  },
]);
