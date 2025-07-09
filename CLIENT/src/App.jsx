import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/Header";
import UserProvider from "./Providers/UserProvider";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import CartProvider from "./Providers/CartProvider";
// import Cookies from "./components/Cookies";

function App() {
  return (
    <>
      <main className="flex flex-col w-full max-w-screen min-h-screen">
        <UserProvider>
          <CartProvider>
            <Header />
            <Outlet />
            <Footer />
            <ScrollRestoration />
          </CartProvider>
        </UserProvider>
      </main>
      <Toaster position="bottom-right" />
      {/* <Cookies /> */}
    </>
  );
}

export default App;
