import React from "react";

const Watermark = ({ text = "© Nicholas Burgess", position = "bottom-right", opacity = 0.5 }) => {
  const positionStyles = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "center": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      className={`absolute ${positionStyles[position]} text-white text-xs md:text-sm bg-black bg-opacity-50 px-2 py-1 rounded`}
      style={{ opacity }}
    >
      {text}
    </div>
  );
};

export default Watermark;