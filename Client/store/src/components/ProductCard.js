import React, { useState } from 'react';
import './ProductCard.css';
import { FaTimes } from 'react-icons/fa';

const ProductCard = ({ product, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        onAddToCart({ ...product, quantity });
    };

    return (
        <div className="product-card-overlay">
            <div className="product-card">
                <FaTimes className="close-icon" onClick={onClose} />
                <div className="image-container">
                    <img className="product-card-image" src={product.image} alt={product.name} />
                </div>
                <div className="product-card-content">
                    <h2 className="product-card-title">{product.name}</h2>
                    <div className="product-card-price">
                        <span className="price">EGP {product.price}</span>
                    </div>
                    <p className="product-card-description">Detailed description for {product.name} goes here.</p>
                    <div className="quantity-selector">
                        <button className="quantity-button" onClick={handleDecrement}>-</button>
                        <input
                            type="number"
                            className="quantity-input"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            min="1"
                        />
                        <button className="quantity-button" onClick={handleIncrement}>+</button>
                    </div>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;




