import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link to="/" className="text-2xl font-extrabold text-blue-700">
            Hope Haven
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-700 border-b-2 border-transparent hover:border-blue-700">
              Home
            </Link>
            <Link to="/orphanages" className="text-gray-700 hover:text-blue-700 border-b-2 border-transparent hover:border-blue-700">
              Orphanages
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-700 border-b-2 border-transparent hover:border-blue-700">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-700 border-b-2 border-transparent hover:border-blue-700">
              Contact
            </Link>
          </div>
        </div>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 border border-blue-700 text-blue-700 rounded hover:bg-blue-700 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-white text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
