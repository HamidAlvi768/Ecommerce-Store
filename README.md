# Earth Store (customer storefront)

React 18 storefront for a small ecommerce project: sign up, browse and search
products, add them to a cart and place orders.

Part of a three-repo project:

- **Backend API**: [Ecom-Backend-Completed](https://github.com/HamidAlvi768/Ecom-Backend-Completed) (required)
- **Admin dashboard**: [Ecom-Frontend-Completed](https://github.com/HamidAlvi768/Ecom-Frontend-Completed)

## Run it

Start the backend first, then:

```
cd ecommerce-store
npm install
npm start          # http://localhost:3000
```

The app calls `http://localhost:5000/api` by default. To use another backend,
create `ecommerce-store/.env` with `REACT_APP_API_URL=https://your-api/api`.

Sign up with any email, or use the demo customer created by the backend's
`npm run seed`.

## How it works

- The cart lives in the browser (React Context, saved to localStorage).
- Placing an order sends only product ids and quantities; the backend looks up
  the prices.
- The cart page doubles as the checkout (address and phone).
