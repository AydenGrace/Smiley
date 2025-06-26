import {Outlet, ScrollRestoration} from "react-router-dom";
import Header from "./components/Header";
import UserProvider from "./Providers/UserProvider";
import Footer from "./components/Footer";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <>
      <main className="flex flex-col w-full max-w-screen min-h-screen">
        <UserProvider>
          <Header />
          <Outlet />
          <Footer />
          <ScrollRestoration />
        </UserProvider>
      </main>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
