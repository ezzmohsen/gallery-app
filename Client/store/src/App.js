import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import React, { useState, useContext } from "react";
import Header from "./components/Header";
import ProductsPage from "./components/ProductsPage";
import WishlistPage from "./components/WishlistPage";
import Homepage from "./components/HomePage";
import Footer from "./components/Footer";

import Cart from "./components/Cart/Cart";
import CartContext from "./components/Cart/CartContext";
import Checkout from "./components/Checkout/Checkout";
import Profile from "./components/Profile/Profile";

import RequireAuth from "./RequireAuth";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToWishlist = (product) => {
    setWishlistItems((prevItems) => [...prevItems, product]);
    setWishlistCount(wishlistCount + 1);
  };

  const handleRemoveFromWishlist = (product) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item._id !== product._id)
    );
    setWishlistCount(wishlistCount - 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const { cart, dispatch } = useContext(CartContext);

  const handleAddToCart = (product) => {
    console.log(product);

    const existingCartItem = cart.find((item) => item._id === product._id);
    console.log(existingCartItem);
    if (existingCartItem) {
      const id = product._id;
      const newQuantity = product.quantity + existingCartItem.quantity;
      if (newQuantity <= product.stock) {
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { id, quantity: newQuantity },
        });
        setCartCount(cartCount + product.quantity);
      } else {
        alert(`Cannot add more than ${product.stock} items to the cart.`);
      }
    } else {
      if (product.quantity <= product.stock) {
        dispatch({
          type: "ADD_TO_CART",
          payload: { ...product, quantity: product.quantity },
        });
        setCartCount(cartCount + product.quantity);
      } else {
        alert(`Cannot add more than ${product.stock} items to the cart.`);
      }
    }
  };

  return (
    <BrowserRouter>
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onSearch={handleSearch}
      />
      <Routes>
        <Route path="/" element={<RequireAuth><Homepage /></RequireAuth>} />
        <Route
          path="/products"
          element={
            <RequireAuth>
              <ProductsPage
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                searchQuery={searchQuery}

              />
            </RequireAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <WishlistPage
                wishlistItems={wishlistItems}
                onAddToCart={handleAddToCart}
                onRemoveFromWishlist={handleRemoveFromWishlist}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />

        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout setCartCount={setCartCount} />
            </RequireAuth>
          }
        />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateAccount />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
