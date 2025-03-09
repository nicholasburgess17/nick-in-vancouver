// just a component to hold a photo
import React from "react";
import Watermark from "./Watermark";
const Photo = ({ src, title }) => {
  return (
    <div className="relative">
      <img src={src} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
      <Watermark text="© Your Name" position="bottom-right" opacity={0.6} />
    </div>
  );
};
export default Photo;