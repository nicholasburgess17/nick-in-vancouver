import React from "react";

const Contact = () => {
  return (
    <div className="container mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold">Contact Me</h1>
      <p className="text-gray-600">Feel free to reach out for collaborations or print inquiries.</p>

      <form className="max-w-lg mx-auto mt-6">
        <input type="text" placeholder="Your Name" className="w-full border p-3 rounded-lg mb-4" />
        <input type="email" placeholder="Your Email" className="w-full border p-3 rounded-lg mb-4" />
        <textarea placeholder="Your Message" className="w-full border p-3 rounded-lg mb-4"></textarea>
        <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
