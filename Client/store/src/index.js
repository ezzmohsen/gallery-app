import React from "react";
import { useMemo } from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";
import { CartProvider } from './components/Cart/CartContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CartProvider>
    <App />
</CartProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
