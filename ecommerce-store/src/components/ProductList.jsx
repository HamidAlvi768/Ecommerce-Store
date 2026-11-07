import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
  <div className="product-list product-grid">
    {Array.isArray(products) && products.map(product => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
);

export default ProductList;
