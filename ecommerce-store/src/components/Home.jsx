import React from "react";
import useCart from "../Context/useCart";
import { useNavigate } from "react-router-dom";

const Home = () => { 

  const { expired } = useCart();

  const navigate = useNavigate();

  if (expired) {
    localStorage.clear();
    throw new Error('Token expired');
  }

  const navigateToShop = ()=> {
    navigate("/shop")
  }

  
  
  return(
  <div className="home">
    <section className="hero-section">
      <div className="hero-content">
        <h1>EARTH</h1>
        <h2>MULTIPURPOSE STORE</h2>
        <button className="shop-now-button" onClick={navigateToShop}>SHOP NOW</button>
      </div>
    </section>

    <section className="product-section">
      {[
        { title: "Poster V1", image: "https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/10/Poster5-1000x1000.jpg" },
        { title: "Poster V2", image: "https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/10/Poster6-1000x1000.jpg" },
        { title: "Poster V3", image: "https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/10/Poster4-1000x1000.jpg" },
      ].map((poster, index) => (
        <div key={index} className="product-card">
          <img
            src={poster.image}
            alt={poster.title}
          />
          <h3>{poster.title}</h3>
          <p>${(Math.random() * 10 + 10).toFixed(2)}</p>
        </div>
      ))}
    </section>

    <section className="testimonial-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-grid">
        {[
          {
            name: "JENNIFER LEWIS",
            text: "Fast shipping and excellent customer service. The product was even better than expected. I will definitely be a returning customer.",
            img: 'https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/earth-store-testimonial-avatar-img.jpeg',
          },
          {
            name: "ALICIA HEART",
            text: "Great user experience on your website. I found exactly what I was looking for at a great price. I will definitely be telling my friends.",
            img: 'https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/earth-store-testimonials-avatar-img-2.jpeg',
          },
          {
            name: "JUAN CARLOS",
            text: "Thank you for the excellent shopping experience. It arrived quickly and was exactly as described. I will definitely be shopping with you again in the future.",
            img: 'https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/earth-store-testimonials-avatar-img-1.jpeg',
          },
        ].map((testimonial, index) => (
          <div key={index} className="testimonial">
            <p>"{testimonial.text}"</p>
            <img
              src={testimonial.img}
              alt={testimonial.name}
            />
            <p>{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="postcard-section">
      <h2>Give the Gift of a Postcard</h2>
      <p>Give the gift of a lasting memory with a postcard</p>
      <button className="shop-now-button">PURCHASE A POSTCARD</button>
    </section>

    <section className="features-section">
      {["SECURE PAYMENT", "DELIVERED WITH CARE", "EXCELLENT SERVICE"].map(
        (feature, index) => (
          <div key={index} className="feature">
            {/* Add icon here */}
            <h3>{feature}</h3>
            <p>
              {index === 0
                ? "All our payments are SSL secured"
                : index === 1
                ? "Super fast shipping to your door"
                : "Live chat and phone support"}
            </p>
          </div>
        )
      )}
    </section>
  </div>
);
}

export default Home;
