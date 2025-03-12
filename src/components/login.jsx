import React, { useState } from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      setError("Google sign-in failed");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="p-6 border rounded-lg">
      {!auth.currentUser ? (
        <>
          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded w-full mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
              Login
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white px-4 py-2 rounded-lg w-full mt-2"
          >
            Sign in with Google
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      ) : (
        <button onClick={handleLogout} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;
