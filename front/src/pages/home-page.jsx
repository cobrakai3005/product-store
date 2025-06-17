import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/post-card";
// import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [products]);
  return (
    <div className=" w-full p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-center text-gray-700 font-semibold">
          Our Products
        </h1>
        {products.length === 0 ? (
          <div className="w-full h-[40vh] flex flex-col gap-3 justify-center items-center  p-3">
            <h3 className="text-xl font-bold text-gray-700">
              No products found 😢{" "}
            </h3>
            <Link
              className="text-md hover:underline font-semibold"
              to={"/create"}
            >
              Create Products
            </Link>
          </div>
        ) : (
          <div className="w-full mt-2 grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
