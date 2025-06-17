import React, { useState } from "react";
import { useProductStore } from "../store/product";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdatePage() {
  const { state } = useLocation();
  console.log(state);

  const [edit, setEdit] = useState({
    name: state.name,
    price: state.price,
    image: state?.image,
    _id: state?._id,
  });
  const { updateProduct } = useProductStore();

  const handleEditProd = async (e) => {
    e.preventDefault();

    const { success, message } = await updateProduct(edit);
    if (!success) {
      toast.error(`Could not add product. `);
    } else {
      toast.success("Product updated successfully");
    }
    setEdit({
      name: "",
      price: "",
      image: "",
    });
  };
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-4xl   text-center text-gray-700 font-bold">
        Create new Product
      </h1>

      <form
        onSubmit={handleEditProd}
        className="mt-[30px] w-full flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="font-bold text-lg">
            Product Name:{" "}
          </label>
          <input
            type="text"
            value={edit.name}
            onChange={(e) => setEdit({ ...edit, name: e.target.value })}
            className="w-ful border-[1px] border-gray-300 px-4 py-2"
            placeholder="Enter Product Name"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="font-bold text-lg">
            Product Price:{" "}
          </label>
          <input
            type="number"
            value={edit.price}
            onChange={(e) => setEdit({ ...edit, price: e.target.value })}
            className="w-ful border-[1px] border-gray-300 px-4 py-2"
            placeholder="Enter Product Price"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="font-bold text-lg">
            Product Image Address:{" "}
          </label>
          <input
            type="text"
            value={edit.image}
            onChange={(e) => setEdit({ ...edit, image: e.target.value })}
            className="w-ful border-[1px] border-gray-300 px-4 py-2"
            placeholder="Enter Product image Url"
          />
        </div>
        <button className="mt-4 bg-gray-700 py-2 rounded text-white cursor-pointer fnot-bold text-lg">
          Edit Product
        </button>
      </form>
    </div>
  );
}
