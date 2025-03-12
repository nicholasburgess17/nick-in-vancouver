import React, { useState } from "react";
import { storage, db, auth } from "../firebaseConfig";  // Import auth
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);

  // Get the current user
  const user = auth.currentUser;
  const allowedUID = "DXQiNBsPFzOSCqNdE28M5SgcTJD3";  // Replace with your UID

  const handleUpload = async () => {
    if (!user || user.uid !== allowedUID) {
      alert("You are not authorized to upload photos.");
      return;
    }

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
        uploadedBy: user.email,  // Save uploader info
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
      {user && user.uid === allowedUID ? (
        <>
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
        </>
      ) : (
        <p className="text-red-500">You are not authorized to upload photos.</p>
      )}
    </div>
  );
};

export default UploadPhoto;
