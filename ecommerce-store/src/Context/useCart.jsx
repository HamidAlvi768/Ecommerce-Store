// src/Context/useCart.jsx
import { useContext } from "react";
import CartContext from "./CartContext";

const useCart = () => {
  const { state, dispatch, amount, setAmount, showToast } = useContext(CartContext);

  const addToCart = (item, qty = 1) => {
    const n = Number(qty);
    if (!item?._id || !Number.isInteger(n) || n <= 0) {
      console.error("Invalid item or amount");
      return;
    }
    const inCart = state.cartItems.some((x) => x.item._id === item._id);
    dispatch({ type: "ADD_TO_CART", payload: { item, amount: n } });
    showToast(inCart ? `Added ${n} more ${item.name} to cart` : `${item.name} added to cart`);
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return {
    cartItems: state.cartItems,
    addToCart,
    dispatch,
    amount,
    setAmount,
    removeItem,
  };
};

export default useCart;
