import { useContext, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import AuthContext from "../AuthProvider/AuthContext";
import { useNavigate } from "react-router";
import PasswordChecklist from "react-password-checklist";
import { Slide, toast } from "react-toastify";

const Register = () => {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const { createUser, updateUser, theme } = useContext(AuthContext);
  const navigate = useNavigate();

  // Reusable toast options
  const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Slide,
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!isValid) {
      toast.error("Please provide a valid password", toastOptions);
      return;
    }

    const form = e.target;
    const email = form.email.value;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const fullName = `${firstName} ${lastName}`.trim();
    const photoUrl = form.photoUrl.value;
    const password = form.pass.value;

    createUser(email, password)
      .then((result) => {
        return updateUser(fullName, photoUrl).then(() => result.user);
      })
      .then((currentUser) => {
        toast.success(
          `${currentUser?.displayName || "User"} was successfully registered.`,
          toastOptions
        );
        navigate("/"); 
      })
      .catch((err) => {
        const errCode = err.code?.replace("auth/", "").replace(/-/g, " ");
        if (err.message.includes("auth/invalid-credential")) {
          toast.error(
            "Please provide a valid email and password",
            toastOptions
          );
        } else if (err.message.includes("auth/too-many-requests")) {
          toast.error(
            "Too many attempts. Please try again later.",
            toastOptions
          );
        } else {
          toast.error(errCode || "Registration failed", toastOptions);
        }
      });
  };

  return (
    <div
      className="min-h-screen flex justify-center flex-col items-center gap-10 font-bitcount px-3 md:px-0 py-5"
      data-theme={theme}
    >
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border-1 rounded-none">
        <div className="card-body">
          <form onSubmit={handleSignIn} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              className="focus:outline-none text-sm p-2 border-b-1"
              placeholder="First Name"
              name="firstName"
              required
            />
            <input
              type="text"
              className="focus:outline-none text-sm p-2 border-b-1 mt-2"
              placeholder="Last Name"
              name="lastName"
            />
            <label className="label mt-2">Photo Url</label>
            <input
              type="url"
              className="focus:outline-none text-sm p-2 border-b-1"
              placeholder="Photo"
              name="photoUrl"
            />
            <label className="label mt-2">Email</label>
            <input
              type="email"
              className="focus:outline-none text-sm p-2 border-b-1"
              placeholder="Email"
              name="email"
              required
            />
            <label className="label mt-2">Password</label>
            <div className="relative w-full">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                className="focus:outline-none text-sm p-2 border-b w-full pr-10"
                name="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-2 top-2 text-xl"
              >
                {show ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>

            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital"]}
              minLength={6}
              value={password}
              onChange={(valid) => setIsValid(valid)}
              className="text-xs mt-2"
            />

            <div className="mt-2">
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-outline mt-4 rounded-none">
              Signin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
