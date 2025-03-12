import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const querySnapshot = await getDocs(collection(db, "photos"));
      const images = querySnapshot.docs.map((doc) => doc.data());
      setPhotos(images);
    };

    fetchPhotos();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
      {photos.map((photo, index) => (
        <div key={index} className="border p-2 rounded-lg">
          <img src={photo.url} alt={photo.title} className="w-full rounded-lg" />
          <p className="text-center text-gray-700 mt-1">{photo.title}</p>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
