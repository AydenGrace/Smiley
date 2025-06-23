import {Outlet, ScrollRestoration} from "react-router-dom";
import Header from "./components/Header";
import UserProvider from "./Providers/UserProvider";
import Footer from "./components/Footer";

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
    </>
  );
}

export default App;
