import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const ADMIN_UID = "DXQiNBsPFzOSCqNdE28M5SgcTJD3"; 

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading state to avoid flickering

  if (!user || user.uid !== ADMIN_UID) {
    console.warn("Unauthorized access attempt:", user);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
