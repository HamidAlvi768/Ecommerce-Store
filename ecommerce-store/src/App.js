import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import './App.css';
import Navbar from './components/Navbar';
import { PrivateComponent } from './components/PrivateComponent';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import CheckoutPage from './components/Checkout';

// $(window).unload(function() {
//   localStorage.myPageDataArr = undefined;
// });

// localStorage.removeItem(key);

const App = () => (
  <Router>
  <div className="app-container">
    <Navbar />
    <Routes>
    <Route element={<PrivateComponent />} >
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path='/product-detail/:id' element={<ProductDetail />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
    </Routes>
    {/* <Sidebar /> */}
  </div>
</Router>
);

export default App;
