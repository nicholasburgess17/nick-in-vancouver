import React, { useState } from "react";
import { Link } from "react-router-dom";

const Store = () => {
  // Hardcoded product data
  const [products] = useState([
    {
      id: "1",
      title: "Sunset Over the Ocean",
      price: 50,
      imageUrl: "/images/sunset.jpg",
    },
    {
      id: "2",
      title: "Mountain Peaks",
      price: 60,
      imageUrl: "/images/mountains.jpg",
    },
    {
      id: "3",
      title: "Forest in Autumn",
      price: 45,
      imageUrl: "/images/forest.jpg",
    },
  ]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Print Store</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-md p-4">
            <Link to={`/store/${product.id}`}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
            </Link>
            <p className="text-gray-600">${product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 w-full rounded-lg"
              onClick={() => alert(`Added ${product.title} to cart!`)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
