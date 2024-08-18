import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
  <div className="product-list product-grid">
    {products && products.length > 0 && products?.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductList;
