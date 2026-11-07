import { API_URL, authHeader } from "../config";
// src/components/Cart.jsx  (the cart page is also the checkout)
import useCart from '../Context/useCart';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
  const { cartItems, dispatch } = useCart();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleQuantityChange = async (id, operation) => {
    const updatedItems = cartItems.map(item => {
      if (item.item._id === id) {
        let newAmount = item.amount || 1;
        if (operation === 'increment' && newAmount < 100) {
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
    if (!cartItems.length) {
      alert('Your cart is empty');
      return;
    }
    setShowPopup(true);
  };

  const handleSubmitOrder = async () => {
    if (!address.trim() || !phoneNumber.trim()) {
      alert('Please enter your address and phone number');
      return;
    }
    setSubmitting(true);
    try {
      // Only product ids and quantities are sent; the server looks up the prices.
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({
          items: cartItems.map((line) => ({ _id: line.item._id, amount: line.amount || 1 })),
          address,
          phoneNumber,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok) {
        dispatch({ type: "DROP" });
        setShowPopup(false);
        setAddress('');
        setPhoneNumber('');
        setOrderConfirmation(true);
        setTimeout(() => setOrderConfirmation(false), 3000);
      } else if (response.status === 401) {
        alert('Your session expired. Please log in again.');
        navigate('/login');
      } else {
        alert(result.message || 'Could not place the order');
      }
    } catch (error) {
      alert('Cannot reach the server. Is the backend running?');
    } finally {
      setSubmitting(false);
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
              <CartItem key={item.item._id} item={item} handleQuantityChange={handleQuantityChange} />
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
          <button onClick={handleSubmitOrder} disabled={submitting}>
            {submitting ? 'Placing order...' : 'Submit Order'}
          </button>
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
