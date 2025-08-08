import { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthProvider/AuthContext";
import MyEquipmenCard from "../Components/MyEquipmenCard";
import EmptyProduct from "../Components/EmptyProduct";
import { ImCross } from "react-icons/im";
import { Slide, toast } from "react-toastify";
import Loading from "../Components/Loading";

const MyEquipment = () => {
  const [data, setData] = useState([]);
  const { user, theme } = useContext(AuthContext);

  const [deleteId, setDeleteId] = useState(null);

  const openModal = (id) => {
    setDeleteId(id);
    document.getElementById("delete_modal").showModal();
  };
  useEffect(() => {
    fetch(`https://sport-store-server-bxc4.onrender.com/allItems/author/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [user?.email]);

  const handleDelete = (id) => {
    fetch(`https://sport-store-server-bxc4.onrender.com/allItems/id/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.deletedCount > 0) {
          toast.success("equipment is successfully delated.", {
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
          const remaining = data.filter((p) => p._id !== id);
          setData(remaining);
        }
      });
  };

  if(!data){
    return <Loading/>
  }

  return (
    <div
      className={
        data.length > 0
          ? "min-h-screen font-bitcount columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3 p-3"
          : "min-h-screen font-bitcount"
      }
      data-theme={theme}
    >
      {data.length === 0 ? (
        <EmptyProduct />
      ) : (
        <div>
          {data.map((card) => (
            <MyEquipmenCard key={card?._id} card={card} openModal={openModal} />
          ))}

          {/* Modal for Confirmation */}
          <dialog id="delete_modal" className="modal">
            <div className="modal-box bg-base-100 p-6 rounded-xl shadow-xl">
              <div className="flex flex-col items-center text-center space-y-4">
                <ImCross className="text-7xl" />
                <h3 className="font-bold text-2xl">Are you sure?</h3>
                <p className="text-gray-600">
                  This action is permanent and cannot be undone.
                </p>
              </div>

              <div className="modal-action justify-center mt-6">
                <form method="dialog" className="flex gap-4">
                  <button className="btn btn-outline">Cancel</button>
                  <button
                    className="btn btn-outline border-red-500 text-red-500 hover:text-black hover:bg-red-500"
                    onClick={() => handleDelete(deleteId)}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default MyEquipment;
