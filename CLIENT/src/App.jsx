import {Outlet} from "react-router-dom";
import Header from "./components/Header";
import UserProvider from "./Providers/UserProvider";

function App() {
  return (
    <>
      <main className="flex flex-col w-full max-w-screen min-h-screen">
        <UserProvider>
          <Header />
          <Outlet />
        </UserProvider>
      </main>
    </>
  );
}

export default App;
