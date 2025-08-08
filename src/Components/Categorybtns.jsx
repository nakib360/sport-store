import { NavLink } from "react-router";
import { IoIosFitness } from "react-icons/io";
import { BiFootball } from "react-icons/bi";
import { MdSportsCricket } from "react-icons/md";
import { MdSportsTennis } from "react-icons/md";
import { FaPersonSwimming } from "react-icons/fa6";
const Categorybtns = () => {
  const data = ["fitness", "football", "cricket", "badminton", "swimming"];

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 px-2">
      {data.map((item) => (
        <NavLink
          to={item}
          className={({ isActive }) =>
            `${
              isActive ? "bg-orange-300/10 text-orange-300" : "btn btn-outline"
            } rounded-md flex items-center gap-2 text-sm sm:text-base px-3 py-2`
          }
          key={item}
        >
          {item === "fitness" ? (
            <IoIosFitness />
          ) : item === "football" ? (
            <BiFootball />
          ) : item === "cricket" ? (
            <MdSportsCricket />
          ) : item === "badminton" ? (
            <MdSportsTennis />
          ) : item === "swimming" ? (
            <FaPersonSwimming />
          ) : (
            ""
          )}
          {item}
        </NavLink>
      ))}
    </div>
  );
};

export default Categorybtns;
