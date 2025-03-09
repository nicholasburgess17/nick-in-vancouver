import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Store from "./pages/Store";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
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
        </main>
        <Footer />
      </div>
    </Router>
  );
};
export default App;