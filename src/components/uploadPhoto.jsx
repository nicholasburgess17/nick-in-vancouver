import React, { useState } from "react";
import { storage, db } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
//This will upload photos to firebase storage, save metadata and download url to firestore
const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    const imageRef = ref(storage, `photos/${image.name}`);
    
    try {
      // Upload Image
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      // Save metadata in Firestore
      await addDoc(collection(db, "photos"), {
        title: title,
        url: imageUrl,
        createdAt: new Date(),
      });

      alert("Photo uploaded successfully!");
      setTitle("");
      setImage(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload photo");
    }

    setUploading(false);
  };

  return (
    <div className="p-6 border rounded-lg">
      <input
        type="text"
        placeholder="Photo Title"
        className="border p-2 rounded w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        className="mb-2"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Photo"}
      </button>
    </div>
  );
};

export default UploadPhoto;
