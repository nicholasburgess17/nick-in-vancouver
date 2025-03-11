import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">NickinVancouverPhotgraphy</Link>
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/store">Store</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">2</span>
          </Link>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <ul className="md:hidden bg-white border-t shadow-md">
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/store">Store</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      )}
    </nav>
  );
};
export default Header;
