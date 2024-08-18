import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import Sidebar from './Sidebar';
import useCart from '../Context/useCart';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([10, 300]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const { expired ,setExpired } = useCart();

  const navigate = useNavigate();

// Fetch products from API
const fetchProducts = async () => {
  try {
    // Replace with actual API call
    const response = await fetch('https://merry-moxie-6d2ca1.netlify.app/.netlify/functions/api/products',{
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
  });
    const data = await response.json();
    setProducts(data);
    setFilteredProducts(data);
    setSelectedCategory('All');
    // console.log(products)

       if (response.status === 401) {
        // setExpired(true);
      localStorage.removeItem('token');
            // navigate('/login'); // Redirect to login page
            throw new Error('Token expired');
          }

   

  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

  useEffect(() => {
    
    fetchProducts();
  }, []);


  const searchProduct = async (e) => {
    let search = e.target.value;
    if(search){

      let result = await fetch(`https://merry-moxie-6d2ca1.netlify.app/.netlify/functions/api/products/search/${search}`);
      result = await result.json();
      setFilteredProducts(result);
    }
    if (search === '') {
      fetchProducts();
    }
  };

  useEffect(() => {
    let result = products;

    // Filter by price
    result = result && result.length > 0 && result.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result && result.length > 0 && result?.filter(product => product?.category === selectedCategory);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, priceRange, selectedCategory, sortBy]);

  return (
    <div className="shop-container">
      <Sidebar
      products={products}
      productQty={products.length}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchProduct={searchProduct}
      />
      <main className="shop-main">
        <div className="shop-header">
          <h1>Shop</h1>
          <div className="shop-controls">
            <p>Showing all {filteredProducts.length} results</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <ProductList products={filteredProducts} />
      </main>
    </div>
  );
};

export default Shop;