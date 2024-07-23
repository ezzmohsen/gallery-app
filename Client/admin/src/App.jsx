import "./App.css";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Products from "./pages/products/Products";
import Orders from "./pages/orders/Orders";
import Login from "./pages/login/Login";
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
          <Route index element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="users" element={<RequireAuth><Users /></RequireAuth>} />
          <Route path="products" element={<RequireAuth><Products /></RequireAuth>} />
          <Route path="orders" element={<RequireAuth><Orders /></RequireAuth>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
