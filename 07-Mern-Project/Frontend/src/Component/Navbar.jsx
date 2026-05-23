import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { getUser } from "../Context/UserContext";
import { api } from "../Config/axiosInstance";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  let { user, setUser } = getUser();
  const accessToken = user?.accessToken;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (!accessToken) return;
      let resp = await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (resp.data.success) {
        setUser(null);
        localStorage.removeItem("userData");
        navigate("/login");
        toast(resp.data.message);
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7x1 mx-auto">
        {/* Logo */}
        <div id="logo">
          <span className="text-2xl font-bold text-blue-600">LOGO</span>
        </div>
        {/* //! have to add  search seccestion */}

        {/* Desktop Menu */}
        <div className="flex gap-3 items-center ">
          <div
            title={user.username}
            className=" h-10 w-10 cursor-pointer  rounded-full border border-gray-300 font-bold text-xl bg-gray-100 flex items-center justify-center text-blue-800"
          >
            {user.username.charAt(0).toUpperCase()}
          </div>
          <button onClick={handleLogout} className="btn py-4 font-bold">
            logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
