import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <main className="flex flex-col w-full min-h-100">
        <Header />
        <Outlet />
      </main>
    </>
  );
}

export default App;
