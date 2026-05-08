// import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Home = () => {
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex justify-between items-center px-10 py-5">
        <h1
          onClick={() => dispatch(logout())}
          className="text-2xl font-bold text-green-400 cursor-pointer"
        >
          DIVA
        </h1>
        <div className="space-x-8 text-sm text-gray-300">
          <a href="#">SOLUTIONS</a>
          <a href="#">ABOUT US</a>
          <a href="#">FAQs</a>
          <a href="#">CONTACT US</a>
        </div>
      </div>
      <div className="px-20 py-20">
        <h1 className="text-6xl text-green-400 font-bold mb-4">
          Hi, {username}
        </h1>
        <p className="text-2xl text-gray-300">
          Welcome to DIVA Dashboard
        </p>
      </div>
    </div>
  );
};

export default Home;