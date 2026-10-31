
import './App.css';
import HomePage from './pages/homepage';
import Products from './pages/product';
import Header from './components/header';
import Footer from './components/footer';
// import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/productDetail';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/cart';
import About from "./pages/about";
import Contact from "./pages/contact";
import Education from "./pages/education";
import MentalHealth from "./pages/mentalHealth";

import Login from "./pages/login";
import Register from "./pages/register";
import Payment from "./pages/payment";
import OrderSuccess from "./pages/orderSuccess";

function App() {
  const [cartItems, setCartItms] = useState(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      const saved = localStorage.getItem(`cart_${email}`);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      localStorage.setItem(`cart_${email}`, JSON.stringify(cartItems));
    }
  }, [cartItems]);
  return (
    <div className="App">
      <div>
        <ToastContainer theme='dark' position='top-center' />
        <Header cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setCartItms={setCartItms} cartItems={cartItems} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/service/education" element={<Education />} />
          <Route path="/service/mental-health" element={<MentalHealth />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItms={setCartItms} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItms={setCartItms} />} />
          <Route path="/payment" element={<Payment cartItems={cartItems} setCartItms={setCartItms} />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>

      </div>
      <Footer />

    </div>

  );
}

export default App;
