import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fetching the product " + error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid Product id" });
  }
  try {
    const updated = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, updated });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Prodcuct Deleted" });
  } catch (error) {
    console.error("Error in Deleting the product " + error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    return res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating the product " + error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
