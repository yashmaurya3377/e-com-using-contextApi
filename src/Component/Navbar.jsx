import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdAccountCircle, MdMenu, MdClose } from "react-icons/md";
import { PiShoppingCartBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import Userdata from "../context/Userdata";
import Filterdata from "../context/Filterdata";
import { toast } from "react-toastify";

const Navbar = () => {
  const cartItem = useContext(Userdata);
  const filterItem = useContext(Filterdata);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [check, setcheck] = useState(false);

  let itemnumber = cartItem.database.length;

  const handlesearch = (e) => {
    let text = e.target.value;
    filterItem.setFilteritem(text);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Get user profile initial
  const userLoginData = JSON.parse(localStorage.getItem('userLogin')) || [];
  const latestLogin = userLoginData.length > 0 ? userLoginData[userLoginData.length - 1] : null;
  const profileInitial = latestLogin ? latestLogin.Email.charAt(0).toUpperCase() : null;
  const handleLogout=()=>{
    setcheck(!check)
    localStorage.removeItem('userLogin')
    toast.success("logout successfully")
  }

  return (
    <nav className="bg-amber-300 flex flex-wrap items-center px-4 sm:px-6 py-3 justify-between fixed w-full top-0 z-50 shadow-md">
      {/* Logo and Hamburger Menu */}
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link
          to="/"
          className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-red-700 bg-clip-text text-transparent hover:from-blue-600 hover:to-red-800 transition-all duration-300"
        >
          Apni Dukaan
        </Link>

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-gray-800 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </div>

      {/* Search Bar */}
      <div className={`relative w-full sm:w-auto sm:flex-1 max-w-xl mx-0 sm:mx-6 mt-3 sm:mt-0 ${isMenuOpen ? "block" : "hidden sm:block"}`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-500" />
        </div>
        <input
          onChange={handlesearch}
          type="text"
          placeholder="What are you looking for?"
          className="w-full bg-white/90 py-2 pl-10 pr-4 rounded-full border border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm"
        />
      </div>

      {/* Navigation Links */}
      <ul className={`${isMenuOpen ? "flex" : "hidden"} sm:flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mt-4 sm:mt-0`}>
        <li className="w-full sm:w-auto text-center">
          <Link
            to="/"
            className="block py-2 sm:py-0 text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li className="relative w-full sm:w-auto text-center">
          <Link
            to="/cart"
            className="flex items-center justify-center gap-1 text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200 py-2 sm:py-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <PiShoppingCartBold size={20} />
            <span>Cart</span>
            <span className="absolute -top-1 sm:-top-2 right-4 sm:-right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemnumber}
            </span>
          </Link>
        </li>
        {!latestLogin && (
          <li className="w-full sm:w-auto text-center">
            <Link
              to="/account"
              className="flex justify-center py-2 sm:py-0"
              onClick={() => setIsMenuOpen(false)}
            >
              <MdAccountCircle
                size={32}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              />
            </Link>
          </li>
        )}
        {latestLogin && (
          <li className="w-full sm:w-auto text-center">
            <button
              onClick={handleLogout}
              className="flex justify-center py-2 sm:py-0"
              
            >
              <div className="w-10 h-10 rounded-full bg-amber-900 text-white flex items-center justify-center text-xl font-bold">
                {profileInitial}
              </div>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;