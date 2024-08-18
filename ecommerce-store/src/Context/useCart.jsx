import CartContext from "./CartContext";
// src/hooks/useCart.js

import { useContext } from "react";

const useCart = () => {
  const { state, dispatch, amount, setAmount, setExpired, expired } = useContext(CartContext);

  const addToCart = (item, amount) => {
    try {
      if (!item || typeof amount !== 'number' || amount <= 0) {
        throw new Error('Invalid item or amount');
      }
      dispatch({ type: "ADD_TO_CART", payload: { item, amount } });
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
      // You can add additional error handling here, such as displaying a user-friendly message
    }
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    // console.log('updated cart', state.cartItems)
    console.log(id)

  };

  return {
    cartItems: state.cartItems,
    addToCart,
    dispatch,
    amount: state.amount,
    setAmount,
    removeItem,
  };
};

export default useCart;
