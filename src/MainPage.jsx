import { Outlet } from "react-router";
import Navber from "./Components/Navber";
import Footer from "./Components/Footer";

const MainPage = () => {
  return (
    <div className="mt-16">
      <Navber/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default MainPage;