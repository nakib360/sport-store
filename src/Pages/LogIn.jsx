import { useContext, useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router";
import AuthContext from "../AuthProvider/AuthContext";
import { GrGithub, GrGoogle } from "react-icons/gr";
import { Slide, toast } from "react-toastify";

const LogIn = () => {
  const [show, setShow] = useState(false);
  const { logInUser, signinWithGoogle, signInWithGithub, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = (e) => {
    e.preventDefault();
  
    const form = e.target;
    const email = form.email.value;
    const password = form.pass.value;
  
    logInUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success(`${user?.name || "User"} was successfully logged in.`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
  
        navigate(location.state ? location.state : "/");
  
        // Delay reload slightly to allow toast to show
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err.message);
  
        if (err.message.includes("auth/invalid-credential")) {
          toast.error("Please provide a valid email and password", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
        } else if (err.message.includes("auth/too-many-requests")) {
          toast.error("Too many attempts. Please try again later.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          });
        }
      });
  };
  

  const googleLogIn = () => {
    signinWithGoogle()
      .then((result) => {
        console.log(result);
        navigate(location.state ? location.state : "/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.code);
      });
  };

  const gitHubLogIn = () => {
    signInWithGithub()
      .then((result) => {
        console.log(result);
        navigate(location.state ? location.state : "/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.code);
      });
  };

  return (
    <div
      className="min-h-screen flex justify-center flex-col items-center gap-10 font-bitcount py-5"
      data-theme="coffee"
    >
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border-1 rounded-none border-orange-300">
        <div className="card-body">
          <form onSubmit={handleLogIn} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="focus:outline-none text-sm p-2 border-b-1 "
              placeholder="Email"
              name="email"
            />
            <label className="label">Password</label>
            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="focus:outline-none text-sm p-2 border-b w-full pr-10"
                name="pass"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-2 top-2 text-xl text-orange-200"
              >
                {show ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>{" "}
            
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-outline mt-4 rounded-none">Login</button>
            <p className="text-center text-sm">
              If you are new to this site please{" "}
              <NavLink className="font-bold link link-hover" to={"/signin"}>
                register
              </NavLink>{" "}
              or login with <span className="font-bold">Google</span> or{" "}
              <span className="font-bold">GitHub</span> bellow{" "}
            </p>
          </form>
        </div>
      </div>
      <div className="w-full max-w-sm space-y-2">
        <button
          onClick={googleLogIn}
          className="btn btn-outline rounded-none w-full flex justify-center items-center "
        >
          <GrGoogle />
          <p>Log in with Google</p>
        </button>
        <button
          onClick={gitHubLogIn}
          className="btn btn-outline rounded-none w-full"
        >
          <GrGithub />
          Log in with GitHub
        </button>
      </div>
    </div>
  );
};

export default LogIn;
