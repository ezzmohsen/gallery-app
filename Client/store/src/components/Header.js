import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { IoLogOut, IoLogIn } from "react-icons/io5";

const Header = ({ cartCount, wishlistCount, onSearch }) => {
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [logCheck, setLogCheck] = useState("none");
  const [logCheck2, setLogCheck2] = useState("block");

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      localStorage.removeItem("authToken");
      navigate("/login");
      setLogCheck("none");
      setLogCheck2("block");
    } else {
      // navigate("/login");
      setLogCheck("block");
      setLogCheck2("none");
    }
  };
  // useEffect(() => {
  //   handleLogout();
  // }, [logCheck]);

  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo">
          <h1 className="logo-text">Art Gallery</h1>
          <p className="logo-subtext">Tableaux & Home Decoration</p>
        </div>
        <div className="icons">
          <FaSearch className="icon search-icon" onClick={toggleSearchBar} />
          <div className="icon-wrapper">
            <Link to="/wishlist">
              <FaHeart className="icon heart-icon" />
              <span className="icon-badge">{wishlistCount}</span>
            </Link>
          </div>
          <div className="icon-wrapper">
            <Link to="/cart">
              <FaShoppingCart className="icon cart-icon" />
              <span className="icon-badge">{cartCount}</span>
            </Link>
          </div>
          <div className="icon-wrapper">
            <Link to="/profile" title="View Profile">
              <FaUser className="icon profile-icon" />
            </Link>
          </div>

          <div
            className="icon-wrapper"
            style={{ display: logCheck }}
            onClick={handleLogout}
          >
            <Link to="/login" title="Login">
              <IoLogOut className="icon profile-icon" id="log" title="LogOut" />
            </Link>
          </div>

          <div
            className="icon-wrapper"
            style={{ display: logCheck == "block" ? "none" : "block" }}
            onClick={handleLogout}
          >
            <Link to="/login" title="Login">
              <IoLogIn className="icon profile-icon" id="log" />
            </Link>
          </div>
        </div>
      </div>
      {searchVisible && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      )}
      <nav className="nav">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/" className="menu-item">
              HOME
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/products" className="menu-item">
              PRODUCTS
            </Link>
          </li>
          <li className="menu-item">ABOUT US</li>
          <li className="menu-item">CONTACT</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
