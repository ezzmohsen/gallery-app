import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';

const Header = ({ cartCount, wishlistCount, onSearch }) => {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleSearchBar = () => {
        setSearchVisible(!searchVisible);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value); // Call the function passed as a prop
    };

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
                    <li className="menu-item"><Link to="/" className="menu-item">HOME</Link></li>
                    <li className="menu-item"><Link to="/products" className="menu-item">PRODUCTS</Link></li>
                    <li className="menu-item">ABOUT US</li>
                    <li className="menu-item">CONTACT</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

