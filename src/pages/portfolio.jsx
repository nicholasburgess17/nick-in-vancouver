import React from "react";

const Portfolio = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center">My Portfolio</h1>
      <p className="text-center text-gray-600">A collection of my best work.</p>

      {/* Example Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <img src="/images/photo1.jpg" alt="Sample 1" className="rounded-lg" />
        <img src="/images/photo2.jpg" alt="Sample 2" className="rounded-lg" />
        <img src="/images/photo3.jpg" alt="Sample 3" className="rounded-lg" />
      </div>
    </div>
  );
};

export default Portfolio;
