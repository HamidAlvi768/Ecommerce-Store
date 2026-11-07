import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import './App.css';
import Navbar from './components/Navbar';
import { PrivateComponent } from './components/PrivateComponent';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

const App = () => (
  <Router>
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          {/* The cart page is also the checkout (address + phone popup) */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  </Router>
);

export default App;
