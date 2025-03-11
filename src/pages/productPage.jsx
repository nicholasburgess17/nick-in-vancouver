import React from "react";
import { useParams } from "react-router-dom";

const productData = {
  1: { title: "Sunset", price: 50, imageUrl: "/images/sunset.jpg", description: "A beautiful sunset." },
  2: { title: "Mountains", price: 60, imageUrl: "/images/mountains.jpg", description: "Snowy mountains." },
};

const ProductPage = () => {
  const { id } = useParams();
  const product = productData[id];

  if (!product) return <h2 className="text-center text-red-500">Product not found!</h2>;

  return (
    <div className="container mx-auto py-10 text-center">
      <img src={product.imageUrl} alt={product.title} className="w-96 mx-auto rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
      <p className="text-xl text-gray-600">${product.price}</p>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <button className="mt-4 bg-green-500 px-6 py-3 text-lg rounded-lg text-white hover:bg-green-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductPage;
