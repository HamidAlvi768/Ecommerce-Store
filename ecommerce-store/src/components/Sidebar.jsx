import React from 'react';

const Sidebar = ({ priceRange, setPriceRange, selectedCategory, setSelectedCategory, productQty, products, searchProduct }) => {

  const getUniqueData = (data, property) => {
    let newVal = data.map(curElem => curElem[property]);
    return newVal = ["All", ...new Set(newVal)]
    console.log(newVal);
  };
   let categoryOnlyData = getUniqueData(products, 'category');

   
  return (
    <aside className="shop-sidebar">
      <div className="search-container">
        <input type="text" placeholder="Search products..." onChange={searchProduct} />
        <button type="submit">🔍</button>
      </div>
      <div className="price-filter">
        <h3>Filter by price</h3>
        <input
          type="range"
          min="10"
          max="500"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
        />
        <div className="price-range">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <div className="categories">
        <h3>Categories</h3>
        <ul>
          {categoryOnlyData.map((category) => (
            <li key={category}>
              <button
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category} {category === 'All' ? '' : `(${products.filter(product => product.category === category).length})`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;