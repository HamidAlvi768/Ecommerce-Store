import React from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../config';
import useCart from '../Context/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product-detail/${product._id}`} className="product-card">
      <img src={assetUrl(product.image)} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </Link>
  );
};

export default ProductCard;
