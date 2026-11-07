import { API_URL, assetUrl } from "../config";
// components/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useCart from "../Context/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const { amount, setAmount, addToCart } = useCart();

  useEffect(() => {
    setAmount(1);
    setNotFound(false);
    const fetchProduct = async () => {
      const response = await fetch(`${API_URL}/products/${id}`);
      if (!response.ok) {
        setNotFound(true);
        return;
      }
      setProduct(await response.json());
    };
    fetchProduct().catch(() => setNotFound(true));
  }, [id, setAmount]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, amount);
    setAmount(1);
  };

  if (notFound) return <div style={{ padding: 40 }}>Product not found. <Link to="/shop">Back to shop</Link></div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail-container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
          </div>      <div className="product-main">
        <div className="product-image">
          <img src={assetUrl(product.image)} alt={product.name} />
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
              min="1"
              max="100"
              onChange={(e) => setAmount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            />
            <button onClick={() => setAmount(Math.min(100, amount + 1))}>+</button>
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
