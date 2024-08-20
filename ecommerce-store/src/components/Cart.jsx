// src/components/Cart.js
import useCart from '../Context/useCart';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, dispatch, getLocalCartData } = useCart();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState(false);

  useEffect(() => {
    let localCartData = localStorage.getItem("cart");
    if(localCartData === "undefined") {
      localStorage.removeItem("cart");
    }
  }, []);
  
  const handleQuantityChange = async (id, operation) => {
    const updatedItems = cartItems.map(item => {
      if (item.item._id === id) {
        let newAmount = item.amount || 1;
        if (operation === 'increment') {
          newAmount += 1;
        } else if (operation === 'decrement' && newAmount > 1) {
          newAmount -= 1;
        }
        return { ...item, amount: newAmount };
      }
      return item;
    });
    dispatch({ type: 'UPDATE_CART_ITEMS', payload: updatedItems });
  };

  const handleApplyCoupon = () => {
    // Implement coupon application logic
  };

  const handleCheckout = async () => {
    setShowPopup(true);
  };

  const handleSubmitOrder = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");
      let response = await fetch("https://merry-moxie-6d2ca1.netlify.app/.netlify/functions/api/orders/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: cartItems,
          email: userEmail.replace(/"/g, ''),
          order_date: new Date().toDateString(),
          address: address,
          phoneNumber: phoneNumber
        })
      });
      console.log("JSON RESPONSE:::::", response.status)
      if (response.status === 200) {
        dispatch({ type: "DROP" })
        setShowPopup(false);
        setAddress('');
        setPhoneNumber('');
        setOrderConfirmation(true);
        setTimeout(() => {
          setOrderConfirmation(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item?.item?.price * (item.amount || 1), 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <div className="cart-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Subtotal</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {cartItems && cartItems.length > 0 && cartItems.map((item,index) => (
              <CartItem key={item._id} index={index} item={item} amount={item.amount} handleQuantityChange={handleQuantityChange} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="coupon-section">
        <input type="text" placeholder="Coupon code" />
        <button onClick={handleApplyCoupon}>Apply Coupon</button>
      </div>
      <div className="cart-totals">
        <h2>Cart totals</h2>
        <div className="totals-item">
          <span>Subtotal</span>
          <span>${calculateSubtotal()}</span>
        </div>
        <div className="totals-item">
          <span>Total</span>
          <span>${calculateSubtotal()}</span>
        </div>
        <button onClick={handleCheckout}>Place Your Order</button>
      </div>
      {showPopup && (
        <div className="popup">
          <h2>Complete Your Order</h2>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={handleSubmitOrder}>Submit Order</button>
        </div>
      )}
      {orderConfirmation && (
        <div className="order-confirmation">
          Your order is on its way!
        </div>
      )}
    </div>
  );
};

export default Cart;
