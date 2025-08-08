import { useContext } from "react";
import AddEquipmentForm from "../Components/AddEquipmentForm";
import AuthContext from "../AuthProvider/AuthContext";

const AddEquipment = () => {
  const {theme} = useContext(AuthContext);

  return (
    <div className="min-h-screen font-bitcount flex justify-center items-center p-2" data-theme={theme}>
      <AddEquipmentForm/>
    </div>
  );
};

export default AddEquipment;