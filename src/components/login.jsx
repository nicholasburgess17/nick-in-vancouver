import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const Login = ({ setUser }) => {
  const [user, setLocalUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLocalUser(currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error("Google sign-in failed:", err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="p-6 border rounded-lg text-center">
      {user ? (
        <div>
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-16 h-16 rounded-full mx-auto mb-2"
          />
          <h3 className="text-lg font-semibold">{user.displayName}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Login;
