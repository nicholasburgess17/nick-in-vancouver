import React from "react";
import { Link } from "react-router-dom";

const storeItems = [
  { id: 1, title: "Sunset", price: 50, imageUrl: "/images/sunset.jpg" },
  { id: 2, title: "Mountains", price: 60, imageUrl: "/images/mountains.jpg" },
];

const Store = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center">Shop Prints</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {storeItems.map((item) => (
          <Link key={item.id} to={`/store/${item.id}`} className="border p-4 rounded-lg shadow-md">
            <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
            <p className="text-gray-600">${item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Store;
