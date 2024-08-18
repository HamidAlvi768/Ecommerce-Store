import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../Context/useCart";

const Navbar = () => {
  const { cartItems } = useCart();
  const auth = localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav className="navbar">
      {auth ? (
        <>
          <div className="navbar-logo">
            <Link to="/">EARTH STORE</Link>
          </div>
          <ul className="navbar-links">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/shop">SHOP</Link>
            </li>
            <li>
              <Link onClick={logout} to="/signup">
                LOGOUT
              </Link>
            </li>
          </ul>
          <div className="navbar-icons">
            {/* Add cart and user icons here */}
            <Link to="/cart">
              <i className="fas fa-shopping-cart">
                <FaShoppingCart />
                {cartItems?.length}
              </i>
            </Link>
            <Link to="/account">
              <i className="fas fa-user"></i>
            </Link>
          </div>
        </>
      ) : (
        <>
          <ul className="navbar-links">
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navbar;
