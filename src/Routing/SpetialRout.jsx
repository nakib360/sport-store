import { useContext } from "react";
import AuthContext from "../AuthProvider/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading";

const SpetialRout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if(loading){
    return <Loading/>
  }

  if (!user?.email) {
    return <Navigate to={"/login"} state={location?.pathname} />;
  }

  return children;
};

export default SpetialRout;
