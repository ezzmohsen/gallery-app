import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.scss";
import Navbar from "./components/navbar/Navbar";
import Menu from "./components/menu/Menu";
import Footer from "./components/footer/Footer";

const Layout = () => {
  return (
    <div className="main">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
