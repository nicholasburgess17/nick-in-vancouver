import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          YourPhotography
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-gray-500">Home</Link></li>
          <li><Link to="/portfolio" className="hover:text-gray-500">Portfolio</Link></li>
          <li><Link to="/store" className="hover:text-gray-500">Store</Link></li>
          <li><Link to="/about" className="hover:text-gray-500">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-500">Contact</Link></li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-800" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">2</span>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white border-t shadow-md">
          <li><Link to="/" className="block py-3 px-4" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/portfolio" className="block py-3 px-4" onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
          <li><Link to="/store" className="block py-3 px-4" onClick={() => setMenuOpen(false)}>Store</Link></li>
          <li><Link to="/about" className="block py-3 px-4" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" className="block py-3 px-4" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
