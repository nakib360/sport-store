import { TbPackageOff } from "react-icons/tb";

const EmptyProduct = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 sm:px-6 lg:px-8">
      <TbPackageOff className="text-5xl sm:text-6xl md:text-7xl mb-4" />
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
        No Equipments Available
      </h2>
      <p className="text-sm sm:text-base md:text-lg mt-2 max-w-md">
        You don't add any equipment from your account. If you want to see your equipments please add your equipment.
      </p>
    </div>
  );
};

export default EmptyProduct;
