// src/context/CartContext.js

import React, { createContext, useReducer, useState, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "UPDATE_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "ADD_TO_CART":
      const item = { ...action.payload, amount: state.amount };
      const existItem = state.cartItems?.find((x) => x.item._id === item.item._id);
      if (existItem) {
        // Show popup for 3 seconds
        const popup = document.createElement('div');
        popup.textContent = 'Item already added to cart';
        popup.style.position = 'fixed';
        popup.style.top = '20px';
        popup.style.left = '50%';
        popup.style.transform = 'translateX(-50%)';
        popup.style.padding = '10px';
        popup.style.backgroundColor = '#f0f0f0';
        popup.style.border = '1px solid #ccc';
        popup.style.borderRadius = '5px';
        document.body.appendChild(popup);
        
        setTimeout(() => {
          document.body.removeChild(popup);
        }, 3000);

        return state;
      } else {
        return {
          ...state,
          cartItems: [...state?.cartItems, item],
        };
      }
    case "REMOVE_FROM_CART":
      const updatedCartItems = state.cartItems?.filter(
        (x) => x.item._id !== action.payload
      );
      // localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      // console.log(action.payload);
      return {
        ...state,
        cartItems: updatedCartItems ? updatedCartItems : [],
      };
    case "REMOVE":
      let newArr = [...state.cartItems];
      newArr.splice(action.index, 1);
      return newArr;
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x._id === action.payload.id
            ? { ...x, quantity: action.payload.quantity, amount: state.amount }
            : x
        ),
      };
    case "DROP":
      // localStorage.removeItem("cart");
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

const getLocalCartData = () => {
  const auth = localStorage.getItem("token");
  if (auth ) {
  let localCartData = localStorage.getItem("cart");
  return localCartData && localCartData !== "undefined" ? JSON.parse(localCartData) : [];
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: getLocalCartData(),
    amount: 1,
  });
  const [amount, setAmount] = useState(1);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
    // let localCartData = localStorage.getItem("cart");
    // if(localCartData == "undefined") {
    //   localStorage.removeItem("cart");

    // }
  }, [state.cartItems]);

  return (
    <CartContext.Provider
      value={{ state, dispatch, amount, setAmount, getLocalCartData , expired,setExpired }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
