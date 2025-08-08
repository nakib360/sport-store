import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../AuthProvider/AuthContext";
import { useNavigate } from "react-router";
import { Slide, toast } from "react-toastify";

const AddEquipmentForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const categoryOptions = [
    "fitness",
    "football",
    "cricket",
    "badminton",
    "swimming",
  ];
  const brandOptions = [
    "FitTech",
    "IronGym",
    "CardioMax",
    "Adidas",
    "NetPro",
    "Nike",
    "Kookaburra",
    "Yonex",
    "ProCourt",
    "Speedo",
    "Arena",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [selectedBrand, setSelectedBrand] = useState("Select Brand");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  const brandRef = useRef(null);
  const categoryRef = useRef(null);

  // Dropdown বন্ধ করা বাইরের ক্লিকে
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (brandRef.current && !brandRef.current.contains(event.target)) {
        setShowBrandDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (value) => {
    setSelectedCategory(value);
    setShowCategoryDropdown(false);
  };

  const handleBrandSelect = (value) => {
    setSelectedBrand(value);
    setShowBrandDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const price = form.price.value;
    const description = form.description.value;
    const photoUrl = form.photo.value;
    const rating = form.rating.value;
    const stock = form.stock.value;

    const newEquipment = {
      name: name,
      price: price,
      description: description,
      brand: selectedBrand,
      image: photoUrl,
      rating: rating,
      stock: stock,
      category: selectedCategory,
      author: user?.email,
    };

    fetch("https://sports-equipment-server-ten.vercel.app/allItems", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newEquipment),
    })
      .then((res) => res.json())
      .then((data) => {
        form.reset();
        setSelectedCategory("Select Category");
        setSelectedBrand("Select Brand");
        console.log(data);
        toast.success("equipment is successfully added.", {
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
        navigate("/my-equipment");
      });
  };

  return (
    <div className="max-w-5xl mx-auto border m-5 p-6 rounded-xl shadow bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6">
        Add A New Sport Equipment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Equipment Name */}
        <div>
          <label className="label">
            <span className="label-text">Equipment Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            name="name"
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="text"
            placeholder="Price"
            className="input input-bordered w-full"
            name="price"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="Description"
            className="input input-bordered w-full"
            name="description"
          ></textarea>
        </div>

        {/* Brand Dropdown */}
        <div className="relative" ref={brandRef}>
          <label className="label">
            <span className="label-text">Brand</span>
          </label>
          <input
            type="text"
            readOnly
            value={selectedBrand}
            className="input input-bordered w-full"
            name="brand"
            onClick={() => setShowBrandDropdown(!showBrandDropdown)}
          />
          {showBrandDropdown && (
            <ul className="absolute z-10 w-full bg-base-100 border shadow rounded-box mt-1 max-h-48 overflow-auto">
              {brandOptions.map((option, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleBrandSelect(option)}
                    className="w-full text-left px-4 py-2 hover:bg-base-200"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative" ref={categoryRef}>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            readOnly
            value={selectedCategory}
            className="input input-bordered w-full"
            name="category"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          />
          {showCategoryDropdown && (
            <ul className="absolute z-10 w-full bg-base-100 border shadow rounded-box mt-1 max-h-48 overflow-auto">
              {categoryOptions.map((option, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(option)}
                    className="w-full text-left px-4 py-2 hover:bg-base-200"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Photo URL */}
        <div>
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="url"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            name="photo"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <input
            type="text"
            placeholder="Rating"
            className="input input-bordered w-full"
            name="rating"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="label">
            <span className="label-text">Stock</span>
          </label>
          <input
            type="text"
            placeholder="Stock"
            className="input input-bordered w-full"
            name="stock"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <button type="submit" className="btn btn-outline w-full mt-4">
            Add Equipment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEquipmentForm;
