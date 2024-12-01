import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/ShipWiseLogo.png";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ token, setToken }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(token)); // Track authentication status
  const navigate = useNavigate();

  // Update authentication status whenever the token changes
  useEffect(() => {
    setIsAuthenticated(Boolean(token));
  }, [token]);

  // Toggle the mobile menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close the mobile menu
  const closeMenu = () => setIsMenuOpen(false);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // Update token state
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="fixed z-50 top-0 left-0 w-full h-20 bg-gray-900 bg-opacity-70 backdrop-blur-md shadow-md flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <img src={Logo} alt="ShipWise Logo" className="h-16" />
        </Link>

        {/* Full Navigation Links */}
        <div className="hidden lg:flex lg:space-x-6">
          <Link to="/" className="text-gray-200 hover:bg-gray-700 px-4 py-2 rounded-md text-lg" onClick={closeMenu}>
            Home
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard/home" className="text-gray-200 hover:bg-gray-700 px-4 py-2 rounded-md text-lg" onClick={closeMenu}>
              Dashboard
            </Link>
          )}
          <Link to="/about" className="text-gray-200 hover:bg-gray-700 px-4 py-2 rounded-md text-lg" onClick={closeMenu}>
            About
          </Link>
        </div>

        {/* Authentication Links */}
        <div className="hidden lg:flex lg:space-x-6">
          {!isAuthenticated ? (
            <>
              <Link to="/auth/login" className="text-indigo-400 px-6 py-2 font-semibold" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/auth/signup" className="text-teal-400 px-6 py-2 font-semibold" onClick={closeMenu}>
                Signup
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-indigo-400 px-6 py-2 font-semibold flex items-center">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden text-white text-2xl" aria-label="Toggle Menu">
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-gray-900 bg-opacity-90 text-white rounded-lg shadow-lg px-8 py-4 lg:hidden">
          <Link to="/" className="block text-lg px-4 py-2" onClick={closeMenu}>
            Home
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard/home" className="block text-lg px-4 py-2" onClick={closeMenu}>
              Dashboard
            </Link>
          )}
          <Link to="/about" className="block text-lg px-4 py-2" onClick={closeMenu}>
            About
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/auth/login" className="block text-lg px-6 py-2" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/auth/signup" className="block text-lg px-6 py-2" onClick={closeMenu}>
                Signup
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="block text-lg px-6 py-2 text-red-500">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
