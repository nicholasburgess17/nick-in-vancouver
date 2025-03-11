import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold">Welcome to My Photography</h1>
      <p className="text-lg mt-2">Capturing moments that last forever.</p>
      <Link to="/store">
        <button className="mt-4 bg-blue-500 px-6 py-3 text-lg rounded-lg hover:bg-blue-600 transition">
          Shop Prints
        </button>
      </Link>
    </div>
  );
};

export default Home;