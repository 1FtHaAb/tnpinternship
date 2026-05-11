// import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar"
const Home = () => {
  const username = useSelector((state) => state.auth.username);
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="px-20 py-20">
        <h1 className="text-6xl text-[#7dfa96] font-bold mb-4">
          Hi, {username}
        </h1>
        <p className="text-2xl text-gray-300">
          Welcome to DIVA Dashboard
        </p>
      </div>
      <div className="flex justify-end mt-[40vh]">
        <img src="/logo.png" className="h-10" />
        <h1 className="px-2 text-2xl md:text-3xl font-bold text-white cursor-pointer">TNP</h1>
      </div>
    </div>
  );
};

export default Home;