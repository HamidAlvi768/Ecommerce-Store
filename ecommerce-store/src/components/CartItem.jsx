import React from 'react'
import useCart  from '../Context/useCart';
import { MdDelete } from "react-icons/md";

const CartItem = ({ item, handleQuantityChange, index, }) => {
  const {removeItem ,cartItems , state} = useCart();
  const handleRemoveItem = (id) => {
    removeItem(id);
  }
  return (
    <tr>
      <td>
        <img src={item.item.image} alt={item.item.name} className="product-image" />
        <span>{item.item.name}</span>
      </td>
      <td>${item.item.price}</td>
      <td>
        <button onClick={() => handleQuantityChange(item.item._id, 'decrement')}>-</button>
        <input className='quantity-input' type="number" value={item.amount || 1} readOnly />
        <button onClick={() => handleQuantityChange(item.item._id, 'increment')}>+</button>
      </td>
      <td>${(item.item.price * (item.amount || 1)).toFixed(2)}</td>
      <td><MdDelete className='delete-icon' onClick={()=>handleRemoveItem(item.item._id)}></MdDelete></td>
    </tr>
  )
}

export default CartItem
