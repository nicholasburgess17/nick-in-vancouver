import { useState, useEffect } from "react";
import { storage, db } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp, getDocs } from "firebase/firestore";

export default function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [cart, setCart] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const querySnapshot = await getDocs(collection(db, "photos"));
      setPhotos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPhotos();
  }, []);

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
        const docRef = await addDoc(collection(db, "photos"), {
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
        setPhotos([...photos, { id: docRef.id, title, description, imageUrl: downloadURL }]);
      }
    );
  };

  const handleDragStart = (e, photo) => {
    e.dataTransfer.setData("photo", JSON.stringify(photo));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const photo = JSON.parse(e.dataTransfer.getData("photo"));
    setCart((prevCart) => [...prevCart, { ...photo, size: "Small" }]);
  };

  const handleRemoveFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const handleSizeChange = (index, size) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].size = size;
      return updatedCart;
    });
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
      
      <div className="mt-6">
        <h2 className="text-xl font-bold">Gallery</h2>
        <div className="grid grid-cols-3 gap-4">
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.imageUrl}
              alt={photo.title}
              className="w-24 h-24 object-cover cursor-pointer"
              draggable="true"
              onDragStart={(e) => handleDragStart(e, photo)}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-bold">Cart</h2>
        <div
          className="border p-4 min-h-[100px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {cart.map((photo, index) => (
            <div key={index} className="inline-block m-2 relative">
              <img src={photo.imageUrl} alt={photo.title} className="w-24 h-24 object-cover" />
              <select
                value={photo.size}
                onChange={(e) => handleSizeChange(index, e.target.value)}
                className="block mt-1 border p-1"
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              <button
                onClick={() => handleRemoveFromCart(index)}
                className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
