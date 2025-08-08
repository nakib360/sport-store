import { useContext } from "react";
import Navber from "../Components/Navber";
import HomeLayout from "../Layouts/HomeLayout";
import AuthContext from "../AuthProvider/AuthContext";

const Home = () => {
  const {theme} = useContext(AuthContext);

  return (
    <div className="font-bitcount min-h-screen" data-theme={theme}>
      <HomeLayout/>
    </div>
  );
};

export default Home;