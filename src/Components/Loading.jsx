import { useContext } from "react";
import AuthContext from "../AuthProvider/AuthContext";

const Loading = () => {
  const {theme} = useContext(AuthContext);
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      data-theme={theme}
    >
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
};

export default Loading;
