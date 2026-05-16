import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isloggin, setIsLogin] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7x1 mx-auto">
        {/* Logo */}
        <div id="logo">
          <span className="text-2xl font-bold text-blue-600">LOGO</span>
        </div>
        {/* //! have to add  search seccestion */}

        {/* Desktop Menu */}
        <div className="hidden md:flex ">
          <ul className=" flex items-center gap-6">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "isActive" : "isInactive"
                }
              >
                Home
              </NavLink>
            </li>

            {/* Login link */}
            <li>
              <NavLink
                to="/Login"
                className={({ isActive }) =>
                  isActive ? "isActive" : "isInactive"
                }
              >
                login
              </NavLink>
            </li>
            {/* Signup link */}
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "isActive" : "isInactive"
                }
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Menu button  */}
        <button className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Mobile menu  */}
        {openMenu && (
          <div className="md:hidden bg-white shadow-lg px-6 py-4 ">
            <ul className="flex flex-col gap-4">
              {/* Home link */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "isActive" : "isInactive"
                  }
                >
                  Home
                </NavLink>
              </li>
              {/* Login link */}
              <li>
                <NavLink
                  to="/Login"
                  className={({ isActive }) =>
                    isActive ? "isActive" : "isInactive"
                  }
                >
                  login
                </NavLink>
              </li>
              {/* Signup link */}
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "isActive" : "isInactive"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
