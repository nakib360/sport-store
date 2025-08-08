import { useLoaderData } from "react-router";
import AllItems from "../Components/AllItems";

const AllEquipments = () => {
  const loadedData = useLoaderData();

  return (
    <div
      className="min-h-screen columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 p-4 space-y-3 font-bitcount"
      data-theme="coffee"
    >
      {loadedData.map((card) => (
        <AllItems key={card?._id} card={card} />
      ))}
    </div>
  );
};

export default AllEquipments;
