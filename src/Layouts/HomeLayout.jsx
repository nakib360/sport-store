import { Outlet } from "react-router";
import Cariosole from "../Components/Cariosole";
import Categorybtns from "../Components/Categorybtns";
import CategoryItems from "../Components/CategoryItems";

const HomeLayout = () => {
  return (
    <div>
      <Cariosole />
      <Categorybtns/>
      <Outlet/>
    </div>
  );
};

export default HomeLayout;
