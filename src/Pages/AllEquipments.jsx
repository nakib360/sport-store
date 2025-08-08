import { useLoaderData } from "react-router";
import AllItems from "../Components/AllItems";
import Loading from "../Components/Loading";
import { useContext } from "react";
import AuthContext from "../AuthProvider/AuthContext";

const AllEquipments = () => {
  const loadedData = useLoaderData();
  const {theme} = useContext(AuthContext);


  if(!loadedData){
    return <Loading/>
  }

  return (
    <div
      className="min-h-screen columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 p-4 space-y-3 font-bitcount"
      data-theme={theme}
    >
      {loadedData.map((card) => (
        <AllItems key={card?._id} card={card} />
      ))}
    </div>
  );
};

export default AllEquipments;
