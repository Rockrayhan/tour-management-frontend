import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { generateRoutes } from "./components/ults/generateRoutes";
import { AdminSidebarItems } from "./routes/AdminSidebarItems";

function App() {

  console.log(  generateRoutes(AdminSidebarItems));
  

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <div className="grow-1">  <Outlet /></div>
      <Footer/>
    </div>
  );
}

export default App;
