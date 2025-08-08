import { useContext } from "react";
import error from "../assets/error.gif";
import AuthContext from "../AuthProvider/AuthContext";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const { theme } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center items-center min-h-screen font-bitcount bg-white"
      data-theme={theme}
    >
      <div className="relative inline-block">
        <img src={error} alt="the page not found" />
        <button
            onClick={() => navigate("/")}
          className="text-white btn btn-accent absolute bottom-0 md:bottom-5 left-1/2 transform -translate-x-1/2"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
