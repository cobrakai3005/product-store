import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/navbar";
import { ToastContainer, toast } from "react-toastify";
import HomePage from "./pages/home-page";
import CreatePage from "./pages/CreatePage";
import UpdatePage from "./pages/update-page";

export default function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<UpdatePage />} />
        {/* <Route path="/c" element={<HomePage />} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}
