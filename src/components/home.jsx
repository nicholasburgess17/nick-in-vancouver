import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="text-center bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-5xl font-bold">Welcome to My Photography</h1>
          <p className="text-lg mt-2">Capturing moments that last forever.</p>
          <Link to="/store">
            <button className="mt-4 bg-blue-500 px-6 py-3 text-lg rounded-lg hover:bg-blue-600 transition">
              Shop Prints
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Prints */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Prints</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPrints.map((print) => (
            <div key={print.id} className="border rounded-lg shadow-md p-4">
              <Link to={`/store/${print.id}`}>
                <img
                  src={print.imageUrl}
                  alt={print.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold mt-2">{print.title}</h3>
              </Link>
              <p className="text-gray-600">${print.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/store">
            <button className="bg-green-500 text-white px-6 py-3 text-lg rounded-lg hover:bg-green-600 transition">
              View All Prints
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-700">
            I'm a passionate photographer dedicated to capturing the beauty of the world. 
            My work spans landscapes, nature, and urban scenes, each telling its own story.
          </p>
          <Link to="/contact">
            <button className="mt-6 bg-gray-800 text-white px-6 py-3 text-lg rounded-lg hover:bg-gray-900 transition">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

// Featured Prints (Hardcoded Example)
const featuredPrints = [
  {
    id: "1",
    title: "Golden Sunset",
    price: 50,
    imageUrl: "/images/sunset.jpg",
  },
  {
    id: "2",
    title: "Majestic Mountains",
    price: 60,
    imageUrl: "/images/mountains.jpg",
  },
  {
    id: "3",
    title: "Autumn Serenity",
    price: 45,
    imageUrl: "/images/forest.jpg",
  },
];

export default Home;
