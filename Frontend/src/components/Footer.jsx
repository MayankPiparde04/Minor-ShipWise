import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/ShipWiseLogo.png";

function Footer() {
  return (
    <footer className="w-full relative z-50 bg-gray-950 text-gray-400 py-8 border-t border-gray-700">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between px-6 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <Link to="/" className="flex justify-center items-center">
            <img
              src={Logo}
              alt="ShipWise Logo"
              className="w-20 h-20 object-contain"
            />
          </Link>
          <p className="mt-4 text-center text-sm">
            Smart shipping solutions for modern logistics.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-between gap-8 md:gap-16 w-full md:w-auto">
          {/* Company Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-white">Company</h3>
            <Link to="/about" className="hover:text-white transition-all">
              About Us
            </Link>
            <Link to="/blog" className="hover:text-white transition-all">
              Blog
            </Link>
            <Link to="/careers" className="hover:text-white transition-all">
              Careers
            </Link>
          </div>

          {/* Support Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-white">Support</h3>
            <Link
              to="/help-center"
              className="hover:text-white transition-all"
            >
              Help Center
            </Link>
            <Link to="/contact" className="hover:text-white transition-all">
              Contact Us
            </Link>
            <Link to="/terms" className="hover:text-white transition-all">
              Terms of Service
            </Link>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <Link to="/pricing" className="hover:text-white transition-all">
              Pricing
            </Link>
            <Link to="/features" className="hover:text-white transition-all">
              Features
            </Link>
            <Link to="/download" className="hover:text-white transition-all">
              Download
            </Link>
          </div>

          {/* Follow Us Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-white">Follow Us</h3>
            <a
              href="https://twitter.com/ShipWise"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com/ShipWise"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all"
            >
              Facebook
            </a>
            <a
              href="https://linkedin.com/company/ShipWise"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-all"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        <h3 className="text-sm text-gray-500">
          &copy; 2024 Designed and developed by
          <a
            href="https://github.com/TeamShipwise"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-gray-200 hover:underline"
          >
            Team ShipWise
          </a>
        </h3>
      </div>
    </footer>
  );
}

export default Footer;
