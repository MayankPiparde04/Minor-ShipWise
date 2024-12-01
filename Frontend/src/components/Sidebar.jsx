import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navLinks = [
    { id: "/", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "dashboard", label: "Dashboard", path: "/dashboard/home" },
    { id: "listitems", label: "List Items", path: "/dashboard/listitems" },
    { id: "additem", label: "Add Item", path: "/dashboard/additem" },
    { id: "removeitem", label: "Remove Item", path: "/dashboard/removeitem" },
    { id: "addbox", label: "Add Box", path: "/dashboard/addbox" },
    { id: "removebox", label: "Remove Box", path: "/dashboard/removebox" },
    { id: "pickbox", label: "Pick Box", path: "/dashboard/pickbox" },
    { id: "optimalcalculation", label: "Optimal Calculation", path: "/dashboard/optimalcalculation" },
    { id: "bufferingcalculation", label: "Buffering Calculation", path: "/dashboard/bufferingcalculation" },
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"
          } lg:translate-x-0 lg:static`}
      >
        {/* Sidebar Header */}
        <div className="p-4 text-xl font-bold border-b border-gray-700 flex items-center justify-between">
          <span>ShipWise</span>
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl focus:outline-none lg:hidden"
            aria-label="Close Sidebar"
          >
            &times;
          </button>
        </div>
        {/* Navigation Links */}
        <nav className="mt-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded ${isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`
              }
              onClick={toggleSidebar} // Close sidebar on mobile
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 text-white text-2xl z-50"
        aria-label="Open Sidebar"
      >
        &#9776;
      </button>
    </div>
  );
};

export default Sidebar;
