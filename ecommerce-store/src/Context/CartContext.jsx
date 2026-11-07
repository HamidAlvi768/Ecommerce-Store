// src/Context/CartContext.jsx
// The cart lives in the browser (saved to localStorage) until the order is placed.
// Each cart line is { item: <product>, amount }.

import React, { createContext, useReducer, useState, useEffect } from "react";

const CartContext = createContext();

const showToast = (text) => {
  const popup = document.createElement("div");
  popup.textContent = text;
  Object.assign(popup.style, {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 16px",
    backgroundColor: "#f0f0f0",
    color: "#111",
    border: "1px solid #ccc",
    borderRadius: "5px",
    zIndex: 1000,
  });
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2500);
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
    case "UPDATE_CART_ITEMS":
      return { ...state, cartItems: action.payload };
    case "ADD_TO_CART": {
      const { item, amount } = action.payload;
      const exists = state.cartItems.some((x) => x.item._id === item._id);
      return {
        ...state,
        cartItems: exists
          ? state.cartItems.map((x) =>
              x.item._id === item._id ? { ...x, amount: (x.amount || 1) + amount } : x
            )
          : [...state.cartItems, { item, amount }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.item._id !== action.payload),
      };
    case "DROP":
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

const getLocalCartData = () => {
  try {
    const data = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(data) ? data.filter((x) => x?.item?._id) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: getLocalCartData() });
  // Quantity chosen on the product page before "Add to cart"
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ state, dispatch, amount, setAmount, showToast }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
