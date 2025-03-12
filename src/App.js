import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Portfolio from "./pages/portfolio";
import Store from "./pages/store";
import ProductPage from "./pages/productPage";
import Cart from "./pages/cart";
import About from "./pages/about";
import Contact from "./pages/contact";
import UploadPhoto from "./components/uploadPhoto";
import PhotoGallery from "./components/photoGallery";
import Login from "./components/login";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          {/* Login Component */}
          <Login setUser={setUser} />

          {/* Show Upload button only if user is logged in */}
          {user && <UploadPhoto />}

          {/* Show Photo Gallery */}

          <PhotoGallery />
        </main>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
