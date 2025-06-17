import React from "react";
import { LuPencil, LuTrash, LuTrash2 } from "react-icons/lu";
import { useProductStore } from "../store/product";
import { toast } from "react-toastify";
// import {
//   Button,
//   Checkbox,
//   Label,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   TextInput,
// } from "flowbite-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { deleteProduct, updateProduct } = useProductStore();
  const [edit, setEdit] = useState({
    name: product?.name,
    price: product?.price,
    image: product?.image,
    _id: product._id,
  });
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (pId) => {
    const { success, message } = await deleteProduct(pId);
    if (!success) {
      toast.error(`Could not add product. `);
    } else {
      toast.success("Product deleted successfully");
    }
    setNewProd({
      name: "",
      price: "",
      image: "",
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    const { success, message } = await updateProduct(edit);
    if (!success) {
      toast.error(`Could not add product. `);
    } else {
      toast.success("Product created successfully");
    }
    setEdit({
      name: "",
      price: "",
      image: "",
    });
  };

  return (
    <>
      <div className="py-4 w-full shadow rounded overflow-hidden">
        <img className="h-[300px] w-full object-cover" src={product?.image} />
        <h2 className="text-md font-bold text-gray-800 p-2 px-4">
          {product?.name}
        </h2>
        <p className="text-md px-4 font-semibold">
          ${product?.price.toLocaleString()}
        </p>

        <div className="flex items-center justify-between gap-4 px-4 py-2">
          <Link
            to={`/edit/${product._id}`}
            state={product}
            className="bg-gray-800 text-white p-3 rounded cursor-pointer hover:bg-gray-600 hover:text-white"
          >
            <LuPencil />
          </Link>
          <button
            onClick={() => handleDelete(product._id)}
            className="bg-red-700 text-white p-3 rounded cursor-pointer hover:bg-gray-600 hover:text-white"
          >
            <LuTrash2 />
          </button>
        </div>
      </div>
    </>
  );
}

//  <Modal
//   className="w-full  mx-auto   text-white  z-[1000] py-5 px-10"
//   show={openModal}
//   size="md"
//   popup
//   onClose={() => setOpenModal(false)}
// >
//   <ModalHeader />
//   <ModalBody>
//     <div className="space-y-6 ">
//       <h3 className="text-3xl font-bold text-center">
//         Update You Product
//       </h3>

//       <form onSubmit={handleEdit}>
//         <div className="flex flex-col gap-4">
//           <label htmlFor="name" className="font-bold text-lg">
//             Product Name:{" "}
//           </label>
//           <input
//             type="text"
//             value={edit.name}
//             onChange={(e) => setEdit({ ...edit, name: e.target.value })}
//             className="w-ful border-[1px] border-gray-300 px-4 py-2"
//             placeholder="Enter Product Name"
//           />
//         </div>
//         <div className="flex flex-col gap-4">
//           <label htmlFor="name" className="font-bold text-lg">
//             Product Price:{" "}
//           </label>
//           <input
//             type="number"
//             value={edit.price}
//             onChange={(e) => setEdit({ ...edit, price: e.target.value })}
//             className="w-ful border-[1px] border-gray-300 px-4 py-2"
//             placeholder="Enter Product Price"
//           />

//         </div>
//         <div className="flex flex-col gap-4">
//           <label htmlFor="name" className="font-bold text-lg">
//             Product Image Url:{" "}
//           </label>
//           <input
//             type="text"
//             value={edit.image}
//             onChange={(e) => setEdit({ ...edit, image: e.target.value })}
//             className="w-ful border-[1px] border-gray-300 px-4 py-2"
//             placeholder="Enter Product Image Url"
//           />
//         </div>

//         <button className="mt-4 w-full  bg-gray-300 py-2 rounded text-gray-900 font-bold cursor-pointer fnot-bold text-lg">
//           Update Product
//         </button>
//       </form>
//     </div>
//   </ModalBody>
// </Modal>
