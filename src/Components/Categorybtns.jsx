import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { IoIosFitness } from "react-icons/io";
import { BiFootball } from "react-icons/bi";
import { MdSportsCricket } from "react-icons/md";
import { MdSportsTennis } from "react-icons/md";
import { FaPersonSwimming } from "react-icons/fa6";

const Categorybtns = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://sports-equipment-server-ten.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 px-2">
      {data.map((data) => (
        <NavLink
          to={data.name}
          className={({ isActive }) =>
            `${
              isActive ? "bg-orange-300/10 text-orange-300" : "btn btn-outline"
            } rounded-md flex items-center gap-2 text-sm sm:text-base px-3 py-2`
          }
          key={data?._id}
        >
          {data?.name === "fitness" ? (
            <IoIosFitness />
          ) : data?.name === "football" ? (
            <BiFootball />
          ) : data?.name === "cricket" ? (
            <MdSportsCricket />
          ) : data?.name === "badminton" ? (
            <MdSportsTennis />
          ) : data?.name === "swimming" ? (
            <FaPersonSwimming />
          ) : (
            ""
          )}
          {data?.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Categorybtns;
