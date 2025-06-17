import { LuPen, LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-full p-4 border-b-[1px] border-gray-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h3 className="logo text-2xl font-bold text-gray-700">Product Store</h3>
        <div className="flex items-center gap-4">
          <Link
            to={"/create"}
            className="flex items-center gap-2 bg-gray-600 p-3 rounded-xl text-white"
          >
            <LuPen size={20} />
          </Link>
          <button
            to={"/create"}
            className="flex items-center gap-2 bg-gray-600 p-3 rounded-xl text-white"
          >
            <LuSun size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
