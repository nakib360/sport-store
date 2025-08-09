import { NavLink } from "react-router";
import { TbMenu2 } from "react-icons/tb";
import { useContext, useState } from "react";
import AuthContext from "../AuthProvider/AuthContext";
import { BiMoon, BiSun } from "react-icons/bi";

const Navber = () => {
  const { user, logoutUser, setTheme, theme } = useContext(AuthContext);
  const [animating, setAnimating] = useState(false);

  const themeControler = () => {
    setAnimating(true);
    setTimeout(() => {
      setTheme(theme === "coffee" ? "nord" : "coffee");
      setAnimating(false);
    }, 150);
  };

  const nav = [
    { location: "/Home", name: "Home" },
    { location: "/sports-equipment", name: "All Sport Equipments" },
    ...(user
      ? [
          { location: "/my-equipment", name: "My Equipment" },
          { location: "/add-equipment", name: "Add Equipment" },
        ]
      : []),
  ];

  

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  return (
    <div>
      {/* Navbar */}
      <div
        className="navbar fixed z-50 top-0 left-0 right-0 bg-base-100 shadow-sm font-bitcount md:px-5"
        data-theme={theme}
      >
        {/* Left: Mobile Drawer Toggle */}
        <div className="navbar-start">
          <div className="lg:hidden">
            <label htmlFor="my-drawer" className="btn btn-ghost text-2xl">
              <TbMenu2 />
            </label>
          </div>
          <a className="text-2xl font-bold ">Sport&nbsp;Shop</a>
        </div>

        {/* Center: Nav links (lg and up only) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {nav.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "bg-orange-300/10 text-orange-300" : ""
                  }
                  to={item.location}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>


        {/* Right: User info or Login */}
        <div className="navbar-end">
        <div
          className="border-2 rounded-full mr-4 cursor-pointer
             transition-all duration-300 ease-in-out
             hover:scale-110"
          onClick={themeControler}
        >
          {theme === "coffee" ? (
            <BiSun
              className={`text-4xl text-yellow-500 transform transition-all duration-300 ease-in-out
              ${
                animating
                  ? "opacity-0 scale-50 rotate-90"
                  : "opacity-100 scale-100 rotate-0"
              }`}
            />
          ) : (
            <BiMoon
              className={`text-4xl transform transition-all duration-300 ease-in-out
              ${
                animating
                  ? "opacity-0 scale-50 -rotate-90"
                  : "opacity-100 scale-100 rotate-0"
              }`}
            />
          )}
        </div>
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                  <img src={user?.photoURL} alt={user?.displayName} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-xl w-52 p-2 shadow-sm z-[1] border"
              >
                <li>
                  <button onClick={() => logoutUser()}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login" className="btn">
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Drawer for Mobile */}
      <div className="drawer lg:hidden z-50 font-bitcount" data-theme={theme}>
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {nav.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "bg-orange-300/10 text-orange-300" : ""
                  }
                  to={item.location}
                  onClick={closeDrawer}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navber;

// autumn
