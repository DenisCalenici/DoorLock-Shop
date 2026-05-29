import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/Product/ProductPage";
import CheckoutForm from "./components/Checkout/CheckoutForm";
import App from "./App";
import Catalog from "./components/catalog/Catalog";
import About from "./components/About/About";
import Wholesale from "./components/Wholesale/Wholesale";
import Favorites from "./components/Favorites/Favorites";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ProductsProvider } from "./context/ProductsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <FavoritesProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/about" element={<About />} />
              <Route path="/wholesale" element={<Wholesale />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/:id" element={<CheckoutForm />} />
              <Route path="/checkout" element={<CheckoutForm />} />
            </Routes>
          </CartProvider>
        </FavoritesProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
