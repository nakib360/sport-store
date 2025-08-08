import { useContext } from "react";
import UpdateEquipmentForm from "../Components/UpdateEquipmentForm";
import AuthContext from "../AuthProvider/AuthContext";

const UpdateEquipment = () => {
  const {theme} = useContext(AuthContext);

  return (
    <div
      className="min-h-screen font-bitcount flex justify-center items-center p-2"
      data-theme={theme}
    >
      <UpdateEquipmentForm />
    </div>
  );
};

export default UpdateEquipment;
