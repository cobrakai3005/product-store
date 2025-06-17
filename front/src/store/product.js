import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProd) => {
    if (!newProd.name || !newProd.price || !newProd.image) {
      return { success: false, message: "Please fill in all fields" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProd),
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product Created" };
  },

  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (productId) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (!data.success) return { success: false, message: data.message };
    else {
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
      return { success: true, message: data.message };
    }
  },

  updateProduct: async (product) => {
    if (!product.name || !product.price || !product.image) {
      return { success: false, message: "Please fill in all fields" };
    }

    const res = await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    set((state) => ({ products: [...state.products, data.updated] }));
    return { success: true, message: "Product Updated successfully" };
  },
}));
