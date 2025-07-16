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
import {orderLoader} from "./loaders/accountLoader";

import Login from "./pages/Login";
import UserNotConnected from "./secure/UserNotConnected";
import UserConnected from "./secure/UserConnected";
import Account from "./pages/Account";
import AccountOrders from "./pages/AccountOrders";
import AccountFavorites from "./pages/AccountFavorites";
import AccountSettings from "./pages/AccountSettings";
import Logout from "./pages/Logout";
import ChangeEmail from "./pages/ChangeEmail";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ForgottenPwd from "./pages/ForgottenPwd";
import ChangePwd from "./pages/ChangePwd";
import ArticleDetails from "./pages/ArticleDetails";
import Cart from "./pages/Cart";
import ValidateCart from "./pages/ValidateCart";
import OrderSuccess from "./pages/OrderSuccess";
import OrderCancel from "./pages/OrderCancel";
import OrderDetails from "./pages/OrderDetails";
import AdminPanel from "./pages/AdminPanel";
import AdminConnected from "./secure/AdminConnected";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArticles from "./pages/AdminArticles";
import AdminSales from "./pages/AdminSales";

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
        path: "/change-email/:token",
        element: <ChangeEmail />,
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
        path: "/contact/:object?",
        element: <Contact />,
      },
      {
        path: "/shop",
        loader: shopLoader,
        element: <Shop />,
      },
      {
        path: "/details/:id",
        element: <ArticleDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin",
        element: (
          <UserConnected>
            <AdminConnected>
              <AdminPanel />
            </AdminConnected>
          </UserConnected>
        ),
        children: [
          {
            index: 1,
            element: <AdminDashboard />,
          },
          {
            path: "articles",
            element: <AdminArticles />,
          },
          {
            path: "sales",
            element: <AdminSales />,
          },
        ],
      },
      {
        path: "/validate-cart",
        element: (
          <UserConnected>
            <ValidateCart />
          </UserConnected>
        ),
      },
      {
        path: "/order-success/:id",
        element: (
          <UserConnected>
            <OrderSuccess />
          </UserConnected>
        ),
      },
      {
        path: "/order-failed/:id",
        element: (
          <UserConnected>
            <OrderCancel />
          </UserConnected>
        ),
      },
      {
        path: "/order-details/:id",
        element: (
          <UserConnected>
            <OrderDetails />
          </UserConnected>
        ),
      },
      {
        path: "/login",
        element: (
          <UserNotConnected>
            <Login />
          </UserNotConnected>
        ),
      },
      {
        path: "/forgot",
        element: (
          <UserNotConnected>
            <ForgottenPwd />
          </UserNotConnected>
        ),
      },
      {
        path: "/change-pwd/:token",
        element: (
          <UserNotConnected>
            <ChangePwd />
          </UserNotConnected>
        ),
      },
      {
        path: "/register",
        element: (
          <UserNotConnected>
            <Register />
          </UserNotConnected>
        ),
      },
      {
        path: "/verify-email/:token",
        element: (
          <UserNotConnected>
            <VerifyEmail />
          </UserNotConnected>
        ),
      },
      {
        path: "/profile",
        element: (
          <UserConnected>
            <Account />
          </UserConnected>
        ),
        children: [
          {
            index: 1,
            loader: orderLoader,
            element: <AccountOrders />,
          },
          {
            path: "favorites",
            element: <AccountFavorites />,
          },
          {
            path: "settings",
            element: <AccountSettings />,
          },
        ],
      },
    ],
  },
]);
