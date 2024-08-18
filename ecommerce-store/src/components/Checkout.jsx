
import React, { useState } from 'react';


const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'United States (US)',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    orderNotes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [ e.target.name ]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Implement place order logic
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="coupon-section">
        <input type="checkbox" id="coupon" />
        <label htmlFor="coupon">Have a coupon? <a href="#">Click here to enter your code</a></label>
      </div>
      <div className="checkout-form">
        <div className="billing-details">
          <h2>Billing details</h2>
          <form>
            <div className="form-group">
              <label>First name <span className="required">*</span></label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last name <span className="required">*</span></label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Company name (optional)</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Country / Region <span className="required">*</span></label>
              <select name="country" value={formData.country} onChange={handleChange} required>
                <option value="United States (US)">United States (US)</option>
                {/* Add more countries as needed */}
              </select>
            </div>
            <div className="form-group">
              <label>Street address <span className="required">*</span></label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="House number and street name" required />
              <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} placeholder="Apartment, suite, unit, etc. (optional)" />
            </div>
            <div className="form-group">
              <label>Town / City <span className="required">*</span></label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>State <span className="required">*</span></label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>ZIP Code <span className="required">*</span></label>
              <input type="text" name="zip" value={formData.zip} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone <span className="required">*</span></label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Email address <span className="required">*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Order notes (optional)</label>
              <textarea name="orderNotes" value={formData.orderNotes} onChange={handleChange} placeholder="Notes about your order, e.g. special notes for delivery." />
            </div>
          </form>
        </div>
        <div className="order-summary">
          <h2>Your order</h2>
          <div className="order-items">
            <div className="order-item">
              <span>Postcard V1 x 4</span>
              <span>$95.96</span>
            </div>
            <div className="order-total">
              <span>Subtotal</span>
              <span>$95.96</span>
            </div>
            <div className="order-total">
              <span>Total</span>
              <span>$95.96</span>
            </div>
          </div>
          <p>Sorry, it seems that there are no available payment methods. Please contact us if you require assistance or wish to make alternate arrangements.</p>
          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
