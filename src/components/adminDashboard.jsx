import { useState } from "react";
import { storage, db } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    const storageRef = ref(storage, `photos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "photos"), {
          title,
          description,
          imageUrl: downloadURL,
          createdAt: serverTimestamp(),
        });
        setUploading(false);
        setFile(null);
        setTitle("");
        setDescription("");
        alert("Photo uploaded successfully!");
      }
    );
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload a New Photo</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mt-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mt-2"
      ></textarea>
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white p-2 mt-2 w-full"
      >
        {uploading ? "Uploading..." : "Upload Photo"}
      </button>
    </div>
  );
}
