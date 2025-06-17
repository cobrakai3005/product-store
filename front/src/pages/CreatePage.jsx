import React, { useState } from "react";
import { useProductStore } from "../store/product";
import { toast } from "react-toastify";

export default function CreatePage() {
  const [newProd, setNewProd] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();

  const handleAddProd = async (e) => {
    e.preventDefault();
    console.log(newProd);
    const { success, message } = await createProduct(newProd);
    if (!success) {
      toast.error(`Could not add product. `);
    } else {
      toast.success("Product created successfully");
    }
    setNewProd({
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
        onSubmit={handleAddProd}
        className="mt-[30px] w-full flex flex-col gap-4"
      >
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="font-bold text-lg">
            Product Name:{" "}
          </label>
          <input
            type="text"
            value={newProd.name}
            onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
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
            value={newProd.price}
            onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
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
            value={newProd.image}
            onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
            className="w-ful border-[1px] border-gray-300 px-4 py-2"
            placeholder="Enter Product image Url"
          />
        </div>
        <button className="mt-4 bg-gray-700 py-2 rounded text-white cursor-pointer fnot-bold text-lg">
          Add Product
        </button>
      </form>
    </div>
  );
}
