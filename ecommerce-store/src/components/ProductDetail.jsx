// components/ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useCart from "../Context/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const { amount, setAmount, addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      // Replace with actual API call
      const response = await fetch(
        `.netlify/functions/api/products/${id}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, amount);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
          </div>      <div className="product-main">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
          <div className="quantity-selector">
            <button onClick={() => setAmount(Math.max(1, amount - 1))}>
              -
            </button>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
            />
            <button onClick={() => setAmount(amount + 1)}>+</button>
          </div>
          <button className="add-to-cart" onClick={handleAddToCart}>
            ADD TO CART
          </button>
          <p>Category: {product.category}</p>
        </div>
      </div>
      <div className="product-tabs">
        <div className="tab-headers">
          <button
            className={activeTab === "description" ? "active" : ""}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (0)
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "description" ? (
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          ) : (
            <div className="reviews">
              <p>There are no reviews yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
